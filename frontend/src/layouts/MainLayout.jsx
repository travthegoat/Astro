import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import RightInfo from "../components/RightInfo";
import Cookies from 'js-cookie';

const MainLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('username') === undefined) {
            navigate('/auth/login');
        }
    }, []);

    return (
        <div className="container mx-auto flex h-screen overflow-hidden">
            <Navbar />
            <section className="w-full lg:w-[50%] 2xl:w-[60%] overflow-y-auto scrollbar-none">
                <Outlet />
            </section>
            <RightInfo />
        </div>
    )
}

export default MainLayout;