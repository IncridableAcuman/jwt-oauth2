import React, { createContext, useContext, useState } from "react";
import type IUser from "../interfaces/user.interface";
import type {
  ForgotPasswordData,
  LoginData,
  RegisterData,
  ResetPasswordData,
} from "../schema/auth.schema";
import { toast } from "react-toastify";
import axiosInstance from "../api/api";

type AuthContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  loading: boolean;
  setLoading: (load: boolean) => void;
  handleRegister: (data: RegisterData) => void;
  handleLogin: (data: LoginData) => void;
  handleForgotPassword: (data: ForgotPasswordData) => void;
  handleResetPassword: (data: ResetPasswordData) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: RegisterData) => {
    try {
      await axiosInstance.post("/auth/register", data);
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  const handleLogin = async (data: LoginData) => {
    try {
      await axiosInstance.post("/auth/login", data);
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  const handleForgotPassword = async (data: ForgotPasswordData) => {
    try {
      await axiosInstance.post("/auth/forgot-password", data);
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  const handleResetPassword = async (data: ResetPasswordData) => {
    try {
      await axiosInstance.post("/auth/reset-password", data);
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          loading,
          setLoading,
          handleRegister,
          handleLogin,
          handleForgotPassword,
          handleResetPassword,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Contexting error");
  return context;
};
