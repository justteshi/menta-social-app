import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home/>} />   
                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/register' element={<Register/>} />   
            </Routes>
        </Router>
    );
}

export default App;
