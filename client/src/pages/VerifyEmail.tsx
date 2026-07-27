import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { UseAuth } from "../provider/AuthProvider";

type VerificationStatus = "loading" | "success" | "error";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { handleVerifyEmail } = UseAuth();

  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Tasdiqlash tokeni topilmadi!");
      return;
    }

    const verify = async () => {
      try {
        await handleVerifyEmail(token);
        setStatus("success");
        setMessage("Email muvaffaqiyatli tasdiqlandi!");
      } catch (err: any) {
        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            "Tasdiqlashda xatolik yuz berdi yoki token muddati o'tgan."
        );
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 text-white relative overflow-hidden">
      {/* Orqa fondagi neon nur va fon effektlari */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-gray-900/90 border border-gray-800/80 rounded-2xl p-8 shadow-2xl backdrop-blur-xl text-center relative z-10"
      >
        {/* 1. YUKLANISH HOLATI (LOADING) */}
        {status === "loading" && (
          <div className="flex flex-col items-center py-6 space-y-4">
            <Loader2 className="w-16 h-16 text-sky-400 animate-spin" />
            <h2 className="text-2xl font-bold tracking-tight">
              Email tasdiqlanmoqda...
            </h2>
            <p className="text-sm text-gray-400">
              Iltimos, bir oz kuting. Ma'lumotlar tekshirilmoqda.
            </p>
          </div>
        )}

        {/* 2. MUVAFFAQIYATLI HOLAT (SUCCESS) */}
        {status === "success" && (
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400"
            >
              <CheckCircle2 size={48} />
            </motion.div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              Tasdiqlandi!
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">{message}</p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/login")}
              className="w-full mt-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-gray-950 font-semibold transition-all duration-300 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
            >
              <span>Kirish (Sign In)</span>
              <ArrowRight size={18} />
            </motion.button>
          </div>
        )}

        {/* 3. XATOLIK HOLATI (ERROR) */}
        {status === "error" && (
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-400"
            >
              <XCircle size={48} />
            </motion.div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              Xatolik!
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">{message}</p>

            <div className="w-full pt-4 space-y-3">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700/80 transition-all duration-300"
                >
                  Qayta ro'yxatdan o'tish
                </motion.button>
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail;