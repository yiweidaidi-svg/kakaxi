"use client";

import { motion } from "framer-motion";

const skills = [
  { label: "AI / LLM", level: 90 },
  { label: "Interaction Design", level: 85 },
  { label: "React / Next.js", level: 88 },
  { label: "Python / ML", level: 80 },
];

export default function SkillsTile() {
  return (
    <motion.div
      className="flex flex-col p-5 rounded-2xl"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        minHeight: 180,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ borderColor: "var(--border-hover)" }}
    >
      <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
        Skills
      </h3>

      <div className="flex flex-col gap-3">
        {skills.map((skill, i) => (
          <div key={skill.label}>
            <div className="flex justify-between mb-1">
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {skill.label}
              </span>
            </div>
            <div className="h-px w-full relative" style={{ background: "var(--border)" }}>
              <motion.div
                className="absolute top-0 left-0 h-px"
                style={{ background: "var(--text-muted)" }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
