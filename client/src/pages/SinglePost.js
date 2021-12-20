import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Row, Card, Container } from 'react-bootstrap'
import moment from 'moment'
import LikeButton from '../components/LikeButton'
import { AiOutlineComment } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi'

import { AuthContext } from '../context/auth'


const SinglePost = () => {
    const { user } = useContext(AuthContext)
    const {postId} = useParams()
    const { data: getPost} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })
    console.log(getPost)
    let postMarkup
    if(!getPost){
        postMarkup = <p>Loading post...</p>
    }
    else {
        const { id, body, createdAt, username, comments, commentCount, likes, likeCount } = getPost.getPost
        postMarkup = (
            <Container style={{marginTop:"2em"}}>
                <Card style={{borderRadius:"25px", border:"1px solid black"}}>
                    <div style={{padding:"2em", paddingBottom:"0"}}>
                        <Card.Title>
                            <div  style={{display:"flex"}}>
                                <Card.Img className='post-profile-pic' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNjc252u1MO3yzxCLBkWcoxksO_nUUuxAOtM4VmmkhR5RusUTzva_ukNbRL1n2vlSj8Y&usqp=CAU">

                                </Card.Img>
                                <div>
                                    <h3>{username}</h3>
                                    <Card.Subtitle style={{color:"gray"}}>
                                        {moment(createdAt).fromNow()}
                                    </Card.Subtitle>
                                </div>
                            </div>
                        </Card.Title>
                        
                        <Card.Body>
                            {body}
                        </Card.Body>
                    </div>
                    <Card.Footer style={{display:"flex", justifyContent:"space-between"}}>
                        <LikeButton post={{id, likes,likeCount}} user={user}></LikeButton>
                        <div>
                            <a href={`/posts/${id}`}>
                            <AiOutlineComment style={{fontSize:"20px", position:"relative", top:"-3px"}} />
                            </a>
                            {commentCount}

                        </div>
                        {user && user.username === username && (
                            <div  className="delete-post-btn" onClick={() => console.log('delete post')}>
                                <FiTrash2 style={{color:"red", position:"relative", top:"-3px"}}/>
                            </div>
                        ) }

                    </Card.Footer>
                </Card>
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
                body
                username
            }
        }
    }
`

export default SinglePost
