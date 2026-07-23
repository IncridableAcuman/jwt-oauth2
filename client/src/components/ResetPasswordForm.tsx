import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  type ResetPasswordData,
} from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <>
      <form
        className="space-y-8"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className="">
          <div className="flex items-center border-b pb-2">
            <Lock size={20} />
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="*********"
              className="ml-3 w-full outline-none"
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="">
          <div className="flex items-center border-b pb-2">
            <Lock size={20} />
            <input
              type="password"
              id="password"
              {...register("confirmPassword")}
              placeholder="*********"
              className="ml-3 w-full outline-none"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button className="w-full py-3 rounded cursor-pointer bg-sky-500 hover:bg-sky-400 transition text-white">
          Reset Password
        </button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
