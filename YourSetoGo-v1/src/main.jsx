import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronDown, Clapperboard,
  Code2, ExternalLink, Gauge, Instagram, Layers3, Linkedin, Mail, Menu,
  MessageSquare, MonitorSmartphone, PackageCheck, Palette, PenTool,
  Presentation, ShieldCheck, Sparkles, Users, X, Zap
} from "lucide-react";
import "./styles.css";

const ACCENT = "#4B3FE4";
const EMAIL = "yoursetogo@gmail.com";

const services = [
  { icon: Code2, number: "01", title: "Web Development", desc: "Modern websites, landing pages and web experiences built for speed, clarity and conversion.", items: ["Business websites", "Landing pages", "WordPress", "React websites", "Web applications"] },
  { icon: Palette, number: "02", title: "Design", desc: "Clean, purposeful design that makes your business look as good as it operates.", items: ["UI/UX", "Figma designs", "Pitch decks", "PowerPoint presentations", "Marketing graphics"] },
  { icon: Clapperboard, number: "03", title: "Digital Content", desc: "Content that helps brands communicate, market and grow without building another in-house team.", items: ["Video editing", "Social creatives", "Marketing assets", "Promotional content"] }
];

const work = [
  { name: "NovaFit", category: "Web", type: "Fitness startup website", desc: "A performance-first concept site designed to turn first-time visitors into members.", tone: "violet" },
  { name: "Finora", category: "Web", type: "FinTech landing page", desc: "A trust-led landing page concept focused on clarity, hierarchy and fast scanning.", tone: "blue" },
  { name: "Elevate", category: "Presentations", type: "Startup investor pitch deck", desc: "A concise narrative system for presenting traction, market opportunity and the ask.", tone: "dark" },
  { name: "Foodly", category: "UI/UX", type: "Food delivery mobile UI", desc: "A mobile ordering flow balancing speed of checkout with appetite-driven visuals.", tone: "orange" },
  { name: "Orbit", category: "UI/UX", type: "SaaS dashboard concept", desc: "A dense B2B dashboard concept designed around fast scanning and useful hierarchy.", tone: "cyan" }
];

const process = [
  { n: "01", icon: MessageSquare, title: "Tell us what you need", text: "Share your goals, requirements, references and deadline." },
  { n: "02", icon: Users, title: "We build the team", text: "We assign the right specialist or specialists for the project." },
  { n: "03", icon: Layers3, title: "We manage the work", text: "YourSetoGo handles communication, coordination and quality control." },
  { n: "04", icon: PackageCheck, title: "You get the result", text: "Review the work, request agreed revisions and approve final delivery." }
];

const why = [
  { icon: Users, title: "One point of contact", text: "No juggling five different freelancers." },
  { icon: Zap, title: "Specialist execution", text: "Projects are matched with the right production skill." },
  { icon: Gauge, title: "Flexible capacity", text: "Add production capacity without permanent headcount." },
  { icon: ShieldCheck, title: "Quality controlled", text: "Work passes through YourSetoGo before final delivery." }
];

const pricing = [
  { name: "Starter", desc: "For focused, smaller jobs.", price: "From $99", items: ["Simple presentation", "Landing page", "Small design task"] },
  { name: "Business", desc: "For growing businesses.", price: "From $399", items: ["Business website", "Pitch deck", "UI/UX project"], featured: true },
  { name: "Custom", desc: "For larger or ongoing work.", price: "Let's talk", items: ["Web applications", "Complete redesigns", "Multi-page websites", "Ongoing production"] }
];

function Logo({ dark = false }) {
  return <a className="brand" href="#/" aria-label="YourSetoGo home">
    <span className="brand-mark" aria-hidden="true"><span /></span>
    <span>YourSeto<span className="brand-accent">Go</span></span>
  </a>;
}

function Button({ children, href = "#/contact", variant = "primary", className = "" }) {
  return <a href={href} className={`btn btn-${variant} ${className}`}>{children}<ArrowRight size={16} /></a>;
}

function Eyebrow({ children, dark = false }) {
  return <div className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}><span />{children}</div>;
}

