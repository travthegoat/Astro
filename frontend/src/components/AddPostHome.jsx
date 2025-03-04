import React from "react";
import profileImg from "/profile.png";
import { useNavigate } from "react-router-dom";

const AddPostHome = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-24 bg-[#0b0b0b] border border-neutral-900 lg:rounded-lg flex items-center px-8 gap-5">
            <button className="cursor-pointer hover:opacity-70">
                <img
                    src={profileImg}
                    alt=""
                    className="object-contain w-12 rounded-full"
                />
            </button>

            <button onClick={() => {
                navigate('/main/add-post');
            }} className="rounded-full bg-neutral-900 text-neutral-500 h-12 w-full px-2 lg:px-4 text-lg xl:text-xl text-start pb-1 hover:bg-neutral-800 cursor-pointer duration-75">
                What's on your mind, Khant?
            </button>
        </div>
    );
};
``
export default AddPostHome;
