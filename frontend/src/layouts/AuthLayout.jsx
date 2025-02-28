import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="w-full h-screen bg-[url(/auth-bg.jpg)] bg-cover bg-no-repeat flex">
            <div className="hidden lg:block lg:w-[60%] 2xl:w-[70%]"></div>
            <Outlet />
        </div>
    )
}

export default AuthLayout;