import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthLayout = () => {
    const navigate = useNavigate(); // to navigate

    useEffect(() => {
        if (Cookies.get("uid")) {
            navigate("/main");
        }
    }, []);

    return (
        <div className="w-full h-screen bg-[url(/auth-bg.jpg)] bg-cover bg-no-repeat flex">
            <div className="hidden lg:block lg:w-[60%] 2xl:w-[70%]"></div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
