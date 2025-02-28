import React from "react";
import profileImg from "/profile.png";
import { HiInbox, HiOutlineDotsHorizontal, HiThumbUp } from "react-icons/hi";
import { IoThumbsUp } from "react-icons/io5";
import postImg from "/post.png";

const Post = ({ img }) => {
    return (
        <div className="w-full h-auto justify-start bg-[#0b0b0b] border border-neutral-900 lg:rounded-lg pt-4">
            <div className="flex flex-grow gap-4 min-w-full">
                <div className="ml-4 cursor-pointer hover:opacity-70">
                    <img
                        src={profileImg}
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

            <div className="flex flex-col px-4 mt-4">
                <h1 className="text-white text-lg">
                    I must say... I really like making this website! Can anyone
                    rate my new wallpaper!!
                </h1>
            </div>

            {img === true ? (
                <div>
                    <img src={postImg} className="mt-4 w-full object-contain" alt="" />
                </div>
            ) : (
                <div></div>
            )}

            <div className={`max-w-full border border-neutral-800 ${img ? "mt-0" : "mt-4"}`}></div>

            <div className="flex">
                <button className="text-white text-xl flex items-center h-10 gap-2 hover:bg-neutral-900 w-full justify-center cursor-pointer">
                    <HiThumbUp />
                    Like
                </button>

                <button className="text-white text-xl flex items-center h-10 gap-2 hover:bg-neutral-900 w-full justify-center cursor-pointer">
                    <HiInbox />
                    Comment
                </button>
            </div>
        </div>
    );
};

export default Post;
