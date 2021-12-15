import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import { Container, Row, Col } from 'react-bootstrap'
import PostCard from '../components/PostCard'

const Home = () => {
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
                <h2 style={{textAlign:"center"}}>Recent Posts</h2>
            </Row>
            <Row>
                {loading ? (
                    <h3 style={{textAlign:"center"}}>Loading posts...</h3>
                ) : (
                    posts && posts.map(post => (
                        <Col key={post.id}>
                            <PostCard post={post} />
                        </Col>
                    ))
                )}
            </Row>

        </Container>
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id body username createdAt likeCount commentCount
            likes {
                username
            }
            comments{
                id username body createdAt
            }
        }
    }
`

export default Home
