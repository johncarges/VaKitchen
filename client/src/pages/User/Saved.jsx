import React, { useEffect, useState } from "react";
import ItemTile from '../../components/ItemTile'

export default function Saved(){
    
    const [savedItems, setSavedItems] = useState([])

    useEffect(()=> {
        fetch('/api/items/saved')
            .then(r=>r.json())
            .then(data=>setSavedItems(data.items))
    },[])
    
    const renderedItems = savedItems.map(item => {
        return (
            <ItemTile item={item} />
        )
    })


    return (
        <div className='saved-items-container'>
            <h1>Saved items here</h1>
            {renderedItems}
        </div>
    )
}