import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";
import { FiGlobe, FiLock, FiMail, FiUser } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", school: "", grade: "", country: "Rwanda" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      login(data.token, data.user);
      toast.success("Account created!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const input = "app-input mb-3";

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
      <form onSubmit={handleSubmit} className="app-card w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <div className="app-kicker justify-center">
            <HiOutlineSparkles size={14} />
            <span>Get Started</span>
          </div>
          <h2 className="app-title text-3xl">Create account</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Set up your profile and start learning in minutes.</p>
        </div>

        <div className="relative">
          <FiUser className="pointer-events-none absolute left-4 top-4 text-slate-400" />
          <input type="text" placeholder="Full Name" required className={`${input} pl-11`} value={form.name} onChange={set("name")} />
        </div>
        <div className="relative">
          <FiMail className="pointer-events-none absolute left-4 top-4 text-slate-400" />
          <input type="email" placeholder="Email" required className={`${input} pl-11`} value={form.email} onChange={set("email")} />
        </div>
        <div className="relative">
          <FiLock className="pointer-events-none absolute left-4 top-4 text-slate-400" />
          <input type="password" placeholder="Password" required minLength={6} className={`${input} pl-11`} value={form.password} onChange={set("password")} />
        </div>
        <input type="text" placeholder="School" className={input} value={form.school} onChange={set("school")} />
        <input type="text" placeholder="Grade/Class" className={input} value={form.grade} onChange={set("grade")} />
        <div className="relative">
          <FiGlobe className="pointer-events-none absolute left-4 top-4 text-slate-400" />
          <select className={`${input} pl-11`} value={form.country} onChange={set("country")}>
            {["Rwanda", "Kenya", "Uganda", "Tanzania", "Nigeria", "Ghana", "Ethiopia", "South Africa", "Other"].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button disabled={loading} className="app-button w-full">{loading ? "Creating..." : "Create Account"}</button>
        <p className="mt-4 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-primary-600 hover:underline">Sign In</Link></p>
      </form>
    </div>
  );
}
