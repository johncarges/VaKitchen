import React, { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import SaveButton from "../../components/SaveButton";
import { checkSession } from "../../auth";

export default function ItemDetail() {

    const {userId, itemData} = useLoaderData()
    const [saved, setSaved] = useState(itemData.saved)

    const toggleSave = () => {
        if (!userId) return null

        const method = saved ? 'DELETE' : 'POST'
        fetch('/saved_items', {
            method: method,
            headers: {'content-type':'application/json'},
            body: JSON.stringify({item_id:itemData.id, user_id:userId})
        }).then(r=>{
            if (r.ok) {
                setSaved(prev => !prev)
            }
        })
    }

    return (
        <div className='page item-detail-page'>
            <div className='item-detail-page-header'>
                <Link to='..'
                    relative="path"
                    className='back-button'
                    >&larr; <span>Back to results</span></Link>       
                
            </div>
            <div className='item-detail-main'>
                <div className='item-detail-image-container'>
                    <img src={itemData.image_url} alt={itemData.name}/>
                </div>
                <div className='item-detail-info'>
                    <h1>{itemData.name}</h1>
                    <p>{itemData.description}</p>
                    <div className='item-save-buttons'>
                        {
                            saved 
                            ? <button onClick={toggleSave}>
                                <i className="fa-solid fa-heart"></i> Saved
                            </button>
                            : <button onClick={toggleSave}>
                                <i className='fa-regular fa-heart'></i> Save
                            </button>
                        }
                        
                        <button>
                            <i className="fa-solid fa-plus"></i> Add to Queue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}




export async function loader({params}) {
    
    let url = `/items/${params.id}`
    const userRes = await checkSession()
    
    if (userRes) {
        url += '?user_id=' + userRes
    }
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch item details",
            statusText: res.statusText,
            status: res.status
        }
    }
    const itemData = await res.json()
    const data = {userId:userRes, itemData: itemData}

    return data

}