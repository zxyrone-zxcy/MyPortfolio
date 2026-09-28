import { useEffect, useRef } from "react";

export default function ScrollAtmosphere() {
  const atmosphereRef = useRef(null);

  useEffect(() => {
    const atmosphere = atmosphereRef.current;
    if (!atmosphere || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let previousY = window.scrollY;
    let frameId = 0;
    let idleTimer;

    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        const currentY = window.scrollY;
        if (Math.abs(currentY - previousY) < 1) return;

        atmosphere.dataset.direction = currentY > previousY ? "down" : "up";
        atmosphere.classList.add("is-active");
        previousY = currentY;
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          atmosphere.classList.remove("is-active");
        }, 600);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div ref={atmosphereRef} className="scroll-atmosphere" aria-hidden="true">
      <span className="scroll-light light-left" />
      <span className="scroll-light light-right" />
      <span className="scroll-bubble bubble-one" />
      <span className="scroll-bubble bubble-two" />
      <span className="scroll-bubble bubble-three" />
      <span className="scroll-bubble bubble-four" />
      <span className="scroll-bubble bubble-five" />
      <span className="scroll-bubble bubble-six" />
    </div>
  );
}