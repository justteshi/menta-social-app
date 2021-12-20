import React, { useState, useContext } from 'react'
import { Form, Button, Container, Spinner, Alert } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useForm } from '../utils/hooks'
import { AuthContext } from '../context/auth'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    let navigate = useNavigate() 
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

     const { onChange, onSubmit, values } = useForm(loginUserCallback, {
         username: '',
         password: ''
     })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }){

            context.login(userData)
            // window.location.href = '/'
            navigate('/')
        },
        onError(err){
            // console.log(err.graphQLErrors[0].extensions.errors)
            setErrors(err.graphQLErrors[0]? err.graphQLErrors[0].extensions.errors: {})
            
        },
        variables: values
    })

    function loginUserCallback(){
        loginUser()
    }
    
    return (
        <Container>
            {loading ? (
                <div style={{display:"flex", justifyContent:"center", marginTop:"10em"}}>
                    <Spinner animation="border" variant="info" style={{}} />
                </div>
            ) : (
                <>

                    <Form style={{width:"50%", margin:"auto",marginTop:"4em"}} noValidate onSubmit={onSubmit} >
                        <h1 style={{textAlign:"center"}}>Login</h1>
                        {Object.keys(errors).length > 0 && (
                            <Alert variant='danger'>
                                <ul className='error-list'>
                                {Object.values(errors).map((value) => (
                                    <li key={value}>{value}</li>
                                ))}
                                </ul>
                            </Alert>
                        )}
                        <Form.Group  controlId="formBasicUsername" className='form-row'>
                            <Form.Label className={errors.username ? 'form-invalid-label': ''}>
                                Username
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Username"
                                name='username'
                                value={values.username}
                                onChange={onChange}
                                className={errors.username ? 'form-invalid-row': ''}
                            />
                        </Form.Group>



                        <Form.Group  controlId="formBasicPassword" className='form-row'>
                            <Form.Label className={errors.password ? 'form-invalid-label': ''}>
                                Password
                            </Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                name='password'
                                value={values.password}
                                onChange={onChange}
                                className={errors.password ? 'form-invalid-row': ''}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </>
            )}
        </Container>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            id email username createdAt token
        }
    }
`

export default Login
