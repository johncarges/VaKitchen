import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import ItemTile from "../../components/ItemTile";
import CTABanner from "../../components/CTABanner";

export default function Items() {
    
    const data = useLoaderData()
    const items = data.items
    const [savedItemIds, setSavedItemIds] = useState(data.savedItemIds)
    
    const addSave = (new_id) => {
        setSavedItemIds([...savedItemIds, new_id])
    }
    const deleteSave = (id_to_remove) => {
        setSavedItemIds(savedItemIds.filter(id => {
            return id !== id_to_remove}
        ))
    }

    const renderedItems = items.map(item => (
        <ItemTile item={item} 
            key={item.id}
            saved={savedItemIds.includes(item.id)} 
            addSave={addSave} 
            deleteSave={deleteSave}
        />
        
    ))

    // console.log(savedItemIds)
    // console.log(items.filter(item => savedItemIds.includes(item.id)))

    return (
        <div>
            <CTABanner child={
                <Link className='CTA' to="/plans">Get cookin' for as little as $10 a month</Link>
            }/>
            <div className='items-list-container'>
                
                <div className='items-list'>
                    {renderedItems}
                </div>
            </div>

        </div>
    )
}

export async function loader () {

    const itemRes = await fetch('/items')
    if (!itemRes.ok) {
        throw {
            message: "Failed to fetch Items"
        }
    }
    const itemData = await itemRes.json()
    
    const savedRes = await fetch('/saved_item_ids')
    if (!savedRes.ok) {
        throw {
            message: "Failed to fetch Saved Items"
        }
    }
    const savedData = await savedRes.json()
    
    return {
        items: itemData,
        savedItemIds: savedData
    }
}

