import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import passwordIcon from "../../assets/password-icon.svg";
import usernameIcon from "../../assets/username-icon.svg";
import googleIcon from "../../assets/google-icon.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    console.log("REG LOGIN");
    console.log("username: ", username);
    console.log("password: ", password);
    let res = await fetch("/api/v1/session", {
      body: JSON.stringify({
        username,
        password,
      }),
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      console.log("data: ", data);
      navigate(`/profile/${data.username}`);
    } else {
      setError(`Error: ${data.error}`);
    }
    e.preventDefault();
  };
  const handleGoogleLogin = (e) => {
    console.log("GOOGLE LOGIN");
    console.log("username: ", username);
    console.log("password: ", password);
    e.preventDefault();
  };

  return (
    <div className="absolute left-[8%] top-[20%] bg-[rgba(255,255,255,0.5)] h-[50%]  w-80 sm:w-96 flex text-slate-600">
      <Form
        className=" flex flex-col items-center justify-center align-middle w-full h-full rounded-lg shadow-xl"
        onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
      >
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="flex rounded-none border-b-8 border-slate-600 border-opacity-0 bg-transparent  shadow-none  placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
          <img src={usernameIcon} alt="username" className="flex" width={30} />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="password"
            placeholder="Password"
            className="flex rounded-none mt-8 border-b-2 border-opacity-0 bg-transparent  shadow-none t placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="flex w-60 justify-center bg-neutral-200 text-black mt-4"
          onClick={handleGoogleLogin}
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
      </Form>
    </div>
  );
};

export default Login;
