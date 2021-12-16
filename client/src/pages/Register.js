import React, { useState } from 'react'
import { Form, Button, Container, Spinner, Alert } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useForm } from '../utils/hooks'

const Register = () => {
    const [errors, setErrors] = useState({})


    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })


    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result){
            console.log(result)
            window.location.href = '/'
        },
        onError(err){
            // console.log(err.graphQLErrors[0].extensions.errors)
            setErrors(err.graphQLErrors[0]? err.graphQLErrors[0].extensions.errors: {})
            
        },
        variables: values
    })

    function registerUser(){
        addUser()
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
                        <h1 style={{textAlign:"center"}}>Register</h1>
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

                        <Form.Group  controlId="formBasicEmail" className='form-row'>
                            <Form.Label className={errors.email ? 'form-invalid-label': ''}>
                                Email address
                            </Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email"
                                name='email'
                                value={values.email}
                                onChange={onChange}
                                className={errors.email ? 'form-invalid-row': ''}
                            />
                            {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text> */}
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

                        <Form.Group  controlId="formConfirmPassword" className='form-row'>
                            <Form.Label className={errors.confirmPassword ? 'form-invalid-label': ''}>
                                Confirm Password
                            </Form.Label>
                            <Form.Control
                                type="password" 
                                placeholder="Confirm Password"
                                name='confirmPassword'
                                value={values.confirmPassword}
                                onChange={onChange}
                                className={errors.confirmPassword ? 'form-invalid-row': ''}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </>
            )}
        </Container>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword

            }
        ) {
            id email username createdAt token
        }
    }
`

export default Register
