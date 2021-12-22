import React, { useState, useEffect } from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import styles from './LikeButton.module.css'

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
            <AiFillLike className={styles.LikeBtn}/>
        ) : (
            //not liked
            <AiOutlineLike className={styles.LikeBtn}/>
        )
    ) : (
        <a href='/login'>
            <AiOutlineLike className={styles.LikeBtnNotLoggedIn}/>
        </a>
    )

    return (
        <div className={styles.LikeBtnWrapper} onClick={likePost}>
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
