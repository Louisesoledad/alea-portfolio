import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { BsStars } from "react-icons/bs"
import { FaPaperPlane } from "react-icons/fa"
import { askGemini } from "../lib/gemini"
import logo from "../assets/logo.png"
// ═══════════════════════════════════════════════
// 🔥 PORTFOLIO KNOWLEDGE BASE (local fallback)
// ═══════════════════════════════════════════════
const portfolioData = {
  name: "Alea Nicole Tandoc",
  title: "Visual Designer",
  tagline: "Designing Visuals That Stand Out",
  email: "tandocaleanicole@gmail.com",
  bio: "A passionate visual designer focused on creating bold and modern designs that communicate clearly and effectively. She enjoys turning ideas into visually engaging experiences — whether it's branding, social media graphics, or digital content.",
  philosophy: "Her goal is to help brands stand out through clean, creative, and purposeful design.",
  skills: ["UI/UX Design", "Visual Design", "Branding", "Social Media Design", "Poster Design", "Web Design", "Typography", "Layout Design", "Creative Direction"],
  tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Canva", "Adobe InDesign"],
  services: ["Brand Identity Design", "Social Media Graphics", "Website Mockups", "Poster & Print Design", "Visual Content Creation", "Creative Consultation"],
  projects: {
    socialMedia: { name: "Social Media Design", description: "Eye-catching social media graphics and content designed to boost engagement and brand presence across platforms." },
    branding:    { name: "Branding Project",    description: "Complete brand identity systems including logos, color palettes, typography, and visual guidelines for modern brands." },
    website:     { name: "Website Mockup",      description: "Clean and modern website mockups and UI designs that prioritize user experience and visual elegance." },
    poster:      { name: "Poster Design",       description: "Bold and artistic poster designs for events, promotions, and creative campaigns that demand attention." },
  },
  availability: "Available for freelance projects and collaborations",
}

// ═══════════════════════════════════════════════
// 🔥 LOCAL INTENT SYSTEM (Gemini unavailable fallback)
// ═══════════════════════════════════════════════
const intents = [
  { name: "greeting", keywords: ["hi", "hello", "hey", "sup", "greetings", "what's up"],
    responses: [
      "Hey there! I'm Alea's portfolio assistant. Ask me anything about her work or how to get in touch!",
      "Hi! Welcome to Alea's portfolio. What would you like to know?",
    ]},
  { name: "identity", keywords: ["who", "name", "about her", "about alea", "tell me about", "who is", "introduce"],
    responses: [
      `${portfolioData.name} is a ${portfolioData.title} who creates bold, modern visuals that help brands stand out.`,
      `Meet ${portfolioData.name} — a creative ${portfolioData.title} turning ideas into stunning visual experiences.`,
    ]},
  { name: "skills", keywords: ["skills", "abilities", "good at", "specialize", "expertise", "strengths"],
    responses: [
      `Alea specializes in ${portfolioData.skills.slice(0, 5).join(", ")}, and more.`,
    ]},
  { name: "tools", keywords: ["tools", "software", "figma", "photoshop", "illustrator", "canva", "adobe"],
    responses: [
      `Her design stack includes ${portfolioData.tools.join(", ")}.`,
    ]},
  { name: "projects", keywords: ["projects", "work", "portfolio", "showcase", "works", "designs", "gallery"],
    responses: [
      "Alea's portfolio covers Social Media Design, Branding, Website Mockups, and Poster Design — check out My Works!",
    ]},
  { name: "branding",  keywords: ["branding", "brand", "logo", "identity", "logos"],
    responses: [`${portfolioData.projects.branding.description}`]},
  { name: "website",   keywords: ["website", "web design", "mockup", "ui", "ux", "interface"],
    responses: [`${portfolioData.projects.website.description}`]},
  { name: "poster",    keywords: ["poster", "print", "flyer", "event", "posters"],
    responses: [`${portfolioData.projects.poster.description}`]},
  { name: "services",  keywords: ["services", "offer", "provide", "help with", "what can", "deliverables"],
    responses: [`Alea offers ${portfolioData.services.join(", ")}. Reach out through the contact section!`]},
  { name: "contact",   keywords: ["contact", "reach", "email", "message", "get in touch", "connect"],
    responses: [
      `You can reach Alea at ${portfolioData.email} or through the contact form below.`,
    ]},
  { name: "hire", keywords: ["hire", "freelance", "collaborate", "work together", "available", "commission", "book"],
    responses: [
      `${portfolioData.availability}! Drop her a message through the contact section.`,
    ]},
  { name: "thanks", keywords: ["thanks", "thank you", "thx", "appreciate", "helpful"],
    responses: ["You're welcome! Feel free to ask anything else.", "Happy to help!"]},
  { name: "bye",    keywords: ["bye", "goodbye", "see you", "later"],
    responses: ["Thanks for visiting! Come back anytime.", "Goodbye! Don't forget to explore the portfolio."]},
]

