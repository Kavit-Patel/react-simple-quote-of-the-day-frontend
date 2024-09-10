import { useState, createContext, ReactNode } from "react";
import { useLogin, useRegister } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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
      setUser(response);
      navigate("/");
      toast.success("Login Successful !");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response
          ? error.response.data.message.join(", ")
          : "Login Failed !";
      toast.error(errorMessage);
    }
  };

  const handleRegister = async (data: { email: string; password: string }) => {
    try {
      const response = await register(data);
      setUser(response);
      navigate("/");
      toast.success("Registration successfull !");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response
          ? error.response.data.message.join(", ")
          : "Registration Failed !";
      toast.error(errorMessage);
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
