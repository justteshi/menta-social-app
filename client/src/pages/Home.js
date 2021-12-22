import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'

import { AuthContext } from '../context/auth'
import { Container, Row, Col } from 'react-bootstrap'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import  { FETCH_POSTS_QUERY } from '../utils/graphql'
import styles from './Home.module.css'

const Home = () => {
    const { user } = useContext(AuthContext)
    const {
        loading,
        data
    } = useQuery(FETCH_POSTS_QUERY)
    let posts = []
    if(data){
        posts = data.getPosts
    }
    return (
        <Container className={styles.HomePageWrapper}>
            {user ? "" : (
                <p className={styles.HomePageNotLoggedIn}>If you want to create posts, please <a href='/login    '>Login</a> or <a href='/register'>Sing up</a> first.</p>
            )}
            
            <Row>
                {user && (
                    <Col>
                        <PostForm />
                    </Col>
                )}
            </Row>
            <Row>
                <h2 className={styles.HomeRecentPosts}>Recent Posts</h2>
            </Row>
            <Row className={styles.HomePagePostsWrapper}>
                {loading ? (
                    <h3 className={styles.HomeLoadingPosts}>Loading posts...</h3>
                ) : (
                    posts && posts.map(post => (
                        <Col key={post.id} className={styles.HomePagePostCol}>
                            <PostCard post={post} />
                        </Col>
                    ))
                )}
            </Row>

        </Container>
    )
}



export default Home
