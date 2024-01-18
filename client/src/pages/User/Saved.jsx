import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import ItemTile from '../../components/ItemTile'


export default function Saved(){
    const savedItems = useLoaderData().items

    
    const renderedItems = savedItems.map(item => {
        return (
            <ItemTile item={item} key={item.id}/>
        )
    })


    return (
        <div className='saved-items-page page'>
            <div className='saved-items-list-container'>
                <div className='saved-items-list'>
                    {renderedItems}
                </div>

            </div>

        </div>
    )
}

export async function savedLoader () {
    const itemRes = await fetch('/saved_items')
    if (!itemRes.ok) {
        throw {
            message: "Failed to fetch Saved Items"
        }
    }
    const itemData = await itemRes.json()

    return {items: itemData}

}