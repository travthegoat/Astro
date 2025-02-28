import React from "react";
import profileImg from "/profile.png";

const TopUser = () => {
    return (
        <div className="flex items-start gap-5 cursor-pointer   ">
            <div className="hover:opacity-70">
                <img
                    src={profileImg}
                    alt=""
                    className="object-contain w-9 mt-1 rounded-full"
                />
            </div>

            <div className="flex flex-col justify-center">
                <h1 className="text-white text-md font-semibold">
                    Khant Thit Oo
                </h1>
                <h2 className="text-neutral-400 text-sm font-semibold">
                    @kaxuha
                </h2>
            </div>
        </div>
    );
};

export default TopUser;
