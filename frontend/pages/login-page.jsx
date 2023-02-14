import Login from "../components/login&register/login";
import Header from "../components/login&register/header";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen bg-[url('/login-background.avif')] bg-no-repeat bg-cover">
      <Header />
      <div className="flex">
        <Login />
      </div>
    </div>
  );
}
