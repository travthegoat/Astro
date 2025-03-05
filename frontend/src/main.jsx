import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import NewFeedPage from "./pages/NewFeedPage";
import MainLayout from "./layouts/MainLayout";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CompleteRegisterPage from "./pages/completeRegisterPage";
import AddPostPage from "./pages/AddPostPage";
import PostDetailPage from "./pages/PostDetailPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <InitialPage />,
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { index: true, element: <Navigate to={"/auth/login"} /> },
            { path: "/auth/login", element: <LoginPage /> },
            { path: "/auth/register", element: <RegisterPage /> },
            {
                path: "/auth/complete-register",
                element: <CompleteRegisterPage />,
            },
        ],
    },
    {
        path: "/main",
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to={"/main/feed"} /> },
            { path: "/main/feed", element: <NewFeedPage /> },
            { path: "/main/search", element: <SearchPage /> },
            { path: "/main/:userId", element: <ProfilePage /> },
            { path: "/main/add-post", element: <AddPostPage /> },
            { path: "/main/posts/:postId", element: <PostDetailPage /> },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
