import { useEffect, useState } from "react";

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Global, delegated interaction layer. One set of listeners drives every card
 * on the page instead of per-component handlers:
 *  - [data-spot]   cursor-following spotlight (--mx / --my)
 *  - [data-tilt]   3D perspective tilt toward the cursor
 *  - [data-magnet] buttons that lean toward the cursor
 *  - scroll progress (--progress on <html>) and the page cursor glow
 */
export function useInteractions() {
  useEffect(() => {
    const root = document.documentElement;
    const noMotion = reducedMotion();
    let raf = 0;
    let tiltEl = null;

    const onMove = (e) => {
      root.style.setProperty("--cx", `${e.clientX}px`);
      root.style.setProperty("--cy", `${e.clientY}px`);

      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const t = e.target;
        if (!(t instanceof Element)) return;

        const spot = t.closest("[data-spot]");
        if (spot) {
          const r = spot.getBoundingClientRect();
          spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
          spot.style.setProperty("--my", `${e.clientY - r.top}px`);
        }

        if (noMotion) return;

        const tilt = t.closest("[data-tilt]");
        if (tiltEl && tiltEl !== tilt) resetTilt(tiltEl);
        tiltEl = tilt;
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          const max = Number(tilt.dataset.tilt) || 6;
          tilt.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`);
          tilt.style.setProperty("--ry", `${(px * max).toFixed(2)}deg`);
        }

        const mag = t.closest("[data-magnet]");
        if (mag) {
          const r = mag.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          mag.style.setProperty("--tx", `${(dx * 0.18).toFixed(1)}px`);
          mag.style.setProperty("--ty", `${(dy * 0.28).toFixed(1)}px`);
        }
      });
    };

    const resetTilt = (el) => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const onLeave = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.matches("[data-tilt]")) resetTilt(t);
      if (t.matches("[data-magnet]")) {
        t.style.setProperty("--tx", "0px");
        t.style.setProperty("--ty", "0px");
      }
    };

    const onScroll = () => {
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--progress",
        max > 0 ? (window.scrollY / max).toFixed(4) : "0"
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave, true);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

/** Adds .visible to every .fade-in element as it enters the viewport. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-in");
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Animates a number from 0 once `start` flips true. "20+" / "99%" aware. */
export function useCountUp(target, start, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return undefined;
    if (reducedMotion()) {
      setValue(target);
      return undefined;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return value;
}

/** True once the referenced element has scrolled into view. */
export function useInView(ref, threshold = 0.35) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return seen;
}

/** Locks body scroll and closes on Escape while `active`. */
export function useModal(active, onClose) {
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, onClose]);
}
