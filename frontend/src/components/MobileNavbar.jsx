import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const MobileNavbar = () => {
    return (
        <div className="lg:hidden w-full bg-[#0b0b0b] h-18 border border-neutral-900 flex items-center px-6 justify-between">
            <h1 className="text-white text-4xl font-extrabold">ASTRO</h1>

            <GiHamburgerMenu className="text-white text-4xl" />
        </div>
    )
}

export default MobileNavbar;