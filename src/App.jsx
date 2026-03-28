import { useState, useEffect, useRef } from "react";
import {
  CheckCircle, BarChart2, Clock, Users, Download,
  AlertTriangle, ArrowRight, Menu, X, TrendingUp,
  ClipboardList, Bell, Store, ShoppingBag,
  Coffee, Package, Star, Eye, Lock, Smartphone,
  Building2, GitCompare, Zap, FileText
} from "lucide-react";

const C = {
  bg:"#080C14",surface:"#0F1623",card:"#141C2E",border:"#1E2D47",
  amber:"#F59E0B",amberLt:"#FCD34D",blue:"#3B82F6",green:"#10B981",
  red:"#EF4444",purple:"#A855F7",text:"#F1F5F9",muted:"#94A3B8",dim:"#475569",
};

function Counter({to,suffix=""}){
  const [v,setV]=useState(0);const ref=useRef();const started=useRef(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started.current){started.current=true;
        const t0=performance.now();
        const tick=now=>{const p=Math.min((now-t0)/2000,1);const ease=1-Math.pow(1-p,3);
          setV(Math.floor(ease*to));if(p<1)requestAnimationFrame(tick);else setV(to);};
        requestAnimationFrame(tick);}},{threshold:0.5});
    if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();
  },[to]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

function PBar({pct,color=C.amber}){
  const [w,setW]=useState(0);const ref=useRef();
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){setTimeout(()=>setW(pct),200);obs.disconnect();}},{threshold:0.3});
    if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();
  },[pct]);
  return(
    <div ref={ref} style={{height:5,background:C.border,borderRadius:99,overflow:"hidden",width:"100%"}}>
      <div style={{height:"100%",borderRadius:99,background:color,width:`${w}%`,
        transition:"width 1s cubic-bezier(0.4,0,0.2,1)",boxShadow:`0 0 8px ${color}60`}}/>
    </div>
  );
}

const weekBars=[{l:"Mon",v:34},{l:"Tue",v:41},{l:"Wed",v:38},{l:"Thu",v:52},{l:"Fri",v:47},{l:"Sat",v:61,hi:true},{l:"Sun",v:28}];
function MiniBarChart(){
  const max=Math.max(...weekBars.map(d=>d.v));
  return(
    <div style={{display:"flex",alignItems:"flex-end",gap:6,height:72}}>
      {weekBars.map((d,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          <div style={{width:"100%",borderRadius:"3px 3px 0 0",height:`${(d.v/max)*56}px`,
            background:d.hi?`linear-gradient(to top,${C.amber},${C.amberLt})`:`${C.blue}50`,
            boxShadow:d.hi?`0 0 12px ${C.amber}60`:"none"}}/>
          <span style={{fontSize:9,color:d.hi?C.amber:C.dim,fontWeight:700}}>{d.l}</span>
        </div>
      ))}
    </div>
  );
}

function Card({children,style={},accent=C.amber}){
  const [hov,setHov]=useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:C.card,border:`1px solid ${hov?`${accent}55`:C.border}`,borderRadius:16,padding:24,
        boxShadow:hov?`0 0 30px ${accent}18,0 8px 32px rgba(0,0,0,0.4)`:"0 4px 16px rgba(0,0,0,0.25)",
        transform:hov?"translateY(-2px)":"none",transition:"all 0.25s ease",...style}}>
      {children}
    </div>
  );
}

function Badge({children,color=C.amber}){
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:11,fontWeight:700,
      letterSpacing:"0.08em",textTransform:"uppercase",background:`${color}18`,color,
      border:`1px solid ${color}30`,borderRadius:99,padding:"5px 12px"}}>
      {children}
    </span>
  );
}

// Mini phone mockup component
function PhoneMock({children, title="Retail Intelligence", subtitle="Owner Dashboard"}){
  return(
    <div style={{width:240,background:C.card,borderRadius:32,border:`1.5px solid ${C.border}`,
      overflow:"hidden",boxShadow:`0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${C.amber}10`,margin:"0 auto"}}>
      <div style={{background:C.bg,padding:"12px 16px",borderBottom:`1px solid ${C.border}`,
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,color:C.text}}>{title}</span>
        <span style={{fontSize:10,color:C.dim}}>{subtitle}</span>
      </div>
      <div style={{padding:14}}>{children}</div>
    </div>
  );
}

const staffRows=[
  {name:"Alyson",hrs:"24h",tasks:10,avgm:111,pct:90,color:C.blue},
  {name:"Michelle",hrs:"21h",tasks:7,avgm:105,pct:79,color:C.amber},
  {name:"Susan",hrs:"12h",tasks:5,avgm:120,pct:55,color:C.purple},
];

const taskRows=[
  {name:"Post Office",time:"90m",done:true},
  {name:"Till Lift / End of Shift",time:"8m",done:true},
  {name:"Fridge Date Check",time:"40m",done:true},
  {name:"Magazine Returns",time:"6m",done:true},
  {name:"Crisp Stacking",time:"35m",done:false},
];

const pinKeys=["1","2","3","4","5","6","7","8","9","⌫","0","→"];

