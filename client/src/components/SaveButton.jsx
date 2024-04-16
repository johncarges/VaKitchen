import React from 'react'

export default function SaveButton(props) {

    const {itemId, saved, toggleSave} = props

    const className = saved ? "fa-solid fa-heart" : "fa-regular fa-heart"

    const onClick = (e) => {
        e.preventDefault()
        toggleSave(itemId, saved)
    }
    

    return <i className={className} onClick={onClick}></i>
}


