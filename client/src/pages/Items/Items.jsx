import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemTile from "../../components/ItemTile";
import CTABanner from "../../components/CTABanner";

export default function Items() {
    
    const [items, setItems] = useState([])
    
    const [savedItemIds, setSavedItemIds] = useState([])

    const user = false

    useEffect(()=>{
        fetch('/items')
            .then(r=>r.json())
            .then(setItems)
        
        fetch('/saved_items')
            .then(r=>r.json())
            .then(setSavedItemIds)   
        
    },[])
    
    const renderedItems = items.map(item => (
        <ItemTile item={item} saved={savedItemIds.includes(item.id)}/>
        
    ))

    const loggedInBanner = <h1>Tools for Every Dish</h1>
    
    return (
        <div>
            <CTABanner child={
                <Link className='CTA' to="/plans">Get cookin' for as little as $10 a month</Link>
            }/>
            <div className='items-list-container'>
                <h1>Items go here</h1>
                
                <div className='items-list'>
                    {renderedItems}
                </div>
            </div>

        </div>
    )
}