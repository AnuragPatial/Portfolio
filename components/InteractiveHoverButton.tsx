// Adapted from Magic UI's MIT-licensed Interactive Hover Button (also on 21st.dev).
// Source and full license: THIRD_PARTY_NOTICES.md
import type { ButtonHTMLAttributes } from "react";
import { ArrowUpRight } from "lucide-react";
export default function InteractiveHoverButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`interactive-button ${className}`} {...props}>
      <span className="button-front">
        <i />
        {children}
        <ArrowUpRight size={18} />
      </span>
      <span className="button-back" aria-hidden="true">
        {children}
        <ArrowUpRight size={18} />
      </span>
    </button>
  );
}
