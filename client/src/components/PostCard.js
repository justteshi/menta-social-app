import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import moment from 'moment'
import { AiFillLike, AiOutlineComment } from 'react-icons/ai'

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes }}) => {
    const likePost = () =>{
        console.log('like post')
    }
    const commentOnPost = () =>{
        console.log('comment post')
    }
    return (
        <Card >
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNjc252u1MO3yzxCLBkWcoxksO_nUUuxAOtM4VmmkhR5RusUTzva_ukNbRL1n2vlSj8Y&usqp=CAU" />
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Card.Subtitle as={Link} to={`/posts/${id}`} style={{fontSize: 14, color:"lightgrey"}}>{moment(createdAt).fromNow()}</Card.Subtitle>
                <Card.Text>{body}</Card.Text>
            </Card.Body>
            <Card.Footer style={{display:"flex", justifyContent:"space-between"}}>
                <div onClick={likePost}>
                    <AiFillLike />
                    {likeCount}
                </div>
                <div onClick={commentOnPost}>
                    <AiOutlineComment />
                    {commentCount}

                </div>


            </Card.Footer>
        </Card>
    )
}

export default PostCard
