import { useState, createContext, ReactNode } from "react";
import { useLogin, useRegister } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface User {
  id: number;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { email: string; password: string }) => Promise<void>;
  logOut: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { mutateAsync: login, isLoading: isLoginLoading } = useLogin();
  const { mutateAsync: register, isLoading: isRegisterLoading } = useRegister();
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await login(data);
      toast.success("Logged In Successfull !");
      setUser(response);
      navigate("/");
    } catch (error) {
      toast.error("Error while Logged In");
      console.error("Login failed", error);
    }
  };

  const handleRegister = async (data: { email: string; password: string }) => {
    try {
      const response = await register(data);
      toast.success("Logged In Successfull !");
      setUser(response);
      navigate("/");
    } catch (error) {
      toast.error("Error while Logged In");
      console.error("Registration failed", error);
    }
  };

  const logOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        register: handleRegister,
        isLoading: isLoginLoading || isRegisterLoading,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
