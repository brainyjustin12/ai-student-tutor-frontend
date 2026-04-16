import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { FiBookOpen, FiFileText, FiMessageSquare, FiUpload } from "react-icons/fi";

export default function PdfLearn() {
  const [file, setFile] = useState(null);
  const [docs, setDocs] = useState([]);
  const [active, setActive] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fcIndex, setFcIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = () => api.get("/pdf-learn/documents").then((r) => setDocs(r.data));

  const upload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("pdf", file);
      const { data } = await api.post("/pdf-learn/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setActive(data);
      setFile(null);
      loadDocs();
      toast.success("PDF processed!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const ask = async () => {
    if (!question.trim() || !active) return;
    setLoading(true);
    setAnswer("");
    try {
      const { data } = await api.post("/pdf-learn/ask", { documentId: active._id, question });
      setAnswer(data.answer);
    } catch {
      toast.error("Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page space-y-6">
      <div>
        <div className="app-kicker">
          <FiFileText size={14} />
          <span>Documents</span>
        </div>
        <h1 className="app-title text-3xl">PDF Learning</h1>
        <p className="app-subtitle">Upload study documents, generate summaries and flashcards, and ask targeted questions.</p>
      </div>

      <div className="app-card">
        <h3 className="mb-4 flex items-center gap-2 font-semibold"><FiUpload /> Upload a PDF</h3>
        <div className="flex items-center gap-3">
          <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 p-6 transition-colors hover:bg-slate-50 dark:border-gray-700 dark:hover:bg-gray-800/50">
            <span className="text-sm text-slate-500">{file ? file.name : "Click to select PDF"}</span>
            <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
          </label>
          <button onClick={upload} disabled={!file || uploading} className="app-button whitespace-nowrap">{uploading ? "Processing..." : "Upload & Learn"}</button>
        </div>
      </div>

      {docs.length > 0 && !active && (
        <div className="app-card">
          <h3 className="mb-4 font-semibold">Your Documents</h3>
          <div className="space-y-2">
            {docs.map((d) => (
              <button key={d._id} onClick={() => { setActive(d); setFcIndex(0); setShowAnswer(false); setAnswer(""); }} className="flex w-full items-center justify-between rounded-xl bg-slate-50 p-3 text-left transition-colors hover:bg-slate-100 dark:bg-gray-800/50 dark:hover:bg-gray-800">
                <span className="text-sm font-medium">{d.fileName}</span>
                <span className="text-xs text-slate-400">{new Date(d.createdAt).toLocaleDateString()}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {active && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{active.fileName}</h2>
            <button onClick={() => { setActive(null); setAnswer(""); }} className="text-sm font-medium text-primary-600 hover:underline">Back to list</button>
          </div>

          {active.summary && (
            <div className="app-card">
              <h3 className="mb-3 flex items-center gap-2 font-semibold"><FiFileText /> Summary</h3>
              <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{active.summary}</p>
            </div>
          )}

          {active.keyTopics?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {active.keyTopics.map((t, i) => <span key={i} className="rounded-full bg-primary-100 px-3 py-1 text-xs text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">{t}</span>)}
            </div>
          )}

          {active.flashcards?.length > 0 && (
            <div className="app-card">
              <h3 className="mb-4 flex items-center gap-2 font-semibold"><FiBookOpen /> Flashcards ({fcIndex + 1}/{active.flashcards.length})</h3>
              <div onClick={() => setShowAnswer(!showAnswer)} className="flex min-h-[120px] cursor-pointer items-center justify-center rounded-xl bg-slate-50 p-6 text-center transition-all hover:shadow-md dark:bg-gray-800/50">
                <p className="text-sm">{showAnswer ? active.flashcards[fcIndex].answer : active.flashcards[fcIndex].question}</p>
              </div>
              <p className="mt-2 text-center text-xs text-slate-400">Click card to flip</p>
              <div className="mt-4 flex justify-between">
                <button onClick={() => { setFcIndex(Math.max(0, fcIndex - 1)); setShowAnswer(false); }} disabled={fcIndex === 0} className="app-button-secondary px-4 py-2 disabled:opacity-30">Previous</button>
                <button onClick={() => { setFcIndex(Math.min(active.flashcards.length - 1, fcIndex + 1)); setShowAnswer(false); }} disabled={fcIndex === active.flashcards.length - 1} className="app-button-secondary px-4 py-2 disabled:opacity-30">Next</button>
              </div>
            </div>
          )}

          <div className="app-card">
            <h3 className="mb-4 flex items-center gap-2 font-semibold"><FiMessageSquare /> Ask About This Document</h3>
            <div className="flex gap-2">
              <input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()} placeholder="Ask a question about the document..." className="app-input flex-1" />
              <button onClick={ask} disabled={loading} className="app-button px-4">{loading ? "..." : "Ask"}</button>
            </div>
            {answer && <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm whitespace-pre-wrap dark:bg-gray-800/50">{answer}</div>}
          </div>
        </>
      )}
    </div>
  );
}
