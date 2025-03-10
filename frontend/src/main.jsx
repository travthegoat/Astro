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
import ProfilePage from "./pages/ProfilePage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CompleteRegisterPage from "./pages/completeRegisterPage";
import AddPostPage from "./pages/AddPostPage";
import PostDetailPage from "./pages/PostDetailPage";
import SavedPage from "./pages/SavedPage";

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
            { path: "/main/profile/:userId", element: <ProfilePage /> },
            { path: "/main/add-post", element: <AddPostPage /> },
            { path: "/main/posts/:postId", element: <PostDetailPage /> },
            { path: "/main/saved", element: <SavedPage /> }
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
