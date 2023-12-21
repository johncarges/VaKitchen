import React from "react";


export default function OrderTile(props) {

    const {order} = props

    const heading = order.type === 'current' ? 'Current Order' : 'Next Order'
    const item = order.item

    return (
        <div className='order-container'>
            <h4>{heading}</h4>
            <hr style={{width: '95%', color: "#999"}}></hr>
            <div className='order-details-container'>
                <img className='order-details-image' src={item.imageUrl} alt={item.name}/>
                <div className='order-details-information'>
                    <p>{order.status}</p>
                </div>
            </div>
        </div>
    )

}