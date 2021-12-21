import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { AuthContext } from '../context/auth'

const NavBar = () => {
    const { user, logout } = useContext(AuthContext)
    const pathname = window.location.pathname
    const path = pathname === '/' ? 'home' : pathname.substring(1)
    const [activeItem, setActiveItem] = useState(path)

    const handleItemClicked = (name) => setActiveItem(name)
    const navBar = user ? (
        <div className='nav-bar-warapper'>
            <Container fluid="sm" className="nav-bar">
                <ul>
                    <li><NavLink to="/" active={`${true}`} >Home</NavLink></li>
                    <li><NavLink to="/coctails" active={`${true}`} onClick={handleItemClicked}>Coctails</NavLink></li>

                </ul>
                <ul>
                    <li><NavLink to="/profile" active={`${true}`} onClick={handleItemClicked}>{user.username}</NavLink></li>
                    <li><NavLink to='' className="logout" onClick={logout}>Logout</NavLink></li>
                </ul>

            </Container>
        </div>
    ) : (
        <div className='nav-bar-warapper'>
            <Container fluid="sm" className="nav-bar">
                <ul>
                    <li><NavLink to="/" active={`${activeItem === 'home'}`} onClick={handleItemClicked}>Home</NavLink></li>

                </ul>
                <ul>

                    <li><NavLink to="/login" active={`${activeItem === 'login'}`} onClick={handleItemClicked}>Login</NavLink></li>
                    <li><NavLink to="/register" active={`${activeItem === 'register'}`} onClick={handleItemClicked}>Register</NavLink></li>
                </ul>

            </Container>
        </div>
    )

    return navBar
}

export default NavBar
