import { useState } from "react";
import { useAuth } from "../context/UseAuth";
import Loader from "../components/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ email, password });
    setEmail("");
    setPassword("");
  };
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form
        className="w-full md:w-[60%] p-4 flex flex-col gap-3 "
        onSubmit={handleRegister}
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

        <button className="flex justify-center bg-blue-500 text-white px-4 py-2 rounded-md transition-all hover:bg-blue-600 active:scale-95">
          {isLoading ? <Loader /> : <span>Sign up</span>}
        </button>
      </form>
    </div>
  );
};

export default Register;
