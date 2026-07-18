import { Mail } from "lucide-react";

const ForgotPasswordForm = () => {
  return (
    <>
      <form className="space-y-8">
        <div className="flex items-center border-b pb-2">
          <Mail size={20} />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="ml-3 w-full outline-none"
          />
        </div>
        <button className="w-full py-3 rounded cursor-pointer bg-sky-500 hover:bg-sky-400 transition text-white">
          Forgot Password
        </button>
      </form>
      
    </>
  );
};

export default ForgotPasswordForm;
