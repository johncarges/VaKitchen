import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UserDashboard() {

    const  activeStyles = {
        fontWeight: "bold",
        textDecoration: 'underline',
        color: '#ccc'
    }

    const style = (obj) => obj.isActive ? activeStyles : null

    return (
        <header>
            <NavLink style={style} to='.' end>Orders</NavLink>
            <NavLink style={style} to='saved'>Saved</NavLink>
            <NavLink style={style} to='settings'>Settings</NavLink>
        </header>
    )
}