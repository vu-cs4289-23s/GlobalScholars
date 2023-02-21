import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import LandingPage from "./pages/landing-page";
import ForumPage from "./pages/forum-page";
import PriceEstimator from "./pages/price-estimator";
import ProfilePage from "./pages/profile-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import { Provider } from "react-redux";
import { store } from "./app/store";

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
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
]);
// React.StrictMode is not compatible with redux tool kit and causes dispatches to render twice
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
