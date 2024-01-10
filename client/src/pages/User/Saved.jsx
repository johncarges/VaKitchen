import React, { useEffect, useState } from "react";
import ItemTile from '../../components/ItemTile'

export default function Saved(){
    
    const [savedItems, setSavedItems] = useState([])

    useEffect(()=> {
        fetch('/saved_items')
            .then(r=>r.json())
            .then(setSavedItems)
    },[])
    
    const renderedItems = savedItems.map(item => {
        return (
            <ItemTile item={item} key={item.id}/>
        )
    })


    return (
        <div className='saved-items-page page'>
            <div className='saved-items-container'>
                <h1>Saved items here</h1>
                {renderedItems}
            </div>

        </div>
    )
}