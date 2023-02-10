import Register from "../components/login&register/register";
import Header from "../components/login&register/header";
export default function RegisterPage() {
  return (
    <div className="h-screen w-screen bg-[url('/login-background.png')] bg-no-repeat bg-cover ">
      <Header />
      <div className="flex">
        <Register />
      </div>
    </div>
  );
}
