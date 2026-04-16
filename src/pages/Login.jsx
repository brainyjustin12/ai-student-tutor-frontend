import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";
import { FiLock, FiMail } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.token, data.user);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="app-card w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <div className="app-kicker justify-center">
            <HiOutlineSparkles size={14} />
            <span>Secure Access</span>
          </div>
          <h2 className="app-title text-3xl">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sign in to continue your learning session.</p>
        </div>

        <div className="relative mb-4">
          <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="email" placeholder="Email" required className="app-input pl-11" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>

        <div className="relative mb-6">
          <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="password" placeholder="Password" required className="app-input pl-11" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>

        <button disabled={loading} className="app-button w-full">{loading ? "Signing in..." : "Sign In"}</button>
        <p className="mt-4 text-center text-sm text-slate-500">Don't have an account? <Link to="/register" className="font-semibold text-primary-600 hover:underline">Register</Link></p>
      </form>
    </div>
  );
}
