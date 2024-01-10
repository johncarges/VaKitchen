import React from 'react'

export default function SaveButton(props) {

    const {itemId, saved} = props

    const onSave = () => {
        console.log({"item_id":itemId,"user_id":1})
        fetch('/saved_items', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"item_id":itemId, "user_id":1})
        })
            .then(r=>r.json())
            .then(console.log)
    }

    const onRemoveSave = () => {
        fetch('/saved_items', {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"item_id":itemId, "user_id": 1})
        })
            .then(r=>r.json())
            .then(console.log)
    }
    


    return (saved 
        ? <i className="fa-solid fa-heart" onClick={onRemoveSave}></i>
        : <i className="fa-regular fa-heart" onClick={onSave}></i>
    )
}


