import React, { useState, useEffect, useRef } from "react";

/* ─── Static particle positions (no random on re-render) ─── */
const PARTICLES = [
  { x: 6,  y: 18, s: 3, c: "#2ecc71",              d: 4.2, delay: 0.0 },
  { x: 18, y: 75, s: 2, c: "rgba(255,255,255,0.12)", d: 5.1, delay: 0.8 },
  { x: 32, y: 42, s: 4, c: "rgba(46,204,113,0.25)", d: 3.8, delay: 1.5 },
  { x: 55, y: 88, s: 2, c: "rgba(255,255,255,0.10)", d: 6.0, delay: 0.3 },
  { x: 70, y: 22, s: 3, c: "#2ecc71",              d: 4.5, delay: 2.0 },
  { x: 82, y: 62, s: 2, c: "rgba(255,255,255,0.15)", d: 5.5, delay: 1.2 },
  { x: 91, y: 48, s: 4, c: "rgba(46,204,113,0.20)", d: 3.5, delay: 0.6 },
  { x: 46, y: 8,  s: 2, c: "rgba(255,255,255,0.10)", d: 7.0, delay: 1.8 },
  { x: 25, y: 55, s: 3, c: "rgba(46,204,113,0.15)", d: 4.8, delay: 2.4 },
  { x: 76, y: 35, s: 2, c: "#2ecc71",              d: 5.8, delay: 0.9 },
];

