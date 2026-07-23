import React, { useState } from "react";
import { Lock, Mail, UserRound, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterData } from "../schema/auth.schema";
import { UseAuth } from "../provider/AuthProvider";
import { motion } from "framer-motion";

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const { handleRegister } = UseAuth();

  const onSubmit = async (data: RegisterData) => {
    try {
      await handleRegister(data);
    } catch (error) {
      console.error("Register Error:", error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Username input */}
        <div>
          <div className="relative flex items-center group">
            <UserRound
              size={18}
              className="absolute left-3.5 text-gray-400 group-focus-within:text-sky-400 transition-colors duration-300"
            />
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
              className="w-full pl-11 pr-4 py-3 bg-gray-800/60 border border-gray-700/80 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300"
            />
          </div>
          {errors.username?.message && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs text-red-400 font-medium pl-1"
            >
              {errors.username.message}
            </motion.p>
          )}
        </div>

        {/* Email input */}
        <div>
          <div className="relative flex items-center group">
            <Mail
              size={18}
              className="absolute left-3.5 text-gray-400 group-focus-within:text-sky-400 transition-colors duration-300"
            />
            <input
              type="email"
              id="email"
              placeholder="Email manzil"
              {...register("email")}
              className="w-full pl-11 pr-4 py-3 bg-gray-800/60 border border-gray-700/80 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300"
            />
          </div>
          {errors.email?.message && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs text-red-400 font-medium pl-1"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        {/* Password input */}
        <div>
          <div className="relative flex items-center group">
            <Lock
              size={18}
              className="absolute left-3.5 text-gray-400 group-focus-within:text-sky-400 transition-colors duration-300"
            />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Parol kiritning"
              {...register("password")}
              className="w-full pl-11 pr-11 py-3 bg-gray-800/60 border border-gray-700/80 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-gray-400 hover:text-gray-200 transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password?.message && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs text-red-400 font-medium pl-1"
            >
              {errors.password.message}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-gray-950 font-semibold transition-all duration-300 shadow-lg shadow-sky-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Yuborilmoqda...</span>
            </>
          ) : (
            <span>Sign Up</span>
          )}
        </motion.button>
      </form>

      {/* Or Ajratuvchi Liniya */}
      <div className="relative flex items-center justify-center my-6">
        <div className="border-t border-gray-800 w-full" />
        <span className="bg-gray-900 px-3 text-xs text-gray-500 uppercase tracking-wider absolute">
          yoki
        </span>
      </div>

      {/* Social Register Options */}
      <div className="flex items-center justify-center gap-4">
        {/* Google Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          aria-label="Google orqali kirish"
          className="p-3 rounded-xl bg-gray-800/80 border border-gray-700/60 hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 group"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.6-.8-1-1.8-1-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 22.3 12 23z"
            />
          </svg>
        </motion.button>

        {/* GitHub Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          aria-label="GitHub orqali kirish"
          className="p-3 rounded-xl bg-gray-800/80 border border-gray-700/60 hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 group text-gray-300 hover:text-white"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default RegisterForm;