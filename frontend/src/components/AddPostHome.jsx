import React, { useEffect, useState } from "react";
import profileImg from "/profile.png";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import Cookies from 'js-cookie';

const AddPostHome = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // to handle loading
    const [userData, setUserData] = useState({}); // to store user info

    useEffect(() => {
        const getUserData = async () => {
            setLoading(true);
            try {
                const result = await fetchData(`/users/${Cookies.get('uid')}`);
                setUserData(result[0]);
            } catch (er) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getUserData();
    }, []);

    return (
        <div className="w-full h-24 bg-[#0b0b0b] border border-neutral-900 lg:rounded-lg flex items-center px-8 gap-5">
            <button className="cursor-pointer hover:opacity-70">
                <img
                    src={`http://localhost:3000${userData.profile_picture}`}
                    alt=""
                    className="object-cover w-13 h-12 rounded-full"
                />
            </button>

            <button onClick={() => {
                navigate('/main/add-post', {
                    state: {
                        state: 'insert'
                    }
                });
            }} className="rounded-full bg-neutral-900 text-neutral-500 h-12 w-full px-2 lg:px-4 text-lg xl:text-xl text-start pb-1 hover:bg-neutral-800 cursor-pointer duration-75">
                What's on your mind, {userData?.display_name}?
            </button>
        </div>
    );
};
``
export default AddPostHome;
