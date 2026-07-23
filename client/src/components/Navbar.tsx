import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { UseAuth } from "../provider/AuthProvider";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { handleLogout } = UseAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-xl font-bold cursor-pointer">
          <span className="text-sky-500">Java</span>
          <span className="text-white">Auth</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          <li className="cursor-pointer hover:text-sky-500 transition">Home</li>
          <li className="cursor-pointer hover:text-sky-500 transition">
            Services
          </li>
          <li className="cursor-pointer hover:text-sky-500 transition">
            Skills
          </li>
          <li className="cursor-pointer hover:text-sky-500 transition">
            Contact
          </li>
        </ul>

        {/* Desktop Profile */}
        <button
          onClick={() => handleLogout()}
          className="hidden md:block cursor-pointer hover:text-gray-200 transition duration-300"
        >
          <LogOut size={20} />
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <ul className="bg-gray-800 flex flex-col items-center py-4 space-y-5">
          <li className="cursor-pointer hover:text-sky-500 transition">Home</li>
          <li className="cursor-pointer hover:text-sky-500 transition">
            Services
          </li>
          <li className="cursor-pointer hover:text-sky-500 transition">
            Skills
          </li>
          <li className="cursor-pointer hover:text-sky-500 transition">
            Contact
          </li>

          <button className="cursor-pointer hover:text-gray-200 transition duration-300">
            <LogOut size={20} />
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
