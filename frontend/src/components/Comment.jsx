import React, { useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { fetchData } from "../../api";
import { useNavigate } from "react-router-dom";

const Comment = ({ commentData }) => {
    const [userData, setUserData] = useState({}); // to store user info
    const [loading, setLoading] = useState(false); // to handle loading
    const [formattedDate, setFormattedDate] = useState(""); // to store formatted date
    const navigate = useNavigate(); // to navigate

    useEffect(() => {
        const userId = commentData?.user_id;

        const getUserData = async () => {
            setLoading(true);
            try {
                const result = await fetchData(`/users/${userId}`);
                setUserData(result[0]);
                const date = new Date(result[0].created_at);
                setFormattedDate(`${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()}`);
            } catch (err) {
                console.error(err);
            }
        }

        getUserData();
    }, []);

    return (
        <div className="w-full h-auto justify-start bg-[#0b0b0b] border border-neutral-900 lg:rounded-lg pt-4">
            <div className="flex flex-grow gap-4 min-w-full">
                <div className="ml-4 cursor-pointer hover:opacity-70" onClick={() => navigate(`/main/profile/${userData?.user_id}`)}>
                    <img
                        src={`http://localhost:3000${userData?.profile_picture}`}
                        alt=""
                        className="object-cover h-12 w-12 rounded-full"
                    />
                </div>

                <div className="flex flex-col">
                    <h1 className="text-white text-lg font-semibold cursor-pointer" onClick={() => navigate(`/main/profile/${userData?.user_id}`)}>
                        {userData?.display_name}
                    </h1>
                    <h2 className="text-neutral-500 text-sm">
                        {formattedDate}
                    </h2>
                </div>
            </div>

            <div className="mt-4 ml-4 mb-5">
                <h1 className="text-white text-lg">{commentData?.content}</h1>
            </div>
        </div>
    );
};

export default Comment;
