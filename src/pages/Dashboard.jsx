import { Link } from "react-router-dom";
import { FiArrowRight, FiAward, FiBarChart2, FiBookOpen, FiFileText, FiMessageSquare, FiUpload, FiUser } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

const cards = [
  { to: "/chat", icon: <FiMessageSquare size={24} />, title: "AI Chat Tutor", desc: "Ask questions and learn clearly.", color: "from-blue-500 to-cyan-500" },
  { to: "/quiz", icon: <FiBookOpen size={24} />, title: "Quiz Generator", desc: "Test your knowledge with practice sets.", color: "from-emerald-500 to-teal-500" },
  { to: "/summarize", icon: <FiFileText size={24} />, title: "Notes Summarizer", desc: "Condense long notes into revision points.", color: "from-indigo-500 to-blue-600" },
  { to: "/pdf-learn", icon: <FiUpload size={24} />, title: "PDF Learning", desc: "Study from uploaded documents and flashcards.", color: "from-orange-500 to-amber-500" },
  { to: "/analytics", icon: <FiBarChart2 size={24} />, title: "Analytics", desc: "Track performance and risk levels.", color: "from-fuchsia-500 to-pink-500" },
  { to: "/leaderboard", icon: <FiAward size={24} />, title: "Leaderboard", desc: "Compare progress with top students.", color: "from-yellow-500 to-orange-500" },
  { to: "/profile", icon: <FiUser size={24} />, title: "My Profile", desc: "Manage your account and learning stats.", color: "from-sky-500 to-blue-600" },
];

export default function Dashboard() {
  return (
    <div className="app-page">
      <div className="mb-8 rounded-[32px] border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-sky-100 p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="app-kicker">
          <HiOutlineSparkles size={14} />
          <span>Learning Workspace</span>
        </div>
        <h1 className="app-title">Welcome back</h1>
        <p className="app-subtitle">Choose a study tool below and keep moving with a cleaner, more focused workflow.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.to} to={card.to} className="group block">
            <div className="app-card h-full overflow-hidden p-0 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className={`bg-gradient-to-br ${card.color} p-6 text-white`}>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-white/85">{card.desc}</p>
              </div>
              <div className="flex items-center justify-between px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                <span>Open workspace</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
