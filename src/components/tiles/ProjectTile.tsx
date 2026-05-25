"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectTileProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
  accent?: string;
}

export default function ProjectTile({ title, description, tags, index, accent = "#ffffff" }: ProjectTileProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex flex-col justify-between p-5 rounded-2xl cursor-pointer overflow-hidden"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        minHeight: 180,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ borderColor: "var(--border-hover)" }}
    >
      {/* accent glow on hover */}
      <motion.div
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ background: accent }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 0.06 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <motion.div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{ background: `${accent}15`, border: `1px solid ${accent}20` }}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            ↗
          </motion.div>
          <motion.span
            className="text-xs font-mono"
            style={{ color: "var(--text-muted)" }}
            animate={{ color: hovered ? "var(--text-secondary)" : "var(--text-muted)" }}
          >
            0{index}
          </motion.span>
        </div>

        <h3 className="text-base font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
          {title}
        </h3>
        <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {description}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-1.5 mt-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-md"
            style={{
              background: "var(--bg)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
