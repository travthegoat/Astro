import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Post from "../components/Post";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../../api";

const PostDetailPage = () => {
    const { postId } = useParams(); // to get the passed post id
    const [postData, setPostData] = useState({}); // to store post data
    const [loading, setLoading] = useState(false); // to handle loading
    const navigate = useNavigate(); // to navigate

    useEffect(() => {
        const getPostData = async () => {
            setLoading(true);
            try {
                const result = await fetchData(`/posts/${postId}`);
                setPostData(result[0]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getPostData();
    }, []);

    return (
        <div className="pt-4">
            <div className="flex px-4 2xl:px-6">
                <button
                    className="cursor-pointer"
                    onClick={() => navigate("/main")}
                >
                    <IoArrowBack className="text-white hover:text-neutral-200 text-2xl 2xl:text-3xl" />
                </button>
            </div>

            <div className="mt-5 2xl:mt-10 lg:px-10">
                {/* {postData.caption} */}
                <Post postData={postData} notHome={true}/>
            </div>
        </div>
    );
};

export default PostDetailPage;