function SectionHeading({ eyebrow, title, text, dark = false, center = false }) {
  return <div className={`section-heading ${dark ? "dark" : ""} ${center ? "center" : ""}`}>
    {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>;
}

function useHashRoute() {
  const get = () => window.location.hash.replace(/^#\/?/, "") || "home";
  const [route, setRoute] = useState(get);
  useEffect(() => {
    const change = () => { setRoute(get()); window.scrollTo({ top: 0, behavior: "auto" }); };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  return [route, (path) => { window.location.hash = path; }];
}

function Reveal({ children, className = "" }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
    }), { threshold: .12 });
    el.forEach(x => obs.observe(x));
    return () => obs.disconnect();
  }, []);
  return <div data-reveal className={`reveal ${className}`}>{children}</div>;
}

function Navbar({ route }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", f, { passive: true }); f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => setOpen(false), [route]);
  const links = [["Services","services"],["Work","work"],["Process","process"],["About","about"]];
  return <header className={`nav ${scrolled || open ? "nav-scrolled" : ""}`}>
    <div className="nav-inner">
      <Logo />
      <div className="nav-links">{links.map(([label, href]) => <a key={href} className={route === href ? "active" : ""} href={`#/${href}`}>{label}</a>)}</div>
      <Button href="#/contact" variant="accent" className="nav-cta">Start a Project</Button>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={19}/> : <Menu size={19}/>}</button>
    </div>
    <div className={`mobile-menu ${open ? "open" : ""}`}>
      {links.map(([label, href]) => <a key={href} href={`#/${href}`}>{label}</a>)}
      <Button href="#/contact" variant="accent">Start a Project</Button>
    </div>
  </header>;
}

function HeroVisual() {
  return <div className="hero-visual">
    <div className="visual-grid" />
    <div className="orbit orbit-a" />
    <div className="orbit orbit-b" />
    <div className="visual-core"><span>Y</span></div>
    <div className="visual-chip chip-a">WEB</div>
    <div className="visual-chip chip-b">DESIGN</div>
    <div className="visual-chip chip-c">BUILD</div>
    <div className="visual-dot dot-a" /><div className="visual-dot dot-b" /><div className="visual-dot dot-c" />
  </div>;
}

function Home() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Web", "UI/UX", "Presentations"];
  const filtered = filter === "All" ? work : work.filter(w => w.category === filter);
  return <>
    <main>
      <section className="hero container">
        <div className="hero-copy">
          <Reveal><Eyebrow>Digital production, without the headcount</Eyebrow></Reveal>
          <Reveal><h1>Your digital team, <span>on demand.</span></h1></Reveal>
          <Reveal><p>Websites, design, presentations and digital production delivered by a managed team of specialists.</p></Reveal>
          <Reveal><div className="hero-actions"><Button href="#/contact" variant="accent">Start a Project</Button><Button href="#/work" variant="ghost">View Our Work</Button></div></Reveal>
          <Reveal><div className="proof-line"><CheckCircle2 size={16}/> One team. Multiple specialists. One point of contact.</div></Reveal>
        </div>
        <Reveal><HeroVisual /></Reveal>
      </section>

      <section className="value-strip container">
        {["Web Development","UI/UX Design","Presentations","Digital Content"].map((x,i) => <div key={x}><span className="value-icon">{[<MonitorSmartphone/>,<PenTool/>,<Presentation/>,<Clapperboard/>][i]}</span>{x}</div>)}
      </section>

      <section className="section container" id="services">
        <SectionHeading eyebrow="What we do" title="Everything you need to ship digital work." text="From a landing page to a complete digital project, YourSetoGo connects you with the right specialists while keeping the process under one roof." />
        <div className="service-grid">{services.map((s,i) => <Reveal key={s.number}><article className="service-card"><div className="service-top"><div className="icon-box"><s.icon size={20}/></div><span>{s.number}</span></div><h3>{s.title}</h3><p>{s.desc}</p><ul>{s.items.map(x => <li key={x}><Check size={15}/>{x}</li>)}</ul><a href="#/contact">Discuss a project <ArrowUpRight size={15}/></a></article></Reveal>)}</div>
      </section>

      <section className="dark-section">
        <div className="container white-label">
          <div><Eyebrow dark>For agencies</Eyebrow><h2>Need a production team behind your agency?</h2><p>You sell the project. We handle the production. Use YourSetoGo as an external delivery team when you need more capacity without adding permanent headcount.</p><Button href="#/contact" variant="light">Partner With Us</Button></div>
          <div className="white-label-list">{["Keep the client relationship","Scale without hiring","One reliable delivery partner"].map((x,i)=><div key={x}><span>0{i+1}</span><div><h3>{x}</h3><p>{["You remain the face of the project.","Add production capacity when demand increases.","YourSetoGo manages execution from brief to final delivery."][i]}</p></div></div>)}</div>
        </div>
      </section>

      <section className="section container" id="process">
        <SectionHeading eyebrow="How it works" title="From brief to delivered." text="A simple process designed to keep you moving without making you manage the production team." />
        <div className="process-grid">{process.map((p,i)=><Reveal key={p.n}><div className="process-card"><div className="process-number">{p.n}</div><p.icon className="process-icon" size={21}/><h3>{p.title}</h3><p>{p.text}</p></div></Reveal>)}</div>
      </section>

      <section className="section container" id="work">
        <div className="work-head"><SectionHeading eyebrow="Selected concepts" title="Work that speaks for itself." text="These are concept projects built to demonstrate the quality and range of our production work." /><div className="filters">{categories.map(x=><button key={x} className={filter===x?"active":""} onClick={()=>setFilter(x)}>{x}</button>)}</div></div>
        <div className="work-grid">{filtered.map((w,i)=><Reveal key={w.name}><article className={`work-card ${w.tone}`}><div className="work-art"><div className="mock-window"><div/><div/><div/></div><div className="work-art-title">{w.name}</div></div><div className="work-info"><div><span>{w.category}</span><h3>{w.name}</h3></div><ArrowUpRight size={20}/><p>{w.desc}</p></div></article></Reveal>)}</div>
      </section>

      <section className="section soft-section" id="about">
        <div className="container">
          <SectionHeading eyebrow="Why YourSetoGo" title="One team. Less coordination." text="You shouldn't have to assemble and manage five different specialists for one project. We handle the production layer so you can focus on your business." />
          <div className="why-grid">{why.map(w=><Reveal key={w.title}><div className="why-card"><div className="icon-box"><w.icon size={20}/></div><h3>{w.title}</h3><p>{w.text}</p></div></Reveal>)}</div>
        </div>
      </section>

      <section className="section container pricing-section">
        <SectionHeading eyebrow="Starting points" title="Simple pricing. Custom scope." text="Use these as starting points. Final pricing depends on scope, complexity and timeline." />
        <div className="pricing-grid">{pricing.map(p=><div className={`price-card ${p.featured?"featured":""}`} key={p.name}>{p.featured && <div className="popular">Most popular</div>}<h3>{p.name}</h3><p>{p.desc}</p><strong>{p.price}</strong><ul>{p.items.map(x=><li key={x}><Check size={15}/>{x}</li>)}</ul><Button href="#/contact" variant={p.featured?"accent":"ghost"}>{p.name==="Custom"?"Start a Conversation":"Get a Quote"}</Button></div>)}</div>
      </section>

      <CTA />
    </main>
  </>;
}

