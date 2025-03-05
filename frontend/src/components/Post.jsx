import React, { useEffect, useState } from "react";
import profileImg from "/profile.png";
import { HiInbox, HiOutlineDotsHorizontal, HiThumbUp } from "react-icons/hi";
import { IoThumbsUp } from "react-icons/io5";
import postImg from "/post.png";
import { fetchData } from "../../api";
import { useNavigate } from "react-router-dom";

const Post = ({ postData, notHome }) => {
    const [userData, setUserData] = useState({}); // to store user data
    const [loading, setLoading] = useState(false); // to handle loading
    const navigate = useNavigate(); // to navigate

    useEffect(() => {
        if(!postData.user_id) return;
        const getUserData = async () => {
            setLoading(true);
            try {
                const result = await fetchData(`/users/${postData.user_id}`);
                setUserData(result[0]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getUserData();
    }, [postData?.user_id]);

    return (
        <div className="w-full h-auto justify-start bg-[#0b0b0b] border border-neutral-900 lg:rounded-lg pt-4">
            <div className="flex flex-grow gap-4 min-w-full">
                <div className="ml-4 cursor-pointer hover:opacity-70">
                    <img
                        src={`http://localhost:3000${userData?.profile_picture}`}
                        alt=""
                        className="object-contain w-12 rounded-full"
                    />
                </div>

                <div className="flex flex-col">
                    <h1 className="text-white text-lg font-semibold cursor-pointer">
                        {userData?.display_name}
                    </h1>
                    <h2 className="text-neutral-500 text-sm">
                        Yesterday at 2:30
                    </h2>
                </div>

                <button className="ml-auto mr-4 mb-5 hover:opacity-70 cursor-pointer">
                    <HiOutlineDotsHorizontal className="text-white text-2xl" />
                </button>
            </div>

            <div className="cursor-pointer" onClick={() => navigate(`/main/posts/${postData.post_id}`)}>
                <div className="flex flex-col px-4 mt-4">
                    <h1 className="text-white text-lg">{postData?.caption}</h1>
                </div>

                {postData?.image ? (
                    <div>
                        <img
                            src={`http://localhost:3000${postData?.image}`}
                            className={`mt-4 w-full ${notHome ? 'object-contain' : 'object-cover h-120'}`}
                            alt=""
                        />
                    </div>
                ) : (
                    <div></div>
                )}
            </div>


            <div
                className={`max-w-full border border-neutral-800 ${
                    postData?.img ? "mt-0" : "mt-4"
                }`}
            ></div>

            <div className="flex">
                <button className="text-white text-xl flex items-center h-10 gap-2 hover:bg-neutral-900 w-full justify-center cursor-pointer">
                    {postData?.likes_count !== 0 && postData?.likes_count}
                    {/* {postData?.likes_count} */}
                    <HiThumbUp />
                    Like
                </button>

                <button className="text-white text-xl flex items-center h-10 gap-2 hover:bg-neutral-900 w-full justify-center cursor-pointer">
                    {postData?.comments_count !== 0 && postData?.comments_count}
                    {/* {postData?.comments_count} */}
                    <HiInbox />
                    Comment
                </button>
            </div>
        </div>
    );
};

export default Post;
