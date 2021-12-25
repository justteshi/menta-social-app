import React, { useState} from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { GrEdit } from 'react-icons/gr'
import styles from './EditButton.module.css'
import { Modal, Button, Form } from 'react-bootstrap'

const EditButton = ({postId, body, user}) => {
    const [showModal, setShowModal] = useState(false)
    const [newbody, setNewBody] = useState(body)
    const handleModalShow = () => setShowModal(true)
    const handleModalClose = () => setShowModal(false)
    const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
        update(){
            handleModalClose()
        },
        variables: {
            postId,
            body: newbody
        }
    })

    return (
        <>
            <div className={styles.EditPostButton} onClick={handleModalShow}> 
                <GrEdit />
            </div>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton onClick={handleModalClose}>
                <Modal.Title>{user}'s post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate>
                        <Form.Group  controlId="formBasicEditPost" className='form-row'>
                            <Form.Control
                                type="text" 
                                placeholder="Write comment here..."
                                name='newBody'
                                value={newbody}
                                onChange={event => setNewBody(event.target.value)}
                                // value={values.body}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleModalClose}>
                                Close
                            </Button>
                            <Button variant="warning" type='submit' onClick={(e)=> {
                                e.preventDefault()
                                updatePost()
                            }}>
                                Edit post
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
                {/* <Modal.Footer>
                </Modal.Footer> */}
            </Modal>
        </> 
    )
}

const UPDATE_POST_MUTATION = gql`
    mutation updatePost($postId: ID!, $body: String!){
        updatePost(postId: $postId, body: $body){
            id
            body
            username
        }
    }
`

export default EditButton
