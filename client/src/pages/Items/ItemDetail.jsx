import React from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import SaveButton from "../../components/SaveButton";

export default function ItemDetail() {

    const itemData = useLoaderData()
    
    console.log(Object.keys(itemData))

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
                        <button>
                            <i className="fa-regular fa-heart"></i> Save
                        </button>
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
    
    const res = await fetch(`/items/${params.id}`)
    if (!res.ok) {
        throw {
            message: "Failed to fetch item details",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data

}