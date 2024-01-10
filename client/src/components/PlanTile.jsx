import React from "react";
import dollarConversion from "../utils/dollarConversion";
import { Link } from "react-router-dom";

export default function PlanTile(props) {

    const {plan} = props
    
    const planURL =`/signup?plan=${plan.id}`

    return (
        <div className='plan-container'>
            <h4>{plan.name}</h4>
            <div>
                <span style={{fontSize:48}}>{plan.monthly_points}</span>
                <b> points per month</b>
            </div>
            <hr style={{width: '100%', color: "#222"}}></hr>
            <div className='plan-details-container'>
                <ul>
                    <li>{plan.monthly_points} points</li>
                    <li>1 shipment</li>
                    <li>{dollarConversion(plan.monthly_cost)}</li>
                </ul>
                <div className='per-month'>
                    <h2>/month</h2>
                </div>
            </div>
            
            <Link to={planURL} className='plan-cta'>Get Started</Link>
        </div>
    )

}