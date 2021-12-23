import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/client'
import {  Card, Container, Form, Button, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import moment from 'moment'
import LikeButton from '../components/LikeButton'
import { AiOutlineComment } from 'react-icons/ai'
import { AuthContext } from '../context/auth'
import DeleteButton from '../components/DeleteButton'
import styles from './SinglePost.module.css'

const SinglePost = () => {
    const { user } = useContext(AuthContext)
    const {postId} = useParams()
    const [comment, setComment] = useState('')

    const { data: getPost} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update(){
            setComment('')
        },
        variables: {
            postId,
            body: comment
         }
    })
    // console.log(getPost)
    let postMarkup
    if(!getPost){
        postMarkup = <div className={styles.RegisterLoading}>
                        <Spinner animation="border" variant="info" />
                    </div>
    }
    else {
        const { id, body, createdAt, username, comments, commentCount, likes, likeCount } = getPost.getPost
        // console.log(comments)
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
                            <DeleteButton postId={id}></DeleteButton>
                        ) }

                    </Card.Footer>
                </Card>
                {user && <div >
                    <div className={styles.CommentLine}></div>
                    <p style={{fontWeight:"bold",textAlign:"center",margin:"auto", marginBottom:"0",padding:"1em", background:"gray",borderRadius:"25px", width:"40%"}}>Post a comment</p>
                    <div className={styles.CommentLine}></div>
                    <Form
                        className={styles.CommentForm}
                        noValidate 
                        // onSubmit={onSubmit} 
                    >
                        <Form.Group  controlId="formBasicCreateComment" className='form-row'>
                            <Form.Control
                                type="text" 
                                placeholder="Write comment here..."
                                name='comment'
                                value={comment}
                                onChange={event => setComment(event.target.value)}
                                // value={values.body}
                            />
                        </Form.Group>
                        <div className={styles.CommentBtnWrapper}>
                            <OverlayTrigger placement='top'
                                overlay={<Tooltip id={`tooltip-right`}><strong>Post comment</strong>.</Tooltip>}
                            >
                                <Button 
                                    type="submit" 
                                    variant='warning' 
                                    className={styles.CommentBtn}
                                    disabled={comment.trim() === ''}
                                    onClick={(e)=> {
                                        e.preventDefault()
                                        submitComment()
                                        setComment('')
                                    }}
                                >
                                    Post
                                </Button>
                            </OverlayTrigger>
                        </div>
                    </Form>
                </div> }
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

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: String!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id body createdAt username
            }
            commentCount
        }
    }
`


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
