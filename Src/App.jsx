import { useState, useEffect, useRef, useCallback } from "react";

const NICHES = [
  "Finance & Wealth", "Motivation & Mindset", "True Crime", "Health & Longevity",
  "AI & Technology", "History Mysteries", "Luxury Lifestyle", "Self Improvement",
  "Crypto & Web3", "Psychology & Mind"
];
const TONES = ["Dramatic", "Educational", "Inspirational", "Shocking", "Calm & Trustworthy"];
const VIDEO_STYLES = [
  { id: "cinematic", label: "🎬 Dark Cinematic", bg: "#07070d", text: "#ffffff", accent: "#ff4d00" },
  { id: "minimal", label: "⬜ Clean Minimal", bg: "#f5f5f0", text: "#111111", accent: "#0066ff" },
  { id: "neon", label: "💜 Neon Glow", bg: "#0a0015", text: "#e0aaff", accent: "#c77dff" },
  { id: "gold", label: "✨ Gold Luxury", bg: "#0d0a00", text: "#ffd700", accent: "#ffaa00" },
];

function PaymentGate({ onAccess }) {
  const [sms, setSms] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [step, setStep] = useState(1);

  const verify = () => {
    setChecking(true); setError("");
    setTimeout(() => {
      const msg = sms.toLowerCase();
      const hasAmount = msg.includes("50");
      const hasNumber = msg.includes("733473677") || msg.includes("0733473677") || msg.includes("+254733473677") || msg.includes("254733473677");
      const hasConfirm = msg.includes("confirmed") || msg.includes("sent") || msg.includes("received") || msg.includes("umefaulu") || msg.includes("successful");
      if (hasAmount && hasNumber && hasConfirm) {
        onAccess();
      } else {
        setError("❌ Could not verify payment. Paste the exact Airtel Money SMS mentioning KES 50 and number 0733473677.");
      }
      setChecking(false);
    }, 1800);
  };

  return (
    <div style={pg.root}>
      <div style={pg.glow} />
      <div style={pg.card}>
        <div style={pg.logoRow}>
          <span style={pg.logoIcon}>⚡</span>
          <span style={pg.logoText}>CONTENT ENGINE</span>
        </div>
        {step === 1 && (
          <>
            <h2 style={pg.heading}>Unlock Full Access</h2>
            <p style={pg.sub}>One-time payment of <span style={pg.price}>KES 50</span> via Airtel Money</p>
            <div style={pg.stepsBox}>
              <div style={pg.stepRow}>
                <span style={pg.stepNum}>1</span>
                <div>
                  <div style={pg.stepTitle}>Open Airtel Money</div>
                  <div style={pg.stepDesc}>Go to Send Money on your Airtel Money menu</div>
                </div>
              </div>
              <div style={pg.stepRow}>
                <span style={pg.stepNum}>2</span>
                <div>
                  <div style={pg.stepTitle}>Send KES 50 to:</div>
                  <div style={pg.phoneNum}>0733 473 677</div>
                  <div style={pg.stepDesc}>Reference: Content Engine Access</div>
                </div>
              </div>
              <div style={pg.stepRow}>
                <span style={pg.stepNum}>3</span>
                <div>
                  <div style={pg.stepTitle}>You'll receive an SMS</div>
                  <div style={pg.stepDesc}>"Confirmed. You have sent KES 50.00 to 0733473677..."</div>
                </div>
              </div>
            </div>
            <button onClick={() => setStep(2)} style={pg.btn}>I've Paid — Verify Now →</button>
            <p style={pg.note}>💡 Instant access after verification. No account needed.</p>
          </>
        )}
        {step === 2 && (
          <>
            <h2 style={pg.heading}>Paste Your SMS</h2>
            <p style={pg.sub}>Copy the Airtel Money confirmation SMS and paste it below</p>
            <textarea value={sms} onChange={e => { setSms(e.target.value); setError(""); }}
              placeholder={"Paste your Airtel Money SMS here...\n\nExample:\nConfirmed. You have sent KES 50.00 to 0733473677 on 30/04/2026..."}
              style={pg.textarea} rows={5} />
            {error && <div style={pg.error}>{error}</div>}
            <button onClick={verify} disabled={!sms.trim() || checking}
              style={{ ...pg.btn, ...(!sms.trim() || checking ? pg.btnDisabled : {}) }}>
              {checking
                ? <span style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><span style={pg.spinner} />VERIFYING...</span>
                : "✅ VERIFY & UNLOCK"}
            </button>
            <button onClick={() => { setStep(1); setError(""); }} style={pg.back}>← Back to payment steps</button>
          </>
        )}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes glowPulse{0%,100%{opacity:0.3;transform:scale(1);}50%{opacity:0.6;transform:scale(1.1);}}
      `}</style>
    </div>
  );
}

const pg = {
  root:{ minHeight:"100vh",background:"#07070d",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",color:"#e8e4dc",position:"relative",overflow:"hidden",padding:20 },
  glow:{ position:"absolute",width:500,height:500,background:"radial-gradient(circle,rgba(255,77,0,0.15) 0%,transparent 70%)",borderRadius:"50%",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"glowPulse 4s ease-in-out infinite",pointerEvents:"none" },
  card:{ position:"relative",zIndex:1,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:"40px 36px",maxWidth:480,width:"100%",backdropFilter:"blur(20px)" },
  logoRow:{ display:"flex",alignItems:"center",gap:8,marginBottom:28,justifyContent:"center" },
  logoIcon:{ fontSize:20 },
  logoText:{ fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:3,color:"#ff4d00" },
  heading:{ fontFamily:"'Bebas Neue',sans-serif",fontSize:38,letterSpacing:1,marginBottom:8,textAlign:"center" },
  sub:{ color:"#888",fontSize:14,textAlign:"center",marginBottom:28 },
  price:{ color:"#ff4d00",fontWeight:600 },
  stepsBox:{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"20px 18px",display:"flex",flexDirection:"column",gap:18,marginBottom:24 },
  stepRow:{ display:"flex",alignItems:"flex-start",gap:14 },
  stepNum:{ background:"#ff4d00",color:"#fff",width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0,marginTop:2 },
  stepTitle:{ fontSize:13,fontWeight:500,marginBottom:3 },
  stepDesc:{ fontSize:12,color:"#666" },
  phoneNum:{ fontFamily:"'JetBrains Mono',monospace",fontSize:22,color:"#ff4d00",letterSpacing:2,fontWeight:600,margin:"4px 0" },
  btn:{ width:"100%",background:"#ff4d00",color:"#fff",border:"none",borderRadius:8,padding:15,fontSize:13,fontFamily:"'JetBrains Mono',monospace",letterSpacing:2,cursor:"pointer",fontWeight:600,marginBottom:12 },
  btnDisabled:{ background:"#2a2a2a",color:"#555",cursor:"not-allowed" },
  note:{ fontSize:11,color:"#555",textAlign:"center" },
  textarea:{ width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#e8e4dc",fontSize:13,padding:"12px 14px",outline:"none",fontFamily:"'DM Sans',sans-serif",resize:"vertical",marginBottom:16,lineHeight:1.6 },
  error:{ background:"rgba(255,0,0,0.08)",border:"1px solid rgba(255,0,0,0.2)",color:"#ff6b6b",borderRadius:8,padding:"10px 14px",fontSize:12,marginBottom:14 },
  spinner:{ display:"inline-block",width:14,height:14,border:"2px solid rgba(255,255,255,0.2)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite" },
  back:{ background:"transparent",border:"none",color:"#555",fontSize:12,cursor:"pointer",width:"100%",textAlign:"center",fontFamily:"'DM Sans',sans-serif",marginTop:4 },
};

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [niche, setNiche] = useState("");
  const [customNiche, setCustomNiche] = useState("");
  const [tone, setTone] = useState("Dramatic");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(null);
  const [tab, setTab] = useState("content");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.95);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [ttsProgress, setTtsProgress] = useState(0);
  const [videoStyle, setVideoStyle] = useState(VIDEO_STYLES[0]);
  const [recording, setRecording] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const selectedNiche = niche === "custom" ? customNiche : niche;

  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) { setVoices(v); setSelectedVoice(v[0]); }
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => window.speechSynthesis.cancel();
  }, []);

  const generate = async () => {
    if (!selectedNiche || !topic) return;
    setLoading(true); setResult(null); setVideoReady(false); setVideoURL(null);
    const prompt = `You are a professional faceless YouTube content strategist.
Niche: ${selectedNiche}
Topic: ${topic}
Tone: ${tone}
Respond ONLY with valid JSON, no markdown:
{"title":"powerful video title under 70 chars","hook":"first 15 seconds script","script":"full narration 400-500 words voice-over only no stage directions","thumbnail":"thumbnail concept main text 5 words max background description colors","description":"youtube description 150 words","tags":["tag1","tag2","tag3","tag4","tag5","tag6","tag7","tag8"],"schedule":"best day time and frequency","monetization":"one specific monetization tip"}`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      setResult(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch { setResult({ error: "Generation failed. Please try again." }); }
    setLoading(false);
  };

  const copy = (text, key) => { navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(null), 2000); };

  const speakScript = useCallback(() => {
    if (!result?.script) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(result.hook + ". " + result.script);
    if (selectedVoice) utt.voice = selectedVoice;
    utt.rate = speechRate; utt.pitch = speechPitch;
    setTtsProgress(0);
    const words = (result.hook + " " + result.script).split(" ").length;
    let wc = 0;
    utt.onboundary = e => { if (e.name === "word") { wc++; setTtsProgress(Math.min(100, Math.round((wc / words) * 100))); } };
    utt.onend = () => { setSpeaking(false); setTtsProgress(100); };
    utt.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
    setSpeaking(true);
  }, [result, selectedVoice, speechRate, speechPitch]);

  const stopSpeech = () => { window.speechSynthesis.cancel(); setSpeaking(false); setTtsProgress(0); };

  const generateVideo = useCallback(async () => {
    if (!result || !canvasRef.current) return;
    setRecording(true); setVideoReady(false); setVideoURL(null); setVideoProgress(0);
    chunksRef.current = [];
    const canvas = canvasRef.current;
    canvas.width = 1280; canvas.height = 720;
    const ctx = canvas.getContext("2d");
    const vs = videoStyle;
    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
    mediaRecorderRef.current = recorder;
    recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setVideoURL(URL.createObjectURL(blob)); setVideoReady(true); setRecording(false);
    };
    recorder.start();

    const segments = [
      { type: "TITLE", text: result.title },
      { type: "HOOK", text: result.hook },
      ...result.script.split(". ").filter(s => s.trim().length > 10).map(s => ({ type: "SCRIPT", text: s.trim() + "." }))
    ];
    const totalFrames = segments.length * 90;
    let frameCount = 0;

    const drawFrame = (seg, globalProg) => {
      ctx.fillStyle = vs.bg; ctx.fillRect(0, 0, 1280, 720);
      ctx.strokeStyle = vs.text + "08"; ctx.lineWidth = 1;
      for (let x = 0; x < 1280; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 720); ctx.stroke(); }
      for (let y = 0; y < 720; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1280, y); ctx.stroke(); }
      ctx.fillStyle = vs.accent; ctx.fillRect(0, 0, 1280 * globalProg, 6);
      ctx.fillStyle = vs.accent + "22"; ctx.beginPath(); ctx.roundRect(60, 40, 220, 36, 6); ctx.fill();
      ctx.fillStyle = vs.accent; ctx.font = "bold 13px Arial"; ctx.textAlign = "left";
      ctx.fillText(selectedNiche.toUpperCase(), 75, 64);
      const isTitle = seg.type === "TITLE";
      const fontSize = isTitle ? 62 : 34;
      ctx.font = `${isTitle ? "900" : "400"} ${fontSize}px Georgia,serif`;
      ctx.textAlign = "center";
      const words = seg.text.split(" "); const lines = []; let cur = "";
      for (const w of words) {
        const test = cur ? cur + " " + w : w;
        if (ctx.measureText(test).width > 1100) { lines.push(cur); cur = w; } else cur = test;
      }
      if (cur) lines.push(cur);
      const lineH = fontSize * 1.35; const totalH = lines.length * lineH; const startY = (720 - totalH) / 2;
      lines.forEach((line, i) => {
        ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillText(line, 642, startY + i * lineH + 2);
        ctx.fillStyle = vs.text; ctx.fillText(line, 640, startY + i * lineH);
      });
      ctx.font = "11px monospace"; ctx.fillStyle = vs.accent + "88"; ctx.textAlign = "left";
      ctx.fillText(seg.type, 60, 690);
      ctx.fillStyle = vs.text + "15"; ctx.fillRect(60, 700, 1160, 3);
      ctx.fillStyle = vs.accent; ctx.fillRect(60, 700, 1160 * globalProg, 3);
    };

    for (let i = 0; i < segments.length; i++) {
      for (let f = 0; f < 90; f++) {
        drawFrame(segments[i], (i * 90 + f) / totalFrames);
        frameCount++;
        setVideoProgress(Math.round((frameCount / totalFrames) * 100));
        await new Promise(r => setTimeout(r, 33));
      }
    }
    recorder.stop();
  }, [result, videoStyle, selectedNiche]);

  if (!unlocked) return <PaymentGate onAccess={() => setUnlocked(true)} />;

  return (
    <div style={s.root}>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div style={s.container}>
        <div style={s.header}>
          <div style={s.badge}>⚡ STUDIO — UNLOCKED</div>
          <h1 style={s.title}><span style={s.acc}>FACELESS</span><br />CONTENT ENGINE</h1>
          <p style={s.subtitle}>Generate • Narrate • Export — No face. No limits.</p>
        </div>

        <div style={s.card}>
          <div style={s.fg}>
            <label style={s.lbl}>SELECT NICHE</label>
            <div style={s.grid}>
              {NICHES.map(n => (
                <button key={n} onClick={() => setNiche(n)} style={{ ...s.chip, ...(niche === n ? s.chipOn : {}) }}>{n}</button>
              ))}
              <button onClick={() => setNiche("custom")} style={{ ...s.chip, ...(niche === "custom" ? s.chipOn : {}) }}>✏️ Custom</button>
            </div>
            {niche === "custom" && <input value={customNiche} onChange={e => setCustomNiche(e.target.value)} placeholder="Type your niche..." style={s.inp} />}
          </div>
          <div style={s.fg}>
            <label style={s.lbl}>TONE</label>
            <div style={s.row}>
              {TONES.map(t => <button key={t} onClick={() => setTone(t)} style={{ ...s.tone, ...(tone === t ? s.toneOn : {}) }}>{t}</button>)}
            </div>
          </div>
          <div style={s.fg}>
            <label style={s.lbl}>TOPIC / IDEA</label>
            <input value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()}
              placeholder="e.g. 'The dark truth about passive income'" style={s.inp} />
          </div>
          <button onClick={generate} disabled={loading || !selectedNiche || !topic}
            style={{ ...s.genBtn, ...(loading || !selectedNiche || !topic ? s.genOff : {}) }}>
            {loading ? <span style={s.row2}><span style={s.spin} />GENERATING...</span> : "⚡ GENERATE CONTENT PACKAGE"}
          </button>
        </div>

        {result && !result.error && (
          <>
            <div style={s.tabs}>
              {[["content","📄 Content"],["audio","🔊 Audio"],["video","🎬 Video"]].map(([id,label]) => (
                <button key={id} onClick={() => setTab(id)} style={{ ...s.tab, ...(tab === id ? s.tabOn : {}) }}>{label}</button>
              ))}
            </div>

            {tab === "content" && (
              <div style={s.blocks}>
                <Blk icon="🎬" label="VIDEO TITLE" content={result.title} accent onCopy={() => copy(result.title,"title")} copied={copied==="title"} />
                <Blk icon="🔥" label="HOOK (First 15 sec)" content={result.hook} onCopy={() => copy(result.hook,"hook")} copied={copied==="hook"} />
                <Blk icon="📜" label="FULL SCRIPT" content={result.script} tall onCopy={() => copy(result.script,"script")} copied={copied==="script"} />
                <Blk icon="🖼️" label="THUMBNAIL CONCEPT" content={result.thumbnail} onCopy={() => copy(result.thumbnail,"thumb")} copied={copied==="thumb"} />
                <Blk icon="📝" label="DESCRIPTION" content={result.description} tall onCopy={() => copy(result.description,"desc")} copied={copied==="desc"} />
                <div style={s.blk}>
                  <div style={s.bh}><span style={s.bi}>🏷️</span><span style={s.bl}>TAGS</span>
                    <button onClick={() => copy(result.tags.join(", "),"tags")} style={{ ...s.cp, ...(copied==="tags" ? s.cpDone : {}) }}>{copied==="tags"?"✓ COPIED":"COPY"}</button>
                  </div>
                  <div style={s.tagsRow}>{result.tags?.map(t => <span key={t} style={s.tag}>{t}</span>)}</div>
                </div>
                <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
                  <Blk icon="📅" label="POST SCHEDULE" content={result.schedule} half onCopy={() => copy(result.schedule,"sched")} copied={copied==="sched"} />
                  <Blk icon="💰" label="MONETIZATION TIP" content={result.monetization} half gold onCopy={() => copy(result.monetization,"money")} copied={copied==="money"} />
                </div>
              </div>
            )}

            {tab === "audio" && (
              <div style={s.card}>
                <h3 style={s.th}>🔊 Text-to-Speech Narrator</h3>
                <p style={s.ts}>Hear your full script read aloud. Record it with OBS or Audacity to save as audio.</p>
                <div style={s.fg}>
                  <label style={s.lbl}>SELECT VOICE</label>
                  <select value={selectedVoice?.name||""} onChange={e => setSelectedVoice(voices.find(v=>v.name===e.target.value))} style={s.sel}>
                    {voices.map(v => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
                  </select>
                </div>
                <div style={{ display:"flex",gap:16,marginBottom:20 }}>
                  <div style={{ flex:1 }}>
                    <label style={s.lbl}>SPEED: {speechRate}x</label>
                    <input type="range" min="0.5" max="1.8" step="0.05" value={speechRate} onChange={e=>setSpeechRate(parseFloat(e.target.value))} style={s.rng} />
                  </div>
                  <div style={{ flex:1 }}>
                    <label style={s.lbl}>PITCH: {speechPitch}</label>
                    <input type="range" min="0.5" max="2" step="0.1" value={speechPitch} onChange={e=>setSpeechPitch(parseFloat(e.target.value))} style={s.rng} />
                  </div>
                </div>
                {ttsProgress > 0 && ttsProgress < 100 && (
                  <div style={s.prog}><div style={{ ...s.progBar, width:`${ttsProgress}%`,background:"#ff4d00" }} /><span style={s.progLbl}>{ttsProgress}%</span></div>
                )}
                <div style={{ display:"flex",gap:10 }}>
                  {!speaking
                    ? <button onClick={speakScript} style={s.pb}>▶ PLAY SCRIPT</button>
                    : <button onClick={stopSpeech} style={{ ...s.pb, background:"#333" }}>⏹ STOP</button>
                  }
                </div>
                <div style={s.info}>💡 <strong>Tip:</strong> Use <strong>OBS Studio</strong> (free) to record your screen + audio while the script plays. Export as MP3 or use directly in your video.</div>
              </div>
            )}

            {tab === "video" && (
              <div style={s.card}>
                <h3 style={s.th}>🎬 Video Generator</h3>
                <p style={s.ts}>Renders a real downloadable .webm video with your script animated on screen. Upload directly to YouTube.</p>
                <div style={s.fg}>
                  <label style={s.lbl}>VIDEO STYLE</label>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                    {VIDEO_STYLES.map(vs => (
                      <button key={vs.id} onClick={() => setVideoStyle(vs)} style={{ padding:"10px 16px",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:500,transition:"all 0.2s",background:vs.bg,color:vs.text,border:videoStyle.id===vs.id?`2px solid ${vs.accent}`:"1px solid rgba(255,255,255,0.08)" }}>{vs.label}</button>
                    ))}
                  </div>
                </div>
                {recording && (
                  <div style={s.prog}><div style={{ ...s.progBar, width:`${videoProgress}%`,background:"#ff4d00" }} /><span style={s.progLbl}>Rendering... {videoProgress}%</span></div>
                )}
                {!recording && !videoReady && <button onClick={generateVideo} style={s.pb}>🎬 GENERATE VIDEO</button>}
                {recording && <button disabled style={{ ...s.pb,background:"#1a1a1a",color:"#555",cursor:"not-allowed" }}><span style={s.row2}><span style={s.spin} />RENDERING...</span></button>}
                {videoReady && videoURL && (
                  <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:16 }}>
                    <video src={videoURL} controls style={{ width:"100%",borderRadius:8,border:"1px solid rgba(255,255,255,0.08)" }} />
                    <a href={videoURL} download="faceless-video.webm" style={{ display:"block",textAlign:"center",background:"#4CAF50",color:"#fff",borderRadius:8,padding:13,fontSize:12,fontFamily:"'JetBrains Mono',monospace",letterSpacing:2,textDecoration:"none",fontWeight:600 }}>⬇ DOWNLOAD VIDEO (.webm)</a>
                    <button onClick={()=>{setVideoReady(false);setVideoURL(null);setVideoProgress(0);}} style={{ background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:"#666",borderRadius:8,padding:10,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif" }}>↺ Try a different style</button>
                  </div>
                )}
                <div style={s.info}>💡 <strong>Pro move:</strong> Hit <strong>Audio tab → Play</strong> while your video renders, then record both together with OBS for a complete faceless video.</div>
              </div>
            )}
          </>
        )}
        {result?.error && <div style={s.err}>{result.error}</div>}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#ff4d00;border-radius:2px;}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        input[type=range]{accent-color:#ff4d00;width:100%;}
        select option{background:#1a1a1a;color:#e8e4dc;}
      `}</style>
    </div>
  );
}

