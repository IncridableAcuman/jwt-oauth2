import { Lock } from "lucide-react";

const ResetPasswordForm = () => {
  return (
    <>
      <form className="space-y-8">
        <div className="flex items-center border-b pb-2">
          <Lock size={20} />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*********"
            className="ml-3 w-full outline-none"
          />
        </div>
        <div className="flex items-center border-b pb-2">
          <Lock size={20} />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*********"
            className="ml-3 w-full outline-none"
          />
        </div>
        <button className="w-full py-3 rounded cursor-pointer bg-sky-500 hover:bg-sky-400 transition text-white">
          Reset Password
        </button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
