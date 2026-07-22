import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { forgotPasswordSchema } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  return (
    <>
      <form
        className="space-y-8"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className="">
          <div className="flex items-center border-b pb-2">
            <Mail size={20} />
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Email"
              className="ml-3 w-full outline-none"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email?.message}</p>
          )}
        </div>
        <button className="w-full py-3 rounded cursor-pointer bg-sky-500 hover:bg-sky-400 transition text-white">
          Forgot Password
        </button>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
