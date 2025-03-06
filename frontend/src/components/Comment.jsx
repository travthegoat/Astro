import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Comment = () => {
    return (
        <div className="w-full h-auto justify-start bg-[#0b0b0b] border border-neutral-900 lg:rounded-lg pt-4">
            <div className="flex flex-grow gap-4 min-w-full">
                <div className="ml-4 cursor-pointer hover:opacity-70">
                    <img
                        src={`/profile.png`}
                        alt=""
                        className="object-contain w-12 rounded-full"
                    />
                </div>

                <div className="flex flex-col">
                    <h1 className="text-white text-lg font-semibold cursor-pointer">
                        Khant Thit Oo
                    </h1>
                    <h2 className="text-neutral-500 text-sm">
                        Yesterday at 2:30
                    </h2>
                </div>

                <button className="ml-auto mr-4 mb-5 hover:opacity-70 cursor-pointer">
                    <HiOutlineDotsHorizontal className="text-white text-2xl" />
                </button>
            </div>

            <div className="mt-4 ml-4 mb-5">
                <h1 className="text-white text-lg">This is the best post i've ever seen keep working on </h1>
            </div>
        </div>
    );
};

export default Comment;
