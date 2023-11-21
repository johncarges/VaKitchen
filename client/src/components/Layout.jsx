import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {

    return (
        <div className='site-wrapper'>
            <Header />
            <Outlet />
            <footer>&#169; 2023 VaKitchen</footer>
        </div>
    )
}