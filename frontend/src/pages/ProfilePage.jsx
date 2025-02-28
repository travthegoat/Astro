import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const ProfilePage = () => {
    const { userId } = useParams();

    return (
        <div className="">
            <h1 className="text-white font-extrabold text-4xl">{userId}</h1>
        </div>
    )
}

export default ProfilePage;