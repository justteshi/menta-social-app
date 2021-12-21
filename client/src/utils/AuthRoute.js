//chech if the the user is logged in
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'

const AuthRoute = ({children}) => {
    const { user } = useContext(AuthContext)
    console.log(children.type.name)
    if(children.type.name === "Coctails"){
        return user ? children : <Navigate to='/'/>
    }
    if (children.type.name === "Profile"){
        return user ? children : <Navigate to='/'/>

    }
    else {
        return user ? <Navigate to='/'/> : children
    }
}

export default AuthRoute