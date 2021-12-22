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
            <Container style={{marginTop:"2em"}}>
                <Card style={{borderRadius:"25px", background:"lightblue"}}>
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
                    <Card.Footer style={{display:"flex", justifyContent:"space-between", borderRadius:"0 0 25px 25px"}}>
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
                <div className='comments'>
                    
                    {
                        comments.map((comment)=>
                        <div key={comment.id}>
                            <div style={{width:"5px", height:"30px", background:"darkblue", margin:"auto"}}></div>
                            <div  style={{width:"40%", padding:"1em",margin:"auto", borderRadius:"25px", background:"lightgray"}}>
                                <div style={{display:"flex"}}>
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
                                <p style={{fontStyle:"italic", marginBottom:"0"}}>{comment.body}</p>
                                <p style={{fontSize:"10px", color:"gray",textAlign:"end",marginBottom:"0"}}>{moment(comment.createdAt).fromNow()}</p>
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
