import React, { useState, useEffect } from "react";

export default function Items() {
    
    const [items, setItems] = useState([])

    useEffect(()=>{
        fetch('/api/items')
            .then(r=>r.json())
            .then(data => setItems(data.items))
    },[])
    
    const renderedItems = items.map(item => (
        <div key={item.id} className='items-tile'>
            <img src={item.imageUrl} alt={item.name}/>
            <p>{item.name} : {item.price}</p>
        </div>  
    ))
    
    return (
        <div className='items-list-container'>

            <h1>Items go here</h1>
           <div className='items-list'>
            {renderedItems}
           </div>
        </div>
    )
}