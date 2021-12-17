import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';

import Navbar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'



function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<Home/>} />   
                    <Route exact path='/login' element={<AuthRoute><Login/></AuthRoute>} />
                    <Route exact path='/register' element={<AuthRoute><Register/></AuthRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
