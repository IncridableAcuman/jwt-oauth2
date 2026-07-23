import React from "react";
import { Mail, Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  type ForgotPasswordData,
} from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseAuth } from "../provider/AuthProvider";
import { motion } from "framer-motion";

const ForgotPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { handleForgotPassword } = UseAuth();

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      await handleForgotPassword(data);
    } catch (error) {
      console.error("Forgot Password Error:", error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Input */}
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
            <>
              <Send size={18} />
              <span>Kodni Yuborish</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;