function SimplePage({ title, eyebrow, children }) {
  return <main className="page container"><SectionHeading eyebrow={eyebrow} title={title}/>{children}<CTA/></main>;
}

function ServicesPage() {
  return <SimplePage eyebrow="Services" title="Production support without the permanent headcount.">
    <div className="service-detail-list">{services.map(s=><article key={s.number}><div className="detail-number">{s.number}</div><div><div className="detail-title"><s.icon size={22}/><h3>{s.title}</h3></div><p>{s.desc}</p><div className="detail-items">{s.items.map(x=><span key={x}><Check size={14}/>{x}</span>)}</div></div></article>)}</div>
  </SimplePage>;
}

function ProcessPage() {
  return <SimplePage eyebrow="Process" title="A clear path from brief to final delivery.">
    <div className="process-page">{process.map(p=><article key={p.n}><div className="process-number">{p.n}</div><div><p.icon size={24}/><h3>{p.title}</h3><p>{p.text}</p></div></article>)}</div>
  </SimplePage>;
}

function WorkPage() {
  return <SimplePage eyebrow="Work" title="Concepts today. Client work next.">
    <p className="page-note">The examples below are concept projects and are not presented as client work. They demonstrate the type of output YourSetoGo can deliver.</p>
    <div className="work-grid page-work">{work.map(w=><article className={`work-card ${w.tone}`} key={w.name}><div className="work-art"><div className="mock-window"><div/><div/><div/></div><div className="work-art-title">{w.name}</div></div><div className="work-info"><div><span>{w.category}</span><h3>{w.name}</h3></div><ArrowUpRight size={20}/><p>{w.desc}</p></div></article>)}</div>
  </SimplePage>;
}

