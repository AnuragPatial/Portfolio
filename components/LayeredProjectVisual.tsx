import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

// Original implementation informed by GetLayers' public motion and layering guidance.
// Source notes: THIRD_PARTY_NOTICES.md. No proprietary GetLayers asset is bundled.
export default function LayeredProjectVisual({
  kind,
}: {
  kind: "street" | "hike";
}) {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 22 });
  const springY = useSpring(y, { stiffness: 120, damping: 22 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <div
      ref={root}
      className={`layered-showcase showcase-${kind}`}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const rect = root.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={reset}
    >
      <span className="showcase-index">
        {kind === "street" ? "01 / STREET CULTURE" : "02 / OUTDOOR COMMERCE"}
      </span>
      <motion.div
        className="layered-browser"
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY }}
      >
        <div className="browser-chrome">
          <span>
            <i />
            <i />
            <i />
          </span>
          <small>
            {kind === "street" ? "street-bill.dk" : "hike-summit.com"}
          </small>
          <span>↗</span>
        </div>
        {kind === "street" ? (
          <img
            src="/projects/street-bill.jpg"
            alt="Street Bill live storefront showing sneaker and streetwear navigation and a featured collection"
            width="1348"
            height="926"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="hike-overview">
            <span>HIKE SUMMIT</span>
            <svg viewBox="0 0 700 360" aria-hidden="true">
              <path
                d="M-40 350 220 50 350 220 425 135 760 390Z"
                fill="#687666"
              />
              <path d="m220 50 46 174-52-38-48 30Z" fill="#e5e8db" />
              <path d="m425 135 25 100-29-22-38 29Z" fill="#c4cdba" />
              <path
                d="M-60 380 130 260 245 320 390 230 730 405Z"
                fill="#3f5244"
              />
              <path d="M-40 400 270 340 360 290 740 420" fill="#283c31" />
            </svg>
            <div>
              <small>CLOTHING & GEAR</small>
              <strong>
                Made for
                <br />
                <em>the outside.</em>
              </strong>
            </div>
            <span className="overview-label">
              PROJECT OVERVIEW · ORIGINAL ILLUSTRATION
            </span>
          </div>
        )}
        <div className="showcase-layer">
          <span>
            {kind === "street"
              ? "SNEAKERS / STREETWEAR"
              : "CLOTHING / OUTDOOR GEAR"}
          </span>
          <strong>{kind === "street" ? "Street Bill" : "Hike Summit"}</strong>
        </div>
      </motion.div>
      <span className="showcase-footer">
        {kind === "street" ? "LIVE WEBSITE CAPTURE" : "VISUAL PROJECT OVERVIEW"}
        <span>EXPLORE THE LIVE EXPERIENCE ↗</span>
      </span>
    </div>
  );
}
