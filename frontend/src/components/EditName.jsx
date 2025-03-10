import React, { useEffect, useState } from "react";
import { fetchData, updateData } from "../../api";
import Cookies from 'js-cookie';
import { IoCloseCircle } from "react-icons/io5";
import { ScaleLoader } from "react-spinners";

const EditName = ({ modalClose }) => {
    const [displayName, setDisplayName] = useState(""); // for comment input
    const [loading, setLoading] = useState(""); // to handle loading
    const uid = Cookies.get('uid'); // get stored userId

    useEffect(() => {
        const getDisplayName = async () => {
            setLoading(true);
            try {
                const result = await fetchData(`/users/${uid}`);
                setDisplayName(result[0].display_name);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getDisplayName();
    }, [])

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const result = await updateData(`/users/${uid}`, {
                display_name: displayName,
            });
            window.location.reload();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/[.8] flex justify-center items-center">
            <div
                className="bg-neutral-900 w-full mx-2 lg:w-[40%] h-64 rounded-xl px-4 pt-4"
                onClick={() => {
                    console.log("hello");
                }}
            >
                <div className="flex w-full justify-between items-center">
                    <h1 className="text-3xl text-white font-bold">
                        Change Display Name
                    </h1>
                    <IoCloseCircle
                        className="text-white text-4xl hover:opacity-80 cursor-pointer"
                        onClick={modalClose}
                    />
                </div>

                <form onSubmit={submit} className="flex mt-24 w-full gap-8">
                    <input
                        type="text"
                        value={displayName}
                        placeholder="Your New Display Name"
                        className="w-full lg:w-[70%] placeholder:text-neutral-400 border-b border-neutral-400 pb-2 outline-none text-white text-lg"
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    {loading ? (
                        <ScaleLoader />
                    ) : (
                        <button
                            type="submit"
                            className="w-full lg:w-[30%] bg-white rounded text-xl font-bold hover:opacity-80 cursor-pointer flex justify-center items-center"
                        >
                            Submit
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EditName;
