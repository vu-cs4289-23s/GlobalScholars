import { Form } from "react-router-dom";
import passwordIcon from "../../assets/Login&Register/password-icon.svg";
import usernameIcon from "../../assets/Login&Register/username-icon.svg";
import googleIcon from "../../assets/Login&Register/google-icon.svg";

const Login = () => {
  return (
    <div className="absolute left-[8%] top-[20%] bg-slate-100 bg-[rgba(255,255,255,0.5)] h-[50%]  w-80 sm:w-96 flex text-slate-600">
      <Form
        className=" flex flex-col items-center justify-center align-middle w-full h-full rounded-lg shadow-xl"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
        }}
      >
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="Email"
            className="flex rounded-none border-b-8 border-slate-600 border-opacity-0 bg-transparent  shadow-none  placeholder-slate-600 hover:ring-0 hover:outline-none bg-slate-100 focus:outline-none focus:ring-0"
          />
          <img src={usernameIcon} alt="username" className="flex" width={30} />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="password"
            placeholder="Password"
            className="flex rounded-none mt-8 border-b-2 border-opacity-0 bg-transparent  shadow-none bg-slate-100 placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
          <img
            src={passwordIcon}
            alt="password"
            className="flex mt-8"
            width={30}
          />
        </div>

        <button className="flex w-60 justify-center bg-neutral-200 text-black mt-8">
          Login
        </button>
        <button className="flex w-60 justify-center bg-neutral-200 text-black mt-4">
          Login w/ Google OAuth
          <img
            src={googleIcon}
            alt="google"
            width={30}
            height={30}
            className="pl-1"
          />
        </button>
      </Form>
    </div>
  );
};

export default Login;
