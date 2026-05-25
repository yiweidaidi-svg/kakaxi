"use client";

import { motion } from "framer-motion";

const links = [
  { label: "GitHub", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function AboutTile() {
  return (
    <motion.div
      className="flex flex-col justify-between p-5 rounded-2xl"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        minHeight: 180,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ borderColor: "var(--border-hover)" }}
    >
      <div>
        <div
          className="w-10 h-10 rounded-full mb-3 flex items-center justify-center text-lg"
          style={{ background: "var(--border)", color: "var(--text-secondary)" }}
        >
          👾
        </div>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          About
        </h3>
        <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Obsessed with the intersection of AI systems and human-centered design.
          Previously at — , building products used by — users.
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-xs transition-colors hover:text-white"
            style={{ color: "var(--text-muted)" }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.div>
  );
}
