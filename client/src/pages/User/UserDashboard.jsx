import React, {useContext} from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import { UserContext} from '../../userContext'
import {logout as authLogout} from '../../auth'

export default function UserDashboard() {

    const  activeStyles = {
        fontWeight: "bold",
        textDecoration: 'underline',
        color: 'black'
    }

    const navigate = useNavigate()
    const style = (obj) => obj.isActive ? activeStyles : null

    const {logout} = useContext(UserContext)

    const handleLogout = async () => {
        logout()
        await authLogout()
        navigate('/')
    }

    return (
        <header className='user-dashboard'>
            <div className='user-dashboard-links'>
                <NavLink style={style} to='.' end>Orders</NavLink>
                <NavLink style={style} to='saved'>Saved</NavLink>
                <NavLink style={style} to='settings'>Settings</NavLink>
            </div>
            <button onClick={handleLogout}>Log Out</button>
        </header>
    )
}