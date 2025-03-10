import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import Cookies from "js-cookie";
import Post from "../components/Post";

const SavedPage = () => {
    const navigate = useNavigate(); // to navigate
    const [savedPosts, setSavedPosts] = useState([]); // to store saved posts
    const [loading, setLoading] = useState(false); // to handle loading
    const uid = Cookies.get("uid"); // to get the stored userId

    useEffect(() => {
        const getSavedPosts = async () => {
            setLoading(true);
            try {
                const result = await fetchData(`/posts/save/${uid}`);
                setSavedPosts(result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getSavedPosts();
    }, []);

    return (
        <div className="w-full pt-4 pb-10">
            <div className="flex justify-between px-4 2xl:px-6 w-full">
                <button
                    className="cursor-pointer"
                    onClick={() => navigate("/main")}
                >
                    <IoArrowBack className="text-white hover:text-neutral-200 text-2xl 2xl:text-3xl" />
                </button>

                <h1 className="text-white text-2xl font-semibold">Saved</h1>

                <span className="mr-6 2xl:mr-8"></span>
            </div>

            <div className="flex flex-col mt-10 lg:px-4 2xl:px-14 gap-4">
                {savedPosts.map((post, index) => (
                    <Post key={index} postInfo={post} />
                ))}
            </div>
        </div>
    );
};

export default SavedPage;
