import React from "react";
import { useParams } from "react-router-dom";

export default function ItemDetail() {

    const itemId = useParams().id
    console.log(itemId)

    return (
        <h1>Item {itemId}</h1>
    )

}