import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const urlWithProxy = "/api/v1";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (ev) => {
    ev.preventDefault();
    // Only proceed if there are no errors
    try {
      const res = await axios.post(`${urlWithProxy}/user`, {
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        primary_email: email,
        city: "",
      });
      console.log(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };
  const handleRegister = (e) => {
    console.log("REG LOGIN");
    console.log(username, firstName, lastName, email, password);

    e.preventDefault();
  };
  return (
    <div className=" absolute left-[5%] top-[20%]  bg-[rgba(255,255,255,0.5)]  w-80 sm:w-96 h-[60%] flex text-slate-600 ">
      <Form
        className=" flex flex-col items-center justify-center align-middle w-full  rounded-lg shadow-xl "
        onSubmit={onSubmit}
      >
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="flex rounded-none  bg-transparent border-none shadow-none ring-0 placeholder-slate-600 hover:ring-0 hover:outline-none  focus:outline-none border-b-orange-50 focus:ring-0"
          />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            className="flex rounded-none mt-8  border-b-2 bg-transparent border-none ring-0 shadow-none placeholder-slate-600  hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="flex rounded-none mt-8  bg-transparent border-none shadow-none ring-0  placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="flex rounded-none mt-8  bg-transparent border-none shadow-none ring-0 placeholder-slate-600 hover:ring-0 hover:outline-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex border-b-[1px] border-slate-400">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
