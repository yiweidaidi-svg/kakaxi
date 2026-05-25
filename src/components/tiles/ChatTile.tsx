"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ChatTile() {
  const [focused, setFocused] = useState(false);
  const [input, setInput] = useState("");

  const suggestions = [
    "What AI projects have you built?",
    "How do you approach interaction design?",
    "Tell me about your process",
  ];

  return (
    <motion.div
      className="flex flex-col justify-between p-5 rounded-2xl col-span-2"
      style={{
        background: "linear-gradient(135deg, #0d0d14 0%, #111111 100%)",
        border: "1px solid var(--border)",
        minHeight: 180,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      animate-hover={{ borderColor: "#2a2a3a" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
          style={{ background: "#6366f120", border: "1px solid #6366f130" }}
        >
          ✦
        </div>
        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
          AI Assistant — ask me anything about this portfolio
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            className="text-xs px-3 py-1.5 rounded-full transition-colors"
            style={{
              background: "var(--bg)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "var(--border-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
        style={{
          background: "var(--bg)",
          border: `1px solid ${focused ? "var(--border-hover)" : "var(--border)"}`,
        }}
      >
        <input
          type="text"
          placeholder="Ask about projects, process, or skills..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent text-sm outline-none placeholder-stone-600"
          style={{ color: "var(--text-primary)" }}
        />
        <button
          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all"
          style={{
            background: input ? "white" : "var(--border)",
            color: input ? "black" : "var(--text-muted)",
          }}
        >
          ↑
        </button>
      </div>
    </motion.div>
  );
}