const navCommands = [
  { keywords: ["go home", "home page", "main page"],                                    path: "/",        label: "Home" },
  { keywords: ["about", "about page", "about her"],                                     path: "/about",   label: "About" },
  { keywords: ["works", "my works", "projects page", "portfolio page", "show works"],   path: "/works",   label: "My Works" },
  { keywords: ["contact", "contact section", "contact page"],                           path: "/#contact",label: "Contact" },
]

// Word-boundary matching: prevents "hi" matching "this" or "exhibit"
const kwToRegex = (kw) => new RegExp(`(?<![a-z])${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![a-z])`, "i")

const findIntent = (msg) => {
  let best = null, bestScore = 0
  for (const intent of intents) {
    let score = 0
    for (const kw of intent.keywords) {
      if (kwToRegex(kw).test(msg)) score += kw.split(" ").length
    }
    if (score > bestScore) { bestScore = score; best = intent }
  }
  return best
}

// ── SMART ROUTING ──
// These intent names are always resolved locally — never hit Gemini.
// Greetings, thanks, farewells, navigation, and simple factual lookups
// don't need AI — they have fixed correct answers and are the most frequent queries.
const LOCAL_ONLY_INTENTS = new Set([
  "greeting", "thanks", "bye",
  "skills", "tools", "contact", "hire", "services",
])

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

// ═══════════════════════════════════════════════
// 🔥 WAVEFORM BAR COMPONENT
// ═══════════════════════════════════════════════
function WaveformBar({ state, delay }) {
  const heightClass =
    state === "listening"  ? "h-6 animate-[wavePulse_0.6s_ease-in-out_infinite]" :
    state === "speaking"   ? "h-10 animate-[wavePulse_0.4s_ease-in-out_infinite]" :
    state === "processing" ? "h-4 animate-[wavePulse_1s_ease-in-out_infinite]"   :
    "h-1"
  return (
    <div
      className={`w-1.5 rounded-full bg-white/80 transition-all duration-300 ${heightClass} ${state === "idle" ? "opacity-30" : "opacity-100"}`}
      style={{ animationDelay: delay }}
    />
  )
}

// ═══════════════════════════════════════════════
// 🔥 MAIN COMPONENT
// ═══════════════════════════════════════════════
// Detect reduced-motion preference once at module level (stable)
const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false

