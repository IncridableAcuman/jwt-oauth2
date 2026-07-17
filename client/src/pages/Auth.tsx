import { Lock, Mail, UserRound } from "lucide-react";
const Auth = () => {
  return (
    <div className="min-h-screen bg_image flex items-center justify-center p-6">
      <div className="w-full max-w-5xl h-150 bg-white rounded-xl overflow-hidden shadow-2xl flex">
        <div className="hidden md:block md:w-1/2">
          <img src="./martin.jpg" alt="martin" />
        </div>
        <div className="w-full md:w-1/2 bg-white px-12 py-10">
          <div className="flex justify-end mb-12 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <button>Sign In</button>
            <button>Sign Up</button>
          </div>
          <h1 className="text-3xl font-bold mb-10">Register</h1>
          <form className="space-y-8">
            <div className="flex items-center border-b pb-2">
              <UserRound size={20} />
              <input
                type="text"
                placeholder="Username"
                className="ml-3 w-full outline-none"
              />
            </div>
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
