import { Form } from "react-router-dom";
import googleIcon from "../../assets/Login&Register/google-icon.svg";
const Register = () => {
  return (
    <div className=" mt-24 ml-16  bg-slate-100 w-96 h-[550px] flex text-slate-400">
      <Form
        className=" flex flex-col items-center justify-center align-middle w-96  rounded-lg shadow-xl"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
        }}
      >
        <div className="flex">
          <input
            type="text"
            placeholder="Username"
            className="flex rounded-none border-0 border-opacity-0 bg-transparent border-none shadow-none ring-0 hover:ring-0 hover:outline-none bg-slate-100 focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="First Name"
            className="flex rounded-none mt-8 border-0 border-opacity-0 bg-transparent border-none shadow-none bg-slate-100 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Last Name"
            className="flex rounded-none mt-8 border-0 border-opacity-0 bg-transparent border-none shadow-none bg-slate-100 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Email"
            className="flex rounded-none mt-8 border-0 border-opacity-0 bg-transparent border-none shadow-none bg-slate-100 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex">
          <input
            type="password"
            placeholder="Password"
            className="flex rounded-none mt-8 border-0 border-opacity-0 bg-transparent border-none shadow-none bg-slate-100 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>

        <button className="flex w-60 justify-center bg-neutral-200 text-black mt-8">
          Register
        </button>
        <button className="flex w-60 justify-center bg-neutral-200 text-black mt-4">
          <div className="flex top-0">
            Register w/ Google
            <img src={googleIcon} alt="google" width={27} className="pl-1" />
          </div>
        </button>
      </Form>
    </div>
  );
};

export default Register;
