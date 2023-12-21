import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemTile from "../../components/ItemTile";

export default function Items() {
    
    const [items, setItems] = useState([])

    useEffect(()=>{
        fetch('/api/items')
            .then(r=>r.json())
            .then(data => setItems(data.items))
    },[])
    
    const renderedItems = items.map(item => (
        <ItemTile item={item} />
        // <Link to={`/items/${item.id}`} key={item.id} className='items-tile'>
        //     <img src={item.imageUrl} alt={item.name}/>
        //     <div className='item-info'>
        //         <h3>{item.name}</h3>
        //         <p>{item.price} <span>pts</span></p>
        //     </div>
        // </Link>  
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