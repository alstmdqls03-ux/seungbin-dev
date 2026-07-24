"use client";

import { useEffect, useState } from "react";

// 상단 진행률 바. scroll 은 requestAnimationFrame 으로 throttle.
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-30 h-0.5" aria-hidden="true">
      <div
        className="h-full w-full origin-left bg-brand-green transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
