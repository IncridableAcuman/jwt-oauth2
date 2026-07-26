import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const OAuth2RedirectHandler: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      // Tokenni localStorage'ga saqlaymiz (xuddi sizning AuthProvider'dagidek)
      localStorage.setItem("accessToken", token);
      toast.success("OAuth2 orqali muvaffaqiyatli kirdingiz!");
      navigate("/", { replace: true });
    } else {
      toast.error(error || "OAuth2 orqali kirishda xatolik yuz berdi");
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
      <Loader2 size={40} className="animate-spin text-sky-500 mb-4" />
      <p className="text-gray-400 text-sm font-medium">
        Avtorizatsiya yakunlanmoqda, iltimos kuting...
      </p>
    </div>
  );
};

export default OAuth2RedirectHandler;