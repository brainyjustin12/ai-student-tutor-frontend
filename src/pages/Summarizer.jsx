import { useState } from "react";
import api from "../services/api";
import VoiceButton from "../components/VoiceButton";
import toast from "react-hot-toast";
import { FiFileText, FiPaperclip } from "react-icons/fi";

export default function Summarizer() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    if (!text.trim() && !file) return;
    setLoading(true);
    setSummary("");
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      else formData.append("text", text);

      const { data } = await api.post("/summarize", formData, { headers: { "Content-Type": "multipart/form-data" } });
      setSummary(data.summary);
    } catch {
      toast.error("Summarization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page-narrow">
      <div className="mb-6">
        <div className="app-kicker">
          <FiFileText size={14} />
          <span>Revision</span>
        </div>
        <h1 className="app-title text-3xl">Notes Summarizer</h1>
        <p className="app-subtitle">Paste notes or upload a PDF and get a cleaner summary for revision.</p>
      </div>

      <div className="app-card space-y-4">
        <div className="flex items-center gap-2">
          <VoiceButton onResult={(t) => setText((prev) => prev + " " + t)} />
          <span className="text-sm text-slate-400">Use voice to dictate notes</span>
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your notes here..." rows={8} className="app-input resize-none" />
        <div className="flex items-center gap-4">
          <label className="app-button-secondary cursor-pointer text-sm">
            <FiPaperclip />
            Upload PDF
            <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
          </label>
          {file && <span className="text-sm text-slate-500">{file.name}</span>}
        </div>
        <button onClick={summarize} disabled={loading} className="app-button">{loading ? "Summarizing..." : "Summarize"}</button>
      </div>

      {summary && (
        <div className="app-card mt-6">
          <h3 className="mb-3 font-semibold">Summary</h3>
          <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{summary}</p>
        </div>
      )}
    </div>
  );
}
