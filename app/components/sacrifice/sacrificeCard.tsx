"use client";
import { useState } from "react";
import { useSacrificeStore } from "@/lib/sacrificeStore";

interface SacrificeCardProps {
  label: string;
  description?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function SacrificeCard({
  label,
  description,
  defaultChecked = false,
  onChange,
}: SacrificeCardProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const { increment, decrement } = useSacrificeStore();

  const handleChange = () => {
    const newValue = !checked;
    setChecked(newValue);
    if (newValue) {
      increment();
    } else {
      decrement();
    }
    onChange?.(newValue);
  };

  return (
    <label
      className={`
        relative flex items-start gap-4 p-5 rounded-xl cursor-pointer
        border transition-all duration-500 ease-out select-none
        ${
          checked
            ? "bg-zinc-900/60 border-zinc-700 opacity-70 scale-[0.98]"
            : "bg-zinc-900 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/80"
        }
      `}
      style={{
        clipPath: checked
          ? "polygon(0% 0%, 100% 0%, 100% 78%, 97% 82%, 94% 76%, 90% 85%, 86% 79%, 82% 88%, 78% 81%, 74% 90%, 70% 83%, 0% 100%)"
          : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        transition:
          "clip-path 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s, transform 0.4s, background 0.3s",
      }}
    >
      {/* Custom Checkbox */}
      <div className="relative mt-0.5 flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="peer sr-only"
        />
        <div
          className={`
            w-5 h-5 rounded border-2 flex items-center justify-center
            transition-all duration-300
            ${
              checked
                ? "bg-rose-700/80 border-rose-600"
                : "border-zinc-600 bg-zinc-800 peer-hover:border-zinc-400"
            }
          `}
        >
          {checked && (
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div
          className={`
            font-medium text-[15px] transition-all duration-300
            ${checked ? "text-zinc-400 line-through decoration-zinc-600" : "text-zinc-100"}
          `}
        >
          {label}
        </div>
        {description && (
          <p
            className={`
              mt-1 text-sm leading-relaxed transition-colors duration-300
              ${checked ? "text-zinc-600" : "text-zinc-500"}
            `}
          >
            {description}
          </p>
        )}
      </div>

      {/* Subtle burn/tear edge glow when checked */}
      {checked && (
        <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-t from-rose-950/20 to-transparent" />
      )}
    </label>
  );
}
