import React, { useState } from "react";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  type ResetPasswordData,
} from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseAuth } from "../provider/AuthProvider";
import { motion } from "framer-motion";

const ResetPasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { handleResetPassword } = UseAuth();

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      if (handleResetPassword) {
        await handleResetPassword(data);
      } else {
        console.log("Reset password data:", data);
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* New Password Input */}
        <div>
          <div className="relative flex items-center group">
            <Lock
              size={18}
              className="absolute left-3.5 text-gray-400 group-focus-within:text-sky-400 transition-colors duration-300"
            />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Yangi parol"
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

        {/* Confirm Password Input */}
        <div>
          <div className="relative flex items-center group">
            <Lock
              size={18}
              className="absolute left-3.5 text-gray-400 group-focus-within:text-sky-400 transition-colors duration-300"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Yangi parolni tasdiqlang"
              {...register("confirmPassword")}
              className="w-full pl-11 pr-11 py-3 bg-gray-800/60 border border-gray-700/80 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 text-gray-400 hover:text-gray-200 transition-colors focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword?.message && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs text-red-400 font-medium pl-1"
            >
              {errors.confirmPassword.message}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-gray-950 font-semibold transition-all duration-300 shadow-lg shadow-sky-500/20 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Saqlanmoqda...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              <span>Parolni O'zgartirish</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;