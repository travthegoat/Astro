import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAddCircleOutline, IoArchiveOutline, IoCloseCircle, IoHome, IoPerson } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';

const MobileNavbar = () => {
    const [toggle, setToggle] = useState(false); // to handle navbar toggle

    return (
        <div className="lg:hidden w-full bg-[#0b0b0b] h-18 border border-neutral-800 flex items-center px-6 justify-between">
            <h1 className="text-white text-4xl font-extrabold">ASTRO</h1>

            <GiHamburgerMenu
                className="text-white text-4xl"
                onClick={() => setToggle(!toggle)}
            />

            <div className={`absolute top-0 right-0 ${toggle ? "translate-x-0" : "translate-x-[400px]"} w-[80%] h-screen z-10 bg-neutral-900 pt-4 px-4 duration-300`}>
                <IoCloseCircle className="text-white text-4xl" onClick={() => setToggle(!toggle)}/>

                <div className="flex flex-col mt-10">
                    <NavLink
                        to={"/main/feed"}
                        className={({ isActive }) => {
                            return `flex items-center gap-3 hover:bg-neutral-900 duration-300 h-12 pl-2 mr-7 rounded-md ${
                                isActive === true
                                    ? "bg-neutral-900 text-white"
                                    : "text-neutral-500"
                            }`;
                        }}
                    >
                        <IoHome className="text-2xl" />
                        <h2 className="text-xl font-semibold">Home</h2>
                    </NavLink>

                    <NavLink
                        to={"/main/add-post"}
                        state={{ func: "insert" }}
                        className={({ isActive }) => {
                            return `flex items-center gap-3 hover:bg-neutral-900 duration-300 h-12 pl-2 mr-7 rounded-md ${
                                isActive === true
                                    ? "bg-neutral-900 text-white"
                                    : "text-neutral-500"
                            }`;
                        }}
                    >
                        <IoAddCircleOutline className="text-2xl active" />
                        <h2 className="text-xl font-semibold active">
                            Add Post
                        </h2>
                    </NavLink>

                    <NavLink
                        to={`/main/profile/${Cookies.get("uid")}`}
                        className={({ isActive }) => {
                            return `flex items-center gap-3 hover:bg-neutral-900 duration-300 h-12 pl-2 mr-7 rounded-md ${
                                isActive === true
                                    ? "bg-neutral-900 text-white"
                                    : "text-neutral-500"
                            }`;
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
                            return `flex items-center gap-3 hover:bg-neutral-900 duration-300 h-12 pl-2 mr-7 rounded-md ${
                                isActive === true
                                    ? "bg-neutral-900 text-white"
                                    : "text-neutral-500"
                            }`;
                        }}
                    >
                        <IoArchiveOutline className="text-2xl text-neutral-500 active" />
                        <h2 className="text-xl text-neutral-500 font-semibold active">
                            Saved
                        </h2>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default MobileNavbar;
