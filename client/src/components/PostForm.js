import React from 'react'
import { Form, Button } from 'react-bootstrap'
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
        <div style={{marginTop:'2em', marginBottom: '2em', borderRadius:'25px', border:'1px solid aqua', background:'lightblue'}}>
            <h2 style={{textAlign:'center'}}>Create a post:</h2>
            <Form onSubmit={onSubmit} noValidate style={{display:'flex',justifyContent:'center'}}>
                <Form.Group  controlId="formBasicCreatePost" className='form-row'>
                {/* className={errors.username ? 'form-invalid-label': ''} */}
                    {/* <Form.Label >
                        Username
                    </Form.Label> */}
                    <Form.Control 
                        type="text" 
                        placeholder="Write your text here..."
                        name='body'
                        onChange={onChange}
                        value={values.body}
                        // className={errors.username ? 'form-invalid-row': ''}
                    />
                </Form.Group>
                <Button type="submit" variant='warning' style={{height:'38px'}}>Post</Button>
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
