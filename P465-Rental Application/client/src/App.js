import React from 'react'
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components';

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import HomePage from './components/pages/HomePage'
import SearchAndFilter from './components/pages/SearchAndFilter'
import NavBar from './components/pages/Navbar'
import UserDetails from './components/pages/UserDetails';
import CarsDescription from './components/pages/CarsDescription'
import CarServices from './components/pages/CarServices'
import CheckOut from './components/pages/CheckOut'
import CheckOutNew from './components/pages/Checkout2'
import ChatBot from './components/pages/ChatBot'

import { Cars } from './Cars'


import './App.css'

const AppContainer = styled.div`
  margin: 0 auto;
`;

export default function App() {
    return (
        <AppContainer>
            <NavBar />
            <Router>
                <div>
                    <Routes>
                        <Route exact path="/" element={< LandingPage/> } />
                        <Route path="/login" element={< LoginPage/> } />
                        <Route path="/register" element={< RegisterPage/> } />
                        <Route path="/forget-password" element={< ForgetPasswordPage/> } />
                        <Route path="/home" element={< HomePage/> } />
                        <Route path="/searchandfilter" element={< SearchAndFilter/> } />
                        <Route path="/check-out/:totalAmount" element={<CheckOut/>} />
                        <Route path="/navbar" element={<NavBar />} />
                        <Route path="/userdetails" element={<UserDetails />} />
                        <Route path="/carservices" element={< CarServices/> } />
                        <Route path="/CarsDescription/:id" element={< CarsDescription cars={Cars}/> } />
                        <Route path="/checkoutnew" element={< CheckOutNew/> } />
                    </Routes>
                    <ChatBot/> 
                    <Footer />
                </div>
            </Router>
        </AppContainer>
    )
}

const Footer = () => {
    return (
        <p className="text-center" style={ FooterStyle }></p>
    )
}

const FooterStyle = {
    background: "#222",
    fontSize: ".8rem",
    color: "#fff",
    position: "fixed",
    bottom: 0,
    padding: "1rem",
    margin: 0,
    width: "100%",
    opacity: ".5"
}