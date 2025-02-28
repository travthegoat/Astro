import React, { useEffect, useState } from "react";
import profileImg from "/profile.png";
import { IoInformation } from "react-icons/io5";
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
import TopUser from "./TopUser";
import { fetchData } from "../../api";
import Cookies from 'js-cookie';

const RightInfo = () => {
    const [userData, setUserData] = useState(); // to store user info
    const [loading, setLoading] = useState(false); // to handle loading

    useEffect(() => {
        const username = Cookies.get('username'); // get stored username
        console.log(username);

        const getUserData = async () => {
            setLoading(true);
            try {
                const result = await fetchData(`/users/search?username=${username}`); // get user data from api
                setUserData(result[0]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getUserData();
    }, []);

    return (
        <div className="hidden lg:flex lg:flex-grow lg:flex-col w-[25%] 2xl:w-[20%] pt-8 pl-5 pr-5 2xl:pl-8 2xl:pr-0 border-l-1 border-neutral-900">
            <div className="flex items-start gap-5 cursor-pointer">
                <div className="hover:opacity-70">
                    <img
                        src={profileImg}
                        alt=""
                        className="object-contain w-12 rounded-full"
                    />
                </div>

                <div className="flex flex-col">
                    <h1 className="text-white text-lg font-semibold">
                        {userData?.display_name}
                    </h1>
                    <h2 className="text-neutral-400 text-md font-semibold">
                        @{userData?.username}
                    </h2>
                </div>
            </div>

            <div className="flex flex-col w-full h-auto pb-7 bg-[#0b0b0b] mt-10 pt-4 px-3 rounded-xl border border-neutral-900 shadow-2xl">
                <h1 className="text-neutral-600 text-xl font-bold mb-3">
                    Top Users
                </h1>

                <div className="flex flex-col gap-3">
                    <TopUser />
                    <TopUser />
                    <TopUser />
                    <TopUser />
                    <TopUser />
                </div>
            </div>
        </div>
    );
};

export default RightInfo;
