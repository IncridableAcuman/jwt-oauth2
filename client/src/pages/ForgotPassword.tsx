import { Link } from "react-router-dom";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg_image flex items-center justify-center p-6">
      <div className="w-full max-w-5xl h-150 bg-white rounded-xl overflow-hidden  shadow-2xl flex">
        <div className="relative hidden md:block md:w-1/2">
          <img src="./martin.jpg" alt="martin" />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute bottom-12 left-0 right-0 text-center text-white px-10">
            <h2 className="text-4xl font-bold">Welcome Page</h2>

            <p className="mt-4 text-sm opacity-80">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-white px-12 py-10">
          <div className="flex justify-end mb-12 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <Link to={"/auth"} className={`bg-sky-500 text-white p-2 px-5 rounded`}>
              Sign In
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-10">Forgot Password</h1>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
