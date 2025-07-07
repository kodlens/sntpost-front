import React from "react";
import {  } from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from "../components/Header/MainHeader";
import MainFooter from "../components/Footer/MainFooter";

const MainLayout = ({ children }: { children?: React.ReactNode }) => {

    return (
        <div className="bg-white">
            {/* <header is the categories and tophat /> */}
            <MainHeader />
            {/* <Navbar /> */}
            <main>
                { children && children }
                <Outlet />
            </main>
            
            <MainFooter />
            
        </div>
    )
}

export default MainLayout;