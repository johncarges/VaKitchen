import React, { useEffect, useState } from "react";


export default function Orders() {


    const initialState = {name:'', price:0, description:'', imageUrl:''}

    const [currentItem, setCurrentItem] = useState(initialState)
    const [nextItem, setNextItem] = useState(initialState)

    useEffect(()=>{
        fetch('/api/items/1')
            .then(r=>r.json())
            .then(data => setCurrentItem(data.items))
        fetch('/api/items/2')
            .then(r=>r.json())
            .then(data => setNextItem(data.items))

    },[])


    return (
        <div>
            <div className='order-container'>
                <h4>Current Order</h4>
                <hr style={{width: '95%', color: "#999"}}></hr>
                <div className='order-details-container'>
                    <img className='order-details-image' src={currentItem.imageUrl} alt={currentItem.name}/>
                    <div className='order-details-information'></div>
                </div>
            </div>
            <div className='order-container'>
            <h4>Next Order</h4>
                <hr style={{width: '95%', color: "#999"}}></hr>
                <div className='order-details-container'>
                    <img className='order-details-image' src={nextItem.imageUrl} alt={nextItem.name}/>
                    <div className='order-details-information'></div>
                </div>
            </div>
        </div>
    )

}