import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    
    
    
    return (
        <div className='home-container page'>
            <h1>Right this way, to your next kitchen adventure!</h1>
            
            <div className='home-page-plans-CTA'>
                <p>Start cookin</p>
            </div>

            <div className='home-page-items'>
                <Link to='items'>Find Your Gadgets</Link>

            </div>

        </div>
    )
}