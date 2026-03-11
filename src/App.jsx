import { useState, useEffect, useRef } from "react";
import {
  CheckCircle, BarChart2, Clock, Users, Download,
  AlertTriangle, ArrowRight, Menu, X, TrendingUp,
  ClipboardList, Bell, Store, ShoppingBag,
  Coffee, Package, Activity, Calendar,
  Star, Eye, Cpu, Lock
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

const staffRows=[
  {name:"Michelle",hrs:"32h 40m",score:94,pct:94,color:C.green},
  {name:"Alyson",hrs:"28h 15m",score:81,pct:81,color:C.amber},
  {name:"Susan",hrs:"24h 00m",score:73,pct:73,color:C.blue},
];
const taskRows=[
  {name:"Till Lift / End of Shift",time:"8m",done:true},
  {name:"Fridge Date Check",time:"12m",done:true},
  {name:"Newspaper Returns",time:"6m",done:true},
  {name:"Grocery Stacking",time:"22m",done:false},
  {name:"Post Office",time:"15m",done:true},
];

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
  useEffect(()=>{const fn=()=>setScrollY(window.scrollY);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  const scrollTo=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMenuOpen(false);};
  const navLinks=[{label:"Product",id:"product"},{label:"Features",id:"features"},{label:"How It Works",id:"how-it-works"},{label:"Contact",id:"contact"}];

  return(
    <div style={{background:C.bg,color:C.text,fontFamily:"'Sora',sans-serif",minHeight:"100vh",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{background:#080C14}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#080C14}::-webkit-scrollbar-thumb{background:#1E2D47;border-radius:99px}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .float{animation:float 5s ease-in-out infinite}
        .fu{animation:fadeUp 0.7s ease forwards}
        .d1{animation-delay:0.1s;opacity:0}.d2{animation-delay:0.25s;opacity:0}.d3{animation-delay:0.4s;opacity:0}.d4{animation-delay:0.6s;opacity:0}.d5{animation-delay:0.8s;opacity:0}
        .tg{background:linear-gradient(135deg,#FCD34D 0%,#F59E0B 50%,#f97316 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .gl{background-image:linear-gradient(#1E2D4740 1px,transparent 1px),linear-gradient(90deg,#1E2D4740 1px,transparent 1px);background-size:40px 40px}
        input,textarea{font-family:'Sora',sans-serif;outline:none}
        input:focus,textarea:focus{border-color:#F59E0B !important;box-shadow:0 0 0 3px #F59E0B20 !important}
        @media(max-width:768px){
          .hm{display:none !important}.sm{display:flex !important}
          .g2{grid-template-columns:1fr !important}.g3{grid-template-columns:1fr !important}
          .g4{grid-template-columns:1fr 1fr !important}.g5{grid-template-columns:1fr 1fr !important}
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
        background:scrollY>30?`${C.surface}E8`:"transparent",borderBottom:scrollY>30?`1px solid ${C.border}`:"1px solid transparent",transition:"all 0.3s ease"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:10,background:`linear-gradient(135deg,${C.amber},#f97316)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Store size={15} color="#000" strokeWidth={2.5}/>
            </div>
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

      {/* HERO */}
      <div style={{position:"relative",paddingTop:120,paddingBottom:80,
        background:`radial-gradient(ellipse 80% 50% at 50% 0%,${C.amber}14 0%,transparent 65%),${C.bg}`,overflow:"hidden"}}>
        <div className="gl" style={{position:"absolute",inset:0,opacity:0.25,pointerEvents:"none"}}/>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px",textAlign:"center",position:"relative"}}>
          <div className="fu d1" style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:28}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:C.green,boxShadow:`0 0 8px ${C.green}`}}/>
            <span style={{fontSize:12,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.green}}>Now in early access</span>
          </div>
          <h1 className="fu d2" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.2rem,5.5vw,4rem)",fontWeight:800,lineHeight:1.1,color:C.text,marginBottom:24}}>
            Know exactly what your staff do<br/><span className="tg" style={{fontStyle:"italic"}}>every shift.</span>
          </h1>
          <p className="fu d3" style={{...BODY,fontSize:17,maxWidth:540,margin:"0 auto 32px"}}>
            Retail Intelligence gives shop owners real visibility into daily operations —
            task tracking, staff productivity, and shift insights in one simple dashboard.
          </p>
          <div className="fu d3" style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:8,marginBottom:36}}>
            {["Track staff tasks in real time","Monitor store from anywhere","Export hours for payroll instantly"].map(b=>(
              <span key={b} style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,padding:"7px 14px",borderRadius:99,background:`${C.green}14`,color:C.green,border:`1px solid ${C.green}28`}}>
                <CheckCircle size={11} strokeWidth={3}/> {b}
              </span>
            ))}
          </div>
          <div className="fu d4" style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:12,marginBottom:64}}>
            <button onClick={()=>scrollTo("contact")} style={{...BTNP,boxShadow:`0 0 30px ${C.amber}35`}}>Request a Demo <ArrowRight size={14} strokeWidth={3}/></button>
            <button onClick={()=>scrollTo("product")} style={BTNS}><Eye size={14}/> View Product</button>
          </div>

          {/* DASHBOARD PREVIEW */}
          <div id="product" className="float fu d5" style={{maxWidth:860,margin:"0 auto"}}>
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
                <div className="g4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
                  {[{icon:Clock,label:"Hours Today",val:"6h 20m",sub:"3 on shift",color:C.amber},
                    {icon:CheckCircle,label:"Tasks Done",val:"23",sub:"4 remaining",color:C.green},
                    {icon:Users,label:"Staff Active",val:"3 / 3",sub:"All submitted",color:C.blue},
                    {icon:TrendingUp,label:"Consistency",val:"88/100",sub:"↑4 vs last wk",color:C.purple}
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
                <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                      <span style={LBL}>Weekly Hours</span>
                      <Badge color={C.amber}>This Week</Badge>
                    </div>
                    <MiniBarChart/>
                    <div style={{marginTop:10,fontSize:11,color:C.dim,fontWeight:600}}>Total: 314h · <span style={{color:C.green}}>↑ 8% vs last week</span></div>
                  </div>
                  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16}}>
                    <div style={{...LBL,marginBottom:14}}>Staff Productivity</div>
                    <div style={{display:"flex",flexDirection:"column",gap:12}}>
                      {staffRows.map((s,i)=>(
                        <div key={i}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                            <span style={{fontSize:12,fontWeight:700,color:C.text}}>{s.name}</span>
                            <span style={{fontSize:12,fontWeight:800,color:s.color}}>{s.hrs}</span>
                          </div>
                          <PBar pct={s.pct} color={s.color}/>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
                  <div style={{padding:"10px 16px",borderBottom:`1px solid ${C.border}`,background:C.surface,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={LBL}>Today's Tasks — Michelle</span>
                    <Badge color={C.green}>4 / 5 complete</Badge>
                  </div>
                  {taskRows.map((t,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 16px",borderBottom:i<taskRows.length-1?`1px solid ${C.border}`:"none",opacity:t.done?1:0.55}}>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{background:C.surface,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:"52px 20px"}}>
        <div className="g4" style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24,textAlign:"center"}}>
          {[{n:300,s:"+",label:"Shifts tracked"},{n:98,s:"%",label:"Task completion rate"},{n:4,s:"hrs",label:"Admin saved weekly"},{n:12,s:"min",label:"Average setup time"}].map((s,i)=>(
            <div key={i}>
              <div className="tg" style={{fontSize:"clamp(1.8rem,3vw,2.5rem)",fontWeight:800,marginBottom:4,fontFamily:"'Playfair Display',serif"}}>
                <Counter to={s.n} suffix={s.s}/>
              </div>
              <div style={{fontSize:13,color:C.dim,fontWeight:500}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <div style={{padding:"88px 20px"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Badge color={C.red}>The Problem</Badge>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,margin:"20px auto 16px",maxWidth:560}}>
              Running a shop shouldn't<br/>rely on guesswork.
            </h2>
            <p style={{...BODY,maxWidth:480,margin:"0 auto"}}>Most store owners are flying blind — piecing together what happened in a shift from memory and messages.</p>
          </div>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
            {[{icon:"📋",title:"Paper checklists",desc:"Tasks get forgotten, lost, or simply not checked. No accountability and no record."},
              {icon:"💬",title:"WhatsApp chaos",desc:"Chasing staff on WhatsApp isn't management. It's reactive, unreliable, and exhausting."},
              {icon:"📊",title:"Spreadsheet hell",desc:"Manually copying hours every week. Error-prone and a waste of your time."},
              {icon:"🧮",title:"Manual payroll",desc:"Counting up hours by hand. Wrong totals. Disputes. Stress you don't need."}
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
            {["Missed tasks","Poor visibility","Inefficient staffing","Wasted labour cost"].map(t=>(
              <Badge key={t} color={C.red}>{t}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how-it-works" style={{background:C.surface,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:"88px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Badge color={C.amber}>How It Works</Badge>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,marginTop:20}}>Three steps to full visibility.</h2>
          </div>
          <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {[{n:"01",color:C.amber,title:"Staff log tasks",desc:"During their shift, staff tap to log each task from their phone. Time is tracked automatically. No paper. No WhatsApp.",
                preview:<div style={{marginTop:16,borderRadius:12,overflow:"hidden",border:`1px solid ${C.border}`}}>
                  <div style={{background:C.bg,padding:"8px 14px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:C.green}}/><span style={{fontSize:10,fontWeight:700,color:C.dim}}>Michelle · Shift in progress</span>
                  </div>
                  {[{t:"Post Office",d:"Done ✓",c:C.green},{t:"Fridge Check",d:"Done ✓",c:C.green},{t:"Stacking",d:"In progress",c:C.amber}].map((r,i)=>(
                    <div key={i} style={{background:C.bg,display:"flex",justifyContent:"space-between",padding:"8px 14px",borderBottom:i<2?`1px solid ${C.border}`:"none"}}>
                      <span style={{fontSize:11,color:C.muted}}>{r.t}</span><span style={{fontSize:11,fontWeight:700,color:r.c}}>{r.d}</span>
                    </div>
                  ))}
                </div>
              },
              {n:"02",color:C.blue,title:"Owner sees everything",desc:"Your dashboard updates in real time. See who's working, what's been done, how long it took, and who's falling behind.",
                preview:<div style={{marginTop:16,display:"flex",flexDirection:"column",gap:10}}>
                  {staffRows.map((s,i)=>(
                    <div key={i}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                        <span style={{fontSize:11,fontWeight:700,color:C.muted}}>{s.name}</span>
                        <span style={{fontSize:11,fontWeight:800,color:s.color}}>{s.score}/100</span>
                      </div>
                      <PBar pct={s.pct} color={s.color}/>
                    </div>
                  ))}
                </div>
              },
              {n:"03",color:C.green,title:"Insights you can act on",desc:"Weekly summaries, payroll exports, and performance trends. Delivered automatically so you can make decisions, not spreadsheets.",
                preview:<div style={{marginTop:16,borderRadius:12,overflow:"hidden",border:`1px solid ${C.border}`}}>
                  {[{l:"Week total hours",v:"314h",c:C.amber},{l:"Labour efficiency",v:"↑ 8%",c:C.green},{l:"Tasks completed",v:"148/160",c:C.blue},{l:"Payroll ready",v:"✓ Export",c:C.green}].map((r,i)=>(
                    <div key={i} style={{background:C.bg,display:"flex",justifyContent:"space-between",padding:"8px 14px",borderBottom:i<3?`1px solid ${C.border}`:"none"}}>
                      <span style={{fontSize:11,color:C.dim}}>{r.l}</span><span style={{fontSize:11,fontWeight:800,color:r.c}}>{r.v}</span>
                    </div>
                  ))}
                </div>
              }
            ].map((s,i)=>(
              <Card key={i} accent={s.color}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:800,color:`${s.color}25`,marginBottom:8}}>{s.n}</div>
                <Badge color={s.color}>Step {i+1}</Badge>
                <div style={{fontSize:16,fontWeight:800,color:C.text,marginTop:14,marginBottom:8}}>{s.title}</div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.65}}>{s.desc}</div>
                {s.preview}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div id="features" style={{padding:"88px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <Badge color={C.amber}>Features</Badge>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,marginTop:20,marginBottom:12}}>
              Everything you need to run<br/>a tighter operation.
            </h2>
          </div>
          <div className="g3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
            {[{icon:ClipboardList,color:C.amber,title:"Task Tracking",desc:"Staff log every task during their shift. Times are recorded automatically. Nothing gets missed."},
              {icon:BarChart2,color:C.blue,title:"Productivity Insights",desc:"Scores, comparisons, and trends for every staff member. See who's performing and who needs support."},
              {icon:Bell,color:C.purple,title:"Shift Alerts",desc:"Get notified when a shift is submitted — or when it hasn't been started on time."},
              {icon:Download,color:C.green,title:"Payroll Export",desc:"One-click export of all staff hours. Send straight to payroll without touching a spreadsheet."},
              {icon:AlertTriangle,color:C.red,title:"Incident Reporting",desc:"Staff can log incidents during a shift. Timestamped, recorded, and visible on your dashboard."},
              {icon:Users,color:C.amber,title:"Multi-location",desc:"Manage multiple stores from one dashboard. Switch between locations in seconds."}
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

      {/* WHO IT'S FOR */}
      <div style={{background:C.surface,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:"88px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div className="g2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
            <div>
              <Badge color={C.amber}>Who It's For</Badge>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,margin:"20px 0 16px"}}>Built for real<br/>retail stores.</h2>
              <p style={{...BODY,marginBottom:28}}>We built Retail Intelligence for the shop owners doing everything themselves — managing staff, covering shifts, handling payroll, and trying to grow their business at the same time.</p>
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
              {[{icon:Clock,label:"Reduce wasted labour time",desc:"Stop paying for unproductive shifts."},
                {icon:TrendingUp,label:"Improve store productivity",desc:"Benchmarks show where to improve."},
                {icon:CheckCircle,label:"Ensure tasks are completed",desc:"No more guessing if things got done."},
                {icon:Download,label:"Simplify payroll",desc:"Hours ready to export in one click."},
                {icon:Eye,label:"Manage when you're not there",desc:"Full visibility without being on site."}
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

      {/* ROADMAP */}
      <div style={{padding:"88px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <Badge color={C.blue}>Coming Soon</Badge>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,marginTop:20,marginBottom:12}}>The future of Retail Intelligence.</h2>
            <p style={{...BODY,maxWidth:400,margin:"0 auto"}}>We're building fast. Here's what's coming next.</p>
          </div>
          <div className="g5" style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14}}>
            {[{icon:Calendar,label:"Shift scheduling",eta:"Q2 2026"},
              {icon:TrendingUp,label:"Labour vs revenue insights",eta:"Q2 2026"},
              {icon:Cpu,label:"POS integrations",eta:"Q3 2026"},
              {icon:Activity,label:"Automated weekly reports",eta:"Q3 2026"},
              {icon:Lock,label:"Incident logging + photos",eta:"Q3 2026"}
            ].map((r,i)=>(
              <Card key={i} accent={C.blue} style={{padding:20,textAlign:"center"}}>
                <div style={{width:38,height:38,borderRadius:12,background:`${C.blue}18`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
                  <r.icon size={16} color={C.blue}/>
                </div>
                <div style={{fontSize:12,fontWeight:700,color:C.text,lineHeight:1.4,marginBottom:8}}>{r.label}</div>
                <Badge color={C.blue}>{r.eta}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FOUNDER */}
      <div style={{background:C.surface,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:"72px 20px"}}>
        <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
          <Badge color={C.green}>Why We Built This</Badge>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,lineHeight:1.15,color:C.text,fontStyle:"italic",margin:"24px 0 20px"}}>
            "Most shop owners have no idea what actually happens during a shift."
          </h2>
          <p style={{...BODY,marginBottom:16}}>Small retail stores are often running on trust, habit, and hope. Owners rely on word of mouth and memory to understand how their store is operating. When something goes wrong — a task missed, hours disputed, a customer complaint — there's no record.</p>
          <p style={BODY}>Retail Intelligence was built to change that. Not with complex, expensive enterprise software — but with a simple, practical tool that gives store owners the visibility they deserve.</p>
          <div style={{display:"inline-flex",alignItems:"center",gap:12,marginTop:28,background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 18px"}}>
            <div style={{width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${C.amber},#f97316)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#000"}}>RI</div>
            <div style={{textAlign:"left"}}>
              <div style={{fontSize:13,fontWeight:800,color:C.text}}>Retail Intelligence</div>
              <div style={{fontSize:11,color:C.dim}}>Built in the UK for UK retailers</div>
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{padding:"88px 20px",background:`radial-gradient(ellipse 80% 80% at 50% 50%,${C.amber}12 0%,${C.bg} 70%)`}}>
        <div style={{maxWidth:640,margin:"0 auto",textAlign:"center"}}>
          <div style={{display:"flex",justifyContent:"center",gap:2,marginBottom:20}}>
            {[...Array(5)].map((_,i)=><Star key={i} size={16} fill={C.amber} color={C.amber}/>)}
          </div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,4.5vw,3.2rem)",fontWeight:800,lineHeight:1.15,color:C.text,marginBottom:20}}>
            Start managing your store<br/><span className="tg" style={{fontStyle:"italic"}}>with real visibility.</span>
          </h2>
          <p style={{...BODY,maxWidth:440,margin:"0 auto 32px"}}>Join shop owners who've ditched the spreadsheets and replaced guesswork with real operational intelligence.</p>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:12}}>
            <button onClick={()=>scrollTo("contact")} style={{...BTNP,boxShadow:`0 0 30px ${C.amber}35`}}>Request Demo <ArrowRight size={14} strokeWidth={3}/></button>
            <button onClick={()=>scrollTo("contact")} style={BTNS}>Get Early Access</button>
          </div>
        </div>
      </div>

      {/* CONTACT */}
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
              <button onClick={()=>{if(form.name&&form.email)setSent(true);}}
                style={{...BTNP,width:"100%",justifyContent:"center",padding:15,fontSize:15}}>
                Send Message <ArrowRight size={15} strokeWidth={3}/>
              </button>
            </Card>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{borderTop:`1px solid ${C.border}`,padding:"36px 20px",background:C.bg}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:30,height:30,borderRadius:9,background:`linear-gradient(135deg,${C.amber},#f97316)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Store size={13} color="#000" strokeWidth={2.5}/>
            </div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:C.text}}>Retail <span style={{color:C.amber}}>Intelligence</span></div>
              <div style={{fontSize:11,color:C.dim}}>Staff management for small retail stores</div>
            </div>
          </div>
          <a href="mailto:hello@retail-intelligence.co.uk"
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
