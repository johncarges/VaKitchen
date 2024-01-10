import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgImg from "../../assets/about_page_bg.webp"

import PlanTile from "../../components/PlanTile";

export default function Plans() {
    
    const [plans, setPlans] = useState([])

    const user = false

    useEffect(()=>{
        fetch('/plans')
            .then(r=>r.json())
            .then(setPlans)
            // .then(data => setplans(data.plans))
    },[])
    
    const renderedplans = plans.map(plan => (
        <PlanTile plan={plan} key={plan.id}/>
        
    ))

    const loggedInBanner = <h1>Tools for Every Dish</h1>
    
    return (
        <div>
            <img src={bgImg} className='about-hero-image'/>
            <div className='plans-list-page page'>
                {<h1>See plans</h1>}
                
                <div className='plans-list-content'>
                    
                    <div className='plans-list'>
                        {renderedplans}
                    </div>
                    
                </div>
            </div>

        </div>
    )
}