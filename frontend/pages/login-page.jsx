import Login from "../components/login&register/login";
import Header from "../components/login&register/header";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen bg-[url('/login-background.png')]">
      <Header />
      <div className="flex">
        <Login />
      </div>
    </div>
  );
}
