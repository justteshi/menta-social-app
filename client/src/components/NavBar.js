import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
const NavBar = () => {
    const pathname = window.location.pathname
    const path = pathname === '/' ? 'home' : pathname.substring(1)
    const [activeItem, setActiveItem] = useState(path)

    const handleItemClicked = (name) => setActiveItem(name)

    return (
        <div className='nav-bar-warapper'>
            <Container fluid="sm" className="nav-bar">
                <ul>
                    <li><NavLink to="/" active={activeItem === 'home'} onClick={handleItemClicked}>Home</NavLink></li>
                </ul>
                <ul>

                    <li><NavLink to="/login" active={activeItem === 'login'} onClick={handleItemClicked}>Login</NavLink></li>
                    <li><NavLink to="/register" active={activeItem === 'register'} onClick={handleItemClicked}>Register</NavLink></li>
                </ul>

            </Container>
        </div>
    )
}

export default NavBar
