import React from "react";
import { Link } from "react-router-dom";
import SaveButton from "./SaveButton";

export default function ItemTile(props) {
    
    const {item, saved, addSave, deleteSave} = props

    return (
        <Link to={`/items/${item.id}`} key={item.id} className='items-tile'>
            <img src={item.image_url} alt={item.name}/>
            <div className='item-info-container'>
                <div className='item-info'>
                    <p>{item.name}</p>
                    <p>{item.price} <span>pts</span></p>
                </div>
                <div>
                    <SaveButton itemId={item.id} saved={saved} addSave={addSave} deleteSave={deleteSave}/>
                </div>
            </div>
        </Link> 
    )

}