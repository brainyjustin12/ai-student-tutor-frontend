import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { FiBookOpen, FiCheckCircle, FiHelpCircle } from "react-icons/fi";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [numQ, setNumQ] = useState(5);
  const [difficulty, setDifficulty] = useState("medium");
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setQuiz(null);
    setResult(null);
    setAnswers({});
    try {
      const { data } = await api.post("/generate-quiz", { topic, numQuestions: numQ, difficulty });
      setQuiz(data);
    } catch {
      toast.error("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    if (!quiz) return;
    setLoading(true);
    try {
      const ansArr = quiz.questions.map((_, i) => answers[i] ?? -1);
      const { data } = await api.post("/generate-quiz/submit", { quizId: quiz._id, answers: ansArr });
      setResult(data);
      toast.success(`Score: ${data.percentage}%`);
    } catch {
      toast.error("Submit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page-narrow">
      <div className="mb-6">
        <div className="app-kicker">
          <FiBookOpen size={14} />
          <span>Practice</span>
        </div>
        <h1 className="app-title text-3xl">Quiz Generator</h1>
        <p className="app-subtitle">Build a quick quiz on any topic and review explanations after you submit.</p>
      </div>

      {!quiz ? (
        <div className="app-card space-y-4">
          <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter a topic (e.g., Photosynthesis)" className="app-input" />
          <div className="flex gap-4">
            <select value={numQ} onChange={(e) => setNumQ(+e.target.value)} className="app-input w-auto">
              {[3, 5, 10].map((n) => <option key={n} value={n}>{n} Questions</option>)}
            </select>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="app-input w-auto">
              {["easy", "medium", "hard"].map((d) => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
            </select>
          </div>
          <button onClick={generate} disabled={loading} className="app-button">{loading ? "Generating..." : "Generate Quiz"}</button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="app-card-soft">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Topic: {quiz.topic}</h2>
          </div>
          {quiz.questions.map((q, i) => (
            <div key={i} className="app-card">
              <p className="mb-3 font-medium">{i + 1}. {q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, j) => (
                  <label key={j} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${answers[i] === j ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"} ${result ? (j === q.correctAnswer ? "border-green-500 bg-green-50 dark:bg-green-900/20" : answers[i] === j ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "") : ""}`}>
                    <input type="radio" name={`q${i}`} disabled={!!result} checked={answers[i] === j} onChange={() => setAnswers({ ...answers, [i]: j })} className="accent-primary-600" />
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>
              {result && q.explanation && <p className="mt-3 flex items-start gap-2 text-sm italic text-slate-500 dark:text-slate-400"><FiHelpCircle className="mt-0.5 shrink-0" /> {q.explanation}</p>}
            </div>
          ))}
          {!result ? (
            <button onClick={submit} disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"><FiCheckCircle /> {loading ? "Submitting..." : "Submit Answers"}</button>
          ) : (
            <div className="app-card text-center">
              <p className="mb-2 text-3xl font-bold">{result.percentage}%</p>
              <p className="text-slate-500">{result.score} / {result.total} correct</p>
              <button onClick={() => { setQuiz(null); setResult(null); setAnswers({}); }} className="app-button mt-4">New Quiz</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
