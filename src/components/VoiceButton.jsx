import { useState } from "react";
import { FiMic, FiMicOff } from "react-icons/fi";

export default function VoiceButton({ onResult }) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      onResult(text);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
    setListening(true);
  };

  return (
    <button onClick={startListening} className={`p-2 rounded-full transition-colors ${listening ? "bg-red-500 text-white animate-pulse" : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"}`} title="Voice input">
      {listening ? <FiMicOff /> : <FiMic />}
    </button>
  );
}

export function speakText(text) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.substring(0, 500));
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }
}
