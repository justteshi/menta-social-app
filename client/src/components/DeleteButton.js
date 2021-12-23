import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import styles from './DeleteButton.module.css'
import { FiTrash2 } from 'react-icons/fi'
import { Modal, Button } from 'react-bootstrap'
import { FETCH_POSTS_QUERY } from '../utils/graphql'



const DeleteButton = ({postId}) => {
    const [showModal, setShowModal] = useState(false)
    const handleModalClose = () => setShowModal(false)
    const handleModalShow = () => setShowModal(true)
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy){
            setShowModal(false)
            if (window.location.pathname === '/' || window.location.pathname === '/profile'){
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                })
                proxy.writeQuery({query: FETCH_POSTS_QUERY, data:{
                    getPosts: [...data.getPosts.filter(p=> p.id !== postId)]
                }})
            }
            else {
                window.location.href = '/'
            }
        },
        variables: {
            postId
        }
    })
    

    return (
        <>
            <div  className={styles.DeletePostBtn} onClick={handleModalShow}> 
                <FiTrash2 className={styles.DeletePostBtnIcon}/>

            </div>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton onClick={handleModalClose}>
                <Modal.Title>Are you sure ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={deletePost}>
                    Delete post
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

export default DeleteButton
