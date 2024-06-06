import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import BackgroundImage from '../../assets/images/cars2.jpeg'

export default function HomePage() {
    return (
        <div className="text-center">
            <header style={ HeaderStyle }>
                <h1 className="main-title home-page-title">welcome to our app</h1>
                <h1>What are you looking for?</h1>
                <Link to="/searchandfilter">
                    <button className="primary-button">Rentals</button>
                </Link>
                <Link to="/carservices">
                    <button className="primary-button">Services</button>
                </Link>
                </header>
        </div>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}
