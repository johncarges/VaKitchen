import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import bgImg from '../assets/about_page_bg.webp'

export default function CTABanner(props){


    return (
        <div className='CTA-banner'>
            <img src={bgImg} className='about-hero-image'/>
            {props.child}
            {/* <h1>Get cookin' for as little as $10 a month</h1>
            <Link to="plans"></Link> */}
        </div>
    )
}