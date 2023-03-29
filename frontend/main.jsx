import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import LandingPage from "./pages/landing-page";
import ForumPage from "./pages/forum-page";
import NewPost from "./pages/new-post";
import PriceEstimator from "./pages/price-estimator";
import ProfilePage from "./pages/profile-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import EditPage from "./pages/edit-page";
import PostPage from "./pages/post-page.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forum",
    element: <ForumPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/newpost",
    element: <NewPost />,
  },
  {
    path: "/forum/:name",
    element: <ForumPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/price-estimator",
    element: <PriceEstimator />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:username",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:username/edit",
    element: <EditPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/post/:id",
    element: <PostPage />,
    errorElement: <ErrorPage />,
  },
]);
// React.StrictMode is not compatible with redux tool kit and causes dispatches to render twice
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <GoogleOAuthProvider clientId="92454966339-aam0v6qs1m8iqr6eh80tdeg3j98f6f1h.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </Provider>
  // </React.StrictMode>
);
