"use client";

import { useEffect, useState } from "react";

export default function ExperienceEnhancer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      const ratio = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      doc.style.setProperty("--scroll-progress", `${ratio}%`);
      setShowTop(scrollTop > 380);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" />
      {showTop ? (
        <button
          type="button"
          className="back-to-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      ) : null}
    </>
  );
}
