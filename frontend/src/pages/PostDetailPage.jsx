import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Post from "../components/Post";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../../api";
import Comment from "../components/Comment";
import AddComment from "../components/AddComment";

const PostDetailPage = () => {
    const { postId } = useParams(); // to get the passed post id      
    const [postData, setPostData] = useState({}); // to store post data      
    const [comments, setComments] = useState([]); // to store comments      
    const [loading, setLoading] = useState(false); // to handle loading      
    const navigate = useNavigate(); // to navigate
    const [modal, setModal] = useState(false);

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

        const getComments = async () => {
            setLoading(true);
            try {
                const result = await fetchData(`/posts/comment/${postId}`);
                setComments(result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        getPostData();
        getComments();
    }, []);

    return (
        <div className="pt-4 pb-10">
            <div className="flex px-4 2xl:px-6">
                <button
                    className="cursor-pointer"
                    onClick={() => navigate("/main")}
                >
                    <IoArrowBack className="text-white hover:text-neutral-200 text-2xl 2xl:text-3xl" />
                </button>
            </div>

            <div className="mt-5 2xl:mt-10 lg:px-4 2xl:px-14">
                {/* {postData.caption} */}
                <Post
                    postInfo={postData}
                    notHome={true}
                    commentBtn={() => setModal(!modal)}
                />

                <div className="flex flex-col mt-10 gap-4">
                    {
                        comments.map((comment) => (
                            <Comment commentData={comment} />
                        ))
                    }
                </div>
            </div>

            {modal && <AddComment modalClose={() => setModal(!modal)} post_id={postId}/>}
        </div>
    );
};

export default PostDetailPage;
