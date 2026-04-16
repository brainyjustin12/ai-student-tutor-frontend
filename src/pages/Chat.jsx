import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import VoiceButton, { speakText } from "../components/VoiceButton";
import { FiMessageSquare, FiSend, FiVolume2 } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setLoading(true);

    try {
      const { data } = await api.post("/chat", { message: msg, chatId });
      setChatId(data.chatId);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      toast.error("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page flex h-[calc(100vh-4rem)] flex-col">
      <div className="mb-4">
        <div className="app-kicker">
          <FiMessageSquare size={14} />
          <span>Conversation</span>
        </div>
        <h1 className="app-title text-3xl">AI Tutor Chat</h1>
        <p className="app-subtitle">Ask questions, refine ideas, and listen to responses when you need audio support.</p>
      </div>

      <div className="app-card mb-4 flex-1 overflow-y-auto space-y-4">
        {messages.length === 0 && <p className="mt-20 text-center text-slate-400">Ask anything to begin your learning session.</p>}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${m.role === "user" ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-800 dark:bg-gray-800 dark:text-slate-100"}`}>
              <p className="whitespace-pre-wrap text-sm">{m.content}</p>
              {m.role === "assistant" && (
                <button onClick={() => speakText(m.content)} className="mt-2 flex items-center gap-1 text-xs opacity-60 hover:opacity-100">
                  <FiVolume2 size={12} /> Listen
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="rounded-2xl bg-slate-100 p-4 dark:bg-gray-800"><div className="flex gap-1"><span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" /><span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.1s]" /><span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.2s]" /></div></div></div>}
        <div ref={endRef} />
      </div>

      <div className="flex gap-2">
        <VoiceButton onResult={setInput} />
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type your question..." className="app-input flex-1" />
        <button onClick={send} disabled={loading} className="app-button px-4"><FiSend /></button>
      </div>
    </div>
  );
}
