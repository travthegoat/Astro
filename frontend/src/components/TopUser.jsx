import React, { useEffect, useState } from "react";
import profileImg from "/profile.png";
import { useNavigate } from "react-router-dom";

const TopUser = ({ userData }) => {
    const navigate = useNavigate(); // to navigate

    return (
        <div className="flex items-start gap-5 cursor-pointer" onClick={() => navigate(`/main/profile/${userData?.user_id}`)}>
            <div className="hover:opacity-70">
                <img
                    src={`https://astro-1fdt.onrender.com${userData?.profile_picture}`}
                    alt=""
                    className="object-cover h-9 w-9 mt-1 rounded-full"
                />
            </div>

            <div className="flex flex-col justify-center">
                <h1 className="text-white text-md font-semibold">
                    {userData?.display_name}
                </h1>
                <h2 className="text-neutral-400 text-sm font-semibold">
                    @{userData?.username}
                </h2>
            </div>
        </div>
    );
};

export default TopUser;
