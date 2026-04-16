import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { PiStudentBold } from "react-icons/pi";

export default function Navbar() {
  const { isAuth, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = isAuth
    ? [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/chat", label: "AI Tutor" },
        { to: "/quiz", label: "Quiz" },
        { to: "/summarize", label: "Summarizer" },
        { to: "/pdf-learn", label: "PDF Learn" },
        { to: "/analytics", label: "Analytics" },
        { to: "/leaderboard", label: "Leaderboard" },
        { to: "/profile", label: "Profile" },
      ]
    : [];

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-100 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold text-primary-700 dark:text-primary-400">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/20">
            <PiStudentBold size={20} />
          </span>
          <span>AI Tutor</span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-slate-600 transition-colors hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggle}
            className="rounded-xl p-2 transition-colors hover:bg-blue-50 dark:hover:bg-gray-800"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>
          {isAuth ? (
            <button onClick={handleLogout} className="rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600">
              Logout
            </button>
          ) : (
            <Link to="/login" className="rounded-lg bg-primary-600 px-3 py-1.5 text-sm text-white hover:bg-primary-700">
              Login
            </Link>
          )}
        </div>

        <button className="p-2 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {open && (
        <div className="space-y-2 border-t bg-white p-4 dark:border-gray-800 dark:bg-gray-900 md:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2 text-slate-700 hover:text-primary-600 dark:text-slate-300"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button onClick={toggle} className="inline-flex w-full items-center gap-2 py-2 text-left text-slate-700 dark:text-slate-300">
            {dark ? <FiSun /> : <FiMoon />}
            <span>{dark ? "Light Mode" : "Dark Mode"}</span>
          </button>
          {isAuth ? (
            <button onClick={handleLogout} className="w-full py-2 text-left text-red-500">
              Logout
            </button>
          ) : (
            <Link to="/login" className="block py-2 text-primary-600" onClick={() => setOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
