import React, { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UseAuth } from "../provider/AuthProvider";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { handleLogout } = UseAuth();

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md text-white border-b border-gray-800/80 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => handleNavClick("#")}
          className="text-xl font-bold cursor-pointer tracking-wider select-none"
        >
          <span className="text-cyan-400">Java</span>
          <span className="text-white">Auth</span>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-8"
        >
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNavClick(item.href)}
                className="relative py-1 text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full rounded-full" />
              </button>
            </li>
          ))}
        </motion.ul>

        {/* Desktop Profile & Logout */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center"
        >
          <button
            onClick={() => handleLogout()}
            title="Chiqish"
            className="p-2 rounded-xl bg-gray-800/60 text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-gray-700/50 hover:border-red-500/30 transition-all duration-300 active:scale-95"
          >
            <LogOut size={18} />
          </button>
        </motion.div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-gray-900/95 border-b border-gray-800 backdrop-blur-lg"
          >
            <ul className="flex flex-col items-center py-6 space-y-4">
              {navItems.map((item) => (
                <li key={item.label} className="w-full text-center">
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="w-full py-2 text-base font-medium text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}

              <li className="pt-2 w-full flex justify-center">
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all"
                >
                  <LogOut size={18} />
                  <span>Chiqish</span>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;