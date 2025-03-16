import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InitialPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/main");
        }, 2000);
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <button className="cursor-pointer text-white hover:text-neutral-700 duration-300">
                <i className="text-[70px] font-extrabold">ASTRO</i>
            </button>
        </div>
    );
};

export default InitialPage;
