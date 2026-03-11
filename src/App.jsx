import { useState, useEffect, useRef } from "react";
import {
  CheckCircle, BarChart2, Clock, Users, Shield, Download,
  AlertTriangle, ArrowRight, Menu, X, TrendingUp,
  ClipboardList, Bell, Zap, Store, ShoppingBag,
  Coffee, Package, Activity, Calendar, ChevronRight,
  Star, Eye, Layers, Cpu, Lock
} from "lucide-react";

/* ─── DESIGN TOKENS ───────────────────────────────────────────────────── */
const C = {
  bg:      "#080C14",
  surface: "#0F1623",
  card:    "#141C2E",
  border:  "#1E2D47",
  amber:   "#F59E0B",
  amberLt: "#FCD34D",
  blue:    "#3B82F6",
  green:   "#10B981",
  red:     "#EF4444",
  text:    "#F1F5F9",
  muted:   "#94A3B8",
  dim:     "#475569",
};

/* ─── ANIMATED COUNTER ────────────────────────────────────────────────── */
function Counter({ to, suffix = "", prefix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.floor(ease * to));
          if (p < 1) requestAnimationFrame(tick);
          else setVal(to);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

/* ─── MINI BAR CHART ──────────────────────────────────────────────────── */
function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div className="flex items-end gap-1.5" style={{ height: 64 }}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div className="w-full rounded-t-sm transition-all"
            style={{
              height: `${(d.v / max) * 52}px`,
              background: d.hi
                ? `linear-gradient(to top, ${C.amber}, ${C.amberLt})`
                : `${C.blue}55`,
              boxShadow: d.hi ? `0 0 12px ${C.amber}60` : "none"
            }} />
          <span style={{ fontSize: 9, color: d.hi ? C.amber : C.dim, fontWeight: 700 }}>{d.l}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── PROGRESS BAR ────────────────────────────────────────────────────── */
function PBar({ pct, color = C.amber, h = 5, animated = false }) {
  const [width, setWidth] = useState(0);
  const ref = useRef();
  useEffect(() => {
    if (!animated) { setWidth(pct); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setWidth(pct), 200); obs.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct, animated]);
  return (
    <div ref={ref} className="w-full rounded-full overflow-hidden"
      style={{ height: h, background: C.border }}>
      <div className="h-full rounded-full"
        style={{
          width: `${width}%`,
          background: color,
          transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 8px ${color}60`
        }} />
    </div>
  );
}

/* ─── GLOW CARD ───────────────────────────────────────────────────────── */
function GlowCard({ children, className = "", accent = C.amber, hover = true }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      className={`rounded-2xl border transition-all duration-300 ${className}`}
      style={{
        background: C.card,
        borderColor: hov ? `${accent}50` : C.border,
        boxShadow: hov ? `0 0 30px ${accent}20, 0 8px 32px rgba(0,0,0,0.4)` : "0 4px 16px rgba(0,0,0,0.3)",
        transform: hov ? "translateY(-2px)" : "none",
      }}>
      {children}
    </div>
  );
}

/* ─── BADGE ───────────────────────────────────────────────────────────── */
function Badge({ children, color = C.amber }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
      {children}
    </span>
  );
}

/* ─── SECTION WRAPPER ─────────────────────────────────────────────────── */
function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`px-5 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

/* ─── DASHBOARD PREVIEW DATA ──────────────────────────────────────────── */
const weekBars = [
  { l:"Mon", v:34 }, { l:"Tue", v:41 }, { l:"Wed", v:38 },
  { l:"Thu", v:52 }, { l:"Fri", v:47 }, { l:"Sat", v:61, hi:true }, { l:"Sun", v:28 }
];
const staffRows = [
  { name:"Michelle", hrs:"32h 40m", tasks:47, score:94, pct:94, color:"#10B981" },
  { name:"Alyson",   hrs:"28h 15m", tasks:38, score:81, pct:81, color:C.amber },
  { name:"Susan",    hrs:"24h 00m", tasks:31, score:73, pct:73, color:C.blue },
];
const taskRows = [
  { name:"Till Lift / End of Shift",  time:"8m",  done:true },
  { name:"Fridge Date Check",         time:"12m", done:true },
  { name:"Newspaper Returns",         time:"6m",  done:true },
  { name:"Grocery Stacking",          time:"22m", done:false },
  { name:"Post Office",               time:"15m", done:true },
];

/* ─── MAIN COMPONENT ──────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name:"", email:"", business:"", message:"" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label:"Product",       id:"product" },
    { label:"Features",      id:"features" },
    { label:"How It Works",  id:"how-it-works" },
    { label:"Contact",       id:"contact" },
  ];

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily:"'Sora', sans-serif", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
        html { scroll-behavior: smooth; }
        .playfair { font-family: 'Playfair Display', serif; }
        .grid-bg {
          background-image:
            linear-gradient(${C.border}40 1px, transparent 1px),
            linear-gradient(90deg, ${C.border}40 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .amber-glow { box-shadow: 0 0 60px ${C.amber}30, 0 0 120px ${C.amber}10; }
        .text-gradient {
          background: linear-gradient(135deg, ${C.amberLt} 0%, ${C.amber} 50%, #f97316 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .hero-glow {
          background: radial-gradient(ellipse 70% 50% at 50% 0%, ${C.amber}15 0%, transparent 65%);
        }
        @keyframes pulse-glow {
          0%,100% { opacity:0.4; transform: scale(1); }
          50% { opacity:0.7; transform: scale(1.05); }
        }
        .pulse-orb { animation: pulse-glow 4s ease-in-out infinite; }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float { animation: float 5s ease-in-out infinite; }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .slide-up { animation: slideUp 0.6s ease forwards; }
        .d1 { animation-delay: 0.1s; opacity:0; }
        .d2 { animation-delay: 0.25s; opacity:0; }
        .d3 { animation-delay: 0.4s; opacity:0; }
        .d4 { animation-delay: 0.6s; opacity:0; }
        .d5 { animation-delay: 0.8s; opacity:0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 99px; }
        input, textarea { outline: none; }
        input:focus, textarea:focus { border-color: ${C.amber} !important; box-shadow: 0 0 0 3px ${C.amber}20 !important; }
        .nav-blur {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>

      {/* ══ NAVBAR ══════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-blur transition-all duration-300"
        style={{
          background: scrollY > 30 ? `${C.surface}E0` : "transparent",
          borderBottom: scrollY > 30 ? `1px solid ${C.border}` : "1px solid transparent",
        }}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${C.amber}, #f97316)` }}>
              <Store size={15} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-sm tracking-tight" style={{ color: C.text }}>
              Retail <span style={{ color: C.amber }}>Intelligence</span>
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: C.muted }}
                onMouseEnter={e => e.target.style.color = C.text}
                onMouseLeave={e => e.target.style.color = C.muted}>
                {l.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => scrollTo("contact")}
              className="text-sm font-semibold px-4 py-2 rounded-xl transition-all"
              style={{ color: C.muted, border: `1px solid ${C.border}` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.amber; e.currentTarget.style.color = C.amber; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}>
              Request Demo
            </button>
            <button onClick={() => scrollTo("contact")}
              className="text-sm font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
              style={{ background: `linear-gradient(135deg, ${C.amber}, #f97316)`, color: "#000" }}>
              Get Early Access <ArrowRight size={13} strokeWidth={3} />
            </button>
          </div>

          {/* Mobile menu btn */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(v => !v)}
            style={{ color: C.muted }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-5 pb-5 flex flex-col gap-1"
            style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}>
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="text-sm font-medium py-3 text-left border-b"
                style={{ color: C.muted, borderColor: C.border }}>
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")}
              className="mt-3 text-sm font-bold py-3 rounded-xl text-center"
              style={{ background: `linear-gradient(135deg, ${C.amber}, #f97316)`, color: "#000" }}>
              Get Early Access
            </button>
          </div>
        )}
      </nav>

      {/* ══ HERO ════════════════════════════════════════════════════════ */}
      <div className="hero-glow relative overflow-hidden" style={{ paddingTop: 120, paddingBottom: 80, minHeight: "100vh" }}>
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        {/* Orbs */}
        <div className="absolute pointer-events-none pulse-orb"
          style={{ width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle, ${C.amber}12 0%, transparent 70%)`, top:-200, left:"50%", transform:"translateX(-50%)" }} />

        <Section className="relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-7 slide-up d1">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.green }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.green }}>
                Now in early access
              </span>
            </div>

            <h1 className="playfair font-bold leading-tight mb-6 slide-up d2"
              style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", color: C.text }}>
              Know exactly what your staff do{" "}
              <span className="text-gradient italic">every shift.</span>
            </h1>

            <p className="text-lg leading-relaxed mb-8 slide-up d3"
              style={{ color: C.muted, maxWidth: 560, margin:"0 auto 2rem" }}>
              Retail Intelligence gives shop owners real visibility into daily operations —
              task tracking, staff productivity, and shift insights in one simple dashboard.
            </p>

            {/* Benefit pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 slide-up d3">
              {[
                "Track staff tasks in real time",
                "Monitor store from anywhere",
                "Export hours for payroll instantly"
              ].map(b => (
                <span key={b} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: `${C.green}15`, color: C.green, border: `1px solid ${C.green}25` }}>
                  <CheckCircle size={11} strokeWidth={3} /> {b}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-3 slide-up d4">
              <button onClick={() => scrollTo("contact")}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all amber-glow"
                style={{ background: `linear-gradient(135deg, ${C.amber}, #f97316)`, color: "#000" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                Request a Demo <ArrowRight size={14} strokeWidth={3} />
              </button>
              <button onClick={() => scrollTo("product")}
                className="px-6 py-3.5 rounded-2xl font-semibold text-sm flex items-center gap-2 transition-all"
                style={{ background: C.card, color: C.muted, border: `1px solid ${C.border}` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.amber; e.currentTarget.style.color = C.text; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}>
                <Eye size={14} /> View Product
              </button>
            </div>
          </div>

          {/* ── DASHBOARD PREVIEW ──────────────────────────────────── */}
          <div id="product" className="float slide-up d5">
            <GlowCard hover={false} className="overflow-hidden max-w-4xl mx-auto" accent={C.amber}>
              {/* Window chrome */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b"
                style={{ background: C.surface, borderColor: C.border }}>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{background:"#FF5F57"}}/>
                    <div className="w-3 h-3 rounded-full" style={{background:"#FEBC2E"}}/>
                    <div className="w-3 h-3 rounded-full" style={{background:"#28C840"}}/>
                  </div>
                  <span className="text-xs font-bold" style={{ color: C.dim }}>Retail Intelligence — Owner Dashboard</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${C.green}15`, color: C.green }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:C.green}}/>
                  Live
                </div>
              </div>

              {/* Dashboard body */}
              <div className="p-4 md:p-6" style={{ background: C.bg }}>
                {/* Top stat row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {[
                    { icon: Clock,       label:"Hours Today",    val:"6h 20m",  sub:"3 on shift",      color:C.amber },
                    { icon: CheckCircle, label:"Tasks Done",     val:"23",      sub:"4 remaining",     color:C.green },
                    { icon: Users,       label:"Staff Active",   val:"3 / 3",   sub:"All submitted",   color:C.blue },
                    { icon: TrendingUp,  label:"Consistency",    val:"88 / 100",sub:"↑4 vs last week", color:"#A855F7" },
                  ].map((s,i) => (
                    <div key={i} className="rounded-xl p-3 border flex items-center gap-3"
                      style={{ background: C.card, borderColor: C.border }}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${s.color}15` }}>
                        <s.icon size={14} style={{ color: s.color }} />
                      </div>
                      <div>
                        <div className="text-base font-black" style={{ color: s.color }}>{s.val}</div>
                        <div className="text-xs font-semibold" style={{ color: C.dim }}>{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* Bar chart */}
                  <div className="rounded-xl p-4 border" style={{ background: C.card, borderColor: C.border }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-wider" style={{ color: C.muted }}>Weekly Hours</span>
                      <Badge color={C.amber}>This Week</Badge>
                    </div>
                    <BarChart data={weekBars} />
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold" style={{ color: C.dim }}>
                      Total: 314h ·
                      <span style={{ color: C.green }}>↑ 8% vs last week</span>
                    </div>
                  </div>

                  {/* Staff productivity */}
                  <div className="rounded-xl p-4 border" style={{ background: C.card, borderColor: C.border }}>
                    <div className="text-xs font-black uppercase tracking-wider mb-4" style={{ color: C.muted }}>
                      Staff Productivity
                    </div>
                    <div className="space-y-3">
                      {staffRows.map((s,i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold" style={{ color: C.text }}>{s.name}</span>
                            <span className="text-xs font-black" style={{ color: s.color }}>{s.hrs}</span>
                          </div>
                          <PBar pct={s.pct} color={s.color} animated />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Task table */}
                <div className="rounded-xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
                  <div className="px-4 py-3 border-b flex items-center justify-between"
                    style={{ borderColor: C.border, background: C.surface }}>
                    <span className="text-xs font-black uppercase tracking-wider" style={{ color: C.muted }}>Today's Tasks — Michelle</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background:`${C.green}15`, color:C.green }}>4 / 5 complete</span>
                  </div>
                  {taskRows.map((t,i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2.5 border-b last:border-0"
                      style={{ borderColor: C.border, opacity: t.done ? 1 : 0.6 }}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: t.done ? C.green : C.border }}>
                          {t.done && <CheckCircle size={9} color="#000" strokeWidth={3} />}
                        </div>
                        <span className="text-xs font-medium" style={{ color: t.done ? C.text : C.dim }}>{t.name}</span>
                      </div>
                      <span className="text-xs font-bold" style={{ color: C.dim }}>{t.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </div>
        </Section>
      </div>

      {/* ══ STATS STRIP ════════════════════════════════════════════════ */}
      <div className="py-14 border-y" style={{ borderColor: C.border, background: C.surface }}>
        <Section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n:300, s:"+",   label:"Shifts tracked" },
              { n:98,  s:"%",   label:"Task completion rate" },
              { n:4,   s:"hrs", label:"Admin saved weekly" },
              { n:12,  s:"min", label:"Average setup time" },
            ].map((s,i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-black mb-1 text-gradient">
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="text-sm font-medium" style={{ color: C.dim }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ══ PROBLEM ════════════════════════════════════════════════════ */}
      <Section className="py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <Badge color="#EF4444">The Problem</Badge>
            <h2 className="playfair font-bold mt-5 mb-4 leading-tight"
              style={{ fontSize:"clamp(1.9rem,4vw,3rem)", color:C.text }}>
              Running a shop shouldn't<br />rely on guesswork.
            </h2>
            <p style={{ color: C.muted, maxWidth:480, margin:"0 auto" }}>
              Most store owners are operating blind, piecing together what happened in a shift from memory and messages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              { icon:"📋", title:"Paper checklists", desc:"Tasks get forgotten, lost, or simply not checked. There's no accountability and no record." },
              { icon:"💬", title:"WhatsApp chaos",   desc:"Chasing staff on WhatsApp isn't management. It's reactive, unreliable, and exhausting." },
              { icon:"📊", title:"Spreadsheet hell", desc:"Manually copying hours into spreadsheets every week. Error-prone and time-consuming." },
              { icon:"🧮", title:"Manual payroll",   desc:"Counting up hours by hand. Wrong totals. Disputes. Stress you don't need." },
            ].map((p,i) => (
              <GlowCard key={i} className="p-5" accent={C.red}>
                <div className="text-2xl mb-2">{p.icon}</div>
                <div className="font-bold mb-1.5" style={{ color: C.text }}>{p.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: C.muted }}>{p.desc}</div>
              </GlowCard>
            ))}
          </div>

          <div className="rounded-2xl p-5 border flex flex-wrap gap-3 items-center"
            style={{ background:`${C.red}08`, borderColor:`${C.red}30` }}>
            <AlertTriangle size={16} style={{ color: C.red }} />
            <span className="text-sm font-bold" style={{ color: C.red }}>This leads to:</span>
            {["Missed tasks","Poor visibility","Inefficient staffing","Wasted labour cost"].map(t => (
              <span key={t} className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background:`${C.red}18`, color:C.red }}>{t}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ HOW IT WORKS ═══════════════════════════════════════════════ */}
      <div id="how-it-works" style={{ background: C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
        <Section className="py-24">
          <div className="text-center mb-14">
            <Badge>How It Works</Badge>
            <h2 className="playfair font-bold mt-5 leading-tight"
              style={{ fontSize:"clamp(1.9rem,4vw,3rem)", color:C.text }}>
              Three steps to full visibility.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px"
              style={{ background:`linear-gradient(90deg, transparent, ${C.amber}40, transparent)` }} />

            {[
              {
                n:"01", icon:"📱", color:C.amber,
                title:"Staff log tasks",
                desc:"During their shift, staff tap to log each task from their phone. Time is tracked automatically. No paper. No WhatsApp.",
                preview: (
                  <div className="mt-4 rounded-xl overflow-hidden border" style={{ background: C.bg, borderColor: C.border }}>
                    <div className="px-3 py-2 border-b flex items-center gap-1.5"
                      style={{ borderColor: C.border, background: C.card }}>
                      <div className="w-2 h-2 rounded-full" style={{background:C.green}}/>
                      <span className="text-xs font-bold" style={{color:C.dim}}>Michelle · Shift in progress</span>
                    </div>
                    {[
                      {t:"Post Office",  d:"Done",        c:C.green},
                      {t:"Fridge Check", d:"Done",        c:C.green},
                      {t:"Stacking",     d:"In progress", c:C.amber},
                    ].map((r,i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-2 border-b last:border-0"
                        style={{ borderColor: C.border }}>
                        <span className="text-xs font-medium" style={{color:C.muted}}>{r.t}</span>
                        <span className="text-xs font-bold" style={{color:r.c}}>{r.d}</span>
                      </div>
                    ))}
                  </div>
                )
              },
              {
                n:"02", icon:"🖥️", color:C.blue,
                title:"Owner sees everything",
                desc:"Your dashboard updates in real time. See who's working, what's been done, how long it took, and who's falling behind.",
                preview: (
                  <div className="mt-4 space-y-2">
                    {staffRows.map((s,i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs font-semibold mb-1"
                          style={{color:C.muted}}>
                          <span>{s.name}</span>
                          <span style={{color:s.color}}>{s.score}/100</span>
                        </div>
                        <PBar pct={s.pct} color={s.color} h={4} animated />
                      </div>
                    ))}
                  </div>
                )
              },
              {
                n:"03", icon:"📈", color:C.green,
                title:"Insights you can act on",
                desc:"Weekly summaries, payroll exports, and performance trends. Delivered automatically so you can make decisions, not spreadsheets.",
                preview: (
                  <div className="mt-4 rounded-xl border overflow-hidden" style={{ background: C.bg, borderColor: C.border }}>
                    {[
                      {l:"Week total hours",  v:"314h",   c:C.amber},
                      {l:"Labour efficiency", v:"↑ 8%",   c:C.green},
                      {l:"Tasks completed",   v:"148/160", c:C.blue},
                      {l:"Payroll ready",     v:"✓ Export",c:C.green},
                    ].map((r,i) => (
                      <div key={i} className="flex justify-between px-3 py-2.5 border-b last:border-0"
                        style={{ borderColor: C.border }}>
                        <span className="text-xs font-medium" style={{color:C.dim}}>{r.l}</span>
                        <span className="text-xs font-black" style={{color:r.c}}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                )
              },
            ].map((s,i) => (
              <GlowCard key={i} className="p-6" accent={s.color}>
                <div className="text-4xl font-black mb-3 leading-none" style={{ color:`${s.color}30`, fontFamily:"Playfair Display" }}>{s.n}</div>
                <div className="text-3xl mb-3">{s.icon}</div>
                <Badge color={s.color}>{`Step ${i+1}`}</Badge>
                <div className="font-black text-lg mt-3 mb-2" style={{ color: C.text }}>{s.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: C.muted }}>{s.desc}</div>
                {s.preview}
              </GlowCard>
            ))}
          </div>
        </Section>
      </div>

      {/* ══ FEATURES ═══════════════════════════════════════════════════ */}
      <Section id="features" className="py-24">
        <div className="text-center mb-14">
          <Badge>Features</Badge>
          <h2 className="playfair font-bold mt-5 leading-tight"
            style={{ fontSize:"clamp(1.9rem,4vw,3rem)", color:C.text }}>
            Everything you need to run<br />a tighter operation.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon:ClipboardList, color:C.amber,  title:"Task Tracking",          desc:"Staff log every task during their shift. Times are recorded. Nothing is left untracked." },
            { icon:BarChart2,     color:C.blue,   title:"Productivity Insights",  desc:"Scores, comparisons, and trends for every staff member. See who's performing and who needs support." },
            { icon:Bell,          color:"#A855F7",title:"Shift Alerts",           desc:"Get notified the moment a shift is submitted — or when it hasn't been started on time." },
            { icon:Download,      color:C.green,  title:"Payroll Export",         desc:"One-click export of all staff hours. Send straight to payroll without touching a spreadsheet." },
            { icon:AlertTriangle, color:C.red,    title:"Incident Reporting",     desc:"Staff can log any incident during a shift. Timestamped, recorded, and visible on your dashboard." },
            { icon:Users,         color:C.amber,  title:"Multi-location Support", desc:"Manage multiple stores from one owner dashboard. Switch between locations in seconds." },
          ].map((f,i) => (
            <GlowCard key={i} className="p-6" accent={f.color}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background:`${f.color}15` }}>
                <f.icon size={18} style={{ color: f.color }} />
              </div>
              <div className="font-black mb-2" style={{ color: C.text }}>{f.title}</div>
              <div className="text-sm leading-relaxed" style={{ color: C.muted }}>{f.desc}</div>
            </GlowCard>
          ))}
        </div>
      </Section>

      {/* ══ WHO IT'S FOR ═══════════════════════════════════════════════ */}
      <div style={{ background: C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
        <Section className="py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge>Who It's For</Badge>
              <h2 className="playfair font-bold mt-5 mb-5 leading-tight"
                style={{ fontSize:"clamp(1.9rem,4vw,3rem)", color:C.text }}>
                Built for real<br />retail stores.
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: C.muted }}>
                We built Retail Intelligence specifically for small store owners who are doing everything themselves —
                managing staff, covering shifts, handling payroll, and trying to grow their business at the same time.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon:Store,       label:"Convenience Stores" },
                  { icon:ShoppingBag, label:"Supermarkets" },
                  { icon:Package,     label:"Off-licences" },
                  { icon:Coffee,      label:"Independent Shops" },
                ].map((s,i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl border"
                    style={{ background: C.card, borderColor: C.border }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background:`${C.amber}15` }}>
                      <s.icon size={13} style={{ color: C.amber }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: C.muted }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: C.dim }}>
                What you get
              </div>
              {[
                { icon:Clock,       label:"Reduce wasted labour time",        desc:"Stop paying for unproductive shifts." },
                { icon:TrendingUp,  label:"Improve store productivity",       desc:"Benchmarks show you where to improve." },
                { icon:CheckCircle, label:"Ensure tasks are completed",       desc:"No more guessing if things got done." },
                { icon:Download,    label:"Simplify payroll",                 desc:"Hours ready to export in one click." },
                { icon:Eye,         label:"Manage when you're not there",     desc:"Full visibility without being on site." },
              ].map((b,i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border transition-all"
                  style={{ background: C.card, borderColor: C.border }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${C.amber}50`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background:`${C.amber}15` }}>
                    <b.icon size={14} style={{ color: C.amber }} />
                  </div>
                  <div>
                    <div className="text-sm font-black mb-0.5" style={{ color: C.text }}>{b.label}</div>
                    <div className="text-xs" style={{ color: C.dim }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* ══ ROADMAP ════════════════════════════════════════════════════ */}
      <Section className="py-24">
        <div className="text-center mb-14">
          <Badge color={C.blue}>Coming Soon</Badge>
          <h2 className="playfair font-bold mt-5 leading-tight"
            style={{ fontSize:"clamp(1.9rem,4vw,3rem)", color:C.text }}>
            The future of Retail Intelligence.
          </h2>
          <p className="mt-4 text-sm" style={{ color: C.muted, maxWidth:400, margin:"1rem auto 0" }}>
            We're building fast. These features are coming next.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon:Calendar,    label:"Shift scheduling",             eta:"Q2 2026" },
            { icon:TrendingUp,  label:"Labour vs revenue insights",   eta:"Q2 2026" },
            { icon:Cpu,         label:"POS integrations",             eta:"Q3 2026" },
            { icon:Activity,    label:"Automated weekly reports",     eta:"Q3 2026" },
            { icon:Lock,        label:"Incident logging with photos", eta:"Q3 2026" },
          ].map((r,i) => (
            <GlowCard key={i} className="p-5 text-center" accent={C.blue}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background:`${C.blue}15` }}>
                <r.icon size={16} style={{ color: C.blue }} />
              </div>
              <div className="text-xs font-bold mb-2 leading-snug" style={{ color: C.text }}>{r.label}</div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background:`${C.blue}15`, color:C.blue }}>{r.eta}</span>
            </GlowCard>
          ))}
        </div>
      </Section>

      {/* ══ FOUNDER STORY ══════════════════════════════════════════════ */}
      <div style={{ background: C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
        <Section className="py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge color={C.green}>Why We Built This</Badge>
            <h2 className="playfair font-bold italic mt-5 mb-6 leading-tight"
              style={{ fontSize:"clamp(1.9rem,4vw,3rem)", color:C.text }}>
              "Most shop owners have no idea what actually happens during a shift."
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>
              Small retail stores are often running on trust, habit, and hope. Owners rely on word of mouth
              and memory to understand how their store is operating. When something goes wrong — a task
              missed, hours disputed, a customer complaint — there's no record.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              Retail Intelligence was built to change that. Not with complex, expensive enterprise software —
              but with a simple, practical tool that gives store owners the visibility they deserve.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-2xl border"
              style={{ background: C.card, borderColor: C.border }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
                style={{ background:`linear-gradient(135deg, ${C.amber}, #f97316)`, color:"#000" }}>RI</div>
              <div className="text-left">
                <div className="text-xs font-black" style={{ color: C.text }}>Retail Intelligence</div>
                <div className="text-xs" style={{ color: C.dim }}>Built in the UK for UK retailers</div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ══ FINAL CTA ══════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden py-24 px-5"
        style={{ background:`radial-gradient(ellipse 80% 80% at 50% 50%, ${C.amber}12 0%, ${C.bg} 70%)` }}>
        <div className="max-w-2xl mx-auto text-center relative">
          <div className="flex justify-center gap-0.5 mb-5">
            {[...Array(5)].map((_,i) => (
              <Star key={i} size={16} fill={C.amber} color={C.amber} />
            ))}
          </div>
          <h2 className="playfair font-bold mb-5 leading-tight"
            style={{ fontSize:"clamp(2rem,5vw,3.5rem)", color:C.text }}>
            Start managing your store<br />
            <span className="text-gradient italic">with real visibility.</span>
          </h2>
          <p className="text-sm mb-8" style={{ color: C.muted, maxWidth:440, margin:"0 auto 2rem" }}>
            Join shop owners who've ditched the spreadsheets and replaced guesswork with real operational intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => scrollTo("contact")}
              className="px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all amber-glow"
              style={{ background:`linear-gradient(135deg, ${C.amber}, #f97316)`, color:"#000" }}
              onMouseEnter={e => e.currentTarget.style.transform="scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
              Request Demo <ArrowRight size={14} strokeWidth={3} />
            </button>
            <button onClick={() => scrollTo("contact")}
              className="px-7 py-3.5 rounded-2xl font-semibold text-sm transition-all"
              style={{ background:C.card, color:C.muted, border:`1px solid ${C.border}` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=C.amber; e.currentTarget.style.color=C.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.muted; }}>
              Get Early Access
            </button>
          </div>
        </div>
      </div>

      {/* ══ CONTACT ════════════════════════════════════════════════════ */}
      <div style={{ background: C.surface, borderTop:`1px solid ${C.border}` }}>
        <Section id="contact" className="py-24">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <Badge>Get In Touch</Badge>
              <h2 className="playfair font-bold mt-5 mb-3 leading-tight"
                style={{ fontSize:"clamp(1.9rem,4vw,2.8rem)", color:C.text }}>
                Let's talk about<br />your store.
              </h2>
              <p className="text-sm" style={{ color: C.muted }}>
                Request a demo or ask anything. We reply within 24 hours.
              </p>
            </div>

            {submitted ? (
              <GlowCard className="p-10 text-center" accent={C.green}>
                <div className="text-4xl mb-4">✅</div>
                <div className="font-black text-lg mb-1" style={{ color: C.text }}>Message received!</div>
                <div className="text-sm" style={{ color: C.muted }}>We'll be in touch within 24 hours.</div>
              </GlowCard>
            ) : (
              <GlowCard className="p-6 md:p-8" accent={C.amber}>
                <div className="space-y-4">
                  {[
                    { key:"name",     label:"Your Name",     type:"text",  ph:"Jane Smith" },
                    { key:"email",    label:"Email Address", type:"email", ph:"jane@mystore.co.uk" },
                    { key:"business", label:"Business Name", type:"text",  ph:"Londis Horden" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: C.dim }}>{f.label}</label>
                      <input type={f.type} placeholder={f.ph}
                        value={formData[f.key]}
                        onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl text-sm font-medium border transition-all"
                        style={{
                          background: C.bg, borderColor: C.border,
                          color: C.text, fontFamily:"Sora, sans-serif",
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: C.dim }}>Message</label>
                    <textarea placeholder="Tell us about your store and what you're looking for…"
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium border transition-all resize-none"
                      style={{
                        background: C.bg, borderColor: C.border,
                        color: C.text, fontFamily:"Sora, sans-serif",
                      }} />
                  </div>
                  <button
                    onClick={() => { if (formData.name && formData.email) setSubmitted(true); }}
                    className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                    style={{ background:`linear-gradient(135deg, ${C.amber}, #f97316)`, color:"#000" }}
                    onMouseEnter={e => e.currentTarget.style.opacity="0.9"}
                    onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                    Send Message <ArrowRight size={14} strokeWidth={3} />
                  </button>
                </div>
              </GlowCard>
            )}
          </div>
        </Section>
      </div>

      {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer className="py-10 px-5 border-t" style={{ borderColor: C.border, background: C.bg }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ background:`linear-gradient(135deg, ${C.amber}, #f97316)` }}>
              <Store size={13} className="text-white" strokeWidth={2.5}/>
            </div>
            <div>
              <div className="font-bold text-sm" style={{ color: C.text }}>
                Retail <span style={{ color: C.amber }}>Intelligence</span>
              </div>
              <div className="text-xs" style={{ color: C.dim }}>Staff management for small retail stores</div>
            </div>
          </div>

          <a href="mailto:hello@retail-intelligence.co.uk"
            className="text-sm font-semibold transition-colors"
            style={{ color: C.dim }}
            onMouseEnter={e => e.target.style.color = C.amber}
            onMouseLeave={e => e.target.style.color = C.dim}>
            hello@retail-intelligence.co.uk
          </a>

          <div className="text-xs font-medium" style={{ color: C.dim }}>
            © 2026 Retail Intelligence · Built in the UK
          </div>
        </div>
      </footer>
    </div>
  );
}
