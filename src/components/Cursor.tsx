"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

type Mode = "default" | "link" | "text" | "label" | "hidden";

/**
 * Custom cursor: small gold dot plus a trailing navy ring.
 * - grows over links / buttons
 * - shows a label over elements with data-cursor="Label"
 * - shrinks to a caret-friendly state over inputs
 * Only active on devices with a fine pointer (mouse / trackpad).
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      if (!t || !t.closest) return;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.dataset.cursor || "");
        return;
      }
      if (t.closest("input, textarea, select, [contenteditable='true']")) return setMode("text");
      if (t.closest("a, button, [role='button'], label, summary")) return setMode("link");
      setMode("default");
    };
    const leave = () => setMode("hidden");
    const enter = () => setMode("default");
    const md = () => setDown(true);
    const mu = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    window.addEventListener("mousedown", md);
    window.addEventListener("mouseup", mu);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      window.removeEventListener("mousedown", md);
      window.removeEventListener("mouseup", mu);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ring = {
    default: { size: 36, bg: "rgba(12,31,92,0)", border: "rgba(12,31,92,0.45)", opacity: 1 },
    link: { size: 60, bg: "rgba(201,161,59,0.18)", border: "rgba(201,161,59,0.9)", opacity: 1 },
    text: { size: 8, bg: "rgba(12,31,92,0)", border: "rgba(12,31,92,0)", opacity: 0 },
    label: { size: 88, bg: "rgba(12,31,92,0.92)", border: "rgba(201,161,59,1)", opacity: 1 },
    hidden: { size: 0, bg: "rgba(0,0,0,0)", border: "rgba(0,0,0,0)", opacity: 0 },
  }[mode];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      {/* trailing ring */}
      <motion.div
        style={{ x: rx, y: ry }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{
            width: ring.size,
            height: ring.size,
            backgroundColor: ring.bg,
            borderColor: ring.border,
            opacity: ring.opacity,
            scale: down ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1.5px] backdrop-blur-[1px]"
        >
          <AnimatePresence>
            {mode === "label" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold-400"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      {/* precise dot */}
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <motion.div
          animate={{ scale: mode === "label" || mode === "hidden" ? 0 : mode === "link" ? 0.6 : 1 }}
          className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500 shadow-[0_0_0_2px_rgba(255,255,255,0.8)]"
        />
      </motion.div>
    </div>
  );
}
