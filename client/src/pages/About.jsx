import React from "react";
import { Link } from "react-router-dom";
import bgImg from "../assets/about_page_bg.webp"
import CTABanner from "../components/CTABanner";

export default function About() {

    const missionText = "What's better than homemade ice cream, on \
    a hot summer day with friends and family gathered around? Nothing!\
    But what's more annoying than having to use up valuable kitchen space\
    to store that ice cream maker on the other 364 days of the year? Nothing!\
    At VaKitchen, we know that sometimes you only want a kitchen tool for a week or two,\
    for special events, or to test out a recipe you've been meaning to try. Think of it like a\
    vacation: sure we'd love to live in Hawaii or Paris full-time, but it's probably smarter to\
    scratch that itch one week out of the year. Sure, you could buy an expensive pizza oven, but\
    maybe it'd be smarter just to take a VaKitchen..."


    return (
        <div className='about-page-container'>
            {/* <img src={bgImg} className='about-hero-image'/> */}
            <CTABanner child={
                <Link className='CTA' to="plans">Get cookin' for as little as $10 a month</Link>
            }/>
            <div className='about-page-content'>
                <h1>Our Mission</h1>
                <p>{missionText}</p>
            </div>
            <div className='about-page-cta'>
                <h2>Your Destination Awaits!</h2>
                <Link className = 'link-button' to='/items'>Check out our appliances</Link>
            </div>
        </div>
    )
}