"use client";

import { motion } from "framer-motion";

const roles = ["AI Engineer", "Interaction Designer", "Creative Technologist"];

export default function HeroTile() {
  return (
    <motion.div
      className="relative flex flex-col justify-between p-7 rounded-2xl overflow-hidden col-span-2 row-span-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        minHeight: 240,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        <motion.div
          className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full text-xs"
          style={{ background: "#ffffff10", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Available for work
        </motion.div>

        <motion.h1
          className="text-4xl font-semibold tracking-tight leading-tight"
          style={{ color: "var(--text-primary)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Your Name
        </motion.h1>

        <motion.div
          className="flex flex-wrap gap-2 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {roles.map((role, i) => (
            <span
              key={role}
              className="text-sm px-2 py-0.5 rounded-md"
              style={{
                color: i === 0 ? "var(--text-primary)" : "var(--text-muted)",
                background: i === 0 ? "#ffffff15" : "transparent",
              }}
            >
              {role}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.p
        className="relative z-10 text-sm leading-relaxed max-w-md"
        style={{ color: "var(--text-secondary)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        I build AI-powered products and design interactions that feel alive.
        Focused on the intersection of machine intelligence and human experience.
      </motion.p>
    </motion.div>
  );
}
