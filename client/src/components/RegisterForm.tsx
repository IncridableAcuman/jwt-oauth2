import { Lock, Mail, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/auth.schema";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });
  return (
    <>
      <form
        className={`space-y-4`}
        onSubmit={handleSubmit((data) => console.log(data))}
      >
          <div className="">
            <div className="flex items-center border-b pb-2">
              <UserRound size={20} />
              <input
                type="text"
                placeholder="Username"
                {...register("username" as any)}
                className="ml-3 w-full outline-none"
              />
            </div>
            {errors.username?.message && (
              <p className="mt-1 text-xs text-red-600">
                {errors.username?.message}
              </p>
            )}
          </div>
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
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
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
        <button className="w-full py-3 rounded cursor-pointer bg-sky-500 hover:bg-sky-400 transition text-white">
          Sign Up
        </button>
      </form>
      <span className="text-sm flex items-center justify-center py-4">or</span>
      <div className="flex items-center justify-center gap-4">
        <svg
          className="w-10 h-10 cursor-pointer hover:bg-sky-500 rounded-full transition duration-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path
            fill="rgb(116, 192, 252)"
            d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z"
          />
        </svg>
        <svg
          className="w-10 h-10 cursor-pointer hover:bg-sky-500 rounded-full transition duration-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path
            fill="rgb(116, 192, 252)"
            d="M280.5 426.5C214.5 418.5 168 371 168 309.5C168 284.5 177 257.5 192 239.5C185.5 223 186.5 188 194 173.5C214 171 241 181.5 257 196C276 190 296 187 320.5 187C345 187 365 190 383 195.5C398.5 181.5 426 171 446 173.5C453 187 454 222 447.5 239C463.5 258 472 283.5 472 309.5C472 371 425.5 417.5 358.5 426C375.5 437 387 461 387 488.5L387 540.5C387 555.5 399.5 564 414.5 558C505 523.5 576 433 576 321C576 179.5 461 64 319.5 64C178 64 64 179.5 64 321C64 432 134.5 524 229.5 558.5C243 563.5 256 554.5 256 541L256 501C249 504 240 506 232 506C199 506 179.5 488 165.5 454.5C160 441 154 433 142.5 431.5C136.5 431 134.5 428.5 134.5 425.5C134.5 419.5 144.5 415 154.5 415C169 415 181.5 424 194.5 442.5C204.5 457 215 463.5 227.5 463.5C240 463.5 248 459 259.5 447.5C268 439 274.5 431.5 280.5 426.5z"
          />
        </svg>
      </div>
    </>
  );
};

export default RegisterForm;
