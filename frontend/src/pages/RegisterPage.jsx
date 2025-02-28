import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postData } from "../../api";

const RegisterPage = () => {
    const [email, setEmail] = useState(""); // for email input
    const [username, setUsername] = useState(""); // for username input
    const [password, setPassword] = useState(""); // for password input
    const [loading, setLoading] = useState(false); // to handle loading

    const register = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await postData('/users', {
                email: email,
                username: username,
                password: password,
            }); // create user
            console.log(result);
        } catch (err) {
            console.err(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full lg:w-[40%] 2xl:w-[30%] h-screen bg-black flex flex-col justify-center">
            <h1 className="text-white text-8xl lg:text-7xl 2xl:text-8xl font-extrabold text-center mt-6 shadow-xl">
                <i>ASTRO</i>
            </h1>

            <form
                onSubmit={register}
                className="flex flex-col mt-14 lg:mt-6 2xl:mt-20 px-10 2xl:px-20 gap-10 lg:gap-6 2xl:gap-10"
            >
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full text-white placeholder:text-neutral-400 outline-none border-b border-nuetral-400 text-xl pb-1 h-14"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter Your Username"
                    className="w-full text-white placeholder:text-neutral-400 outline-none border-b border-nuetral-400 text-xl pb-1 h-14"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Your Password"
                    className="w-full text-white placeholder:text-neutral-400 outline-none border-b border-nuetral-400 text-xl pb-1 h-14"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-white h-14 mx-10 rounded-lg mt-10 text-2xl font-bold pb-1 cursor-pointer hover:bg-neutral-200"
                >
                    { loading ? <ScaleLoader /> : "Register"}
                </button>

                <Link
                    className="text-white text-center text-lg hover:underline"
                    to={"/auth/login"}
                >
                    Already a user? Login
                </Link>
            </form>
        </div>
    );
};

export default RegisterPage;
