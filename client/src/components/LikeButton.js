import React, { useState, useEffect } from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'


const LikeButton = ({ post: { id, likes, likeCount }, user }) => {
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        }
        else {
            setLiked(false)
        }
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id}
    })

    const likeButton = user ? (
        liked ? (
            //liked
            <AiFillLike style={{fontSize:"20px", color:"#0d6efd"}}/>
        ) : (
            //not liked
            <AiOutlineLike style={{fontSize:"20px", color:"#0d6efd"}}/>
        )
    ) : (
        <a href='/login'>
            <AiOutlineLike style={{fontSize:"20px"}}/>
        </a>
    )

    return (
        <div style={{display:"flex"}} onClick={likePost} className='like-btn-wrapper'>
            {likeButton}
            {likeCount}
        </div>
    )
}
const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes {
                id, username
            }
            likeCount
        }
    }
`

export default LikeButton
