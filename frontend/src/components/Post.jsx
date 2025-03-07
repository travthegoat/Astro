import React, { useEffect, useRef, useState } from "react";
import profileImg from "/profile.png";
import { HiInbox, HiOutlineDotsHorizontal, HiThumbUp } from "react-icons/hi";
import { IoThumbsUp } from "react-icons/io5";
import postImg from "/post.png";
import { deleteData, fetchData, postData } from "../../api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Post = ({ postInfo, notHome, onProfile, commentBtn }) => {
    const [userData, setUserData] = useState({}); // to store user data
    const [loading, setLoading] = useState(false); // to handle loading
    const [likesCount, setLikesCount] = useState(postInfo.likes_count);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate(); // to navigate

    const getUserData = async () => {
        setLoading(true);
        try {
            const result = await fetchData(`/users/${postInfo.user_id}`);
            setUserData(result[0]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLikesCount(postInfo.likes_count);
        if (!postInfo.user_id) return;
        getUserData();
    }, [postInfo?.user_id]);

    const like = async () => {
        const uid = Cookies.get("uid");

        setLoading(true);
        try {
            const result = await postData("/posts/like", {
                user_id: uid,
                post_id: postInfo.post_id,
            });
            if (result.code === "green") {
                setLikesCount((prev) => prev + 1);
            } else {
                setLikesCount((prev) => prev - 1);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-auto justify-start bg-[#0b0b0b] border border-neutral-900 lg:rounded-lg pt-4">
            <div className="flex flex-grow gap-4 min-w-full">
                <div className="ml-4 cursor-pointer hover:opacity-70">
                    <img
                        src={`http://localhost:3000${userData?.profile_picture}`}
                        alt=""
                        className="object-cover h-12 w-12 rounded-full"
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

                {Cookies.get("uid") === postInfo.user_id ? (
                    <div className="relative ml-auto">
                        <button
                            onClick={() => setOpen(!open)}
                            className="mr-4 mb-5 hover:opacity-70 cursor-pointer"
                        >
                            <HiOutlineDotsHorizontal className="text-white text-2xl" />
                        </button>

                        {open && (
                            <div className="absolute right-4 top-12 bg-neutral-900 text-white rounded-lg shadow-lg w-40">
                                <ul className="flex flex-col">
                                    <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer rounded-t-lg">
                                        Save
                                    </li>
                                    <li
                                        onClick={() =>
                                            navigate("/main/add-post", {
                                                state: {
                                                    state: "update",
                                                    post_id: postInfo?.post_id,
                                                },
                                            })
                                        }
                                        className="px-4 py-2 hover:bg-neutral-800 cursor-pointer"
                                    >
                                        Edit
                                    </li>
                                    <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer rounded-b-lg">
                                        Delete
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="relative ml-auto">
                        <button
                            onClick={() => setOpen(!open)}
                            className="mr-4 mb-5 hover:opacity-70 cursor-pointer"
                        >
                            <HiOutlineDotsHorizontal className="text-white text-2xl" />
                        </button>

                        {open && (
                            <div className="absolute right-4 top-12 bg-neutral-900 text-white rounded-lg shadow-lg w-40">
                                <ul className="flex flex-col">
                                    <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer rounded-lg">
                                        Save
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div
                className="cursor-pointer"
                onClick={() => navigate(`/main/posts/${postInfo.post_id}`)}
            >
                <div className="flex flex-col px-4 mt-4">
                    <h1 className="text-white text-lg">{postInfo?.caption}</h1>
                </div>

                {postInfo?.image ? (
                    <div>
                        <img
                            src={`http://localhost:3000${postInfo?.image}`}
                            className={`mt-4 w-full ${
                                notHome
                                    ? "object-contain"
                                    : "object-cover h-120"
                            }`}
                            alt=""
                        />
                    </div>
                ) : (
                    <div></div>
                )}
            </div>

            <div
                className={`max-w-full border border-neutral-800 ${
                    postInfo?.img ? "mt-0" : "mt-4"
                }`}
            ></div>

            <div className="flex">
                <button
                    onClick={like}
                    className="text-white text-xl flex items-center h-10 gap-2 hover:bg-neutral-900 w-full justify-center cursor-pointer"
                >
                    {likesCount !== 0 && likesCount}
                    {/* {postInfo?.likes_count} */}
                    <HiThumbUp />
                    Like
                </button>

                {notHome ? (
                    <button
                        onClick={commentBtn}
                        className="text-white text-xl flex items-center h-10 gap-2 hover:bg-neutral-900 w-full justify-center cursor-pointer"
                    >
                        {postInfo?.comments_count !== 0 &&
                            postInfo?.comments_count}
                        {/* {postInfo?.comments_count} */}
                        <HiInbox />
                        Comment
                    </button>
                ) : (
                    <button
                        onClick={() =>
                            navigate(`/main/posts/${postInfo.post_id}`)
                        }
                        className="text-white text-xl flex items-center h-10 gap-2 hover:bg-neutral-900 w-full justify-center cursor-pointer"
                    >
                        {postInfo?.comments_count !== 0 &&
                            postInfo?.comments_count}
                        {/* {postInfo?.comments_count} */}
                        <HiInbox />
                        Comment
                    </button>
                )}
            </div>
        </div>
    );
};

export default Post;
