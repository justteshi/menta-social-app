import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Container, Form, Button } from 'react-bootstrap'


const Profile = () => {
    const { user } = useContext(AuthContext)
    const profilePicStatic = {
        background: `url(${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNjc252u1MO3yzxCLBkWcoxksO_nUUuxAOtM4VmmkhR5RusUTzva_ukNbRL1n2vlSj8Y&usqp=CAU"})`,
        backgroundSize: "cover",
        height: "200px",
        width: "200px",
        margin:"auto",
        borderRadius: "50%"
        }
    return (
        <Container style={{display:"flex", justifyContent:"space-between", padding:"4em"}}>
            <div className='profile-left' style={{width:"30%", background:"gray",padding:"2em", borderRadius:"25px"}}>
                <div className='profile-pic' style={profilePicStatic}></div>
                <h3 style={{textAlign:"center",marginTop:"1em"}}>{user.username}</h3>
                <h4 style={{textAlign:"center",marginTop:"1em"}}>{user.email}</h4>

            </div>
            <div className='profile-right' style={{width:"65%", background:"gray", borderRadius:"25px"}}>
                <h3 style={{textAlign:"center",marginTop:"1em"}}>Change profile information: </h3>

                <Form 
                    // onSubmit={onSubmit} 
                    noValidate 
                    style={{marginTop:"1em"}}
                >
                    <Form.Group  controlId="formBasicCreatePost" className='form-row' style={{width:"50%",margin:"auto"}}>
                        <Form.Control

                            type="email" 
                            placeholder="Change email"
                            name='body'
                            // onChange={onChange}
                            // value={values.body}
                        />
                    </Form.Group>
                    <div style={{display:"flex", justifyContent:"center",marginBottom:"1em"}}>
                        <Button type="submit" variant='warning' style={{width:'100px',marginTop:"1em"}}>Save</Button>
                    </div>
                </Form>
            </div> 
        </Container>
    )
}

export default Profile