function Blk({ icon, label, content, onCopy, copied, tall, accent, half, gold }) {
  return (
    <div style={{ ...s.blk, ...(accent?s.blkAcc:{}), ...(gold?s.blkGold:{}), ...(half?{flex:1,minWidth:0}:{}), animation:"fadeUp 0.35s ease forwards" }}>
      <div style={s.bh}>
        <span style={s.bi}>{icon}</span>
        <span style={s.bl}>{label}</span>
        <button onClick={onCopy} style={{ ...s.cp, ...(copied?s.cpDone:{}) }}>{copied?"✓ COPIED":"COPY"}</button>
      </div>
      <p style={{ ...s.bc, ...(tall?{maxHeight:200,overflowY:"auto"}:{}) }}>{content}</p>
    </div>
  );
}

const s = {
  root:{ minHeight:"100vh",background:"#07070d",fontFamily:"'DM Sans',sans-serif",color:"#e8e4dc" },
  container:{ maxWidth:780,margin:"0 auto",padding:"44px 20px 80px" },
  header:{ textAlign:"center",marginBottom:36 },
  badge:{ display:"inline-block",border:"1px solid #ff4d00",color:"#ff4d00",fontFamily:"'JetBrains Mono',monospace",fontSize:10,letterSpacing:3,padding:"4px 14px",borderRadius:2,marginBottom:18 },
  title:{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(44px,9vw,84px)",lineHeight:0.93,letterSpacing:2,marginBottom:12 },
  acc:{ color:"#ff4d00" },
  subtitle:{ color:"#666",fontSize:13,letterSpacing:0.5 },
  card:{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"28px 24px",marginBottom:20 },
  fg:{ marginBottom:22 },
  lbl:{ display:"block",fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:3,color:"#ff4d00",marginBottom:10 },
  grid:{ display:"flex",flexWrap:"wrap",gap:7 },
  chip:{ background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:"#888",padding:"6px 13px",borderRadius:6,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s" },
  chipOn:{ background:"rgba(255,77,0,0.15)",border:"1px solid #ff4d00",color:"#ff4d00" },
  row:{ display:"flex",flexWrap:"wrap",gap:7 },
  tone:{ background:"transparent",border:"1px solid rgba(255,255,255,0.09)",color:"#777",padding:"6px 15px",borderRadius:20,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s" },
  toneOn:{ background:"rgba(255,77,0,0.1)",border:"1px solid #ff4d00",color:"#ff7a40" },
  inp:{ width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:8,color:"#e8e4dc",fontSize:14,padding:"12px 15px",outline:"none",fontFamily:"'DM Sans',sans-serif",marginTop:8 },
  sel:{ width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:8,color:"#e8e4dc",fontSize:13,padding:"11px 14px",outline:"none",fontFamily:"'DM Sans',sans-serif" },
  rng:{ marginTop:8 },
  genBtn:{ width:"100%",background:"#ff4d00",color:"#fff",border:"none",borderRadius:8,padding:15,fontSize:12,fontFamily:"'JetBrains Mono',monospace",letterSpacing:2,cursor:"pointer",fontWeight:600 },
  genOff:{ background:"#1e1e1e",color:"#444",cursor:"not-allowed" },
  row2:{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 },
  spin:{ display:"inline-block",width:13,height:13,border:"2px solid rgba(255,255,255,0.15)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite" },
  tabs:{ display:"flex",gap:4,marginBottom:16 },
  tab:{ flex:1,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",color:"#666",borderRadius:8,padding:11,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s" },
  tabOn:{ background:"rgba(255,77,0,0.1)",border:"1px solid #ff4d00",color:"#ff4d00" },
  blocks:{ display:"flex",flexDirection:"column",gap:10 },
  blk:{ background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"16px 18px" },
  blkAcc:{ background:"rgba(255,77,0,0.06)",border:"1px solid rgba(255,77,0,0.22)" },
  blkGold:{ background:"rgba(255,200,0,0.05)",border:"1px solid rgba(255,200,0,0.18)" },
  bh:{ display:"flex",alignItems:"center",gap:7,marginBottom:9 },
  bi:{ fontSize:13 },
  bl:{ fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:2.5,color:"#555",flex:1 },
  cp:{ background:"transparent",border:"1px solid rgba(255,255,255,0.09)",color:"#555",fontSize:9,padding:"3px 8px",borderRadius:4,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",letterSpacing:1 },
  cpDone:{ border:"1px solid #4CAF50",color:"#4CAF50" },
  bc:{ fontSize:13,lineHeight:1.7,color:"#bbb",fontWeight:300 },
  tagsRow:{ display:"flex",flexWrap:"wrap",gap:6,marginTop:4 },
  tag:{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",color:"#777",fontSize:11,padding:"3px 10px",borderRadius:20,fontFamily:"'JetBrains Mono',monospace" },
  th:{ fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:1,marginBottom:6 },
  ts:{ color:"#666",fontSize:12,marginBottom:22,lineHeight:1.6 },
  pb:{ flex:1,background:"#ff4d00",color:"#fff",border:"none",borderRadius:8,padding:14,fontSize:12,fontFamily:"'JetBrains Mono',monospace",letterSpacing:2,cursor:"pointer",fontWeight:600,width:"100%" },
  prog:{ background:"rgba(255,255,255,0.04)",borderRadius:6,height:28,position:"relative",overflow:"hidden",marginBottom:16,display:"flex",alignItems:"center" },
  progBar:{ position:"absolute",left:0,top:0,bottom:0,borderRadius:6,transition:"width 0.2s" },
  progLbl:{ position:"relative",zIndex:1,fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#fff",paddingLeft:12,letterSpacing:1 },
  info:{ background:"rgba(255,200,0,0.05)",border:"1px solid rgba(255,200,0,0.15)",borderRadius:8,padding:"12px 16px",fontSize:12,color:"#aaa",lineHeight:1.6,marginTop:16 },
  err:{ background:"rgba(255,0,0,0.07)",border:"1px solid rgba(255,0,0,0.18)",color:"#ff6b6b",borderRadius:8,padding:16,fontSize:13,textAlign:"center" },
};