function AboutPage() {
  return <SimplePage eyebrow="About YourSetoGo" title="Built to make digital work easier.">
    <div className="about-layout"><div><p className="lead">Great digital work shouldn't require a business to assemble and manage an entire specialist team itself.</p><p>YourSetoGo brings together designers, developers and digital specialists and manages the process from brief to delivery.</p><p>You get one point of contact, clear scope and a managed production process.</p></div><div className="about-panel"><Sparkles size={24}/><h3>Lean by design.</h3><p>We keep the core operation focused and bring in the right specialist for the job instead of pretending every project needs a huge permanent team.</p></div></div>
  </SimplePage>;
}

function ContactPage() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({name:"",email:"",company:"",country:"",service:"Website",budget:"Under $250",timeline:"",message:""});
  const update = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = async e => {
    e.preventDefault();
    setSending(true); setStatus("");
    try {
      const res = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to send");
      setStatus("Thanks. Your project request has been sent.");
      setForm({name:"",email:"",company:"",country:"",service:"Website",budget:"Under $250",timeline:"",message:""});
    } catch {
      const subject = encodeURIComponent(`Project inquiry from ${form.name || "YourSetoGo website"}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nCountry: ${form.country}\nService: ${form.service}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\n${form.message}`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setStatus("Your email app should open with the inquiry pre-filled.");
    } finally { setSending(false); }
  };
  return <main className="contact-page container"><div className="contact-grid"><div><SectionHeading eyebrow="Start a project" title="Tell us what you're building." text="Give us the useful details. We'll review the brief and get back to you with the right next step."/><div className="contact-direct"><Mail size={18}/><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div><form className="contact-form" onSubmit={submit}><div className="form-row"><label>Name<input required name="name" value={form.name} onChange={update} placeholder="Your name"/></label><label>Work email<input required type="email" name="email" value={form.email} onChange={update} placeholder="you@company.com"/></label></div><div className="form-row"><label>Company<input name="company" value={form.company} onChange={update} placeholder="Company name"/></label><label>Country<input name="country" value={form.country} onChange={update} placeholder="United States"/></label></div><div className="form-row"><label>What do you need?<select name="service" value={form.service} onChange={update}>{["Website","Web Application","UI/UX","Presentation","Video","Graphic Design","Other"].map(x=><option key={x}>{x}</option>)}</select></label><label>Estimated budget<select name="budget" value={form.budget} onChange={update}>{["Under $250","$250–$500","$500–$1,000","$1,000–$2,500","$2,500+"].map(x=><option key={x}>{x}</option>)}</select></label></div><label>Desired timeline<input name="timeline" value={form.timeline} onChange={update} placeholder="e.g. 2–3 weeks"/></label><label>Project details<textarea required name="message" value={form.message} onChange={update} rows="7" placeholder="What are you trying to build? Include links, references or requirements if useful."/></label><button className="btn btn-accent submit" disabled={sending}>{sending ? "Sending…" : "Submit Project Request"}<ArrowRight size={16}/></button>{status && <div className="form-status"><CheckCircle2 size={17}/>{status}</div>}<p className="form-privacy">By submitting this form, you agree that YourSetoGo can use the information provided to respond to your inquiry.</p></form></div></main>;
}

function CTA() {
  return <section className="cta-section container"><div><Eyebrow dark>Let's build something useful</Eyebrow><h2>Have a project in mind?</h2><p>Tell us what you're building. We'll figure out the right production setup.</p></div><Button href="#/contact" variant="light">Start a Project</Button></section>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div><Logo dark/><p>Your external digital production team.</p></div><div><h4>Explore</h4><a href="#/services">Services</a><a href="#/work">Work</a><a href="#/process">Process</a><a href="#/about">About</a></div><div><h4>Contact</h4><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href="#/contact">Start a project</a></div><div><h4>Social</h4><a href="#" aria-label="LinkedIn"><Linkedin size={17}/> LinkedIn</a><a href="#" aria-label="Instagram"><Instagram size={17}/> Instagram</a></div></div><div className="container footer-bottom"><span>© 2026 YourSetoGo. All rights reserved.</span><span>Built for focused digital delivery.</span></div></footer>;
}

function App() {
  const [route] = useHashRoute();
  const Page = useMemo(() => {
    if (route === "services") return ServicesPage;
    if (route === "work") return WorkPage;
    if (route === "process") return ProcessPage;
    if (route === "about") return AboutPage;
    if (route === "contact") return ContactPage;
    return Home;
  }, [route]);
  return <><Navbar route={route}/><Page/><Footer/></>;
}

createRoot(document.getElementById("root")).render(<App/>);
