import React from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useForm } from '../utils/hooks'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { FETCH_POSTS_QUERY } from '../utils/graphql'
import styles from './PostForm.module.css'

const PostForm = () => {
    const {values, onChange, onSubmit} = useForm(createPostCallback, {
        body: ''
    })

    const [createPost,{ error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data: {
                getPosts: [result.data.createPost, ...data.getPosts]
            }})
            values.body = ''
        }
    })

    function createPostCallback(){
        createPost()
    }

    return (
        <div className={styles.PostFormWrapper}>
            <h2 className={styles.CreatePostTitle}>Create a post:</h2>
            { error && (
                <Alert variant='danger'>
                    <ul className='error-list'>
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </Alert>
            ) }
            <Form onSubmit={onSubmit} noValidate className={styles.PostForm}>
                <Form.Group  controlId="formBasicCreatePost" className={styles.PostFormRow}>
                    <Form.Control
                        as="textarea" 
                        // rows={3} 
                        type="text" 
                        placeholder="Write your text here..."
                        name='body'
                        onChange={onChange}
                        value={values.body}
                    />
                </Form.Group>
                <div className={styles.PostFormSubmitBtnWrapper}>
                    <Button type="submit" variant='warning' className={styles.PostFormSubmitBtn}>Post</Button>
                </div>
            </Form>
        </div>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username
            likes {
                id username createdAt
            }
            likeCount
            comments {
                id body username createdAt
            }
            commentCount
        }
    }
`

export default PostForm
