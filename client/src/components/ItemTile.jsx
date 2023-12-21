import React from "react";
import { Link } from "react-router-dom";

export default function ItemTile(props) {
    
    const {item} = props

    return (
        <Link to={`/items/${item.id}`} key={item.id} className='items-tile'>
            <img src={item.imageUrl} alt={item.name}/>
            <div className='item-info'>
                <h3>{item.name}</h3>
                <p>{item.price} <span>pts</span></p>
            </div>
        </Link> 
    )

}