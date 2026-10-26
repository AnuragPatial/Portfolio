import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "motion/react";
const opportunities = [
  {
    id: "sales",
    label: "My website is holding me back",
    title: "Give visitors a clearer reason to choose you.",
    problem:
      "People arrive, but your offer is hard to understand, the experience feels dated, or the next step is unclear.",
    approach:
      "Clarify the offer, remove friction from the journey, and build a website or storefront around the action your customer needs to take.",
    deliverables: [
      "Offer and page structure",
      "Website or storefront improvements",
      "Clear inquiry or purchase journey",
    ],
    service: "Website",
  },
  {
    id: "operations",
    label: "My team repeats the same tasks",
    title: "Turn repeated steps into a connected workflow.",
    problem:
      "Inquiries, customer details, and order updates get copied between tools. Follow-ups depend on someone remembering.",
    approach:
      "Map the process first, confirm the integrations, then automate the repetitive handoffs with checks and a clear exception path.",
    deliverables: [
      "Workflow map and integration checks",
      "n8n automation and API connections",
      "Error handling and handover",
    ],
    service: "Automation",
  },
  {
    id: "commerce",
    label: "My store is harder to use than it should be",
    title: "Make the buying journey easier to navigate.",
    problem:
      "Products are difficult to discover, storefront features don’t fit your process, or mobile interactions get in the way.",
    approach:
      "Review the shopping journey, prioritize the most useful changes, and improve the storefront around real customer tasks.",
    deliverables: [
      "Storefront journey review",
      "Custom sections and shopping features",
      "Mobile and functional validation",
    ],
    service: "Commerce",
  },
];
export default function BusinessFit({
  onSelect,
}: {
  onSelect: (service: string) => void;
}) {
  const [active, setActive] = useState(0);
  const item = opportunities[active];
  return (
    <section className="business-fit" id="approach">
      <div className="section-marker">
        <span>START WITH THE BUSINESS</span>
        <span>THEN CHOOSE THE TECHNOLOGY</span>
      </div>
      <div className="fit-heading">
        <h2>
          What needs
          <br />
          to <em>work better?</em>
        </h2>
        <p>
          You don’t need a shopping list of tools. You need a clear next move.
        </p>
      </div>
      <div className="fit-grid">
        <div
          className="fit-choices"
          role="tablist"
          aria-label="Choose a business challenge"
          aria-orientation="vertical"
        >
          {opportunities.map((option, i) => (
            <button
              id={`challenge-tab-${option.id}`}
              role="tab"
              key={option.id}
              aria-selected={active === i}
              aria-controls="challenge-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? opportunities.length - 1
                        : (active +
                            (e.key === "ArrowDown" ? 1 : -1) +
                            opportunities.length) %
                          opportunities.length;
                  setActive(next);
                  document
                    .getElementById(`challenge-tab-${opportunities[next].id}`)
                    ?.focus();
                }
              }}
            >
              <span>0{i + 1}</span>
              {option.label}
              <ArrowUpRight size={18} />
            </button>
          ))}
        </div>
        <div
          id="challenge-panel"
          role="tabpanel"
          aria-labelledby={`challenge-tab-${item.id}`}
          tabIndex={0}
        >
          <motion.div
            key={item.id}
            initial={{ y: 8 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 130, damping: 24 }}
          >
            <span className="eyebrow">A PRACTICAL WAY FORWARD</span>
            <h3>{item.title}</h3>
            <p>{item.problem}</p>
            <p className="fit-approach">{item.approach}</p>
            <ul>
              {item.deliverables.map((text) => (
                <li key={text}>
                  <Check size={14} />
                  {text}
                </li>
              ))}
            </ul>
            <a href="#contact" onClick={() => onSelect(item.service)}>
              Let’s discuss this challenge <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
