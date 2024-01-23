import React, {useContext} from "react";
import { Outlet, redirect } from "react-router-dom";
import Cookies from 'universal-cookie'
import {jwtDecode} from 'jwt-decode'
import UserDashboard from "./UserDashboard";
import UserContext from '../../userContext'

export default function UserLayout() {
    return (
        <>
            <UserDashboard />
            <Outlet/>
        </>
    )
}

export async function loader() {
    const cookie = new Cookies()
    const token = cookie.get('jwt_authorization')
    console.log(token)
    const res = await fetch('/checkuser', {
        headers: {'accept':'application/json', 'Authorization': `Bearer ${token}`}
    })

    const user = await res.json()
    console.log(user.id)
    if (!user.id) {
        throw redirect('/login')
    }
    return null
}