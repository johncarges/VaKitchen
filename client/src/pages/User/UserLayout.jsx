import React from "react";
import { Outlet, redirect } from "react-router-dom";
import UserDashboard from "./UserDashboard";

export default function UserLayout() {
    return (
        <>
            <UserDashboard />
            <Outlet/>
        </>
    )
}

export async function loader() {
    const isLoggedIn = true

    if (!isLoggedIn) {
        throw redirect('/login')
    }
    return null
}