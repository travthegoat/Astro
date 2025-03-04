import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateData } from "../../api";
import Cookies from 'js-cookie';
import { ScaleLoader } from 'react-spinners';

const CompleteRegisterPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // to navigate

    useEffect(() => {
        if (location.state.uid === null) {
            navigate('/main/');
        }
        console.log(location.state.username)
    }, []);

    const [loading, setLoading] = useState(false); // to handle loading
    const [selectedImage, setSelectedImage] = useState('unselected-profile.png'); // for image input
    const [preview, setPreview] = useState('/public/unselected-profile.png'); // for image preview
    const [displayName, setDisplayName] = useState(''); // for display name input

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const submit = async (e) => {
        e.preventDefault();

        const uid = Cookies.get('uid');

        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("display_name", displayName);

        setLoading(true);
        try {
            const result = await updateData(`/users/register/${uid}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            navigate('/main/');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full lg:w-[40%] 2xl:w-[30%] h-screen bg-black flex flex-col items-center">
            <h1 className="text-white text-8xl lg:text-7xl 2xl:text-8xl font-extrabold text-center mt-6 shadow-xl">
                <i>ASTRO</i>
            </h1>

            <form onSubmit={submit} className="flex flex-col items-center w-full px-10 2xl:px-28 mt-10 2xl:mt-36">
                <div className="flex justify-between w-full items-center">
                    <img src={preview} alt="" className="w-36 rounded-full" />

                    <label className="cursor-pointer bg-white text-black rounded-md mt-5 text-xl font-semibold h-12 px-4 flex justify-center items-center mb-6 hover:bg-neutral-200">
                        Choose Image
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                <input
                    type="text"
                    placeholder="Enter Your Display Name"
                    className="w-full text-white placeholder:text-neutral-400 outline-none border-b border-nuetral-400 text-xl pb-1 h-14 mt-14"
                    required={true}
                    onChange={(e) => setDisplayName(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-white h-14 mx-10 rounded-lg mt-18 text-2xl font-bold pb-1 cursor-pointer hover:bg-neutral-200 w-full"
                >
                    {loading ? <ScaleLoader /> : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default CompleteRegisterPage;
