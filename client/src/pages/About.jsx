import React from "react";
import { Link } from "react-router-dom";
import bgImg from "../assets/about_page_bg.webp"

export default function About() {
    return (
        <div className='about-page-container'>
            <img src={bgImg} className='about-hero-image'/>
            <div className='about-page-content'>
                <h1>Our Mission</h1>
                <p>Our mission is to yada yada yada</p>
            </div>
            <div className='about-page-cta'>
                <h2>Start cookin!</h2>
                <Link className = 'link-button' to='/appliances'>Check out our appliances</Link>
            </div>
        </div>
    )
}