const LBL={fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.dim};
const BODY={fontSize:14,color:C.muted,lineHeight:1.7};
const BTNP={background:`linear-gradient(135deg,${C.amber},#f97316)`,color:"#000",border:"none",
  borderRadius:14,padding:"13px 24px",fontSize:14,fontWeight:700,cursor:"pointer",
  display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'Sora',sans-serif"};
const BTNS={background:"#141C2E",color:"#94A3B8",border:`1px solid #1E2D47`,borderRadius:14,
  padding:"13px 24px",fontSize:14,fontWeight:600,cursor:"pointer",
  display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'Sora',sans-serif"};

export default function App(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [scrollY,setScrollY]=useState(0);
  const [form,setForm]=useState({name:"",email:"",business:"",message:""});
  const [sent,setSent]=useState(false);
  const [submitting,setSubmitting]=useState(false);
  const [submitError,setSubmitError]=useState("");
  const [activeBiz,setActiveBiz]=useState(0);

  // ── FORMSPREE SUBMIT ──────────────────────────────────────────────
  // 1. Go to https://formspree.io and create a free account
  // 2. Click "New Form" and name it "Retail Intelligence Demo Requests"
  // 3. Replace YOUR_FORM_ID below with the ID from your Formspree endpoint
  //    e.g. if your endpoint is https://formspree.io/f/xyzabcde → use "xyzabcde"
  const FORMSPREE_ID = "mgonywry";

  const handleSubmit = async () => {
    if(!form.name || !form.email){ setSubmitError("Please fill in your name and email."); return; }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          business: form.business,
          message: form.message,
        }),
      });
      if(res.ok){ setSent(true); }
      else { setSubmitError("Something went wrong. Please try again or email us directly."); }
    } catch(err) {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(()=>{
    const fn=()=>setScrollY(window.scrollY);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const scrollTo=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMenuOpen(false);};
  const navLinks=[
    {label:"Owner View",id:"owner"},
    {label:"Staff App",id:"staff"},
    {label:"Multi-Site",id:"multibiz"},
    {label:"Features",id:"features"},
    {label:"Pricing",id:"pricing"},
    {label:"Contact",id:"contact"}
  ];

  const businesses=[
    {name:"Londis Horden",type:"Convenience Store",hrs:"57h",tasks:18,staffIn:"3/3",color:C.amber},
    {name:"Londis Seaham",type:"Convenience Store",hrs:"43h",tasks:14,staffIn:"2/4",color:C.blue},
  ];

  return(
    <div style={{background:C.bg,color:C.text,fontFamily:"'Sora',sans-serif",minHeight:"100vh",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{background:#080C14}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#080C14}::-webkit-scrollbar-thumb{background:#1E2D47;border-radius:99px}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .float{animation:float 5s ease-in-out infinite}
        .fu{animation:fadeUp 0.7s ease forwards}
        .d1{animation-delay:0.1s;opacity:0}.d2{animation-delay:0.25s;opacity:0}.d3{animation-delay:0.4s;opacity:0}.d4{animation-delay:0.6s;opacity:0}.d5{animation-delay:0.8s;opacity:0}
        .tg{background:linear-gradient(135deg,#FCD34D 0%,#F59E0B 50%,#f97316 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .gl{background-image:linear-gradient(#1E2D4740 1px,transparent 1px),linear-gradient(90deg,#1E2D4740 1px,transparent 1px);background-size:40px 40px}
        .ticker{animation:ticker 28s linear infinite;display:flex;gap:48px;width:max-content}
        input,textarea{font-family:'Sora',sans-serif;outline:none}
        input:focus,textarea:focus{border-color:#F59E0B !important;box-shadow:0 0 0 3px #F59E0B20 !important}
        .pin-key:hover{background:#1E2D47 !important;color:#F1F5F9 !important}
        @media(max-width:768px){
          .hm{display:none !important}.sm{display:flex !important}
          .g2{grid-template-columns:1fr !important}.g3{grid-template-columns:1fr !important}
          .g4{grid-template-columns:1fr 1fr !important}.g5{grid-template-columns:1fr 1fr !important}
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
        background:scrollY>30?`${C.surface}E8`:"transparent",borderBottom:scrollY>30?`1px solid ${C.border}`:"1px solid transparent",transition:"all 0.3s ease"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src="/favicon.png" alt="Retail Intelligence" style={{width:32,height:32,borderRadius:10,objectFit:"cover"}}/>
            <span style={{fontWeight:700,fontSize:15,color:C.text}}>Retail <span style={{color:C.amber}}>Intelligence</span></span>
          </div>
          <div className="hm" style={{display:"flex",gap:32}}>
            {navLinks.map(l=>(
              <button key={l.id} onClick={()=>scrollTo(l.id)}
                style={{background:"none",border:"none",fontSize:14,fontWeight:500,color:C.muted,cursor:"pointer",transition:"color 0.2s",fontFamily:"'Sora',sans-serif"}}
                onMouseEnter={e=>e.target.style.color=C.text} onMouseLeave={e=>e.target.style.color=C.muted}>
                {l.label}
              </button>
            ))}
          </div>
          <div className="hm" style={{display:"flex",gap:10}}>
            <button onClick={()=>scrollTo("contact")} style={{...BTNS,padding:"9px 18px",fontSize:13}}>Request Demo</button>
            <button onClick={()=>scrollTo("contact")} style={{...BTNP,padding:"9px 18px",fontSize:13}}>Get Early Access <ArrowRight size={13} strokeWidth={3}/></button>
          </div>
          <button className="sm" onClick={()=>setMenuOpen(v=>!v)}
            style={{display:"none",background:"none",border:"none",color:C.muted,cursor:"pointer",padding:4}}>
            {menuOpen?<X size={22}/>:<Menu size={22}/>}
          </button>
        </div>
        {menuOpen&&(
          <div style={{background:C.surface,borderTop:`1px solid ${C.border}`,padding:"16px 20px 20px"}}>
            {navLinks.map(l=>(
              <button key={l.id} onClick={()=>scrollTo(l.id)}
                style={{display:"block",width:"100%",textAlign:"left",background:"none",border:"none",borderBottom:`1px solid ${C.border}`,color:C.muted,fontSize:14,padding:"14px 0",cursor:"pointer",fontFamily:"'Sora',sans-serif"}}>
                {l.label}
              </button>
            ))}
            <button onClick={()=>scrollTo("contact")} style={{...BTNP,width:"100%",justifyContent:"center",marginTop:14}}>Get Early Access</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <div style={{position:"relative",paddingTop:120,paddingBottom:80,
        background:`radial-gradient(ellipse 80% 50% at 50% 0%,${C.amber}14 0%,transparent 65%),${C.bg}`,overflow:"hidden"}}>
        <div className="gl" style={{position:"absolute",inset:0,opacity:0.25,pointerEvents:"none"}}/>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px",textAlign:"center",position:"relative"}}>
          <div className="fu d1" style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:28}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:C.green,boxShadow:`0 0 8px ${C.green}`}}/>
            <span style={{fontSize:12,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.green}}>Built for independent retail owners</span>
          </div>
          <h1 className="fu d2" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.2rem,5.5vw,4rem)",fontWeight:800,lineHeight:1.1,color:C.text,marginBottom:24}}>
            Manage your team<br/><span className="tg" style={{fontStyle:"italic"}}>all from one app.</span>
          </h1>
          <p className="fu d3" style={{...BODY,fontSize:17,maxWidth:540,margin:"0 auto 32px"}}>
            Shift reports, hours tracking, and task updates — all handled automatically. Set up in minutes. No contracts.
          </p>
          <div className="fu d3" style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:8,marginBottom:36}}>
            {["Know what staff actually did during their shift","Spot slow or inefficient tasks instantly","Compare tasks between your staff memebers"].map(b=>(
              <span key={b} style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,padding:"7px 14px",borderRadius:99,background:`${C.green}14`,color:C.green,border:`1px solid ${C.green}28`}}>
                <CheckCircle size={11} strokeWidth={3}/> {b}
              </span>
            ))}
          </div>
          <div className="fu d4" style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:12,marginBottom:64}}>
            <button onClick={()=>scrollTo("contact")} style={{...BTNP,boxShadow:`0 0 30px ${C.amber}35`}}>Request a Demo <ArrowRight size={14} strokeWidth={3}/></button>
            <button onClick={()=>scrollTo("owner")} style={BTNS}><Eye size={14}/> See It In Action</button>
          </div>

          {/* DASHBOARD PREVIEW */}
          <div id="owner" className="float fu d5" style={{maxWidth:860,margin:"0 auto"}}>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:20,overflow:"hidden",boxShadow:`0 0 60px ${C.amber}18,0 32px 80px rgba(0,0,0,0.5)`}}>
              <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{display:"flex",gap:6}}>
                    {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{width:12,height:12,borderRadius:"50%",background:c}}/>)}
                  </div>
                  <span style={{fontSize:12,fontWeight:600,color:C.dim}}>Retail Intelligence — Owner Dashboard</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,fontWeight:700,color:C.green,background:`${C.green}15`,padding:"4px 10px",borderRadius:99}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:C.green}}/> Live
                </div>
              </div>
              <div style={{padding:20,background:C.bg}}>
                {/* Stats row */}
                <div className="g4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
                  {[{icon:Clock,label:"Hours This Week",val:"57h",sub:"All 3 staff",color:C.amber},
                    {icon:CheckCircle,label:"Tasks Done",val:"18",sub:"Avg 110m each",color:C.green},
                    {icon:Users,label:"Staff In",val:"3 / 3",sub:"This week",color:C.blue},
                    {icon:TrendingUp,label:"Top Performer",val:"Alyson",sub:"24h logged",color:C.purple}
                  ].map((s,i)=>(
                    <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:14,display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:32,height:32,borderRadius:10,background:`${s.color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <s.icon size={13} color={s.color}/>
                      </div>
                      <div>
                        <div style={{fontSize:15,fontWeight:800,color:s.color}}>{s.val}</div>
                        <div style={{fontSize:10,color:C.dim,fontWeight:600}}>{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Charts row */}
                <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                      <span style={LBL}>Weekly Hours</span>
                      <Badge color={C.amber}>This Week</Badge>
                    </div>
                    <MiniBarChart/>
                    <div style={{marginTop:10,fontSize:11,color:C.dim,fontWeight:600}}>Total: 57h · <span style={{color:C.green}}>↑ 8% vs last week</span></div>
                  </div>
                  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16}}>
                    <div style={{...LBL,marginBottom:14}}>Staff — Hours Ranked</div>
                    <div style={{display:"flex",flexDirection:"column",gap:12}}>
                      {staffRows.map((s,i)=>(
                        <div key={i}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                            <span style={{fontSize:12,fontWeight:700,color:C.text}}>{s.name} <span style={{color:C.dim,fontWeight:500}}>· {s.tasks} tasks</span></span>
                            <span style={{fontSize:12,fontWeight:800,color:s.color}}>{s.hrs}</span>
                          </div>
                          <PBar pct={s.pct} color={s.color}/>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Tasks + alert */}
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",marginBottom:10}}>
                  <div style={{padding:"10px 16px",borderBottom:`1px solid ${C.border}`,background:C.surface,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={LBL}>Today's Tasks — Alyson</span>
                    <Badge color={C.amber}>4 / 5 complete</Badge>
                  </div>
                  {taskRows.map((t,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 16px",borderBottom:i<taskRows.length-1?`1px solid ${C.border}`:"none",opacity:t.done?1:0.5}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{width:16,height:16,borderRadius:"50%",background:t.done?C.green:C.border,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          {t.done&&<CheckCircle size={9} color="#000" strokeWidth={3}/>}
                        </div>
                        <span style={{fontSize:12,fontWeight:600,color:t.done?C.text:C.dim}}>{t.name}</span>
                      </div>
                      <span style={{fontSize:11,fontWeight:700,color:C.dim}}>{t.time}</span>
                    </div>
                  ))}
                </div>
                {/* Alert strip */}
                <div style={{background:`${C.red}0A`,border:`1px solid ${C.red}30`,borderRadius:12,padding:"10px 16px",
                  display:"flex",alignItems:"center",gap:10,fontSize:12,color:C.red,fontWeight:600}}>
                  <AlertTriangle size={13}/> Not submitted today: Michelle, Alyson, Susan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── INSIGHTS TICKER ── */}
      <div style={{background:C.surface,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,
        padding:"18px 0",overflow:"hidden"}}>
        <div className="ticker">
          {[
            {dot:C.green, text:<>Alyson logged the most time this week — <strong style={{color:C.text}}>24h</strong></>},
            {dot:C.amber, text:<><strong style={{color:C.text}}>"Fridges Clean"</strong> gets done fastest on Tuesday — avg 40m</>},
            {dot:C.blue,  text:<><strong style={{color:C.text}}>Post Office</strong> fastest on Tues — avg 90 mins</>},
            {dot:C.red,   text:<>Susan takes <strong style={{color:C.text}}>50% longer</strong> on Serving than team average — worth a quick conversation</>},
            {dot:C.purple,text:<>Michelle logged an incident: <strong style={{color:C.text}}>delivery was short</strong></>},
            {dot:C.green, text:<>Alyson logged the most time this week — <strong style={{color:C.text}}>24h</strong></>},
            {dot:C.amber, text:<><strong style={{color:C.text}}>"Fridges Clean"</strong> gets done fastest on Tuesday — avg 40m</>},
            {dot:C.blue,  text:<><strong style={{color:C.text}}>Post Office</strong> fastest on Tues — avg 90 mins</>},
            {dot:C.red,   text:<>Susan takes <strong style={{color:C.text}}>50% longer</strong> on Serving than team average — worth a quick conversation</>},
            {dot:C.purple,text:<>Michelle logged an incident: <strong style={{color:C.text}}>delivery was short</strong></>},
          ].map((item,i)=>(
            <span key={i} style={{display:"inline-flex",alignItems:"center",gap:10,fontSize:13,color:C.muted,whiteSpace:"nowrap",flexShrink:0}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:item.dot,display:"inline-block",flexShrink:0}}/>
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"52px 20px"}}>
        <div className="g4" style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24,textAlign:"center"}}>
          {[{n:57,s:"h",label:"Hours logged this week"},{n:18,s:"",label:"Tasks tracked this week"},{n:110,s:"m",label:"Average task duration"},{n:3,s:"/3",label:"Staff in this week"}].map((s,i)=>(
            <div key={i}>
              <div className="tg" style={{fontSize:"clamp(1.8rem,3vw,2.5rem)",fontWeight:800,marginBottom:4,fontFamily:"'Playfair Display',serif"}}>
                <Counter to={s.n} suffix={s.s}/>
              </div>
              <div style={{fontSize:13,color:C.dim,fontWeight:500}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROBLEM ── */}
      <div style={{padding:"88px 20px"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Badge color={C.red}>The Problem</Badge>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,margin:"20px auto 16px",maxWidth:560}}>
              Running a shop shouldn't<br/>rely on guesswork.
            </h2>
            <p style={{...BODY,maxWidth:480,margin:"0 auto"}}>Most store owners are flying blind — piecing together what happened during a shift from memory, messages, and hope.</p>
          </div>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
            {[{icon:"📋",title:"Paper checklists",desc:"Tasks get missed, lost, or just not checked. No accountability. No record. No way to know what actually happened."},
              {icon:"💬",title:"WhatsApp chaos",desc:"Chasing staff on WhatsApp isn't management. It's reactive, exhausting, and leaves no proper trail."},
              {icon:"📊",title:"Spreadsheet admin",desc:"Manually copying hours at the end of every week. Error-prone, slow, and a waste of your time."},
              {icon:"🧮",title:"Manual payroll",desc:"Counting up hours by hand. Wrong totals. Disputes. Stress you simply don't need."}
            ].map((p,i)=>(
              <Card key={i} accent={C.red} style={{padding:20}}>
                <div style={{fontSize:26,marginBottom:10}}>{p.icon}</div>
                <div style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:6}}>{p.title}</div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.6}}>{p.desc}</div>
              </Card>
            ))}
          </div>
          <div style={{background:`${C.red}08`,border:`1px solid ${C.red}30`,borderRadius:14,padding:"16px 20px",display:"flex",flexWrap:"wrap",alignItems:"center",gap:10}}>
            <AlertTriangle size={15} color={C.red}/>
            <span style={{fontSize:13,fontWeight:700,color:C.red}}>This leads to:</span>
            {["Missed tasks","Poor visibility","Wasted labour cost","No staff accountability"].map(t=>(
              <Badge key={t} color={C.red}>{t}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div id="how-it-works" style={{background:C.surface,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:"88px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Badge color={C.amber}>How It Works</Badge>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,marginTop:20}}>Up and running in minutes.</h2>
          </div>
          <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>
            {[{n:"01",color:C.amber,title:"Add your business",desc:"Set up your store — name, sector, shift times. Done in under 5 minutes. Add more stores anytime."},
              {n:"02",color:C.blue, title:"Add your staff",desc:"Create a profile for each team member. Assign their PIN. Set shift times and days per person."},
              {n:"03",color:C.purple,title:"Build their task lists",desc:"Customise each staff member's daily to-do list. Add, remove, and reorder tasks at any time."},
              {n:"04",color:C.green,title:"Stay in the loop",desc:"Staff log their day via PIN login. You get live insights, alerts, and performance data — without asking."},
            ].map((s,i)=>(
              <Card key={i} accent={s.color}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:800,color:`${s.color}25`,marginBottom:8}}>{s.n}</div>
                <Badge color={s.color}>Step {i+1}</Badge>
                <div style={{fontSize:15,fontWeight:800,color:C.text,marginTop:14,marginBottom:8}}>{s.title}</div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.65}}>{s.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ── OWNER DEEP DIVE ── */}
      <div style={{padding:"88px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Badge color={C.amber}>Owner Dashboard</Badge>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,margin:"20px 0 12px"}}>
              Everything you need.<br/>Nothing you don't.
            </h2>
            <p style={{...BODY,maxWidth:480,margin:"0 auto"}}>See hours logged, tasks completed, average task times, and instant alerts — across every shift, every day.</p>
          </div>

          {/* Staff drill-downs */}
          <div style={{...LBL,marginBottom:20,textAlign:"center"}}>Staff Performance — Drill Down</div>
          <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:40}}>
            {[
              {initials:"AL",color:C.blue,name:"Alyson",hrs:"24h",tasks:10,avg:"111m",
                rows:[{t:"Post Office",m:"90m",badge:{txt:"Fastest",c:C.green}},{t:"Fridge Clean",m:"40m"},{t:"Crisp Stacking",m:"35m"}]},
              {initials:"MI",color:C.amber,name:"Michelle",hrs:"21h",tasks:7,avg:"105m",
                rows:[{t:"Serving",m:"180m",badge:{txt:"Fastest",c:C.green}},{t:"Personal Training",m:"120m"},{t:"Pop Stacking",m:"60m"}]},
              {initials:"SU",color:C.purple,name:"Susan",hrs:"12h",tasks:5,avg:"120m",
                rows:[{t:"Serving",m:"240m",badge:{txt:"Slowest",c:C.red}},{t:"Fridge Clean",m:"60m",badge:{txt:"+50%",c:C.red}},{t:"Dog Food Stack",m:"90m"}]},
            ].map((staff,i)=>(
              <Card key={i} accent={staff.color} style={{padding:22}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                  <div style={{width:40,height:40,borderRadius:"50%",background:staff.color,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:14,color:"#000"}}>
                    {staff.initials}
                  </div>
                  <div>
                    <div style={{fontSize:15,fontWeight:800,color:C.text}}>{staff.name}</div>
                    <div style={{fontSize:11,color:C.dim}}>{staff.hrs} · {staff.tasks} tasks · avg {staff.avg}</div>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {staff.rows.map((r,j)=>(
                    <div key={j} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                      padding:"8px 0",borderBottom:j<staff.rows.length-1?`1px solid ${C.border}`:"none"}}>
                      <span style={{fontSize:12,color:C.muted}}>{r.t}</span>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:12,fontWeight:700,color:C.text}}>{r.m}</span>
                        {r.badge&&<span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:99,
                          background:`${r.badge.c}18`,color:r.badge.c}}>{r.badge.txt}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Insights callout */}
          <Card accent={C.amber} style={{padding:24}}>
            <div style={{...LBL,marginBottom:16}}>Smart Insights — This Week</div>
            <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[
                {icon:"💡",c:C.blue, txt:"Personal Training gets done fastest on Tues — avg 120 mins"},
                {icon:"💡",c:C.blue, txt:"Post Office gets done fastest on Tues — avg 90 mins"},
                {icon:"✅",c:C.green,txt:"Alyson logged the most hours this week — 24h"},
                {icon:"🚨",c:C.red,  txt:"Susan is 50% slower than team average on Fridge Clean — 60m vs 40m"},
              ].map((ins,i)=>(
                <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",background:C.bg,
                  borderRadius:12,padding:"10px 14px",border:`1px solid ${C.border}`}}>
                  <span style={{fontSize:14,flexShrink:0}}>{ins.icon}</span>
                  <span style={{fontSize:12,color:C.muted,lineHeight:1.6}}>{ins.txt}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* ── STAFF APP ── */}
      <div id="staff" style={{background:C.surface,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:"88px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
            <div>
              <Badge color={C.blue}>Staff App</Badge>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,margin:"20px 0 16px"}}>
                A personal app<br/>for every team member.
              </h2>
              <p style={{...BODY,marginBottom:28}}>Staff log in with their own PIN. They see their shift, their tasks, their progress. They tick off tasks as they go. You see it all in real time.</p>
              <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:36}}>
                {[{icon:Lock,c:C.amber,title:"PIN-based login",desc:"No passwords to forget. Each staff member gets their own personal PIN — fast, simple, secure."},
                  {icon:ClipboardList,c:C.blue,title:"Their tasks, their day",desc:"Staff see exactly what's scheduled for their shift — nothing more, nothing less."},
                  {icon:Clock,c:C.green,title:"Time tracking built in",desc:"Tap to start and stop each task. Time logged automatically. No paper. No WhatsApp."},
                  {icon:FileText,c:C.purple,title:"Weekly planner",desc:"Staff can see their full week ahead — shifts, tasks, and scheduled hours per day."},
                ].map((b,i)=>(
                  <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:14,display:"flex",alignItems:"flex-start",gap:12,
                    transition:"border-color 0.2s"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=`${b.c}50`}
                    onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                    <div style={{width:34,height:34,borderRadius:10,background:`${b.c}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <b.icon size={14} color={b.c}/>
                    </div>
                    <div>
                      <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:2}}>{b.title}</div>
                      <div style={{fontSize:12,color:C.dim}}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone mocks side by side */}
            <div style={{display:"flex",gap:20,justifyContent:"center",alignItems:"flex-start",flexWrap:"wrap"}}>
              {/* Staff task list phone */}
              <PhoneMock title="Hello, Alyson 👋" subtitle="Wed · 6h shift">
                {/* Progress bar */}
                <div style={{background:C.surface,borderRadius:10,padding:10,marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <div style={{fontSize:10,fontWeight:700,color:C.muted}}>Today's Progress</div>
                    <div style={{fontSize:13,fontWeight:800,color:C.amber}}>0%</div>
                  </div>
                  <div style={{height:5,background:C.border,borderRadius:99}}>
                    <div style={{height:"100%",width:"0%",background:C.amber,borderRadius:99}}/>
                  </div>
                  <div style={{fontSize:10,color:C.dim,marginTop:5}}>0h 0m / 6h</div>
                </div>
                <div style={{fontSize:10,color:C.dim,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>0 of 6 tasks done</div>
                {["Post Office","Till Lift / End of Shift","Pies","Magazine Returns","Newspaper Returns"].map((t,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:i<4?`1px solid ${C.border}`:"none"}}>
                    <div style={{width:15,height:15,borderRadius:4,border:`1.5px solid ${C.border}`,
                      background:i===3?C.green:"none",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {i===3&&<CheckCircle size={9} color="#000" strokeWidth={3}/>}
                    </div>
                    <span style={{fontSize:11,color:i===3?C.dim:C.text,textDecoration:i===3?"line-through":"none",flex:1}}>{t}</span>
                    <span style={{fontSize:10,color:C.dim}}>›</span>
                  </div>
                ))}
              </PhoneMock>

              {/* PIN login phone */}
              <PhoneMock title="Retail Intelligence" subtitle="Sign In">
                <div style={{textAlign:"center",padding:"8px 0 12px"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:C.text,marginBottom:4}}>Enter your PIN</div>
                  <div style={{fontSize:11,color:C.dim,marginBottom:14}}>Londis Horden</div>
                  {/* Dots */}
                  <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:16}}>
                    {[true,true,true,false].map((filled,i)=>(
                      <div key={i} style={{width:12,height:12,borderRadius:"50%",
                        background:filled?C.amber:C.border,
                        boxShadow:filled?`0 0 8px ${C.amber}60`:"none"}}/>
                    ))}
                  </div>
                  {/* Keypad */}
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
                    {pinKeys.map((k,i)=>(
                      <div key={i} className="pin-key"
                        style={{background:k==="→"?`linear-gradient(135deg,${C.amber},#f97316)`:C.surface,
                          borderRadius:8,padding:"10px 0",
                          fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,
                          textAlign:"center",cursor:"pointer",
                          color:k==="→"?"#000":k==="⌫"?C.dim:C.text,
                          transition:"all 0.15s"}}>
                        {k}
                      </div>
                    ))}
                  </div>
                </div>
              </PhoneMock>
            </div>
          </div>
        </div>
      </div>

      {/* ── MULTI-BUSINESS ── */}
      <div id="multibiz" style={{padding:"88px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Badge color={C.green}>Multi-Site Management</Badge>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,margin:"20px 0 12px"}}>
              One app.<br/>Every business.
            </h2>
            <p style={{...BODY,maxWidth:440,margin:"0 auto"}}>Running more than one site? Switch between businesses in a tap. Compare them side by side. Add new stores and staff whenever you need.</p>
          </div>

          {/* Business switcher */}
          <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:40}}>
            {businesses.map((b,i)=>(
              <div key={i} onClick={()=>setActiveBiz(i)}
                style={{background:activeBiz===i?`${b.color}08`:C.card,
                  border:`1px solid ${activeBiz===i?b.color:C.border}`,
                  borderRadius:16,padding:24,cursor:"pointer",
                  transition:"all 0.2s",transform:activeBiz===i?"translateY(-2px)":"none",
                  boxShadow:activeBiz===i?`0 0 24px ${b.color}20`:"none"}}>
                <div style={{width:40,height:40,borderRadius:10,background:`${b.color}18`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:14}}>🏪</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,marginBottom:4}}>{b.name}</div>
                <div style={{fontSize:12,color:C.dim,marginBottom:16}}>{b.type}</div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {[{l:"Hours this week",v:b.hrs},{l:"Tasks done",v:String(b.tasks)},{l:"Staff in",v:b.staffIn}].map((m,j)=>(
                    <div key={j} style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
                      <span style={{color:C.dim}}>{m.l}</span>
                      <span style={{fontWeight:700,color:m.l==="Staff in"&&m.v!=="3/3"?C.red:C.text}}>{m.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {/* Add biz card */}
            <div onClick={()=>scrollTo("contact")}
              style={{background:C.card,border:`1.5px dashed ${C.border}`,borderRadius:16,padding:24,
                cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                gap:10,textAlign:"center",transition:"all 0.2s",minHeight:180}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.amber;e.currentTarget.style.background=`${C.amber}05`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.card;}}>
              <div style={{fontSize:28,color:C.amber}}>＋</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700}}>Add a business</div>
              <div style={{fontSize:12,color:C.dim}}>Add any store or site anytime. Staff and tasks set up in minutes.</div>
            </div>
          </div>

          {/* Cross-business comparison */}
          <Card accent={C.green} style={{padding:28}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
              <GitCompare size={15} color={C.green}/>
              <span style={{...LBL,color:C.green}}>Cross-Business Comparison — Same Sector</span>
            </div>
            <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              {[
                {name:"Londis Horden",color:C.amber,metrics:[{l:"Avg task time",v:"110m",c:C.amber},{l:"Hours / week",v:"57h",c:C.text},{l:"Submission rate",v:"Pending",c:C.red},{l:"Tasks completed",v:"18",c:C.text}]},
                {name:"Londis Seaham",color:C.blue, metrics:[{l:"Avg task time",v:"88m",c:C.green},{l:"Hours / week",v:"43h",c:C.text},{l:"Submission rate",v:"75%",c:C.green},{l:"Tasks completed",v:"14",c:C.text}]},
              ].map((biz,i)=>(
                <div key={i} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
                  <div style={{background:C.surface,padding:"10px 16px",borderBottom:`1px solid ${C.border}`,
                    fontSize:12,fontWeight:700,color:biz.color}}>🏪 {biz.name}</div>
                  {biz.metrics.map((m,j)=>(
                    <div key={j} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                      padding:"10px 16px",borderBottom:j<biz.metrics.length-1?`1px solid ${C.border}`:"none",fontSize:13}}>
                      <span style={{color:C.muted}}>{m.l}</span>
                      <span style={{fontWeight:700,color:m.c}}>{m.v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div id="features" style={{background:C.surface,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:"88px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Badge color={C.amber}>All Features</Badge>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,marginTop:20,marginBottom:12}}>
              Everything you need to run<br/>a tighter operation.
            </h2>
          </div>
          <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
            {[{icon:ClipboardList,color:C.amber, title:"Custom Task Lists",   desc:"Build different to-do lists for each staff member. Add, remove, and reorder tasks anytime you like."},
              {icon:BarChart2,   color:C.blue,   title:"Performance Benchmarks",desc:"See who's fastest on which tasks. Spot underperformance patterns before they become habits."},
              {icon:Clock,       color:C.green,  title:"Live Time Tracking",  desc:"Know exactly how long each task takes — per staff member, per day, per week. Averaged over time."},
              {icon:Bell,        color:C.purple, title:"Smart Alerts",        desc:"Get flagged when staff haven't submitted, when tasks are running slow, or when incidents are logged."},
              {icon:Building2,   color:C.amber,  title:"Multi-Business Support",desc:"Manage multiple sites from one login. Switch instantly. Compare performance side by side."},
              {icon:Smartphone,  color:C.blue,   title:"Staff PIN App",       desc:"Each team member gets their own personal PIN. No passwords. Fast, simple, and private."},
              {icon:Download,    color:C.green,  title:"Payroll Export",      desc:"One-click export of all staff hours. Send straight to payroll without touching a spreadsheet."},
              {icon:AlertTriangle,color:C.red,   title:"Incident Logging",    desc:"Staff flag issues directly in their app — short deliveries, problems, notes. You see them instantly."},
              {icon:Zap,         color:C.amber,  title:"Shift Scheduling",    desc:"Set exact start and end times per person, per day. Staff see their schedule the moment they log in."},
            ].map((f,i)=>(
              <Card key={i} accent={f.color} style={{padding:22}}>
                <div style={{width:40,height:40,borderRadius:12,background:`${f.color}18`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
                  <f.icon size={18} color={f.color}/>
                </div>
                <div style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:8}}>{f.title}</div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.65}}>{f.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHO IT'S FOR ── */}
      <div style={{padding:"88px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
            <div>
              <Badge color={C.amber}>Who It's For</Badge>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,margin:"20px 0 16px"}}>Built for real<br/>retail stores.</h2>
              <p style={{...BODY,marginBottom:28}}>Retail Intelligence was built for the shop owners doing everything themselves — managing staff, covering shifts, handling payroll, and trying to grow their business at the same time.</p>
              <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[{icon:Store,label:"Convenience Stores"},{icon:ShoppingBag,label:"Supermarkets"},{icon:Package,label:"Off-licences"},{icon:Coffee,label:"Independent Shops"}].map((s,i)=>(
                  <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:30,height:30,borderRadius:9,background:`${C.amber}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <s.icon size={13} color={C.amber}/>
                    </div>
                    <span style={{fontSize:12,fontWeight:700,color:C.muted}}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <div style={{...LBL,marginBottom:8}}>What you get</div>
              {[{icon:Clock,      label:"Reduce wasted labour time",     desc:"Stop paying for unproductive shifts."},
                {icon:TrendingUp, label:"Improve store productivity",    desc:"Benchmarks show you exactly where to improve."},
                {icon:CheckCircle,label:"Ensure every task gets done",   desc:"No more guessing if things got done."},
                {icon:Download,   label:"Simplify payroll",              desc:"Hours ready to export in one click."},
                {icon:Eye,        label:"Manage when you're not there",  desc:"Full visibility without being on site."},
                {icon:Building2,  label:"Scale across multiple sites",   desc:"One login. All your businesses. Instant switching."},
              ].map((b,i)=>(
                <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:14,display:"flex",alignItems:"flex-start",gap:12,transition:"border-color 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=`${C.amber}50`}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                  <div style={{width:34,height:34,borderRadius:10,background:`${C.amber}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <b.icon size={14} color={C.amber}/>
                  </div>
                  <div>
                    <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:2}}>{b.label}</div>
                    <div style={{fontSize:12,color:C.dim}}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PRICING ── */}
      <div id="pricing" style={{padding:"88px 20px",background:C.bg}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Badge color={C.amber}>Pricing</Badge>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,margin:"20px 0 12px"}}>
              Simple pricing.<br/>No surprises.
            </h2>
            <p style={{...BODY,maxWidth:400,margin:"0 auto"}}>Pay monthly. Cancel anytime. No setup fees, no contracts, no hidden costs.</p>
          </div>

          <div className="g2" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20,maxWidth:780,margin:"0 auto"}}>

            {/* BASIC */}
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:36,
              transition:"all 0.25s ease",position:"relative"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`${C.amber}55`;e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 0 30px ${C.amber}18,0 8px 32px rgba(0,0,0,0.4)`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              <div style={{...LBL,marginBottom:12}}>Basic</div>
              <div style={{display:"flex",alignItems:"flex-end",gap:4,marginBottom:4}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:52,fontWeight:800,color:C.text,lineHeight:1}}>£5</span>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:800,color:C.amber,lineHeight:1,marginBottom:4}}>.99</span>
              </div>
              <div style={{fontSize:13,color:C.dim,marginBottom:28}}>per user per month · single business</div>
              <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:32}}>
                {[
                  {on:true, txt:"1 business"},
                  {on:true, txt:"Unlimited staff members"},
                  {on:true, txt:"Staff PIN app"},
                  {on:true, txt:"Task tracking & time logs"},
                  {on:true, txt:"Owner dashboard"},
                  {on:true, txt:"Shift scheduling & task lists"},
                  {on:true, txt:"Incident reporting"},
                  {on:true, txt:"Payroll export"},
                  {on:false,txt:"Multi-business management"},
                  {on:false,txt:"Cross-business comparison"},
                ].map((f,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,fontSize:13,
                    color:f.on?C.muted:C.dim,opacity:f.on?1:0.5}}>
                    <div style={{width:17,height:17,borderRadius:"50%",flexShrink:0,
                      background:f.on?`${C.green}18`:C.border,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {f.on
                        ? <CheckCircle size={10} color={C.green} strokeWidth={3}/>
                        : <X size={9} color={C.dim} strokeWidth={3}/>
                      }
                    </div>
                    {f.txt}
                  </div>
                ))}
              </div>
              <button onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
                style={{...BTNS,width:"100%",justifyContent:"center",padding:14,fontSize:14,borderRadius:12}}>
                Get Started <ArrowRight size={13} strokeWidth={3}/>
              </button>
            </div>

            {/* PRO */}
            <div style={{background:`linear-gradient(160deg,${C.amber}0A 0%,${C.card} 50%)`,
              border:`1px solid ${C.amber}`,borderRadius:20,padding:36,
              transition:"all 0.25s ease",position:"relative",
              boxShadow:`0 0 40px ${C.amber}15`}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 0 50px ${C.amber}25,0 8px 32px rgba(0,0,0,0.4)`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 0 40px ${C.amber}15`;}}>

              {/* Most Popular badge */}
              <div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",
                background:`linear-gradient(135deg,${C.amber},#f97316)`,color:"#000",
                fontSize:11,fontWeight:800,letterSpacing:"0.08em",textTransform:"uppercase",
                padding:"5px 18px",borderRadius:99,whiteSpace:"nowrap",fontFamily:"'Sora',sans-serif"}}>
                Most Popular
              </div>

              <div style={{...LBL,marginBottom:12,color:C.amber}}>Pro</div>
              <div style={{display:"flex",alignItems:"flex-end",gap:4,marginBottom:4}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:52,fontWeight:800,color:C.text,lineHeight:1}}>£9</span>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:800,color:C.amber,lineHeight:1,marginBottom:4}}>.99</span>
              </div>
              <div style={{fontSize:13,color:C.dim,marginBottom:28}}>per user per month · multiple businesses</div>
              <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:32}}>
                {[
                  {txt:"Everything in Basic"},
                  {txt:"Unlimited businesses"},
                  {txt:"Unlimited staff members"},
                  {txt:"Staff PIN app"},
                  {txt:"Task tracking & time logs"},
                  {txt:"Owner dashboard"},
                  {txt:"Shift scheduling & task lists"},
                  {txt:"Incident reporting"},
                  {txt:"Payroll export"},
                  {txt:"Multi-business management"},
                  {txt:"Cross-business comparison"},
                ].map((f,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,fontSize:13,color:C.muted}}>
                    <div style={{width:17,height:17,borderRadius:"50%",flexShrink:0,
                      background:`${C.amber}18`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <CheckCircle size={10} color={C.amber} strokeWidth={3}/>
                    </div>
                    {i===0?<strong style={{color:C.text}}>{f.txt}</strong>:f.txt}
                  </div>
                ))}
              </div>
              <button onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
                style={{...BTNP,width:"100%",justifyContent:"center",padding:14,fontSize:14,borderRadius:12,
                  boxShadow:`0 0 24px ${C.amber}35`}}>
                Get Started <ArrowRight size={13} strokeWidth={3}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <div style={{padding:"88px 20px",background:`radial-gradient(ellipse 80% 80% at 50% 50%,${C.amber}12 0%,${C.bg} 70%)`}}>
        <div style={{maxWidth:640,margin:"0 auto",textAlign:"center"}}>
          <div style={{display:"flex",justifyContent:"center",gap:2,marginBottom:20}}>
            {[...Array(5)].map((_,i)=><Star key={i} size={16} fill={C.amber} color={C.amber}/>)}
          </div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,4.5vw,3.2rem)",fontWeight:800,lineHeight:1.15,color:C.text,marginBottom:20}}>
            Your staff, your standards.<br/><span className="tg" style={{fontStyle:"italic"}}>Now with the data to back it up.</span>
          </h2>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:12}}>
            <button onClick={()=>scrollTo("contact")} style={{...BTNP,boxShadow:`0 0 30px ${C.amber}35`}}>Request Demo <ArrowRight size={14} strokeWidth={3}/></button>
            <button onClick={()=>scrollTo("contact")} style={BTNS}>Sign Up</button>
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div id="contact" style={{background:C.surface,borderTop:`1px solid ${C.border}`,padding:"88px 20px"}}>
        <div style={{maxWidth:560,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:36}}>
            <Badge color={C.amber}>Get In Touch</Badge>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,margin:"20px 0 12px"}}>Let's talk about<br/>your store.</h2>
            <p style={BODY}>Request a demo or ask anything. We reply within 24 hours.</p>
          </div>
          {sent?(
            <Card accent={C.green} style={{textAlign:"center",padding:48,borderColor:`${C.green}40`}}>
              <div style={{fontSize:40,marginBottom:14}}>✅</div>
              <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:8}}>Message received!</div>
              <div style={{fontSize:14,color:C.muted}}>We'll be in touch within 24 hours.</div>
            </Card>
          ):(
            <Card accent={C.amber} style={{padding:32}}>
              {[{key:"name",label:"Your Name",type:"text",ph:"Jane Smith"},
                {key:"email",label:"Email Address",type:"email",ph:"jane@mystore.co.uk"},
                {key:"business",label:"Business Name",type:"text",ph:"Londis Horden"}
              ].map(f=>(
                <div key={f.key} style={{marginBottom:16}}>
                  <label style={{...LBL,display:"block",marginBottom:8}}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={form[f.key]}
                    onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                    style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,background:C.bg,color:C.text,fontSize:14,transition:"all 0.2s"}}/>
                </div>
              ))}
              <div style={{marginBottom:20}}>
                <label style={{...LBL,display:"block",marginBottom:8}}>Message</label>
                <textarea placeholder="Tell us about your store and what you're looking for…" rows={4}
                  value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                  style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,background:C.bg,color:C.text,fontSize:14,resize:"none",transition:"all 0.2s"}}/>
              </div>
              {submitError&&(
                <div style={{background:"#EF444418",border:"1px solid #EF444440",borderRadius:10,
                  padding:"10px 14px",marginBottom:14,fontSize:13,color:"#EF4444",display:"flex",gap:8,alignItems:"center"}}>
                  <AlertTriangle size={13}/> {submitError}
                </div>
              )}
              <button onClick={handleSubmit} disabled={submitting}
                style={{...BTNP,width:"100%",justifyContent:"center",padding:15,fontSize:15,
                  opacity:submitting?0.7:1,cursor:submitting?"not-allowed":"pointer"}}>
                {submitting ? "Sending…" : <><span>Send Message</span><ArrowRight size={15} strokeWidth={3}/></>}
              </button>
            </Card>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{borderTop:`1px solid ${C.border}`,padding:"36px 20px",background:C.bg}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src="/favicon.png" alt="Retail Intelligence" style={{width:30,height:30,borderRadius:9,objectFit:"cover"}}/>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:C.text}}>Retail <span style={{color:C.amber}}>Intelligence</span></div>
              <div style={{fontSize:11,color:C.dim}}>Staff intelligence for independent retail</div>
            </div>
          </div>
          <a href="mailto:retail.intelligence@outlook.com"
            style={{fontSize:13,fontWeight:600,color:C.dim,textDecoration:"none",transition:"color 0.2s"}}
            onMouseEnter={e=>e.target.style.color=C.amber} onMouseLeave={e=>e.target.style.color=C.dim}>
            hello@retail-intelligence.co.uk
          </a>
          <div style={{fontSize:12,color:C.dim}}>© 2026 Retail Intelligence · Built in the UK</div>
        </div>
      </footer>
    </div>
  );
}
