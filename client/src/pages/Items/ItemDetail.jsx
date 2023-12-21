import React from "react";
import { Link, useParams } from "react-router-dom";

export default function ItemDetail() {

    const itemId = useParams().id
    console.log(itemId)

    return (
        <div>
            <h1>Item {itemId}</h1>
            <Link to='..'
                relative="path"
                className='back-button'
            >&larr; <span>Back to results</span></Link>       
        </div>
    )

}