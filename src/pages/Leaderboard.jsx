import { useState, useEffect } from "react";
import api from "../services/api";
import { FiAward } from "react-icons/fi";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/leaderboard").then((r) => setUsers(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" /></div>;

  return (
    <div className="app-page-narrow">
      <div className="mb-6">
        <div className="app-kicker">
          <FiAward size={14} />
          <span>Competition</span>
        </div>
        <h1 className="app-title text-3xl">Leaderboard</h1>
        <p className="app-subtitle">See how students are performing and track the top scores in the app.</p>
      </div>

      <div className="app-card overflow-hidden p-0">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Rank</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Student</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">School</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">Score</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">Avg</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-800">
            {users.map((u, i) => (
              <tr key={u._id} className="transition-colors hover:bg-slate-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 text-lg">
                  <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${i < 3 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600 dark:bg-gray-800 dark:text-slate-300"}`}>
                    {i < 3 ? <FiAward /> : i + 1}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{u.school || "-"}</td>
                <td className="px-4 py-3 text-right font-semibold">{u.totalScore}</td>
                <td className="px-4 py-3 text-right text-sm text-slate-500">{u.avgScore?.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p className="py-8 text-center text-slate-400">No data yet. Take a quiz to get on the board.</p>}
      </div>
    </div>
  );
}
