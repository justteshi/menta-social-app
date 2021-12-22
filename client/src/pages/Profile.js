import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Container, Form, Button } from 'react-bootstrap'
import  { FETCH_POSTS_QUERY } from '../utils/graphql'
import { useQuery } from '@apollo/client'
import PostCard from '../components/PostCard'
import styles from './Profile.module.css'

const Profile = () => {
    const { user } = useContext(AuthContext)

    const {
        loading,
        data
    } = useQuery(FETCH_POSTS_QUERY)
    let posts = []
    if(data){
        posts = data.getPosts
    }
    let userOwnPosts = posts.filter(post => post.username === user.username)


    const profilePicStatic = {
        background: `url(${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNjc252u1MO3yzxCLBkWcoxksO_nUUuxAOtM4VmmkhR5RusUTzva_ukNbRL1n2vlSj8Y&usqp=CAU"})`,
        backgroundSize: "cover",
        height: "200px",
        width: "200px",
        margin:"auto",
        borderRadius: "50%"
        }
    return (
        <>
            <Container className={styles.ProfilePageWrapper}>
                <div className={styles.ProfileLeft}>
                    <div className='profile-pic' style={profilePicStatic}></div>
                    <h3 className={styles.ProfileName}>{user.username}</h3>
                    <h4 className={styles.ProfileEmail}>{user.email}</h4>

                </div>
                <div className={styles.ProfileRight}>
                    <h3 className={styles.ProfileInfoTitle}>Change profile information: </h3>

                    <Form 
                        // onSubmit={onSubmit} 
                        noValidate 
                        style={{marginTop:"1em"}}
                    >
                        <Form.Group  controlId="formBasicCreatePost" className='form-row' style={{width:"50%",margin:"auto"}}>
                            <Form.Control

                                type="email" 
                                placeholder="Change email"
                                name='body'
                                // onChange={onChange}
                                // value={values.body}
                            />
                        </Form.Group>
                        <div className={styles.ProfileFormBtnWrapper}>
                            <Button type="submit" variant='warning' className={styles.ProfileFormBtn}>Save</Button>
                        </div>
                    </Form>
                </div>
            </Container>
            <Container className={styles.ProfilePostsWrapper}>
                <div className={styles.OwnPostsWrapper}>
                    <h3 className={styles.OwnPostsTitle}>My posts:</h3>
                    {
                        userOwnPosts.map(post =>
                            <div key={post.id} className={styles.OwnPost}>
                                <PostCard post={post} key={post.id}/> 
                            </div> 
                        )
                    }
                </div> 
            </Container>
        </>
    )
}

export default Profile
