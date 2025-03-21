import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    IoExit,
    IoHome,
    IoLogOut,
    IoNotifications,
    IoPerson,
    IoSearch,
    IoSettings,
    IoAdd,
    IoAddCircleOutline,
    IoSaveOutline,
    IoArchiveOutline
} from "react-icons/io5";
import Cookies from 'js-cookie';

const Navbar = () => {
    const navigate = useNavigate(); // to navigate 

    return (
        <div className="hidden lg:flex lg:flex-col lg:flex-grow w-[25%] 2xl:w-[20%] h-screen pt-8 pl-10 border-r-1 border-neutral-800">
            {/** Title */}
            <h1 className="text-5xl font-extrabold text-white ml-2">
                <i>ASTRO</i>
            </h1>

            <div className="flex flex-col mt-14 gap-3">
                <NavLink
                    to={"/main/feed"}
                    className={({ isActive }) => {
                        return `flex items-center gap-3 hover:bg-neutral-900 duration-300 h-12 pl-2 mr-7 rounded-md ${isActive === true ? "bg-neutral-900 text-white" : "text-neutral-500"}`
                    }}
                >
                    <IoHome className="text-2xl" />
                    <h2 className="text-xl font-semibold">
                        Home
                    </h2>
                </NavLink>

                <NavLink
                    to={"/main/add-post"}
                    state={{ func: 'insert' }}
                    className={({ isActive }) => {
                        return `flex items-center gap-3 hover:bg-neutral-900 duration-300 h-12 pl-2 mr-7 rounded-md ${isActive === true ? "bg-neutral-900 text-white" : "text-neutral-500"}`
                    }}
                >
                    <IoAddCircleOutline className="text-2xl active" />
                    <h2 className="text-xl font-semibold active">
                        Add Post
                    </h2>
                </NavLink>

                <NavLink
                    to={`/main/profile/${Cookies.get('uid')}`}
                    className={({ isActive }) => {
                        return `flex items-center gap-3 hover:bg-neutral-900 duration-300 h-12 pl-2 mr-7 rounded-md ${isActive === true ? "bg-neutral-900 text-white" : "text-neutral-500"}`
                    }}
                >
                    <IoPerson className="text-2xl text-neutral-500 active" />
                    <h2 className="text-xl text-neutral-500 font-semibold active">
                        Profile
                    </h2>
                </NavLink>

                <NavLink
                    to={"/main/saved"}
                    className={({ isActive }) => {
                        return `flex items-center gap-3 hover:bg-neutral-900 duration-300 h-12 pl-2 mr-7 rounded-md ${isActive === true ? "bg-neutral-900 text-white" : "text-neutral-500"}`
                    }}
                >
                    <IoArchiveOutline className="text-2xl text-neutral-500 active" />
                    <h2 className="text-xl text-neutral-500 font-semibold active">
                        Saved
                    </h2>
                </NavLink>
            </div>

            <div className="mt-auto mb-12">
                <NavLink
                    className="flex items-center gap-3 hover:bg-neutral-900 duration-300 h-12 pl-2 mr-7 rounded-md"
                    onClick={() => {
                        Cookies.remove('uid');
                        navigate('/auth/login');
                    }}
                >
                    <IoLogOut className="text-2xl text-red-500" />
                    <h2 className="text-xl text-red-500 font-semibold">
                        Logout
                    </h2>
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;
