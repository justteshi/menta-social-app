import React from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useForm } from '../utils/hooks'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

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
        <div style={{ borderRadius:'25px', border:'1px solid aqua', background:'lightblue'}}>
            <h2 style={{textAlign:'center',marginTop:"0.5em"}}>Create a post:</h2>
            { error && (
                <Alert variant='danger'>
                    <ul className='error-list'>
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </Alert>
            ) }
            <Form onSubmit={onSubmit} noValidate style={{marginTop:"1em"}}>
                <Form.Group  controlId="formBasicCreatePost" className='form-row' style={{width:"50%",margin:"auto"}}>
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
                <div style={{display:"flex", justifyContent:"center",marginBottom:"1em"}}>
                    <Button type="submit" variant='warning' style={{width:'200px',marginTop:"1em"}}>Post</Button>
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