function JarvisAssistant() {
  const navigate = useNavigate()

  const [isActive,       setIsActive]       = useState(false)
  const [mode,           setMode]           = useState("idle") // idle | listening | speaking | processing
  const [currentSubtitle,setCurrentSubtitle]= useState("")
  const [currentUserText,setCurrentUserText]= useState("")
  const [transcript,     setTranscript]     = useState("")
  const [input,          setInput]          = useState("")
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [micUnsupported, setMicUnsupported] = useState(false)

  // Refs — stable across renders, no stale closure issues
  const recognitionRef     = useRef(null)
  const synthRef           = useRef(typeof window !== "undefined" ? window.speechSynthesis : null)
  const subtitleTimeoutRef = useRef(null)
  const preferredVoiceRef  = useRef(null) // Cached voice — avoids re-scanning on every speak()

  // ── PROCESSING GUARD ──
  const isProcessingRef    = useRef(false)

  // ── SPEECH DEDUP ──
  const lastTranscriptRef  = useRef("")

  // ── DEBOUNCE REF ──
  const speechDebounceRef  = useRef(null)
  const idleTimeoutRef = useRef(null)

  // ── INACTIVITY TIMER ──
  // Auto-deactivates after 30s of no voice/text/AI interaction.
  const inactivityTimerRef = useRef(null)
  const INACTIVITY_MS      = 30_000

  // ── PRELOAD PREFERRED VOICE ──
  // Browsers load voices async; voiceschanged fires when the list is ready.
  useEffect(() => {
    const synth = synthRef.current
    if (!synth) return

    const cacheVoice = () => {
      const voices = synth.getVoices()
      preferredVoiceRef.current = voices.find(v =>
        /zira|samantha|google us english|microsoft ava|microsoft zira/i.test(v.name)
      ) ?? voices.find(v => v.lang.startsWith("en")) ?? null
    }

    cacheVoice() // Try immediately (Chrome sometimes has voices ready)
    synth.addEventListener("voiceschanged", cacheVoice)
    return () => synth.removeEventListener("voiceschanged", cacheVoice)
  }, [])

  // ── CLEANUP ON UNMOUNT ──
  useEffect(() => {
    return () => {
      synthRef.current?.cancel()
      recognitionRef.current?.abort()
      clearTimeout(subtitleTimeoutRef.current)
      clearTimeout(speechDebounceRef.current)
      clearTimeout(inactivityTimerRef.current)
    }
  }, [])

  // ── DEACTIVATE (shared teardown) ──
  // Called by inactivity timeout and by manual orb-press-while-busy.
  const deactivate = useCallback(() => {
    synthRef.current?.cancel()
    recognitionRef.current?.stop()
    clearTimeout(speechDebounceRef.current)
    clearTimeout(inactivityTimerRef.current)
    setMode("idle")
    setTranscript("")
    setCurrentSubtitle("")
    setCurrentUserText("")
    setIsInputFocused(false)
    setIsActive(false)
    isProcessingRef.current = false
  }, [])

  // ── RESET INACTIVITY TIMER ──
  // Call this on every interaction: typing, speaking, transcript, AI reply.
  const resetInactivityTimer = useCallback(() => {
    clearTimeout(inactivityTimerRef.current)
    inactivityTimerRef.current = setTimeout(deactivate, INACTIVITY_MS)
  }, [deactivate])

  // ── SUBTITLE HELPER ──
  const setTemporarySubtitle = useCallback((text, isBot = true) => {
    if (isBot) setCurrentSubtitle(text)
    else setCurrentUserText(text)
    clearTimeout(subtitleTimeoutRef.current)
    subtitleTimeoutRef.current = setTimeout(() => {
      setCurrentSubtitle("")
      setCurrentUserText("")
    }, 9000)
  }, [])

  // ── SPEECH SYNTHESIS ──
  const speak = useCallback((text) => {
    if (!synthRef.current || !text) return
    // Small delay after cancel() so Chrome doesn't swallow the new utterance
    synthRef.current.cancel()

    resetInactivityTimer() // AI speaking = active interaction


const utt = new SpeechSynthesisUtterance(text)

const voices = synthRef.current.getVoices()

const isTagalog =
  /ng |mga |ako|ikaw|kumusta|salamat|opo|po/i.test(text)

utt.rate = isTagalog ? 0.9 : (prefersReducedMotion ? 1.1 : 0.95)

utt.pitch = 1.05
utt.volume = 1

if (isTagalog) {
  utt.voice =
    voices.find(v => /fil|tagalog/i.test(v.lang + v.name)) ||
    voices.find(v => /english/i.test(v.lang + v.name))
} else {
  utt.voice =
    preferredVoiceRef.current ||
    voices.find(v => v.lang.startsWith("en"))
}

    utt.onstart = () => {
      setMode("speaking")
      setTemporarySubtitle(text, true)
    }
    utt.onend = () => {
      setMode("idle")
      isProcessingRef.current = false
      // Don't reset timer here — let inactivity naturally expire after speaking stops
    }
    utt.onerror = (e) => {
      // "interrupted" fires when cancel() is called — not a real error
      if (e.error !== "interrupted") console.warn("[TTS] Error:", e.error)
      setMode("idle")
      isProcessingRef.current = false
    }

    synthRef.current.speak(utt)
  }, [setTemporarySubtitle, resetInactivityTimer])

  // ── STOP EVERYTHING ──
  const stopAll = useCallback(() => {
    synthRef.current?.cancel()
    recognitionRef.current?.stop()
    clearTimeout(speechDebounceRef.current)
    setMode("idle")
    setTranscript("")
    isProcessingRef.current = false
    // Note: does NOT clear inactivity timer — deactivate() does that
  }, [])
  const resetIdleTimer = useCallback(() => {
  clearTimeout(idleTimeoutRef.current)

  idleTimeoutRef.current = setTimeout(() => {
    stopAll()
    setIsActive(false)
    setCurrentSubtitle("")
    setCurrentUserText("")
  }, 30000)
}, [stopAll])

  // ── PROCESS INPUT ──
  // Core pipeline: nav check → Gemini → local intent fallback
  const processInput = useCallback(async (text) => {
    const trimmed = text?.trim()
    if (!trimmed) { setMode("idle"); return }

    // Guard: reject if already processing
    if (isProcessingRef.current) {
      console.info("[JarvisAssistant] Blocked — already processing.")
      return
    }
    isProcessingRef.current = true

    const msg = trimmed.toLowerCase()
    setMode("processing")
    setCurrentUserText(trimmed)
    setCurrentSubtitle("")
    resetInactivityTimer() // User submitted input = active interaction

    // 1. Navigation commands — instant, no API needed
    for (const cmd of navCommands) {
      if (cmd.keywords.some(kw => msg.includes(kw))) {
        const reply = `Opening ${cmd.label}.`
        setTimeout(() => {
          if (cmd.path.startsWith("/#")) {
            navigate("/")
            setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 400)
          } else {
            navigate(cmd.path)
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          speak(reply) // speak() will release isProcessingRef on end
        }, 300)
        return
      }
    }

    // 2. LOCAL SMART ROUTE — resolve without Gemini if the intent is simple
    const quickIntent = findIntent(msg)
    if (quickIntent && LOCAL_ONLY_INTENTS.has(quickIntent.name)) {
      speak(pickRandom(quickIntent.responses))
      return
    }

    // 3. Gemini AI call (guarded by cooldown + mutex inside gemini.js)
    try {
      const aiReply = await askGemini(trimmed)

      // null = request blocked by cooldown/mutex — fall back to local
      if (aiReply === null) {
        const fallbackIntent = findIntent(msg)
        const fallbackReply  = fallbackIntent
          ? pickRandom(fallbackIntent.responses)
          : pickRandom([
              "I'm a little busy right now. Could you try again in a moment?",
              "Give me just a second — try rephrasing that shortly.",
            ])
        speak(fallbackReply)
        return
      }

      speak(aiReply)
      return
    } catch (err) {
      // Only GEMINI_NOT_CONFIGURED falls through to local intent matching
      if (err.message !== "GEMINI_NOT_CONFIGURED") {
        console.error("[JarvisAssistant] Unexpected Gemini error:", err)
        setMode("idle")
        isProcessingRef.current = false
        return
      }
      console.info("[JarvisAssistant] Gemini unavailable, using local intents.")
    }

    // 4. Full local intent fallback (Gemini offline / no API key)
    const intent = findIntent(msg)
    const reply  = intent
      ? pickRandom(intent.responses)
      : pickRandom([
          "I didn't quite catch that. Try asking about Alea's skills, projects, or how to hire her.",
          "Try asking about branding, web design, tools, or how to get in touch.",
        ])

    speak(reply)
  }, [navigate, speak, resetInactivityTimer])

  // ── SPEECH RECOGNITION ──
  const startListening = useCallback(() => {
    // Block while already active to prevent double-start
    if (mode === "listening") {
      recognitionRef.current?.stop()
      setMode("idle")
      return
    }
    // Block while the AI pipeline is busy
    if (isProcessingRef.current) return

    const SR = typeof window !== "undefined"
      ? (window.SpeechRecognition || window.webkitSpeechRecognition)
      : null
    if (!SR) {
      setMicUnsupported(true)
      return
    }

    synthRef.current?.cancel()
    lastTranscriptRef.current = "" // Reset dedup tracker

    const rec = new SR()
    rec.lang           = "en-US"
    rec.interimResults = true
    rec.maxAlternatives = 1
    recognitionRef.current = rec

    rec.onstart = () => {
      setMode("listening")
      setTranscript("")
      setCurrentSubtitle("")
      setCurrentUserText("")
    }

    rec.onresult = (e) => {
      resetIdleTimer()
      const t = Array.from(e.results).map(r => r[0].transcript).join("")
      setTranscript(t) // Show live interim transcript
      resetInactivityTimer() // Live speech = active interaction

      if (e.results[e.results.length - 1].isFinal) {
        // Deduplicate: SpeechRecognition sometimes fires onresult twice for the same final result
        if (t === lastTranscriptRef.current) {
          console.info("[SpeechRecognition] Duplicate final transcript ignored.")
          return
        }
        lastTranscriptRef.current = t

        // Debounce 300ms to absorb any rapid follow-up final events
        clearTimeout(speechDebounceRef.current)
        speechDebounceRef.current = setTimeout(() => {
          rec.stop()
          setTranscript("")
          processInput(t)
        }, 300)
      }
    }

    rec.onerror = (e) => {
      // "no-speech" and "aborted" are normal — don't treat as errors
      if (e.error !== "no-speech" && e.error !== "aborted") {
        console.warn("[SpeechRecognition] Error:", e.error)
      }
      setMode("idle")
      setTranscript("")
    }

    rec.onend = () => {
      // Only reset to idle if we're still in listening mode — don't interrupt processing
      // Do NOT restart recognition — inactivity timer handles shutdown
      setMode(prev => prev === "listening" ? "idle" : prev)
    }

    rec.start()
  }, [mode, processInput, resetInactivityTimer])

  // ── TEXT SEND ──
  const handleSend = useCallback(() => {
    const txt = input.trim()
    if (!txt || isProcessingRef.current) return
    setInput("")
    setIsInputFocused(false)
    setIsActive(true)
    resetInactivityTimer() // Text submit = active interaction
    processInput(txt)
  }, [input, processInput, resetInactivityTimer])

  // ── ORB TOGGLE ──
  const toggleAssistant = useCallback(() => {
    if (!isActive) {
      setIsActive(true)
      resetIdleTimer()
      resetInactivityTimer() // Starting assistant = begin inactivity window
      startListening()
      return
    }
    if (mode === "idle") {
      resetInactivityTimer()
      startListening()
    } else {
      // If busy, fully deactivate
      deactivate()
    }
  }, [isActive, mode, startListening, deactivate, resetInactivityTimer])

  // ── DYNAMIC STYLES ──
  const orbPulse =
    mode === "listening"  ? "animate-[orbPulse_1s_ease-in-out_infinite]"   :
    mode === "speaking"   ? "animate-[orbSpeak_0.5s_ease-in-out_infinite]" :
    mode === "processing" ? "animate-[orbPulse_0.8s_ease-in-out_infinite]" :
    "animate-[orbIdle_4s_ease-in-out_infinite]"

  const glowColor =
    mode === "listening"  ? "rgba(133,57,83,0.9)" :
    mode === "speaking"   ? "rgba(90,42,77,0.8)"  :
    mode === "processing" ? "rgba(107,45,79,0.7)" :
    isActive ? "rgba(90,42,77,0.6)" : "rgba(90,42,77,0.3)"

  const statusLabels = {
  idle: isInputFocused ? "Typing..." : "Tap to speak",
    listening:  "Listening...",
    speaking:   "Speaking...",
    processing: "Thinking...",
  }

  // ═══════════════════════════════════════════════
  // 🔥 RENDER
  // ═══════════════════════════════════════════════
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center select-none w-fit max-w-fit">

      {/* ── SUBTITLES & WAVEFORM AREA ── */}
      <div
        className={`pointer-events-none flex flex-col items-center justify-end w-fit max-w-[90vw] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive ? "h-[220px] opacity-100 translate-y-0" : "h-0 opacity-0 translate-y-10 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center gap-5 w-fit max-w-[90vw] px-4 pb-12 relative z-10">

          {/* USER TRANSCRIPT / SUBTITLE */}
          {(transcript || currentUserText) && (
            <div className="px-5 py-2.5 rounded-full bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 text-white/80 text-sm md:text-base animate-[fadeIn_0.4s_ease-out] max-w-[80vw] text-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              &ldquo;{transcript || currentUserText}&rdquo;
            </div>
          )}

          {/* AI RESPONSE SUBTITLE */}
          {currentSubtitle && (
            <div className="px-7 py-4 rounded-[24px] bg-[#1a1a24]/90 backdrop-blur-2xl border border-white/[0.15] text-white text-base md:text-lg lg:text-xl font-medium shadow-[0_16px_48px_rgba(90,42,77,0.4)] animate-[slideUp_0.5s_ease-out] max-w-[80vw] text-center leading-relaxed tracking-wide">
              {currentSubtitle}
            </div>
          )}

          {/* WAVEFORM VISUALIZER — hidden for reduced-motion users */}
          {!prefersReducedMotion && (
            <div
              aria-hidden="true"
              className={`flex items-center justify-center gap-1.5 h-12 transition-all duration-500 mt-2 ${
                mode !== "idle" ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {[...Array(12)].map((_, i) => (
                <WaveformBar key={i} state={mode} delay={`${i * 50}ms`} />
              ))}
            </div>
          )}

        </div>
      </div>

      {/* ── ORB AND CONTROLS ── */}
      <div className="relative flex flex-col items-center mt-2">

        {/* TEXT INPUT */}

{isActive && (
  <div className="absolute bottom-[70px] left-1/2 -translate-x-1/2 z-20 animate-[fadeIn_0.3s_ease-out]">
    <div
      className="
        flex items-center
        bg-[#0a0a0c]/85
        backdrop-blur-xl
        border border-white/20
        rounded-full
        px-4 py-3
        overflow-hidden
        shadow-[0_0_30px_rgba(0,0,0,0.35)]
        w-[240px]
      "
    >
      <input
  autoFocus
  value={input}
  onChange={e => {
    setInput(e.target.value)
    resetIdleTimer()
  }}
  onFocus={() => setIsInputFocused(true)}
  onBlur={() => setIsInputFocused(false)}
  onKeyDown={e => {
    if (e.key === "Enter") handleSend()
  }}
  placeholder="Type a command..."
  className="bg-transparent text-white text-sm outline-none placeholder:text-white/40 w-full"
/>

      <button
        onClick={handleSend}
        className="text-white/60 hover:text-white transition-colors p-1"
      >
        <FaPaperPlane className="text-[12px]" />
      </button>
    </div>
  </div>
)}


        {/* AMBIENT GLOW */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full blur-[32px] scale-[2] transition-all duration-700"
          style={{ background: glowColor }}
        />

        {/* UNSUPPORTED MIC BANNER */}
        {micUnsupported && (
          <div className="pointer-events-auto absolute -top-14 left-1/2 -translate-x-1/2 w-max max-w-[260px] px-4 py-2 rounded-2xl bg-[#1a1a24]/90 backdrop-blur-xl border border-white/10 text-white/70 text-xs text-center animate-[fadeIn_0.4s_ease-out]">
            Voice input requires Chrome or Edge.
          </div>
        )}

        {/* ORB BUTTON — the only truly interactive element */}
        <button
          onClick={toggleAssistant}
          aria-label={isActive ? `AI Assistant — ${mode}` : "Activate AI Assistant"}
          aria-pressed={isActive}
          className={`pointer-events-auto relative w-16 h-16 rounded-full bg-[#0a0a0c] border border-white/[0.08] flex items-center justify-center overflow-hidden hover:scale-105 focus-visible:ring-2 focus-visible:ring-rose-400/60 focus-visible:outline-none transition-transform duration-500 ${
            isActive ? orbPulse : "animate-[orbIdle_4s_ease-in-out_infinite]"
          }`}
          style={{ boxShadow: `0 0 40px ${glowColor}, inset 0 0 20px rgba(133,57,83,0.1)` }}
        >
          {/* ── LIQUID ENERGY CORE ── */}
          <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
            {/* Deep volumetric base */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(60,20,80,0.4)_0%,_transparent_100%)]" />

            {/* Swirling Liquid 1: Purple */}
            <div className={`absolute top-[-30%] left-[-30%] w-[160%] h-[160%] ${isActive ? 'animate-[spin_3s_linear_infinite]' : 'animate-[spin_6s_linear_infinite]'}`}>
              <div 
                className="absolute top-[10%] left-[20%] w-[60%] h-[60%] bg-[#9333ea] blur-[6px] opacity-70 mix-blend-screen animate-[pulse_3s_ease-in-out_infinite]"
                style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
              />
            </div>

            {/* Swirling Liquid 2: Magenta/Pink */}
            <div className={`absolute top-[-30%] left-[-30%] w-[160%] h-[160%] ${isActive ? 'animate-[spin_4s_linear_infinite_reverse]' : 'animate-[spin_8s_linear_infinite_reverse]'}`}>
              <div 
                className="absolute bottom-[20%] right-[20%] w-[50%] h-[50%] bg-[#ec4899] blur-[5px] opacity-60 mix-blend-screen animate-[pulse_4s_ease-in-out_infinite]"
                style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
              />
            </div>

            {/* Holographic Core Light */}
            <div className="absolute inset-0 flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite]">
              <div className="w-[60%] h-[60%] bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.15)_0%,_transparent_70%)] blur-[3px]" />
            </div>

            {/* Floating Energy Particles */}
            <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
              <div className="absolute top-[20%] left-[30%] w-1 h-1 bg-white/70 rounded-full blur-[0.5px] shadow-[0_0_4px_rgba(255,255,255,0.8)] animate-pulse" />
              <div className="absolute bottom-[25%] right-[25%] w-1.5 h-1.5 bg-fuchsia-300/60 rounded-full blur-[1px] animate-pulse delay-700" />
              <div className="absolute top-[40%] right-[15%] w-1 h-1 bg-purple-300/80 rounded-full blur-[0.5px] animate-[ping_3s_ease-in-out_infinite]" />
            </div>

            {/* Glassmorphism Highlight / Specular Reflection */}
            <div 
              className="absolute top-[5%] left-[10%] w-[60%] h-[30%] bg-gradient-to-b from-white/20 to-transparent blur-[0.5px] rotate-[-20deg]" 
              style={{ borderRadius: "50% 50% 50% 50% / 80% 80% 20% 20%" }} 
            />
          </div>
          {/* ICON */}
          <div className="relative z-10 flex items-center justify-center">
            {isActive && mode !== "idle" ? (
              <div className="flex items-center justify-center gap-1">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className={`w-1 bg-white/90 rounded-full ${
                      mode === "listening"
                        ? "h-3 animate-[wavePulse_0.6s_ease-in-out_infinite]"
                        : "h-4 animate-pulse"
                    } ${i === 1 ? "h-5" : ""}`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            ) : (
              <img
  src={logo}
  alt="AI Logo"
  className={`
    w-7 h-7 object-contain
    transition-all duration-700
    ${isActive ? "scale-110 opacity-100" : "opacity-90"}
  `}
/>
            )}
          </div>

          {/* STATUS DOT */}
          {isActive && (
            <div
              className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full border border-[#0a0a0c] transition-all duration-300 shadow-[0_0_8px_currentColor] ${
                mode === "listening"  ? "bg-rose-400"  :
                mode === "speaking"   ? "bg-violet-400" :
                mode === "processing" ? "bg-amber-400" :
                "bg-green-400"
              }`}
            />
          )}
        </button>

        {/* STATUS LABEL */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className={`pointer-events-none mt-4 text-center transition-all duration-500 absolute top-full w-[200px] ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <p className={`text-[10px] tracking-[0.25em] uppercase transition-all duration-300 ${
            mode === "idle"       ? "text-white/50" :
            mode === "listening"  ? "text-rose-400 animate-pulse" :
            mode === "speaking"   ? "text-violet-400 animate-pulse" :
            "text-amber-400 animate-pulse"
          }`}>
            {statusLabels[mode]}
          </p>
        </div>

      </div>
    </div>
  )
}

export default JarvisAssistant
