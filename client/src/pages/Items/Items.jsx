import React, { useState, useContext, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";

import ItemTile from "../../components/ItemTile";
import CTABanner from "../../components/CTABanner";
import FilterOverlay from "../../components/FilterOverlay";
import { checkSession } from "../../auth";

const PAGE_LIMIT = 10

export default function Items() {

    
    const data = useLoaderData()
    const [items, setItems] = useState(data.items)
    const tags = data.tags
    const user_id = data.user_id

    const initialFilters = {
        meal: [],
        preparation: [],
        saved: false,
        sortType: 'recently-added'
    }

    const [filters, setFilters] = useState(initialFilters)
    const [showFilters, setShowFilters] = useState(false)


    function queryFromFilters() {
        const queryArray = [`/items/?sort_type=${filters.sortType}`]
        if (filters.saved && user_id) {
            queryArray.push(`saved=true&user_id=${user_id}`)
        }
        filters.meal.forEach(meal => {
            queryArray.push(`meal=${meal}`)
        })
        filters.preparation.forEach(prep => [
            queryArray.push(`preparation=${prep}`)
        ])

        return queryArray.join('&')
    }

    useEffect(()=> {

        if (showFilters) {
            fetch(queryFromFilters())
            .then(r=>r.json())
            .then(setItems)
        }

    },[filters])

    const toggleFilters = ()=> setShowFilters(state=>{
        return !state
    })

    const toggleSave = (item_id, isSaved) => {
        
        if (!user_id) return null
        const item = items.filter(item=>item.id===item_id)[0]
        const method = isSaved ? 'DELETE' : 'POST'
        fetch('/saved_items', {
            method: method,
            headers: {'content-type':'application/json'},
            body: JSON.stringify({item_id:item_id, user_id:user_id})
        }).then(r=>{
            if (r.ok) {
                setItems(itemArray => {
                    return itemArray.map(item => {
                        if (item.id === item_id) {
                            item.saved = !isSaved
                        } 
                        return item
                    })
                })
            }
        })
    }
    


    const renderedItems = items.map(item => (
        <ItemTile item={item} 
            key={item.id}
            isLoggedIn={!!user_id} // check if user_id is not null
            toggleSave={toggleSave}
        />
        
    ))


    return (
        <div>
            <CTABanner child={
                <Link className='CTA' to="/plans">Get cookin' for as little as $10 a month</Link>
            }/>
            <div className='items-list-container'>
                <FilterOverlay
                    filters={filters}
                    setFilters={setFilters}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    tags={tags}
                    user_id={user_id}
                />
                <div className='show-filters'>
                    <button onClick={toggleFilters}>Filters</button>
                </div>
                <div className='items-list'>
                    {renderedItems}
                </div>
            </div>

        </div>
    )
}

export async function loader () {

    const userRes = await checkSession()
    
    const baseUrl = `/items/?limit=${PAGE_LIMIT}`
    const itemUrl = baseUrl + (userRes ? `&user_id=${userRes}` :'')
    const itemRes = await fetch(itemUrl)
    if (!itemRes.ok) {
        throw {
            message: "Failed to fetch Items"
        }
    }
    const itemData = await itemRes.json()
    
    const tags = await fetch('/tags')
    if (!tags.ok) {
        throw {
            message: "Failed to fetch Tags"
        }
    }

    const tagsData = await tags.json()

    return {
        user_id: userRes,
        items: itemData,
        tags: tagsData
    }
}