const Welcome = ({ onDone }) => {
  // phase: 0=idle → 1=watering → 2=growing → 3=bloomed
  const [phase, setPhase]     = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef               = useRef(false);

  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase(1), 350),   // watering can tilts, drops fall
      setTimeout(() => setPhase(2), 900),   // stem starts growing
      setTimeout(() => setPhase(3), 2700),  // leaves + bud bloom
      setTimeout(() => triggerDone(), 7200),// auto-advance
    ];
    return () => ts.forEach(clearTimeout);
  }, []);

  const triggerDone = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setExiting(true);
    setTimeout(onDone, 750);
  };

  const w = phase >= 1; // watering
  const g = phase >= 2; // growing
  const b = phase >= 3; // bloomed

  /* ── Shared inline transition helpers ── */
  const fadeUp = (show, delay = 0) => ({
    opacity:    show ? 1 : 0,
    transform:  show ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
  });

  return (
    <div
      onClick={triggerDone}
      style={{
        position:   "fixed",
        inset:      0,
        zIndex:     9999,
        background: "radial-gradient(ellipse at 50% 55%, #0e2a1a 0%, #061009 75%)",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        overflow:   "hidden",
        cursor:     "pointer",
        opacity:    exiting ? 0 : 1,
        transform:  exiting ? "scale(1.05)" : "scale(1)",
        transition: "opacity 0.75s ease, transform 0.75s ease",
      }}
    >
      {/* ── CSS keyframes ── */}
      <style>{`
        @keyframes wFloat {
          0%,100% { transform: translateY(0)   scale(1);   opacity: 0.55; }
          50%      { transform: translateY(-22px) scale(1.3); opacity: 1; }
        }
        @keyframes wDrop {
          0%   { transform: translateY(0);    opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 0.55; }
          100% { transform: translateY(115px); opacity: 0; }
        }
        @keyframes canTilt {
          0%   { transform: rotate(-8deg); }
          100% { transform: rotate(-52deg); }
        }
        @keyframes stemGrow {
          from { stroke-dashoffset: 84; }
          to   { stroke-dashoffset: 0;  }
        }
        @keyframes pulse {
          0%,100% { transform: scale(1);    opacity: 1; }
          50%      { transform: scale(1.12); opacity: 0.8; }
        }
      `}</style>

      {/* ── Floating particles ── */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
        {PARTICLES.map((p, i) => (
          <div key={i} style={{
            position:   "absolute",
            left:       `${p.x}%`,
            top:        `${p.y}%`,
            width:      p.s,
            height:     p.s,
            background: p.c,
            borderRadius: "50%",
            animation:  `wFloat ${p.d}s ease-in-out ${p.delay}s infinite`,
          }} />
        ))}
      </div>

      {/* ── Centre glow ── */}
      <div style={{
        position:   "absolute",
        top: "18%", left: "50%",
        transform:  "translateX(-50%)",
        width: 340, height: 340,
        background: "radial-gradient(circle, rgba(46,204,113,0.09) 0%, transparent 68%)",
        pointerEvents: "none",
      }} />

      {/* ── Logo ── */}
      <div style={{ ...fadeUp(w), marginBottom: 2, zIndex: 1 }}>
        <img
          src="/logo.png"
          alt="Harvest For All"
          style={{
            width: 74, height: 74,
            objectFit: "contain",
            filter: "drop-shadow(0 0 18px rgba(46,204,113,0.55))",
          }}
        />
      </div>

      {/* ── Plant + can scene ── */}
      <div style={{ position:"relative", width:220, height:280, zIndex:1 }}>

        {/* Watering can */}
        <div style={{
          position:   "absolute",
          top: 6, left: 124,
          opacity:    w ? 1 : 0,
          transform:  w ? "translateX(0)" : "translateX(36px)",
          transition: "opacity 0.5s ease 0s, transform 0.5s ease 0s",
        }}>
          <svg width="68" height="58" viewBox="0 0 68 58">
            <g style={{
              transformOrigin: "34px 28px",
              animation: w ? "canTilt 0.7s ease-out forwards" : "none",
            }}>
              {/* Body */}
              <rect x="10" y="14" width="38" height="26" rx="6" fill="#4a9eed" opacity="0.88" />
              {/* Shine */}
              <rect x="14" y="16" width="10" height="22" rx="4" fill="white" opacity="0.15" />
              {/* Spout */}
              <path d="M48 27 Q60 24 62 36" stroke="#4a9eed" strokeWidth="5.5"
                fill="none" strokeLinecap="round" opacity="0.88" />
              {/* Handle */}
              <path d="M10 19 Q1 28 10 38" stroke="#74b8f0" strokeWidth="4"
                fill="none" strokeLinecap="round" opacity="0.7" />
              {/* Opening */}
              <rect x="22" y="9" width="16" height="9" rx="3" fill="#3a8edd" opacity="0.75" />
            </g>
          </svg>
        </div>

        {/* Water drops */}
        {w && [0, 1, 2].map((i) => (
          <div key={i} style={{
            position:     "absolute",
            left:         `${93 + i * 9}px`,
            top:          38,
            width:        5,
            height:       11,
            background:   "linear-gradient(to bottom, rgba(116,184,240,0) 0%, rgba(116,184,240,0.9) 100%)",
            borderRadius: "0 0 50% 50%",
            animation:    `wDrop 1.25s ease-in ${i * 0.38}s infinite`,
          }} />
        ))}

        {/* ── Plant SVG ── */}
        <svg viewBox="0 0 200 260" width="200" height="260"
          style={{ position:"absolute", left:0, top:0 }}>

          {/* Pot shadow */}
          <ellipse cx="100" cy="253" rx="36" ry="6" fill="rgba(0,0,0,0.35)" />

          {/* Pot body */}
          <path d="M67 205 L79 250 L121 250 L133 205 Z" fill="#7c4f2a" />
          {/* Pot highlight stripe */}
          <path d="M67 205 L79 250 L88 250 L76 205 Z" fill="#9b6535" opacity="0.45" />
          {/* Pot rim */}
          <rect x="61" y="197" width="78" height="13" rx="5.5" fill="#9b6535" />
          <rect x="61" y="197" width="78" height="6"  rx="5.5" fill="#b07a40" />

          {/* Soil */}
          <ellipse cx="100" cy="203" rx="32" ry="8"  fill="#3d2410" />
          <ellipse cx="96"  cy="202" rx="19" ry="5"  fill="#4a2e16" />

          {/* ── Stem (stroke-dashoffset animation) ── */}
          <path
            d="M100 200 C98 184 103 162 99 128"
            fill="none"
            stroke="#2d6a4f"
            strokeWidth="5.5"
            strokeLinecap="round"
            style={{
              strokeDasharray:  84,
              strokeDashoffset: g ? 0 : 84,
              transition: "stroke-dashoffset 1.55s cubic-bezier(0.4,0,0.2,1) 0.15s",
            }}
          />

          {/* ── Left leaf ── */}
          <g style={{
            transformOrigin: "100px 170px",
            transform:  g ? "scale(1) rotate(0deg)" : "scale(0) rotate(-35deg)",
            transition: "transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 1.25s",
          }}>
            <path d="M100 170 C87 163 70 152 73 136 C76 120 97 130 100 154"
              fill="#40916c" />
            <path d="M100 170 C91 160 81 145 83 134"
              fill="none" stroke="#2d6a4f" strokeWidth="1.5" opacity="0.45" />
          </g>

          {/* ── Right leaf ── */}
          <g style={{
            transformOrigin: "100px 148px",
            transform:  g ? "scale(1) rotate(0deg)" : "scale(0) rotate(35deg)",
            transition: "transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 1.7s",
          }}>
            <path d="M100 148 C113 141 130 130 127 114 C124 98 103 108 100 132"
              fill="#52b788" />
            <path d="M100 148 C109 137 120 122 117 112"
              fill="none" stroke="#2d6a4f" strokeWidth="1.5" opacity="0.45" />
          </g>

          {/* ── Small left sprout ── */}
          <g style={{
            transformOrigin: "94px 144px",
            transform:  b ? "scale(1)" : "scale(0)",
            transition: "transform 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.15s",
          }}>
            <path d="M97 144 C87 139 79 133 81 123 C83 113 96 120 97 136"
              fill="#74c69d" />
          </g>

          {/* ── Top bud ── */}
          <g style={{
            transformOrigin: "99px 122px",
            transform:  g ? "scale(1)" : "scale(0)",
            transition: "transform 0.55s cubic-bezier(0.34,1.56,0.64,1) 2.05s",
          }}>
            <circle cx="99" cy="122" r="11"  fill="#2ecc71"
              style={{ animation: b ? "pulse 2.4s ease-in-out 0.5s infinite" : "none" }} />
            <circle cx="99" cy="122" r="6.5" fill="#4ade80" />
            <circle cx="99" cy="122" r="3"   fill="#86efac" />
          </g>

          {/* ── Sparkle dots around bud ── */}
          {[[81,108],[117,108],[81,136],[117,136]].map(([sx, sy], i) => (
            <circle key={i} cx={sx} cy={sy} r="2.5" fill="#4ade80"
              style={{
                opacity:   b ? 0.85 : 0,
                transform: b ? "scale(1)" : "scale(0)",
                transformOrigin: `${sx}px ${sy}px`,
                transition: `opacity 0.4s ease ${0.25 + i * 0.12}s, transform 0.4s ease ${0.25 + i * 0.12}s`,
              }} />
          ))}
        </svg>
      </div>

      {/* ── Mission text ── */}
      <div style={{ textAlign:"center", marginTop:10, padding:"0 28px", zIndex:1 }}>
        <h1 style={{
          color:       "white",
          fontFamily:  "Montserrat, sans-serif",
          fontWeight:  900,
          fontSize:    "clamp(22px, 6vw, 30px)",
          letterSpacing: "-0.5px",
          margin:      "0 0 6px",
          ...fadeUp(b, 0),
        }}>
          HARVEST <span style={{ color:"#2ecc71" }}>4</span> ALL
        </h1>

        <p style={{
          color:         "#2ecc71",
          fontFamily:    "Montserrat, sans-serif",
          fontWeight:    800,
          fontSize:      11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          margin:        "0 0 14px",
          opacity:       b ? 1 : 0,
          transition:    "opacity 0.75s ease 0.28s",
        }}>
          Creating Sustainable Crops for All
        </p>

        <p style={{
          color:      "rgba(255,255,255,0.4)",
          fontFamily: "Inter, sans-serif",
          fontSize:   13,
          lineHeight: 1.78,
          maxWidth:   262,
          margin:     "0 auto",
          opacity:    b ? 1 : 0,
          transition: "opacity 0.75s ease 0.55s",
        }}>
          Empowering Western Cape communities<br />
          through sustainable action &amp; local resilience.
        </p>
      </div>

      {/* ── CTA button ── */}
      <button
        onClick={(e) => { e.stopPropagation(); triggerDone(); }}
        style={{
          marginTop:     28,
          padding:       "15px 44px",
          background:    "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
          color:         "white",
          border:        "none",
          borderRadius:  16,
          fontFamily:    "Montserrat, sans-serif",
          fontWeight:    900,
          fontSize:      13,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          cursor:        "pointer",
          boxShadow:     "0 8px 32px rgba(46,204,113,0.42)",
          zIndex:        1,
          ...fadeUp(b, 0.9),
        }}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, {
          background:  "linear-gradient(135deg, #115e59 0%, #0d4a46 100%)",
          transform:   "translateY(-2px) scale(1.03)",
          boxShadow:   "0 14px 44px rgba(46,204,113,0.55)",
        })}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, {
          background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
          transform:  "translateY(0) scale(1)",
          boxShadow:  "0 8px 32px rgba(46,204,113,0.42)",
        })}
      >
        Start Growing 🌱
      </button>

      {/* ── Skip hint ── */}
      <div style={{
        position:      "absolute",
        bottom:        20,
        color:         "rgba(255,255,255,0.18)",
        fontSize:      10,
        fontFamily:    "Montserrat, sans-serif",
        fontWeight:    700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        userSelect:    "none",
        opacity:       w ? 1 : 0,
        transition:    "opacity 0.6s ease 1s",
        zIndex:        1,
      }}>
        Tap anywhere to skip
      </div>
    </div>
  );
};

export default Welcome;
