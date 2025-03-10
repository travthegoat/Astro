import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import AddPostHome from "../components/AddPostHome";
import { fetchData, postData } from "../../api";
import Post from "../components/Post";
import Cookies from "js-cookie";
import EditName from "../components/EditName";

const ProfilePage = () => {
    const { userId } = useParams();
    const [posts, setPosts] = useState([]); // to store posts
    const [userData, setUserData] = useState({}); // to store user info
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState(0); // to store followers
    const [following, setFollowing] = useState(0); // to store following
    const [loading, setLoading] = useState(false); // to handle loading
    const [editToggle, setEditToggle] = useState(false); // to handle edit window open and close
    const navigate = useNavigate(); // to navigate
    const [searchParams] = useSearchParams();

    useEffect(() => {

        const getUserData = async () => {
            setLoading(true);
            try {
                const result = await fetchData(`/users/${userId}`);
                setUserData(result[0]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const checkFollowing = async () => {
            const uid = Cookies.get("uid");
            setLoading(true);
            try {
                const result = await fetchData(
                    `/users/isFollowing?followerId=${uid}&followingId=${userId}`
                );
                setIsFollowing(result.isFollowing);
            } catch (err) {
                console.error(err);
            }
        };

        const getPosts = async () => {
            setLoading(true);
            try {
                const result = await fetchData(`/posts/getByUid/${userId}`);
                setPosts(result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const getFollowCounts = async () => {
            setLoading(true);
            try {
                const result = await fetchData(`/users/followCounts/${userId}`);
                console.log(result);
                setFollowers(result.followers);
                setFollowing(result.following);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getUserData();
        checkFollowing();
        getPosts();
        getFollowCounts();
    }, [userId]);

    const followUser = async () => {
        const uid = Cookies.get("uid");

        setLoading(true);
        try {
            const result = await postData("/users/follow", {
                followerId: uid,
                followingId: userId,
            });

            if (result.code === "green") {
                setIsFollowing(true);
                setFollowers((prev) => prev + 1);
            } else {
                setIsFollowing(false);
                setFollowers((prev) => prev - 1);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="pt-4 pb-10">
            <div className="px-4 2xl:px-6">
                <button
                    className="cursor-pointer"
                    onClick={() => navigate("/main/")}
                >
                    <IoArrowBack className="text-white hover:text-neutral-200 text-2xl 2xl:text-3xl" />
                </button>
            </div>

            <div className="flex px-4 2xl:px-20 mt-10 justify-between border-b border-neutral-800 pb-12">
                <div className="flex flex-col">
                    <div className="flex gap-4">
                        <img
                            src={`https://astro-1fdt.onrender.com${userData?.profile_picture}`}
                            className="w-16 h-16 object-cover rounded-lg"
                            alt=""
                        />

                        <div className="flex flex-col justify-start ">
                            <h1 className="text-white text-xl 2xl:text-2xl font-semibold">
                                {userData?.display_name}
                            </h1>
                            <h2 className="text-neutral-400 text-lg 2xl:text-xl font-">
                                @{userData?.username}
                            </h2>
                        </div>
                    </div>

                    <div className="flex mt-6 gap-4">
                        <button className="text-white font-semibold cursor-pointer hover:opacity-80">
                            {followers}{" "}
                            <span className="text-neutral-400">Followers</span>
                        </button>
                        <p className="text-neutral-400">|</p>
                        <button className="text-white font-semibold cursor-pointer hover:opacity-80">
                            {following}{" "}
                            <span className="text-neutral-400">Following</span>
                        </button>
                    </div>
                </div>

                {Cookies.get("uid") === userId ? (
                    <button
                        onClick={() => setEditToggle(true)}
                        className="bg-neutral-950 border border-neutral-800 text-white h-12 px-8 lg:px-16 rounded-lg cursor-pointer hover:opacity-80"
                    >
                        Edit
                    </button>
                ) : (
                    <button
                        onClick={followUser}
                        disabled={false}
                        className="bg-neutral-950 border border-neutral-800 text-white h-12 px-6 lg:px-16 rounded-lg cursor-pointer hover:opacity-80"
                    >
                        {isFollowing ? "Followed" : "Follow"}
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:mt-4 lg:px-4 2xl:px-20">
                {Cookies.get("uid") === userId && <AddPostHome />}

                <div className="flex flex-col mt-6 gap-4">
                    {posts.map((post) => (
                        <Post
                            notHome={false}
                            postInfo={post}
                            commentBtn={() =>
                                navigate(`/main/posts/${post?.post_id}`)
                            }
                        />
                    ))}
                </div>
            </div>

            {editToggle && <EditName modalClose={() => setEditToggle(false)} />}
        </div>
    );
};

export default ProfilePage;
