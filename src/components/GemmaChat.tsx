import React, { useState, useRef, useEffect } from 'react';
import { LandmarkDetails, ChatMessage } from '../types';
import { Sparkles, Send, Volume2, Mic, X, MessageSquare, Loader2, Bot, User } from 'lucide-react';

interface GemmaChatProps {
  landmark: LandmarkDetails;
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
  onClearInitialQuestion?: () => void;
}

export const GemmaChat: React.FC<GemmaChatProps> = ({
  landmark,
  isOpen,
  onClose,
  initialQuestion,
  onClearInitialQuestion,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Reset messages when active landmark changes or on initial mount
  useEffect(() => {
    if (landmark) {
      setMessages([
        {
          id: `welcome-${landmark.id}`,
          sender: 'gemma',
          text: `Hello! I'm Gemma, your AI travel companion. Ask me about places, hidden history, local stories, photo spots, culture, or authentic food recommendations!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [landmark?.id]);

  // Send question when initialQuestion prop is provided and chat is open
  useEffect(() => {
    if (initialQuestion && isOpen && landmark) {
      handleSendMessage(initialQuestion);
      if (onClearInitialQuestion) {
        onClearInitialQuestion();
      }
    }
  }, [initialQuestion, isOpen, landmark?.id]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle Speech Recognition for voice input
  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      console.error('Speech recognition error:', e);
      setIsListening(false);
    }
  };

  // Speak message out loud
  const speakText = (msgId: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (speakingMessageId === msgId) {
        window.speechSynthesis.cancel();
        setSpeakingMessageId(null);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.onend = () => setSpeakingMessageId(null);
      utterance.onerror = () => setSpeakingMessageId(null);

      setSpeakingMessageId(msgId);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Execute chat request to /api/ask-gemma
  const handleSendMessage = async (textToSend?: string) => {
    const queryText = textToSend || inputValue.trim();
    if (!queryText || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      console.log("Current landmark:", landmark);
     const response = await fetch('https://xplorago.onrender.com/api/ask-gemma', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    question: queryText,
    landmarkName: landmark.name,
    landmarkContext: landmark,
    conversationHistory: messages.map((m) => ({
      sender: m.sender,
      text: m.text,
    })),
  }),
});

      const data = await response.json();
      const gemmaText = data.answer || "I'm right here exploring with you! What else would you like to know?";

      const gemmaMsg: ChatMessage = {
        id: `gemma-${Date.now()}`,
        sender: 'gemma',
        text: gemmaText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, gemmaMsg]);
    } catch (err) {
      console.error('Gemma chat error:', err);
      const errorMsg: ChatMessage = {
        id: `gemma-err-${Date.now()}`,
        sender: 'gemma',
        text: "I got briefly disconnected from the travel frequency. Please ask me again!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-slate-950/95 border-l border-slate-800/80 shadow-2xl flex flex-col text-slate-100 backdrop-blur-2xl">
      {/* Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-600 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              Gemma AI Guide
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            </h3>
            <p className="text-[11px] text-slate-400">
             Your AI Travel Companion
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Suggested Quick Questions */}
      {landmark.suggestedQuestions && landmark.suggestedQuestions.length > 0 && (
        <div className="p-3 bg-slate-900/60 border-b border-slate-800/80 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
          {landmark.suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-cyan-300 border border-indigo-500/20 text-[11px] font-semibold transition-colors shrink-0 flex items-center gap-1"
            >
              <MessageSquare className="h-3 w-3 text-cyan-400" />
              <span>{q}</span>
            </button>
          ))}
        </div>
      )}

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`h-7 w-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white'
                  : 'bg-slate-900 text-cyan-400 border border-slate-800'
              }`}
            >
              {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div
              className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>

              <div
                className={`mt-2 flex items-center justify-between text-[10px] ${
                  msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'
                }`}
              >
                <span>{msg.timestamp}</span>

                {msg.sender === 'gemma' && (
                  <button
                    onClick={() => speakText(msg.id, msg.text)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                    title="Read out loud"
                  >
                    <Volume2 className={`h-3.5 w-3.5 ${speakingMessageId === msg.id ? 'text-cyan-400 animate-pulse' : ''}`} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-cyan-300 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 w-fit">
            <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
            <span>Gemma is pondering the local lore...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-2.5 rounded-xl border transition-colors ${
              isListening
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Speech Recognition"
          >
            <Mic className="h-4 w-4" />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Ask Gemma about any place...`}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />

          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold hover:from-indigo-500 hover:to-sky-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
