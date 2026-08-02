"use client";

import confetti from "canvas-confetti";

const COLORS = ["#a78bfa", "#22d3ee", "#f472b6", "#34d399", "#fbbf24", "#818cf8"];

export function fireConfetti() {
  const base = {
    spread: 360,
    ticks: 70,
    gravity: 0.9,
    decay: 0.93,
    startVelocity: 32,
    colors: COLORS,
    disableForReducedMotion: true,
  };

  confetti({ ...base, particleCount: 70, origin: { x: 0.5, y: 0.6 } });
  confetti({ ...base, particleCount: 45, angle: 60, spread: 70, origin: { x: 0, y: 0.8 } });
  confetti({ ...base, particleCount: 45, angle: 120, spread: 70, origin: { x: 1, y: 0.8 } });

  setTimeout(() => {
    confetti({ ...base, particleCount: 50, scalar: 0.8, origin: { x: 0.3, y: 0.5 } });
    confetti({ ...base, particleCount: 50, scalar: 0.8, origin: { x: 0.7, y: 0.5 } });
  }, 350);
}

export function fireBigConfetti() {
  const end = Date.now() + 1200;
  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 60,
      origin: { x: 0 },
      colors: COLORS,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 60,
      origin: { x: 1 },
      colors: COLORS,
      disableForReducedMotion: true,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
