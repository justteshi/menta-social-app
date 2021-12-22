import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { AuthContext } from '../context/auth'
import styles from './NavBar.module.css'

const NavBar = () => {
    const { user, logout } = useContext(AuthContext)
    const pathname = window.location.pathname
    const path = pathname === '/' ? 'home' : pathname.substring(1)
    const [activeItem, setActiveItem] = useState(path)
    const handleItemClicked = (name) => setActiveItem(name)
    const navBar = user ? (
        <div className={styles.NavBarWrapper}>
            <Container fluid="sm" className={styles.NavBar}>
                <ul>
                    <li><NavLink to="/" active={`${true}`} >Home</NavLink></li>
                    <li><NavLink to="/coctails" active={`${true}`} onClick={handleItemClicked}>Cocktails</NavLink></li>

                </ul>
                <a href="/">
                    <div className={styles.SiteLogo}></div>
                </a>
                <ul>
                    <li><NavLink to="/profile" active={`${true}`} onClick={handleItemClicked}>{user.username}</NavLink></li>
                    <li><NavLink to='' className={styles.Logout} onClick={logout}>Logout</NavLink></li>
                </ul>

            </Container>
        </div>
    ) : (
        <div className={styles.NavBarWrapper}>
            <Container fluid="sm" className={styles.NavBar}>
                <ul>
                    <li><NavLink to="/" active={`${activeItem === 'home'}`} onClick={handleItemClicked}>Home</NavLink></li>

                </ul>
                <a href="/">
                    <div className={styles.SiteLogo}></div>
                </a>
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
