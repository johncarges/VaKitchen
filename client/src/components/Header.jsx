import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header(){

    const  activeStyles = {
        fontWeight: "bold",
        textDecoration: 'underline',
        color: '#ccc'
    }

    const style = (obj) => obj.isActive ? activeStyles : null

    return (
        <header>
            <Link className='site-logo' to='/'>VaKitchen</Link>
            <nav>
                <NavLink style={style} to='/about'>About</NavLink>
                <NavLink style={style} to='/items'>Items</NavLink>
                <NavLink style={style} to='/account'><i className='fa-solid fa-user'></i></NavLink>
            </nav>
        </header>
    )
}