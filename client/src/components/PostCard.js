import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card,OverlayTrigger, Tooltip } from 'react-bootstrap'
import { AuthContext } from '../context/auth'
import moment from 'moment'
import { AiOutlineComment } from 'react-icons/ai'
import LikeButton from './LikeButton'
import styles from './PostCard.module.css'
import DeleteButton from './DeleteButton'

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes }}) => {
    
    const { user } = useContext(AuthContext)

    return (

        <Card className={styles.PostCardWrapper} >
            <div className={styles.PostCardPadding} >
                {user && user.username === username && (
                    <DeleteButton postId={id}></DeleteButton>
                ) }
                <Card.Title>
                    <div  className={styles.PostCardTitle}>
                        <Card.Img className={styles.PostProfilePic} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNjc252u1MO3yzxCLBkWcoxksO_nUUuxAOtM4VmmkhR5RusUTzva_ukNbRL1n2vlSj8Y&usqp=CAU">

                        </Card.Img>
                        <div>
                            <h3>{username}</h3>
                            <Card.Subtitle as={Link} to={`/posts/${id}`} className={styles.PostCardSubtitle} >{moment(createdAt).fromNow()}</Card.Subtitle>
                        </div>
                    </div>
                </Card.Title>
                
                <Card.Body>
                    {body}
                </Card.Body>
            </div>
            <Card.Footer className={styles.PostCardFooter}>
                <LikeButton post={{id, likes,likeCount}} user={user}></LikeButton>
                <OverlayTrigger placement='top'
                    overlay={<Tooltip id={`tooltip-right`}><strong>View the post</strong>.</Tooltip>}
                >
                    <a className={styles.ReadMoreBtn} href={`/posts/${id}`}>Read more...</a>       
                </OverlayTrigger>
                <div>
                    <OverlayTrigger placement='top'
                        overlay={<Tooltip id={`tooltip-right`}><strong>Comment a post</strong>.</Tooltip>}
                    >
                        <a href={`/posts/${id}`}>
                            <AiOutlineComment className={styles.CommentIcon} />
                        </a>
                    </OverlayTrigger>
                    {commentCount}

                </div>
                

            </Card.Footer>
        </Card>
    )
}

export default PostCard
