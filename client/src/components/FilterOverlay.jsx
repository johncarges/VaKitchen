import React, { useState } from 'react'

export default function FilterOverlay(props) {

    const {filters, setFilters, showFilters, setShowFilters, tags, user_id} = props

    const [expanded, setExpanded] = useState(null)

    const filterDisplay = showFilters ? 'block' : 'none'

    const expandMenu = (menu) => {
        if (expanded === menu) {
            setExpanded(null)
        } else {
            setExpanded(menu)
        }
    }


    const toggleSaved = () => {
        const savedStatus = filters.saved
        setFilters(f => {
            return {...f, saved: !savedStatus}
        })
        
    }

    const toggleFilter = (filterType, thisFilter) => {
        const typeFilters = filters[filterType]
        if (typeFilters.includes(thisFilter)) {
            setFilters(f=> {
                return {...f, [filterType]: typeFilters.filter((item)=>{
                    return item!==thisFilter})} 
            })
        } else {
            setFilters(f=> {
                return {...f, [filterType]: [...typeFilters, thisFilter]}
            })
        }
        
    }

    const changeSortType =(newType) => {
        setFilters(f => {
            return {...f, sortType: newType}
        })
    }
    
    

    

    const menuArrowStyle = (menuName) => ( expanded === menuName ) && 'rotate(90deg)' 

    return (
        <div className='filter-overlay' style={{display: filterDisplay}}>
            <div className='filter-container'>
                <i className="fa-regular fa-circle-xmark" onClick={()=>setShowFilters(false)}></i>
                <div>
                    <h1>Filter</h1>
                    <ul className='filter-list'>
                        <li style={{display: user_id ? 'default' : 'none'}} onClick={toggleSaved}>
                            <h3><i className={filters.saved ? "fa-solid fa-circle fa-fw": "fa-regular fa-circle"}></i> Saved</h3></li>
                        <li>
                            <h3 onClick={()=>expandMenu('meal')}><i style={{transform: menuArrowStyle('meal')}} className="fa-solid fa-angle-right fa-fw"></i> Meal</h3>
                            <ul style={{display: expanded==='meal' ? 'block' : 'none'}}>
                                {tags.Meal.map((mealType)=> {
                                    return (<li onClick={()=>toggleFilter('meal',mealType)}>
                                                <i className={filters.meal.includes(mealType) ? "fa-solid fa-circle fa-fw": "fa-regular fa-circle"}></i> {mealType}
                                            </li>)
                                })}
                            </ul>
                        </li>
                        <li>
                        <h3 onClick={()=>expandMenu('preparation')}><i style={{transform: menuArrowStyle('preparation')}} className="fa-solid fa-angle-right fa-fw"></i> Preparation  </h3>
                            <ul style={{display: expanded==='preparation' ? 'block' : 'none'}}>
                                {tags.Preparation.map((preparationType)=> {
                                    return (<li onClick={()=>toggleFilter('preparation',preparationType)}>
                                                <i className={filters.preparation.includes(preparationType) ? "fa-solid fa-circle fa-fw": "fa-regular fa-circle"}></i> {preparationType}
                                            </li>)
                                })}
                            </ul>
                        </li>
                    </ul>    
                </div>
                <hr></hr>
                <div>
                    <h1>Sort</h1>
                    <ul className='filter-list'>
                        <li onClick={()=>changeSortType('popular')}>
                            <h3><i className={filters.sortType==='popular' ? "fa-solid fa-circle fa-fw": "fa-regular fa-circle"}></i> Most Popular</h3>
                        </li>
                        <li onClick={()=>changeSortType('recently-added')}>
                            <h3><i className={filters.sortType==='recently-added' ? "fa-solid fa-circle fa-fw": "fa-regular fa-circle"}></i> Recently Added</h3>
                        </li>
                        <li onClick={()=>changeSortType('points')}>
                            <h3><i className={filters.sortType==='points' ? "fa-solid fa-circle fa-fw": "fa-regular fa-circle"}></i> Points</h3>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )

}



function FilterSubMenu(props) {



}