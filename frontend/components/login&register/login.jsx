import { Form } from "react-router-dom";
import passwordIcon from "../../assets/Login/password-icon.svg";
import usernameIcon from "../../assets/Login/username-icon.svg";

const Login = () => {
  return (
    <div className=" mt-36 ml-16 bg-slate-100 h-96 w-96 flex text-slate-400">
      <Form
        className=" flex flex-col items-center justify-center align-middle w-96 h-96 rounded-lg shadow-xl"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
        }}
      >
        <div className="flex">
          <input
            type="text"
            placeholder="Email"
            className="flex rounded-none border-0 border-opacity-0 bg-transparent border-none shadow-none ring-0 hover:ring-0 hover:outline-none bg-slate-100 focus:outline-none focus:ring-0"
          />
          <img src={usernameIcon} alt="username" className="flex" width={30} />
        </div>
        <div className="flex">
          <input
            type="password"
            placeholder="Password"
            className="flex rounded-none mt-8 border-0 border-opacity-0 bg-transparent border-none shadow-none bg-slate-100 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
          <img
            src={passwordIcon}
            alt="password"
            className="flex mt-8"
            width={30}
          />
        </div>

        <button className="flex w-60 justify-center bg-neutral-200 text-black mt-8">
          LOGIN
        </button>
      </Form>
    </div>
  );
};

export default Login;
