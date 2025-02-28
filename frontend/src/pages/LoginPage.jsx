import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../api";
import Cookies from 'js-cookie';
import { ScaleLoader } from 'react-spinners';

const LoginPage = () => {
    const [username, setUsername] = useState(""); // for username input
    const [password, setPassword] = useState(""); // for password input
    const [loading, setLoading] = useState(false); // to handle loading
    const [error, setError] = useState(""); // to handle error messages
    const navigate = useNavigate(); // to navigate

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await fetchData(
                `/users/search?username=${username}`
            ); // get user data using the username

            // check if the password is correct
            if (password === result[0].password_hash) {
                Cookies.set('username', username, { expires: 7 });
                navigate('/main/');
            } else {
                setError("Username or Password is incorrect!");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full lg:w-[40%] 2xl:w-[30%] h-screen bg-black flex flex-col justify-center">
            <h1 className="text-white text-7xl 2xl:text-8xl font-extrabold text-center mt-6 shadow-xl">
                <i>ASTRO</i>
            </h1>

            <h2 className="text-md text-red-700 text-center mt-5">{error}</h2>

            <form
                onSubmit={login}
                className="flex flex-col mt-14 2xl:mt-10 px-10 2xl:px-20 gap-10"
            >
                <input
                    type="text"
                    placeholder="Enter Your Username"
                    className="w-full text-white placeholder:text-neutral-400 outline-none border-b border-nuetral-400 text-xl pb-1 h-14"
                    required={true}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Your Password"
                    className="w-full text-white placeholder:text-neutral-400 outline-none border-b border-nuetral-400 text-xl pb-1 h-14"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-white h-14 mx-10 rounded-lg mt-10 text-2xl font-bold pb-1 cursor-pointer hover:bg-neutral-200 flex justify-center items-center"
                >
                    { loading ? <ScaleLoader /> : "Login"}
                </button>

                <Link
                    className="text-white text-center text-lg hover:underline"
                    to={"/auth/register"}
                >
                    Doesn't have an account? Register
                </Link>
            </form>


        </div>
    );
};

export default LoginPage;
