import Register from "../components/login&register/register";
import Header from "../components/login&register/header";
export default function RegisterPage() {
  return (
    <div className="h-screen w-screen bg-[url('/login-background2.png')]">
      <Header />
      <div className="flex">
        <Register />
      </div>
    </div>
  );
}
