import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, UserPlus } from "lucide-react";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 bg_image flex items-center justify-center p-4 sm:p-6 text-white relative overflow-hidden">
      {/* Orqa fondagi neon nur va fon effekti */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Asosiy Kartochka Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl bg-gray-900/90 border border-gray-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col md:flex-row min-h-[620px]"
      >
        {/* Chap Tomon: Vizual va Rasm bo'limi */}
        <div className="relative hidden md:block md:w-1/2 overflow-hidden group">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            src="./martin.jpg"
            alt="martin"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Rasm ustidagi gradient va overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />

          {/* Rasm ustidagi matnlar */}
          <div className="absolute bottom-12 left-0 right-0 text-center text-white px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-semibold mb-3 border border-sky-500/30">
                <UserPlus size={14} /> Xush kelibsiz
              </span>
              <h2 className="text-3xl font-bold tracking-wide">
                Bizning jamiyatga qo'shiling
              </h2>
              <p className="mt-3 text-sm text-gray-300 max-w-xs mx-auto leading-relaxed opacity-90">
                Tizimdan to'liq foydalanish va imkoniyatlarni boshqarish uchun ro'yxatdan o'ting.
              </p>
            </motion.div>
          </div>
        </div>

        {/* O'ng Tomon: Forma va Login Tugmasi */}
        <div className="w-full md:w-1/2 bg-gray-900 px-6 sm:px-10 py-10 flex flex-col justify-between">
          <div>
            {/* Tepadagi Navigatsiya (Sign In havolasi) */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs text-gray-400 font-medium hidden sm:inline">
                Hisobingiz bormi?
              </span>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-gray-950 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-sky-500/20"
                >
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </motion.button>
              </Link>
            </div>

            {/* Sarlavha */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                Sign Up
              </h1>
              <p className="text-sm text-gray-400 mb-8">
                Ro'yxatdan o'tish uchun quyidagi ma'lumotlarni kiriting.
              </p>
            </motion.div>

            {/* Forma Komponenti */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <RegisterForm />
            </motion.div>
          </div>

          {/* Pastki qismdagi qo'shimcha text/footer */}
          <div className="mt-8 pt-4 border-t border-gray-800/60 text-center text-xs text-gray-500">
            Ro'yxatdan o'tish orqali xizmat ko'rsatish shartlariga rozilik bildirasiz.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;