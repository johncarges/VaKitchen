import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className='home-container'>
            <h1>You need this stuff in your kitchen</h1>
            <p>Start cookin</p>
            <Link to='vans'>Find Your Gadgets</Link>
        </div>
    )
}