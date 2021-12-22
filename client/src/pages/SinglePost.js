import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import {  Card, Container } from 'react-bootstrap'
import moment from 'moment'
import LikeButton from '../components/LikeButton'
import { AiOutlineComment } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi'
import { AuthContext } from '../context/auth'
import styles from './SinglePost.module.css'

const SinglePost = () => {
    const { user } = useContext(AuthContext)
    const {postId} = useParams()
    const { data: getPost} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })
    // console.log(getPost)
    let postMarkup
    if(!getPost){
        postMarkup = <p>Loading post...</p>
    }
    else {
        const { id, body, createdAt, username, comments, commentCount, likes, likeCount } = getPost.getPost
        console.log(comments)
        postMarkup = (
            <Container className={styles.SinglePostWrapper}>
                <Card className={styles.SinglePostCard}>
                    <div className={styles.SinglePostBodyWrapper}>
                        <Card.Title>
                            <div className={styles.SinglePostCardImageWrapper}>
                                <Card.Img 
                                    className='post-profile-pic' 
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNjc252u1MO3yzxCLBkWcoxksO_nUUuxAOtM4VmmkhR5RusUTzva_ukNbRL1n2vlSj8Y&usqp=CAU">
                                </Card.Img>
                                <div>
                                    <h3>{username}</h3>
                                    <Card.Subtitle className={styles.SinglePostCardSubtitle}>
                                        {moment(createdAt).fromNow()}
                                    </Card.Subtitle>
                                </div>
                            </div>
                        </Card.Title>
                        
                        <Card.Body>
                            {body}
                        </Card.Body>
                    </div>
                    <Card.Footer className={styles.SinglePostCardFooter}>
                        <LikeButton post={{id, likes,likeCount}} user={user}></LikeButton>
                        <div>
                            <a href={`/posts/${id}`}>
                                <AiOutlineComment className={styles.SinglePostCommentBtn} />
                            </a>
                            {commentCount}

                        </div>
                        {user && user.username === username && (
                            <div  className={styles.DeletePostBtn} onClick={() => console.log('delete post')}>
                                <FiTrash2 className={styles.DeletePostBtnIcon}/>
                            </div>
                        ) }

                    </Card.Footer>
                </Card>
                <div className='comments'>
                    
                    {
                        comments.map((comment)=>
                        <div key={comment.id}>
                            <div className={styles.CommentLine}></div>
                            <div className={styles.SingleCommentWrapper}>
                                <div className={styles.SingleCommentTitleWrapper}>
                                    <div style={{
                                        background: `url(${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNjc252u1MO3yzxCLBkWcoxksO_nUUuxAOtM4VmmkhR5RusUTzva_ukNbRL1n2vlSj8Y&usqp=CAU"})`,
                                        backgroundSize: "cover",
                                        height: "30px",
                                        width: "30px",
                                        marginRight:"10px",
                                        borderRadius: "50%"
                                    }}></div>
                                    <h5>{comment.username}</h5>

                                </div>
                                <p className={styles.SingleCommentBody}>{comment.body}</p>
                                <p className={styles.SingleCommentCreatedAt}>{moment(comment.createdAt).fromNow()}</p>
                            </div>
                        </div>
                        )
                    }
                </div>
            </Container>
        )
    }
    return postMarkup
}

const FETCH_POST_QUERY = gql`
    query($postId:ID!){
        getPost(postId: $postId){
            id body username createdAt likeCount commentCount
            likes{
                username
            }
            comments{
                id
                body
                username
                createdAt
            }
        }
    }
`

export default SinglePost
