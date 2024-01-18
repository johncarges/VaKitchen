import React from 'react'

export default function SaveButton(props) {

    const {itemId, saved, addSave, deleteSave} = props

    const onSave = (event) => {
        event.preventDefault()
        fetch('/saved_items', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"item_id":itemId, "user_id":1})
        })
            .then(r=> {
                if (r.ok){
                    addSave(itemId)
            }})
            
    }

    const onRemoveSave = (event) => {
        event.preventDefault()
        fetch('/saved_items', {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"item_id":itemId, "user_id": 1})
        })
            .then(r =>{
                if (r.ok) deleteSave(itemId)
            })
    }
    


    return (saved 
        ? <i className="fa-solid fa-heart" onClick={onRemoveSave}></i>
        : <i className="fa-regular fa-heart" onClick={onSave}></i>
    )
}


