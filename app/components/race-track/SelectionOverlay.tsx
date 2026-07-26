"use client";

import { motion, AnimatePresence } from "framer-motion";

type SelectionOverlayProps = {
  visible: boolean;
};

export default function SelectionOverlay({ visible }: SelectionOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
          className="pointer-events-none mt-10 text-center text-lg tracking-wide"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            color: "rgba(232,234,240,0.9)",
          }}
          aria-live="polite"
        >
          You chose this race.
        </motion.p>
      )}
    </AnimatePresence>
  );
}
