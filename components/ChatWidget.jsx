"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";

const SUGGESTIONS = [
  "Tell me about your services",
  "I need a security audit",
  "How does bug bounty work?",
  "Contact your team",
];

const GREETING = "Hello! I'm the BugZero AI assistant. How can I help you with your cybersecurity needs today?";

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-dot-bounce"
        style={{ animationDelay: `${i * 0.16}s` }}
      />
    ))}
  </div>
);

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    if (open && !greeted) {
      setMessages([{ role: "assistant", content: GREETING }]);
      setGreeted(true);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, greeted]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      if (!supabase) throw new Error("Chat service not configured");

      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: newMessages },
      });

      if (error) throw error;

      const reply = data?.choices?.[0]?.message?.content || data?.reply || data?.error;
      if (reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } else {
        throw new Error("No response");
      }
    } catch (e) {
      const fallback =
        e?.message?.includes("429")
          ? "I'm receiving too many requests right now. Please try again in a moment."
          : e?.message?.includes("402")
            ? "AI service temporarily unavailable. Please try again later."
            : "I'm having trouble connecting right now. You can reach our team directly at contact@bugzero.io.";
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: "assistant", content: GREETING }]);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl shadow-primary/25 transition-all duration-300 active:scale-95 hover:shadow-primary/40 ${
          !open ? "animate-pulse-gold" : ""
        }`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <div className="transition-transform duration-300" style={{ transform: open ? "rotate(90deg)" : "rotate(0)" }}>
          {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </div>
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[60] w-[380px] max-w-[calc(100vw-48px)] h-[540px] max-h-[calc(100vh-140px)] flex flex-col rounded-2xl overflow-hidden border border-chat-border bg-chat-bg shadow-2xl shadow-black/40 animate-scale-up origin-bottom-right">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-chat-border bg-card/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold">BugZero AI</p>
                <p className="text-xs text-muted-foreground">Security Assistant</p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scrollbar px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-chat-user text-primary-foreground rounded-br-md"
                      : "bg-chat-bot text-foreground rounded-bl-md border border-chat-border"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none [&_p]:m-0 [&_ul]:mt-1 [&_ol]:mt-1 [&_li]:text-sm">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-chat-bot rounded-2xl rounded-bl-md border border-chat-border">
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && !loading && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/70 border border-border transition-colors active:scale-[0.97]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2 px-4 py-3 border-t border-chat-border bg-card/40"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our security services..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-30 hover:bg-primary/85 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
