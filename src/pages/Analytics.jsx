import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { FiAlertTriangle, FiBarChart2, FiCheckCircle, FiZap } from "react-icons/fi";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/predict-performance").then((r) => setData(r.data)).catch(() => toast.error("Failed to load analytics")).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" /></div>;

  return (
    <div className="app-page-narrow">
      <div className="mb-6">
        <div className="app-kicker">
          <FiBarChart2 size={14} />
          <span>Insights</span>
        </div>
        <h1 className="app-title text-3xl">Performance Analytics</h1>
        <p className="app-subtitle">Review AI predictions, strengths, and the areas where you can improve next.</p>
      </div>

      {data && (
        <div className="space-y-6">
          <div className="app-card">
            <h3 className="mb-2 font-semibold">AI Prediction</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">{data.prediction}</p>
            {data.riskLevel && data.riskLevel !== "unknown" && (
              <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${data.riskLevel === "low" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : data.riskLevel === "high" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>Risk: {data.riskLevel}</span>
            )}
          </div>
          {data.insights?.length > 0 && (
            <div className="app-card">
              <h3 className="mb-3 font-semibold">Insights</h3>
              <ul className="space-y-2">{data.insights.map((ins, i) => <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"><FiZap className="mt-0.5 shrink-0 text-amber-500" />{ins}</li>)}</ul>
            </div>
          )}
          {data.strengths?.length > 0 && (
            <div className="app-card">
              <h3 className="mb-3 font-semibold text-green-600">Strengths</h3>
              <ul className="space-y-1">{data.strengths.map((s, i) => <li key={i} className="flex items-start gap-2 text-sm"><FiCheckCircle className="mt-0.5 shrink-0 text-green-500" />{s}</li>)}</ul>
            </div>
          )}
          {data.weaknesses?.length > 0 && (
            <div className="app-card">
              <h3 className="mb-3 font-semibold text-red-600">Areas to Improve</h3>
              <ul className="space-y-1">{data.weaknesses.map((w, i) => <li key={i} className="flex items-start gap-2 text-sm"><FiAlertTriangle className="mt-0.5 shrink-0 text-red-500" />{w}</li>)}</ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
