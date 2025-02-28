import React from "react";
import Post from "../components/Post";
import AddPostHome from "../components/AddPostHome";
import MobileNavbar from "../components/MobileNavbar";

const NewFeedPage = () => {
    return (
        <div className="w-full flex flex-col lg:pt-10 lg:px-14">
            
            <MobileNavbar />

            <AddPostHome />

            <div className="flex flex-col w-full mt-2 gap-4 pb-10">
                <Post img={true} />
                <Post img={false} />
                <Post img={true} />
                <Post img={true} />

            </div>


        </div>
    )
}

export default NewFeedPage;