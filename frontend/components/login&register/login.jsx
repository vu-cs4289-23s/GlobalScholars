import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import passwordIcon from "../../assets/password-icon.svg";
import usernameIcon from "../../assets/username-icon.svg";
import googleIcon from "../../assets/google-icon.svg";
import { loginAsyncAction } from "../../redux/user/user-slice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, userInfo, userToken, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const submitForm = (data) => {
    dispatch(loginAsyncAction(data));
    console.log("LOGIN DISPATCHED");
  };
  useEffect(() => {
    console.log("USER INFO", userInfo);
    if (userInfo.username !== undefined) {
      navigate("/landing");
    }
  }, [userInfo]);

  return (
    <div className="absolute left-[8%] top-[20%] bg-[rgba(255,255,255,0.5)] h-[50%]  w-80 sm:w-96 flex text-slate-600">
      <form
        className=" flex flex-col items-center justify-center align-middle w-full h-full rounded-lg shadow-xl"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(submitForm)}
      >
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
            className="flex rounded-none border-b-8 border-slate-600 border-opacity-0 bg-transparent  shadow-none  placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
          <img src={usernameIcon} alt="username" className="flex" width={30} />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="password"
            placeholder="Password"
            className="flex rounded-none mt-8 border-b-2 border-opacity-0 bg-transparent  shadow-none t placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
            {...register("password", { required: true })}
          />
          <img
            src={passwordIcon}
            alt="password"
            className="flex mt-8"
            width={30}
          />
        </div>

        <button
          className="flex w-60 justify-center bg-neutral-200 text-black mt-8"
          id="login-button"
          type="submit"
          onClick={handleSubmit(submitForm)}
        >
          Login
        </button>
        <button
          className="flex w-60 justify-center bg-neutral-200 text-black mt-4"
          id="google-login-button"
          type="submit"
        >
          Login w/ Google OAuth
          <img
            src={googleIcon}
            alt="google"
            width={30}
            height={30}
            className="pl-1"
          />
        </button>
      </form>
    </div>
  );
};

export default Login;
