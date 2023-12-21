import React, { useEffect, useState } from "react";
import OrderTile from '../../components/OrderTile'

export default function Orders() {


    const initialState = {
        type: '',
        status:'',
        item: {name:'', price:0, description:'', imageUrl:''}
    }
    const [currentOrder, setCurrentOrder] = useState(initialState)
    const [nextOrder, setNextOrder] = useState(initialState)

    useEffect(()=>{
        fetch('/api/items/1')
            .then(r=>r.json())
            .then(data => setCurrentOrder({
                type: 'current',
                status: 'due 12/3',
                item:data.items
            }))
        fetch('/api/items/2')
            .then(r=>r.json())
            .then(data => setNextOrder({
                type: 'next',
                status: 'ready to ship',
                item:data.items
            }))

    },[])
    // CURRENTLY JUST FETCHES FIRST ITEM AS CURRENT, SECOND AS QUEUED

    return (
        <div>
            <OrderTile order={currentOrder} />
            <div className='order-container'>
                <h4>Current Order</h4>
                <hr style={{width: '95%', color: "#999"}}></hr>
                <div className='order-details-container'>
                    <img className='order-details-image' src={currentOrder.item.imageUrl} alt={currentOrder.item.name}/>
                    <div className='order-details-information'></div>
                </div>
            </div>
            <div className='order-container'>
            <h4>Next Order</h4>
                <hr style={{width: '95%', color: "#999"}}></hr>
                <div className='order-details-container'>
                    <img className='order-details-image' src={nextOrder.item.imageUrl} alt={nextOrder.item.name}/>
                    <div className='order-details-information'></div>
                </div>
            </div>
        </div>
    )

}