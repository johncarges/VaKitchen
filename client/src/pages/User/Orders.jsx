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
        fetch('/items/49')
            .then(r=>r.json())
            .then(data => setCurrentOrder({
                type: 'current',
                status: 'due 12/3',
                item:{...data, imageUrl: data.image_url}
            }))
        fetch('/items/50')
            .then(r=>r.json())
            .then(data => setNextOrder({
                type: 'next',
                status: 'ready to ship',
                item:{...data, imageUrl: data.image_url}
            }))

    },[])
    // CURRENTLY JUST FETCHES FIRST ITEM AS CURRENT, SECOND AS QUEUED

    return (
        <div className='orders-page-container page'>
            <div>
                <OrderTile order={currentOrder} />
                <OrderTile order={nextOrder} />
            </div>
        </div>
    )

}

export async function loader() {
    
}