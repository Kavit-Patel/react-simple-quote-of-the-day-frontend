import { useState } from "react";
// import { useAuth } from "../context/UseAuth";
import Loader from "../components/Loader";
import { useLogin } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync: login, isLoading } = useLogin();
  const queryClient = useQueryClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await login({ email, password });
    queryClient.setQueryData("user", data);
    navigate("/");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form
        className="w-full md:w-[60%] p-4 flex flex-col gap-3 "
        onSubmit={handleLogin}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 mb-4 rounded-md"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 mb-4"
        />

        <button className="w-full flex justify-center bg-blue-500 text-white px-4 py-2 rounded-md transition-all hover:bg-blue-600 active:scale-95">
          {isLoading ? <Loader /> : <span>Sign In</span>}
        </button>
      </form>
    </div>
  );
};

export default Login;
