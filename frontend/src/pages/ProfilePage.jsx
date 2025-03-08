import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoArrowBack } from 'react-icons/io5';
import AddPostHome from "../components/AddPostHome";
import { fetchData, postData } from "../../api";
import Post from "../components/Post";
import Cookies from 'js-cookie';

const ProfilePage = () => {
    const { userId } = useParams();
    const [posts, setPosts] = useState([]); // to store posts
    const [userData, setUserData] = useState({}); // to store user info
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false); // to handle loading
    const navigate = useNavigate(); // to navigate

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
        }

        const checkFollowing = async () => {
            const uid = Cookies.get('uid');
            setLoading(true);
            try {
                const result = await fetchData(`/users/isFollowing?followerId=${uid}&followingId=${userId}`);
                setIsFollowing(result.isFollowing)
            } catch (err) {
                console.error(err);
            }
        }

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
        }

        getUserData();
        checkFollowing();
        getPosts();
    }, []);

    const followUser = async () => {
        const uid = Cookies.get('uid');

        setLoading(true);
        try {
            const result = await postData('/users/follow', {
                followerId: uid,
                followingId: userId
            });
            
            if (result.code === "green") {
                setIsFollowing(true);
            } else {
                setIsFollowing(false);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="pt-4 pb-10">
            <div className="px-4 2xl:px-6">
                <button className="cursor-pointer" onClick={() => navigate('/main/')}>
                    <IoArrowBack className="text-white hover:text-neutral-200 text-2xl 2xl:text-3xl"/>
                </button>
            </div>

            <div className="flex px-20 mt-10 justify-between border-b border-neutral-900 pb-12">
                <div className="flex flex-col">
                    <div className="flex gap-4">
                        <img src={`http://localhost:3000${userData?.profile_picture}`} className="w-16 h-16 object-cover rounded-lg" alt="" />

                        <div className="flex flex-col justify-start ">
                            <h1 className="text-white text-2xl font-semibold">{userData?.display_name}</h1>
                            <h2 className="text-neutral-400 text-xl font-">@{userData?.username}</h2>
                        </div>
                    </div>

                    <div className="flex mt-6 gap-4">
                        <button className="text-white font-semibold cursor-pointer hover:opacity-80">20 <span className="text-neutral-400">Followers</span></button>
                        <p className="text-neutral-400">|</p>
                        <button className="text-white font-semibold cursor-pointer hover:opacity-80">25 <span className="text-neutral-400">Following</span></button>
                    </div>
                </div>

                {Cookies.get('uid') === userId ? (
                    <button className="bg-neutral-950 border border-neutral-800 text-white h-12 px-16 rounded-lg cursor-pointer hover:opacity-80">Edit</button>
                ) : (
                    <button onClick={followUser} disabled={false} className="bg-neutral-950 border border-neutral-800 text-white h-12 px-16 rounded-lg cursor-pointer hover:opacity-80">{isFollowing ? "Followed" : "Follow" }</button>
                )}
            </div>

            <div className="flex flex-col mt-4 lg:px-10">
                {Cookies.get('uid') === userId && (
                    <AddPostHome />
                )}

                <div className="flex flex-col mt-6 gap-4">
                    {posts.map((post) => (
                        <Post notHome={false} postInfo={post} commentBtn={() => navigate(`/main/posts/${post?.post_id}`)}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;