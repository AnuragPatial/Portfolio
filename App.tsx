import React, {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import {
  ArrowUpRight,
  ArrowDown,
  Menu,
  X,
  Github,
  Linkedin,
  Check,
  Copy,
  Globe,
  Workflow,
  ShoppingBag,
  Pause,
  Play,
  Plus,
  Minus,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import WorkshopFallback from "./components/WorkshopFallback";
import InteractiveHoverButton from "./components/InteractiveHoverButton";
import "./index.css";
const StudioScene = lazy(() => import("./components/StudioScene"));
const EMAIL = "patyalanurag222@gmail.com";
const projects = [
  {
    id: "01",
    name: "Burgertech",
    category: "ORDERING EXPERIENCE",
    type: "Websites",
    text: "From browsing the menu to placing an order. A self-service food ordering interface with a complete order and payment flow.",
    stack: "React / Node.js / Payments",
    url: "https://burgertech-kiosk.vercel.app",
    github: "https://github.com/AnuragPatial/burgertech-kiosk",
    visual: "burger",
  },
  {
    id: "02",
    name: "Cognitive Focus",
    category: "INTERACTIVE WEB APP",
    type: "Websites",
    text: "A browser-based sequence challenge. Built around a simple loop: observe, remember, and repeat.",
    stack: "React / Interactive UI",
    url: "https://cognitive-focus.vercel.app/",
    github: "",
    visual: "focus",
  },
  {
    id: "03",
    name: "Connected operations",
    category: "ILLUSTRATIVE WORKFLOW",
    type: "Automations",
    text: "See how a website inquiry can become a qualified CRM record and a follow-up task. An interactive example of the workflows I build with n8n.",
    stack: "n8n / APIs / CRM",
    url: "",
    github: "",
    visual: "flow",
  },
  {
    id: "04",
    name: "Restaurant experience",
    category: "RESPONSIVE WEBSITE",
    type: "Websites",
    text: "A restaurant website with responsive pages, interactive features, and reusable React components.",
    stack: "React / JavaScript / CSS",
    url: "https://restaurant-s-website.vercel.app",
    github: "https://github.com/AnuragPatial/Restaurant-s-Website",
    visual: "restaurant",
  },
];
class SceneBoundary extends Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <WorkshopFallback /> : this.props.children;
  }
}
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function WorkflowDemo() {
  const [step, setStep] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const run = () => {
    timers.current.forEach(clearTimeout);
    setStep(0);
    [1, 2, 3].forEach((n) =>
      timers.current.push(setTimeout(() => setStep(n), n * 650)),
    );
  };
  return (
    <div className="flow-demo">
      <div className="flow-caption">
        <span>INQUIRY → FOLLOW-UP</span>
        <span>DEMO / NO DATA SENT</span>
      </div>
      <div className="flow-nodes">
        {["New inquiry", "Qualify lead", "Update CRM", "Follow-up"].map(
          (label, i) => (
            <React.Fragment key={label}>
              <div className={`flow-node ${step >= i ? "complete" : ""}`}>
                <span>
                  {step >= i ? <Check size={16} /> : ["↗", "⌘", "▤", "↗"][i]}
                </span>
                <small>{label}</small>
              </div>
              {i < 3 && (
                <div className={`connector ${step > i ? "complete" : ""}`} />
              )}
            </React.Fragment>
          ),
        )}
      </div>
      <button
        className="run-flow"
        onClick={run}
        disabled={step >= 0 && step < 3}
      >
        <Play size={13} />
        {step === 3 ? "Run again" : "Run the workflow"}
      </button>
      <span role="status" className="flow-status">
        {step === 3
          ? "All four demo steps complete."
          : step >= 0
            ? "Running illustrative workflow…"
            : "An example, not a client result."}
      </span>
    </div>
  );
}
function ProjectVisual({ kind }: { kind: string }) {
  if (kind === "flow") return <WorkflowDemo />;
  if (kind === "burger")
    return (
      <div className="kiosk-preview">
        <div className="mock-nav">
          burgertech<span>MENU ↗</span>
        </div>
        <div className="kiosk-body">
          <div>
            <small>GOOD FOOD. ZERO WAIT.</small>
            <strong>
              Made to
              <br />
              hit the spot.
            </strong>
            <span className="mock-pill">Explore the menu ↗</span>
          </div>
          <div className="burger-art">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="mock-foot">
          FRESHLY MADE <span>CLICK. ORDER. ENJOY.</span>
        </div>
      </div>
    );
  if (kind === "focus")
    return (
      <div className="focus-preview">
        <div className="mock-nav">
          cognitive / focus <span>01 — SEQUENCE</span>
        </div>
        <div className="focus-center">
          <small>A LITTLE FOCUS GOES A LONG WAY.</small>
          <strong>Find your flow.</strong>
          <div className="focus-tiles">
            {[3, 1, 4, 2].map((x, i) => (
              <span key={x} className={i === 1 ? "lit" : ""}>
                {x}
              </span>
            ))}
          </div>
          <span>Observe. Remember. Repeat.</span>
        </div>
      </div>
    );
  return (
    <div className="restaurant-preview">
      <div className="mock-nav">
        THE TABLE <span>RESERVATIONS ↗</span>
      </div>
      <div className="restaurant-center">
        <small>A PLACE TO SLOW DOWN</small>
        <strong>
          Good food.
          <br />
          <em>Better company.</em>
        </strong>
        <span className="plate">
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}
function Contact() {
  const [service, setService] = useState("Website");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const configured = !!(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = `${service} project inquiry from ${data.get("name")}`;
    const message = `Service: ${service}\nBudget: ${data.get("budget")}\n\n${data.get("message")}`;
    if (!configured) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n${message}`)}`;
      setStatus(
        "Your email app has been requested. Send the draft there to complete your inquiry, or copy my email below.",
      );
      return;
    }
    setSending(true);
    setStatus("");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.get("name"),
          from_email: data.get("email"),
          subject,
          message,
          to_email: EMAIL,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("Message sent. Thank you for sharing your project.");
      form.reset();
    } catch {
      setStatus(
        "The message could not be sent. Please email me directly using the link below.",
      );
    } finally {
      setSending(false);
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setStatus(`You can email me at ${EMAIL}`);
    }
  };
  return (
    <section id="contact" className="contact-section">
      <div className="section-marker">
        <span>05 / START SOMETHING</span>
        <span>YOUR NEXT CHAPTER</span>
      </div>
      <div className="contact-grid">
        <Reveal>
          <h2>
            Have a good
            <br />
            problem?
            <br />
            <em>Let’s build.</em>
          </h2>
          <p>
            A new website, a better storefront, or a workflow that gives you
            your time back. Tell me what you have in mind.
          </p>
          <a className="email-link" href={`mailto:${EMAIL}`}>
            {EMAIL}
            <ArrowUpRight size={18} />
          </a>
          <button className="copy-email" onClick={copy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
            {copied ? "Copied" : "Copy email"}
          </button>
        </Reveal>
        <Reveal>
          <form onSubmit={submit}>
            <fieldset>
              <legend>What can I help with?</legend>
              <div className="service-options">
                {["Website", "Shopify", "Automation"].map((x) => (
                  <button
                    type="button"
                    aria-pressed={service === x}
                    onClick={() => setService(x)}
                    key={x}
                    className={service === x ? "selected" : ""}
                  >
                    {x}
                    <Plus size={13} />
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Alex Smith"
                  required
                  maxLength={120}
                />
              </label>
              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="alex@company.com"
                  required
                />
              </label>
            </div>
            <label>
              Project budget
              <select name="budget" defaultValue="Let's discuss">
                <option>Let's discuss</option>
                <option>Under $500</option>
                <option>$500–$1,500</option>
                <option>$1,500–$5,000</option>
                <option>$5,000+</option>
              </select>
            </label>
            <label>
              A little about your project
              <textarea
                name="message"
                rows={3}
                placeholder="What are you building, and what needs to work better?"
                required
                minLength={15}
                maxLength={5000}
              />
            </label>
            <InteractiveHoverButton type="submit" disabled={sending}>
              {sending
                ? "Sending…"
                : configured
                  ? "Send project inquiry"
                  : "Prepare project email"}
            </InteractiveHoverButton>
            <p className="form-note">
              {configured
                ? "Delivered directly to my inbox."
                : "Opens your email app with your project brief. You send it from there."}
            </p>
            <p role="status" className="form-status">
              {status}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
export default function App() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All");
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const sceneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (sceneRef.current) observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header>
        <a href="#" className="wordmark" aria-label="Anurag Patial home">
          ap<span>✳</span>
        </a>
        <nav className={menu ? "open" : ""} aria-label="Main navigation">
          {[
            ["Work", "work"],
            ["Services", "services"],
            ["About", "about"],
          ].map(([name, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {name}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setMenu(false)}
          >
            Let’s talk <ArrowUpRight size={15} />
          </a>
        </nav>
        <button
          className="menu-toggle"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main">
        <section className="hero">
          <div className="hero-top">
            <span className="eyebrow">
              <i /> INDEPENDENT DEVELOPER · MOHALI, INDIA
            </span>
            <span className="edition">PORTFOLIO / 2026</span>
          </div>
          <div className="hero-grid">
            <Reveal className="hero-copy">
              <h1>
                Websites with
                <br />
                <em>personality.</em>
                <br />
                Systems with
                <br />
                <span className="outline-text">purpose.</span>
              </h1>
              <p>
                I’m Anurag. I build distinctive websites and connect the tools
                behind your business—so your online presence works as hard as
                you do.
              </p>
              <div className="hero-actions">
                <InteractiveHoverButton
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({
                        behavior: reduce ? "instant" : "smooth",
                      })
                  }
                >
                  Let’s build something
                </InteractiveHoverButton>
                <a href="#work" className="text-link">
                  Explore my work <ArrowDown size={16} />
                </a>
              </div>
            </Reveal>
            <div className="hero-object" ref={sceneRef}>
              <div className="object-topline">
                <span>AP—01 / THE DIGITAL WORKSHOP</span>
                <span className="live-dot">LIVE 3D</span>
              </div>
              <SceneBoundary>
                <Suspense
                  fallback={
                    <div className="scene-fallback">
                      ASSEMBLING THE WORKSHOP…
                    </div>
                  }
                >
                  <StudioScene active={!paused && !reduce && visible} />
                </Suspense>
              </SceneBoundary>
              <div className="object-caption">
                <span>IDEA → INTERFACE → CONNECTED SYSTEM</span>
                <button
                  onClick={() => setPaused(!paused)}
                  aria-label={
                    paused ? "Play 3D animation" : "Pause 3D animation"
                  }
                >
                  {paused ? <Play size={13} /> : <Pause size={13} />}
                </button>
              </div>
              <span className="object-side">DESIGNED TO DO MORE.</span>
            </div>
          </div>
          <div className="hero-bottom">
            <span>REACT & NODE.JS</span>
            <span>SHOPIFY & E-COMMERCE</span>
            <span>n8n & API INTEGRATIONS</span>
            <a href="#work">
              SCROLL TO EXPLORE <ArrowDown size={13} />
            </a>
          </div>
        </section>
        <section id="work" className="work-section">
          <div className="section-marker">
            <span>01 / SELECTED WORK</span>
            <span>IDEAS, MADE REAL</span>
          </div>
          <div className="section-heading">
            <Reveal>
              <h2>
                Less talk.
                <br />
                <em>More making.</em>
              </h2>
            </Reveal>
            <div className="work-intro">
              <p>
                A selection of web experiences, applications, and the systems
                that connect them.
              </p>
              <div className="filters" aria-label="Filter projects">
                {["All", "Websites", "Automations"].map((x) => (
                  <button
                    aria-pressed={filter === x}
                    className={filter === x ? "active" : ""}
                    onClick={() => setFilter(x)}
                    key={x}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="project-grid">
            {projects
              .filter((p) => filter === "All" || p.type === filter)
              .map((p) => (
                <Reveal
                  key={p.id}
                  className={`project-card project-${p.visual}`}
                >
                  <div className="project-visual">
                    <ProjectVisual kind={p.visual} />
                  </div>
                  <div className="project-meta">
                    <span>
                      {p.id} / {p.category}
                    </span>
                    <span>{p.stack}</span>
                  </div>
                  <div className="project-title">
                    <h3>{p.name}</h3>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${p.name}`}
                      >
                        <ArrowUpRight />
                      </a>
                    )}
                  </div>
                  <p>{p.text}</p>
                  <div className="project-links">
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noreferrer">
                        Visit live site <ArrowUpRight size={14} />
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer">
                        View code <Github size={13} />
                      </a>
                    )}
                  </div>
                  {p.visual !== "flow" && (
                    <span className="preview-note">
                      CUSTOM INTERFACE STUDY · OPEN LIVE SITE FOR CURRENT
                      PRODUCT
                    </span>
                  )}
                </Reveal>
              ))}
          </div>
        </section>
        <section id="services" className="services-section">
          <div className="section-marker">
            <span>02 / WHAT I CAN DO FOR YOU</span>
            <span>THE RIGHT TOOL. THE REAL PROBLEM.</span>
          </div>
          <Reveal className="services-heading">
            <h2>
              Make it look right.
              <br />
              <em>Make it work harder.</em>
            </h2>
            <p>
              From the first impression to the work happening behind the scenes.
            </p>
          </Reveal>
          <div className="service-list">
            {[
              {
                icon: Globe,
                no: "01",
                name: "Websites that feel like you.",
                body: "Custom React websites, landing pages, and interactive experiences. Designed around your business, built for mobile, and ready to grow.",
                tags: "UI DEVELOPMENT / RESPONSIVE DESIGN / PERFORMANCE",
                service: "Website",
              },
              {
                icon: ShoppingBag,
                no: "02",
                name: "Storefronts built to sell.",
                body: "Shopify theme development, custom sections, storefront improvements, and integrations that make buying and managing your store simpler.",
                tags: "SHOPIFY / CUSTOM LIQUID / E-COMMERCE",
                service: "Shopify",
              },
              {
                icon: Workflow,
                no: "03",
                name: "Less busywork. More business.",
                body: "n8n workflows, API integrations, and Salesforce solutions that connect your tools and reduce repetitive steps in your operations.",
                tags: "n8n / API INTEGRATIONS / SALESFORCE",
                service: "Automation",
              },
            ].map((s) => (
              <Reveal key={s.no}>
                <a className="service-item" href="#contact">
                  <span className="service-number">{s.no}</span>
                  <s.icon size={27} strokeWidth={1.3} />
                  <div>
                    <h3>{s.name}</h3>
                    <p>{s.body}</p>
                    <small>{s.tags}</small>
                  </div>
                  <ArrowUpRight className="service-arrow" />
                </a>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="process-section">
          <div className="section-marker">
            <span>03 / FROM FIRST HELLO TO GO-LIVE</span>
            <span>NO BLACK BOX</span>
          </div>
          <Reveal>
            <h2>
              Good work starts
              <br />
              with <em>good questions.</em>
            </h2>
          </Reveal>
          <div className="process-grid">
            {[
              [
                "01",
                "Find the real problem",
                "We talk about your business, your users, and what success needs to look like.",
              ],
              [
                "02",
                "Make it tangible",
                "I turn the brief into a clear scope and a direction you can see and respond to.",
              ],
              [
                "03",
                "Build, test, refine",
                "Working software, regular updates, and testing across devices and key user flows.",
              ],
              [
                "04",
                "Launch with clarity",
                "A clean handover, documentation, and a walkthrough of how everything works.",
              ],
            ].map(([n, title, body]) => (
              <Reveal key={n}>
                <span className="process-number">{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="about" className="about-section">
          <div className="section-marker">
            <span>04 / THE PERSON BEHIND THE PIXELS</span>
            <span>ANURAG PATIAL</span>
          </div>
          <div className="about-grid">
            <Reveal>
              <div className="monogram-art" aria-hidden="true">
                a<span>p</span>
                <small>
                  CURIOUS BY DEFAULT.
                  <br />
                  DEVELOPER BY CRAFT.
                </small>
                <i>↗</i>
              </div>
            </Reveal>
            <Reveal>
              <span className="eyebrow">
                DEVELOPER. PROBLEM SOLVER. BUILDER.
              </span>
              <h2>
                I like the part
                <br />
                where it <em>clicks.</em>
              </h2>
              <p>
                When an interface feels natural. When two tools finally talk to
                each other. When a repetitive task becomes a workflow that just
                runs.
              </p>
              <p>
                I’m a software developer based in Mohali, working across React,
                Node.js, Shopify, Salesforce, and n8n. My experience spans web
                applications, merchant tools, and API integrations.
              </p>
              <div className="experience-lines">
                <div>
                  <span>2026 — NOW</span>
                  <strong>Salesforce Developer</strong>
                  <small>Growbiz Solutions Inc.</small>
                </div>
                <div>
                  <span>2025 — 2026</span>
                  <strong>Associate Web Developer</strong>
                  <small>KasWebtech Solutions</small>
                </div>
                <div>
                  <span>2024 — 2025</span>
                  <strong>Software Developer Intern</strong>
                  <small>Raymach Technologies</small>
                </div>
                <div>
                  <span>2023</span>
                  <strong>Apprentice Developer</strong>
                  <small>Antier Solutions</small>
                </div>
              </div>
              <a
                className="text-link"
                href="/Anurag_Patial_Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Read my résumé <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>
        </section>
        <section className="faq-section">
          <div>
            <span className="eyebrow">A FEW USEFUL ANSWERS</span>
            <h2>
              Before we
              <br />
              <em>get started.</em>
            </h2>
          </div>
          <div>
            {[
              [
                "Can you improve an existing website?",
                "Yes. I can work on an existing React website or Shopify storefront, fix issues, develop new sections, and improve the experience without starting everything from scratch.",
              ],
              [
                "What can you automate?",
                "Workflows between tools that have suitable APIs or supported n8n integrations: capturing inquiries, updating records, sending notifications, and reducing repeated data entry. We confirm access and feasibility before agreeing on the scope.",
              ],
              [
                "How much does a project cost?",
                "Pricing depends on scope, integrations, and complexity. Share what you need and your budget; we can define a practical first version before committing to a larger build.",
              ],
              [
                "What should I include in my inquiry?",
                "Your current website (if you have one), the problem you want to solve, any examples you like, your target timeline, and a budget range. A rough idea is enough to start a conversation.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus className="faq-plus" size={18} />
                  <Minus className="faq-minus" size={18} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <Contact />
      </main>
      <footer>
        <a href="#" className="wordmark">
          ap<span>✳</span>
        </a>
        <span>© {new Date().getFullYear()} Anurag Patial</span>
        <div>
          <a
            href="https://github.com/AnuragPatial"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <Github size={14} />
          </a>
          <a
            href="https://linkedin.com/in/anuragpatial"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <Linkedin size={14} />
          </a>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </MotionConfig>
  );
}
