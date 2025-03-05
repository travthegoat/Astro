import React, { useState } from "react";
import Cookies from "js-cookie";
import { IoArrowBack, IoSaveOutline } from "react-icons/io5";
import { ScaleLoader } from "react-spinners";
import { postData } from "../../api";
import { useNavigate } from "react-router-dom";

const AddPostPage = () => {
    const uid = Cookies.get("uid"); // get uid from cookies
    const [loading, setLoading] = useState(false); // to handle loading
    const [selectedImage, setSelectedImage] = useState(""); // to store selected image name
    const [preview, setPreview] = useState(""); // for image preview
    const [caption, setCaption] = useState(""); // for caption input
    const navigate = useNavigate(); // to navigate

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const createPost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("user_id", uid);
        formData.append("caption", caption);
        formData.append("image", selectedImage);

        setLoading(true);
        try {
            const result = await postData('/posts', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log(result);
            navigate(`/main/posts/${result.postId}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={createPost} className="pt-4">
            <div className="flex justify-between items-center px-4 2xl:px-6">
                <button className="cursor-pointer" onClick={() => navigate('/main')}>
                    <IoArrowBack className="text-white hover:text-neutral-200 text-2xl 2xl:text-3xl" />
                </button>

                <button type="submit" className="cursor-pointer">
                    {loading ? (
                        <ScaleLoader />
                    ) : (
                        <IoSaveOutline className="text-white hover:text-neutral-200 text-2xl 2xl:text-2xl" />
                    )}
                </button>
            </div>

            <div className="flex flex-col lg:flex-row w-full px-4 2xl:px-6 mt-10 gap-2 2xl:gap-5">
                <textarea
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full lg:w-[70%] h-56 text-lg text-white placeholder-neutral-500 bg-neutral-950 border border-neutral-900 rounded shadow-xl pt-4 px-4 outline-none"
                    placeholder="Add a caption"
                    required={true}
                ></textarea>

                {selectedImage === "" ? (
                    <label className="cursor-pointer w-full lg:w-[30%] h-56 bg-neutral-950 border border-neutral-900 rounded flex justify-center items-center text-white text-5xl font-extrabold pb-5 pr-1">
                        +
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                ) : (
                    <img
                        onClick={() => {
                            setSelectedImage("");
                            setPreview("");
                        }}
                        src={preview}
                        className="w-[30%] h-56 bg-neutral-95 rounded cursor-pointer object-cover"
                    />
                )}
            </div>
        </form>
    );
};

export default AddPostPage;
