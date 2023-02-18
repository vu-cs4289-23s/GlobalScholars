import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAsyncAction } from "../../redux/user/user-slice";
import axios from "axios";

const Register = () => {
  const { loading, loggedIn, error, success } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const submitForm = (data) => {
    dispatch(registerAsyncAction(data));
  };
  useEffect(() => {
    console.log("USER INFO", loggedIn);
    if (loggedIn) {
      navigate("/landing");
    }
  }, []);
  return (
    <div className=" absolute left-[5%] top-[20%]  bg-[rgba(255,255,255,0.5)]  w-80 sm:w-96 h-[60%] flex text-slate-600 ">
      <Form
        className=" flex flex-col items-center justify-center align-middle w-full  rounded-lg shadow-xl "
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="flex rounded-none  bg-transparent border-none shadow-none ring-0 placeholder-slate-600 hover:ring-0 hover:outline-none  focus:outline-none border-b-orange-50 focus:ring-0"
          />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="First Name"
            {...register("first_name")}
            className="flex rounded-none mt-8  border-b-2 bg-transparent border-none ring-0 shadow-none placeholder-slate-600  hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="Last Name"
            {...register("last_name")}
            className="flex rounded-none mt-8  bg-transparent border-none shadow-none ring-0  placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="Email"
            {...register("primary_email")}
            className="flex rounded-none mt-8  bg-transparent border-none shadow-none ring-0 placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="flex rounded-none mt-8  bg-transparent border-none shadow-none ring-0 placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>

        <button className="flex w-60 justify-center bg-neutral-200 text-black mt-8">
          Register
        </button>
      </Form>
    </div>
  );
};

export default Register;
