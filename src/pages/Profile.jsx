import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { FiCamera, FiEdit3, FiSave, FiUser } from "react-icons/fi";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [topicStats, setTopicStats] = useState({});
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/profile").then((r) => {
      setProfile(r.data.user);
      setTopicStats(r.data.topicStats);
      setRecentQuizzes(r.data.recentQuizzes);
      setForm({ name: r.data.user.name, bio: r.data.user.bio || "", school: r.data.user.school || "", grade: r.data.user.grade || "", country: r.data.user.country || "Rwanda", subjects: r.data.user.subjects || [] });
    }).finally(() => setLoading(false));
  }, []);

  const save = async () => {
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, k === "subjects" ? JSON.stringify(v) : v));
      if (avatar) fd.append("avatar", avatar);
      const { data } = await api.put("/profile", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setProfile(data);
      setEditing(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" /></div>;

  return (
    <div className="app-page-narrow space-y-6">
      <div>
        <div className="app-kicker">
          <FiUser size={14} />
          <span>Account</span>
        </div>
        <h1 className="app-title text-3xl">My Profile</h1>
        <p className="app-subtitle">Manage your details, view your stats, and keep your profile up to date.</p>
      </div>

      <div className="app-card">
        <div className="mb-6 flex items-center gap-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary-100 text-3xl dark:bg-primary-900/30">
              {profile?.avatar ? <img src={`http://localhost:5000${profile.avatar}`} alt="" className="h-full w-full object-cover" /> : profile?.name?.[0]?.toUpperCase()}
            </div>
            {editing && (
              <label className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-primary-600 p-1.5 text-white hover:bg-primary-700">
                <FiCamera size={14} />
                <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} className="hidden" />
              </label>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile?.name}</h2>
            <p className="text-sm text-slate-500">{profile?.email}</p>
            <p className="text-sm text-slate-500">{profile?.school} • {profile?.grade} • {profile?.country}</p>
          </div>
        </div>

        {editing ? (
          <div className="space-y-3">
            {["name", "bio", "school", "grade"].map((f) => (
              <input key={f} value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} className="app-input" />
            ))}
            <div className="flex gap-2">
              <button onClick={save} className="app-button px-4 py-2"><FiSave /> Save</button>
              <button onClick={() => setEditing(false)} className="app-button-secondary px-4 py-2">Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            {profile?.bio && <p className="mb-3 text-sm text-slate-600 dark:text-slate-400">{profile.bio}</p>}
            <div className="mb-4 flex flex-wrap gap-6 text-sm">
              <span><strong>{profile?.totalScore}</strong> Total Score</span>
              <span><strong>{profile?.quizzesTaken}</strong> Quizzes</span>
              <span><strong>{profile?.avgScore?.toFixed(1)}</strong> Avg Score</span>
              <span><strong>{profile?.streak}</strong> Day Streak</span>
            </div>
            <button onClick={() => setEditing(true)} className="app-button px-4 py-2"><FiEdit3 /> Edit Profile</button>
          </div>
        )}
      </div>

      {Object.keys(topicStats).length > 0 && (
        <div className="app-card">
          <h3 className="mb-4 font-semibold">Topic Performance</h3>
          <div className="space-y-3">
            {Object.entries(topicStats).map(([topic, s]) => {
              const pct = Math.round((s.correct / s.total) * 100);
              return (
                <div key={topic}>
                  <div className="mb-1 flex justify-between text-sm"><span>{topic}</span><span>{pct}% ({s.count} quizzes)</span></div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700"><div className="h-2 rounded-full bg-primary-600 transition-all" style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {recentQuizzes.length > 0 && (
        <div className="app-card">
          <h3 className="mb-4 font-semibold">Recent Quizzes</h3>
          <div className="space-y-2">
            {recentQuizzes.map((q) => (
              <div key={q._id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm dark:bg-gray-800/50">
                <span className="font-medium">{q.topic}</span>
                <span>{q.score}/{q.totalQuestions} ({Math.round((q.score / q.totalQuestions) * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
