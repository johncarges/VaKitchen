import React from "react";
import { useLoaderData } from "react-router-dom";
import bgImg from "../../assets/about_page_bg.webp"

import PlanTile from "../../components/PlanTile";

export default function Plans() {
    
    const plans = useLoaderData()

    
    const renderedplans = plans.map(plan => (
        <PlanTile plan={plan} key={plan.id}/>
        
    ))

    
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

export async function loader() {
    const res = await fetch('/plans')
    const data = await res.json()

    return data
}