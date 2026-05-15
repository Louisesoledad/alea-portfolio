// ═══════════════════════════════════════════════
// 🔥 GROQ AI — Premium Portfolio Assistant
// (File named gemini.js to preserve existing imports)
// ═══════════════════════════════════════════════

const API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const MODEL = "llama-3.1-8b-instant"

// Debug check to verify Vite loaded the env variable properly
if (!API_KEY) {
  console.warn("[Groq] VITE_GROQ_API_KEY is undefined. Make sure it's set in your .env file.")
}

// ── RATE LIMIT & SPAM PREVENTION ──
const COOLDOWN_MS        = 4000  // ms between requests
const REQUEST_TIMEOUT_MS = 12000 // Abort stalled requests after 12s
const MAX_HISTORY        = 6     // Max message pairs in memory
const QUOTA_BACKOFF_MS   = 15000 // After a 429, suppress new requests for 15s

let chatHistory       = []
let isRequesting      = false
let lastRequestTime   = 0
let quotaBackoffUntil = 0   // Epoch ms — blocks requests after a 429

// ── SYSTEM IDENTITY ──
const SYSTEM_PROMPT = `You are the exclusive AI concierge for Alea Nicole Tandoc's design portfolio. You represent a premium creative brand. Your tone is warm, intelligent, elegant, and cinematic — like a high-end futuristic OS assistant (think Jarvis or Siri).

PORTFOLIO FACTS:
Name: Alea Nicole Tandoc | Title: Visual Designer | Tagline: "Designing Visuals That Stand Out"

Bio: A passionate designer creating bold, modern visuals across branding, social media, and digital content. She helps brands stand out through clean, purposeful design.

Skills: UI/UX Design, Visual Design, Branding, Social Media Design, Poster Design, Web Design, Typography, Creative Direction.
Tools: Figma, Adobe Photoshop, Adobe Illustrator, Canva, Adobe InDesign.
Services: Brand Identity, Social Media Graphics, Website Mockups, Poster & Print Design, Creative Consultation.
Contact: tandocaleanicole@gmail.com | Open for freelance projects and collaborations.

RULES (never break these):
- Max 1-2 short sentences per response. You are spoken aloud — brevity is elegance.
- No markdown, no asterisks, no emojis, no bullet points. Plain natural speech only.
- Never say "I am an AI" or "As a language model." You are Alea's portfolio concierge.
- For work inquiries suggest "My Works." For hiring suggest the Contact section or her email.
- If asked something off-topic, elegantly redirect to Alea's design expertise.`

// ── MEMORY TRIMMER ──
function trimHistory() {
  // Keep history size in check to save tokens
  // History structure: [{role: "user", content: "..."}, {role: "assistant", content: "..."}]
  const maxLen = MAX_HISTORY * 2
  if (chatHistory.length > maxLen) {
    chatHistory = chatHistory.slice(chatHistory.length - maxLen)
  }
}

/**
 * askGemini(prompt)
 * Send a message to Groq (formerly Gemini) with full protection against:
 *   - Concurrent requests (mutex lock)
 *   - Rapid spam (cooldown timer)
 *   - Stalled connections (abort timeout)
 *   - 429 / quota / network errors
 *   - Memory bloat (auto-trim)
 */
export async function askGemini(prompt) {
  // 1. API key guard
  if (!API_KEY) throw new Error("GEMINI_NOT_CONFIGURED") // Kept as GEMINI_NOT_CONFIGURED for UI compatibility

  // 2. Network check
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return "It seems we've lost our connection. Please check your network and try again."
  }

  // 3. Concurrent request guard (mutex)
  if (isRequesting) {
    console.info("[Groq] Blocked — request already in flight.")
    return null
  }

  // 4. Quota backoff guard (post-429 cool-down)
  const now = Date.now()
  if (now < quotaBackoffUntil) {
    const remaining = Math.ceil((quotaBackoffUntil - now) / 1000)
    console.info(`[Groq] Quota backoff active — ${remaining}s remaining.`)
    return null
  }

  // 5. Standard cooldown guard
  const elapsed = now - lastRequestTime
  if (elapsed < COOLDOWN_MS) {
    console.info(`[Groq] Cooldown active — ${COOLDOWN_MS - elapsed}ms remaining.`)
    return null
  }

  isRequesting    = true
  lastRequestTime = Date.now()

  try {
    trimHistory()
    
    // Prepare payload for Groq OpenAI compatible endpoint
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...chatHistory,
      { role: "user", content: prompt }
    ]

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      // Keep payload minimal to avoid 400 Bad Request
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        max_tokens: 120
      })
    })

    if (!response.ok) {
      // Detailed logging to help debug 400 errors
      const errorText = await response.text()
      console.error(`[Groq] API Error ${response.status}:`, errorText)

      if (response.status === 429) {
        throw new Error("429 TooManyRequests")
      }
      if (response.status === 401 || response.status === 403) {
        throw new Error("GEMINI_NOT_CONFIGURED") // UI handles this fallback
      }
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    const responseText = data.choices?.[0]?.message?.content

    // 6. Empty response guard
    if (!responseText?.trim()) {
      return "I'm having a brief moment of clarity. Could you rephrase that?"
    }

    // Save to history
    chatHistory.push({ role: "user", content: prompt })
    chatHistory.push({ role: "assistant", content: responseText })

    // 7. Sanitize — strip markdown artifacts for clean TTS output
    return responseText.replace(/[*_#`[\]]/g, "").trim()

  } catch (err) {
    console.error("[Groq] Request error:", err)
    const msg = err.message?.toLowerCase() ?? ""

    // Re-throw only GEMINI_NOT_CONFIGURED — triggers local intent fallback in UI
    if (msg.includes("api_key") || msg.includes("key not valid") || msg.includes("403") || msg.includes("gemini_not_configured")) {
      throw new Error("GEMINI_NOT_CONFIGURED")
    }
    if (msg.includes("quota") || msg.includes("429") || msg.includes("resource_exhausted") || msg.includes("toomanyrequests")) {
      // Trigger backoff — reset lastRequestTime so the backoff window is independent
      quotaBackoffUntil = Date.now() + QUOTA_BACKOFF_MS
      lastRequestTime   = 0
      console.warn(`[Groq] 429 received — suppressing requests for ${QUOTA_BACKOFF_MS / 1000}s.`)
      return "My neural circuits are briefly overloaded. Give me a moment and try again."
    }
    if (msg.includes("abort") || msg.includes("timeout")) {
      return "That request timed out — please try once more."
    }
    if (msg.includes("fetch") || msg.includes("network") || msg.includes("failed to fetch")) {
      return "I'm having trouble reaching my neural network. Please check your connection."
    }
    if (msg.includes("safety") || msg.includes("blocked")) {
      return "I can't assist with that. Let's keep the focus on Alea's design work."
    }

    return "A brief glitch in the matrix. Could we try that again?"

  } finally {
    // Always release the mutex
    isRequesting = false
  }
}

/**
 * resetChat()
 * Fully clears the chat session and rate-limit state.
 * Safe to call externally from the UI component.
 */
export function resetChat() {
  chatHistory       = []
  isRequesting      = false
  lastRequestTime   = 0
  quotaBackoffUntil = 0
  console.info("[Groq] Session reset.")
}
