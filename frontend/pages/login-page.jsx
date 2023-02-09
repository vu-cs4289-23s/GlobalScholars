import Login from "../components/login";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen bg-[url('/login-background.png')]">
      <div className="flex">
        <Login />
      </div>
    </div>
  );
}
