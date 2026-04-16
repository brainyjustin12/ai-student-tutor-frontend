import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiCheckCircle,
  FiFileText,
  FiMessageSquare,
  FiUpload,
  FiUsers,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

const features = [
  { icon: <FiMessageSquare size={24} />, title: "AI Chat Tutor", desc: "Ask any question and get clear explanations with African context." },
  { icon: <FiBookOpen size={24} />, title: "Quiz Generator", desc: "Auto-generate MCQs on any topic to test your knowledge." },
  { icon: <FiFileText size={24} />, title: "Notes Summarizer", desc: "Turn long notes and lessons into clean, revision-ready summaries." },
  { icon: <FiUpload size={24} />, title: "PDF Learning", desc: "Upload PDFs to get summaries, flashcards, and guided questions." },
  { icon: <FiBarChart2 size={24} />, title: "Performance Analytics", desc: "Track study patterns and get practical next-step recommendations." },
  { icon: <FiAward size={24} />, title: "Leaderboard", desc: "Stay motivated with friendly competition and visible progress." },
];

const highlights = [
  "Clear AI explanations designed for real student workflows",
  "Revision tools, practice, and progress tracking in one place",
  "Fast, mobile-friendly interface with a more polished experience",
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950">
      <section
        className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-primary-700 to-slate-950 text-white"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(14,165,233,0.84), rgba(29,78,216,0.9), rgba(15,23,42,0.94)), url('https://images.unsplash.com/photo-1753892208880-7032f44ad6ea?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50 backdrop-blur">
                <HiOutlineSparkles className="text-amber-300" size={18} />
                <span>Modern AI learning experience for students</span>
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
                Study smarter with a cleaner, faster AI tutor experience.
              </h1>
              <p className="mb-8 max-w-2xl text-lg text-blue-50/90 md:text-2xl">
                Chat, quiz, summarize, and track your progress in one modern learning workspace built for focused students.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3 text-lg font-semibold text-primary-700 shadow-xl shadow-slate-950/20 transition-all hover:bg-primary-50"
                >
                  <span>Get Started Free</span>
                  <FiArrowRight />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-3 text-lg font-semibold text-white backdrop-blur transition-all hover:bg-white/15"
                >
                  <FiUsers />
                  <span>Sign In</span>
                </Link>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-slate-950/20 px-4 py-4 backdrop-blur">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-cyan-300" size={18} />
                    <p className="text-sm text-blue-50/90">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/15 bg-slate-950/35 p-6 shadow-2xl shadow-slate-950/35 backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-blue-100/70">Student Focus</p>
                  <h2 className="mt-2 text-2xl font-semibold">Everything you need to excel</h2>
                </div>
                <div className="rounded-2xl bg-white/10 p-3 text-cyan-200">
                  <HiOutlineSparkles size={24} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {features.slice(0, 4).map((feature) => (
                  <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary-700 shadow-lg shadow-slate-950/10">
                      {feature.icon}
                    </div>
                    <h3 className="text-base font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-blue-50/80">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-100 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-slate-900 md:text-4xl">A modern learning toolkit</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
            Professional icons, clearer content blocks, and a cleaner blue visual style make the home page feel more polished and trustworthy.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-[28px] border border-blue-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-primary-700">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-blue-100 bg-white/95 py-8 text-center text-sm text-slate-500">
        <div className="mx-auto max-w-6xl px-4">Copyright &copy; {new Date().getFullYear()} AI Tutor. All rights reserved.</div>
      </footer>
    </div>
  );
}
