import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/error-page";
import SearchPage from "./routes/search-page";
import LandingPage from "./routes/landing-page";
import ForumPage from "./routes/forum-page";
import PriceEstimator from "./routes/price-estimator";
import ProfilePage from "./routes/profile-page";
import LoginPage from "./routes/login-page";
import RegisterPage from "./routes/register-page";
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
    path: "/search",
    element: <SearchPage />,
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
