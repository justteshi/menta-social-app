import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home/>} />   
                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/register' element={<Register/>} />   
            </Routes>
        </Router>
    );
}

export default App;
