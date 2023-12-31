import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className='not-found-container'>
            <h1>Error, page not found</h1>
            <Link to='/' className='link-button'>Return to home page</Link>
        </div>
    )
}