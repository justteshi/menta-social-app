import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { AuthContext } from '../context/auth'
import moment from 'moment'
import { AiFillLike, AiOutlineComment } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi'

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes }}) => {
    
    const { user } = useContext(AuthContext)
    const likePost = () =>{
        console.log('like post')
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
                    <AiFillLike style={{fontSize:"18px"}}/>
                    {likeCount}
                </div>
                <div>
                    <a href={`/posts/${id}`}>
                    <AiOutlineComment style={{fontSize:"20px"}} />
                    </a>
                    {commentCount}

                </div>
                {user && user.username === username && (
                    <div onClick={() => console.log('delete post')}>
                        <FiTrash2 style={{color:"red"}}/>
                    </div>
                ) }

            </Card.Footer>
        </Card>
    )
}

export default PostCard
