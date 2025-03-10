import React, { useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { fetchData } from "../../api";

const Comment = ({ commentData }) => {
    const [userData, setUserData] = useState({}); // to store user info
    const [loading, setLoading] = useState(false); // to handle loading

    useEffect(() => {
        const userId = commentData?.user_id;

        const getUserData = async () => {
            setLoading(true);
            try {
                const result = await fetchData(`/users/${userId}`);
                setUserData(result[0]);
            } catch (err) {
                console.error(err);
            }
        }

        getUserData();
    }, []);

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
            </div>

            <div className="mt-4 ml-4 mb-5">
                <h1 className="text-white text-lg">{commentData?.content}</h1>
            </div>
        </div>
    );
};

export default Comment;
