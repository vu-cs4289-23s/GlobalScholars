import { Form } from "react-router-dom";
import googleIcon from "../../assets/Login&Register/google-icon.svg";
const Register = () => {
  return (
    <div className=" absolute left-[5%] top-[20%]  bg-[rgba(255,255,255,0.5)]  w-80 sm:w-96 h-[60%] flex text-slate-600 ">
      <Form
        className=" flex flex-col items-center justify-center align-middle w-full  rounded-lg shadow-xl "
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
        }}
      >
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="Username"
            className="flex rounded-none  bg-transparent border-none shadow-none ring-0 placeholder-slate-600 hover:ring-0 hover:outline-none  focus:outline-none border-b-orange-50 focus:ring-0"
          />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="First Name"
            className="flex rounded-none mt-8  border-b-2 bg-transparent border-none ring-0 shadow-none placeholder-slate-600  hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="Last Name"
            className="flex rounded-none mt-8  bg-transparent border-none shadow-none ring-0  placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="Email"
            className="flex rounded-none mt-8  bg-transparent border-none shadow-none ring-0 placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="password"
            placeholder="Password"
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
