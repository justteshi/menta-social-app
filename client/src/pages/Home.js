import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'

import { AuthContext } from '../context/auth'
import { Container, Row, Col } from 'react-bootstrap'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import  { FETCH_POSTS_QUERY } from '../utils/graphql'

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
        <Container>
            
            <Row>
                {user && (
                    <Col>
                        <PostForm />
                    </Col>
                )}
            </Row>
            <Row>
                <h2 style={{textAlign:"center"}}>Recent Posts</h2>
            </Row>
            <Row style={{display:"flex",flexWrap:"wrap"}}>
                {loading ? (
                    <h3 style={{textAlign:"center"}}>Loading posts...</h3>
                ) : (
                    posts && posts.map(post => (
                        <Col key={post.id} style={{flex:"25%", maxWidth:"25%", marginBottom:"10px"}} className="post-card-col">
                            <PostCard post={post} />
                        </Col>
                    ))
                )}
            </Row>

        </Container>
    )
}



export default Home
