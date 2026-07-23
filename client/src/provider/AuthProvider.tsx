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
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  loading: boolean;
  setLoading: (load: boolean) => void;
  handleRegister: (data: RegisterData) => void;
  handleLogin: (data: LoginData) => void;
  handleForgotPassword: (data: ForgotPasswordData) => void;
  handleResetPassword: (data: ResetPasswordData) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (registerData: RegisterData) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", registerData);
      localStorage.setItem("accessToken", data.accessToken);
      console.log(data);
      toast.success("Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  const handleLogin = async (loginData: LoginData) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", loginData);
      localStorage.setItem("accessToken", data.accessToken);
      toast.success("Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Authentication failed");
    }
  };

  const handleForgotPassword = async (data: ForgotPasswordData) => {
    try {
      await axiosInstance.post("/auth/forgot-password", data);
      toast.success("Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Reseting password failed");
    }
  };

  const handleResetPassword = async (data: ResetPasswordData) => {
    try {
      await axiosInstance.post("/auth/reset-password", data);
      toast.success("Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Password updated failed");
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("accessToken");
      toast.success("Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Sign Out failed");
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
          handleLogout,
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
