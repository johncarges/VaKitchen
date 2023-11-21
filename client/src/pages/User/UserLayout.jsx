import React from "react";
import { Outlet } from "react-router-dom";
import UserDashboard from "./UserDashboard";

export default function UserLayout() {
    return (
        <>
            <UserDashboard />
            <Outlet/>
        </>
    )
}