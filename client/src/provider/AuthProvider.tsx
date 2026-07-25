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
  handleRegister: (data: RegisterData) => Promise<void>;
  handleLogin: (data: LoginData) => Promise<void>;
  handleForgotPassword: (data: ForgotPasswordData) => Promise<void>;
  handleResetPassword: (data: ResetPasswordData) => Promise<void>;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const getErrorMessage = (error: any, fallbackMessage: string): string => {
  // 1. Standart Axios response.data.message
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  // 2. Agar response.data ning o'zi string bo'lsa
  if (typeof error?.response?.data === "string") {
    return error.response.data;
  }
  // 3. Interceptor data'ni chiqarib bergan bo'lsa (error.data.message)
  if (error?.data?.message) {
    return error.data.message;
  }
  // 4. Axios / JavaScript xabari
  if (error?.message && !error?.response) {
    return error.message;
  }
  
  return fallbackMessage;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (registerData: RegisterData) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", registerData);
      localStorage.setItem("accessToken", data.accessToken);
      toast.success("Muvaffaqiyatli ro'yxatdan o'tingiz!");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(getErrorMessage(error, "Ro'yxatdan o'tishda xatolik yuz berdi"));
    }
  };

  const handleLogin = async (loginData: LoginData) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", loginData);
      localStorage.setItem("accessToken", data.accessToken);
      toast.success("Tizimga muvaffaqiyatli kirdingiz!");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      // Rasmdagi "Password doesn't match" kabi xabarlar mana shu yerda chiqadi
      toast.error(getErrorMessage(error, "Tizimga kirishda xatolik yuz berdi"));
    }
  };

  const handleForgotPassword = async (data: ForgotPasswordData) => {
    try {
      await axiosInstance.post("/auth/forgot-password", data);
      toast.success("Parolni tiklash havolasi yuborildi!");
    } catch (error: any) {
      console.error(error);
      toast.error(getErrorMessage(error, "So'rov yuborishda xatolik yuz berdi"));
    }
  };

  const handleResetPassword = async (data: ResetPasswordData) => {
    try {
      await axiosInstance.patch("/auth/reset-password", data);
      toast.success("Parolingiz muvaffaqiyatli yangilandi!");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(getErrorMessage(error, "Parolni yangilashda xatolik yuz berdi"));
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("accessToken");
      toast.success("Tizimdan chiqildi");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(getErrorMessage(error, "Tizimdan chiqishda xatolik yuz berdi"));
    }
  };

  return (
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
  );
};

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("UseAuth AuthProvider ichida ishlatilishi kerak!");
  return context;
};