import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import AddPostHome from "../components/AddPostHome";
import MobileNavbar from "../components/MobileNavbar";
import { fetchData } from "../../api";

const NewFeedPage = () => {
    const [posts, setPosts] = useState([]); // to store posts
    const [loading, setLoading] = useState(false); // to handle loading

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true);
            try {
                const result = await fetchData('/posts');
                const shuffledPosts = result.sort(() => Math.random() - 0.5);
                setPosts(shuffledPosts);
            } catch (err) {
                console.err(err);
            } finally {
                setLoading(false);
            }
        }
        getPosts();
    }, [])

    return (
        <div className="w-full flex flex-col lg:pt-10 lg:px-14">
            
            <MobileNavbar />

            <AddPostHome />

            <div className="flex flex-col w-full mt-2 gap-4 pb-10">
                {posts.map((post, index) => (
                    <Post key={index} postInfo={post} />
                ))}
            </div>


        </div>
    )
}

export default NewFeedPage;