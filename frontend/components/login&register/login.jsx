import { Form } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import passwordIcon from '../../assets/password-icon.svg';
import usernameIcon from '../../assets/username-icon.svg';
import { loginAsyncAction, googleLogin } from '../../redux/user/user-slice';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const Login = () => {
  const { loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const submitForm = (data) => {
    dispatch(loginAsyncAction(data));
    console.log('LOGIN DISPATCHED');
  };

  const HandleGoogleLogin = (response) => {
    dispatch(googleLogin(response));
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn]);

  return (
    <div className="absolute left-[8%] top-[20%] bg-[rgba(255,255,255,0.5)] h-[50%]  w-80 sm:w-96 flex text-slate-600">
      <form
        className=" flex flex-col items-center justify-center align-middle w-full h-full rounded-lg shadow-xl"
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(submitForm)}
      >
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: true })}
            className="flex rounded-none border-b-8 border-slate-600 border-opacity-0 bg-transparent  shadow-none  placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
          <img src={usernameIcon} alt="username" className="flex" width={30} />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="password"
            placeholder="Password"
            className="flex rounded-none mt-8 border-b-2 border-opacity-0 bg-transparent  shadow-none t placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
            {...register('password', { required: true })}
          />
          <img
            src={passwordIcon}
            alt="password"
            className="flex mt-8"
            width={30}
          />
        </div>

        <button
          className="flex w-60 justify-center bg-neutral-200 text-black mt-8 mb-4"
          id="login-button"
          type="submit"
          onClick={handleSubmit(submitForm)}
        >
          Login
        </button>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            var decoded = jwt_decode(credentialResponse.credential);
            HandleGoogleLogin(decoded);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </form>
    </div>
  );
};

export default Login;
