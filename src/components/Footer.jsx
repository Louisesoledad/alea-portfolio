import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa"
import { Link } from "react-router-dom"
import { HiOutlineMail } from "react-icons/hi"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full overflow-hidden bg-[#542948] text-white/80 pt-20 pb-28 md:pb-12 mt-auto border-t border-white/[0.05]">
      {/* 🔥 AMBIENT GLOW EFFECTS */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full flex justify-center opacity-30 blur-[100px]">
        <div className="w-1/3 h-64 bg-rose-900/40 rounded-full mix-blend-screen" />
        <div className="w-1/3 h-64 bg-violet-900/40 rounded-full mix-blend-screen -ml-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
          
          {/* ── BRANDING & EMAIL (Left Col) ── */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-wide text-white mb-2">Alea Nicole Tandoc</h2>
              <p className="text-sm font-medium text-white/50 tracking-widest uppercase">Visual Designer</p>
            </div>
            
            <p className="text-white/60 leading-relaxed max-w-sm">
              Designing visuals that stand out. Focused on creating bold and modern digital experiences.
            </p>

            <a
              href="mailto:tandocaleanicole@gmail.com"
              className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50"
              aria-label="Email Alea"
            >
              <HiOutlineMail className="text-lg text-white/70 group-hover:text-rose-300 transition-colors" />
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">tandocaleanicole@gmail.com</span>
            </a>
          </div>

          {/* ── NAVIGATION (Center Col) ── */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-xs font-bold text-white/40 tracking-[0.2em] uppercase mb-2">Explore</h3>
            <nav className="flex flex-col items-center md:items-start gap-3">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Works", path: "/works" },
                { label: "Contact", path: "/#contact" }
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:text-rose-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── SOCIALS & AVAILABILITY (Right Col) ── */}
          <div className="md:col-span-4 flex flex-col items-center md:items-end space-y-8">
            
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-green-400/90 tracking-wide uppercase">
                Available for Freelance
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: <FaFacebookF />, url: "https://www.facebook.com/share/18gVGVfRZb", label: "Facebook" },
                { icon: <FaInstagram />, url: "https://www.instagram.com/aleatndc", label: "Instagram" },
                { icon: <FaTiktok />, url: "https://www.tiktok.com/@alifnds7?_r=1&_t=ZS-95TkrhuVM9J", label: "TikTok" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-rose-500/20 to-violet-500/20 blur-md transition-opacity duration-300" />
                  <span className="relative text-white/70 group-hover:text-white transition-colors duration-300 text-sm">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

        {/* ── BOTTOM ROW: COPYRIGHT & AI CTA ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-white/40 text-center md:text-left">
            © {currentYear} Alea Nicole Tandoc. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  )
}

export default Footer
