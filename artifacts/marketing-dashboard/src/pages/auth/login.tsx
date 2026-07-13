import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    // Mock auth — any credentials work after a short delay
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setLocation("/home");
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* ── LEFT: Login form ── */}
      <div className="flex flex-col items-center justify-between w-full md:w-[480px] lg:w-[520px] shrink-0 px-10 py-10 bg-background">
        {/* Logo */}
        <button onClick={() => setLocation("/")} className="self-start flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-4 h-4 bg-foreground" />
          Campaign
        </button>

        {/* Form */}
        <div className="w-full max-w-[320px] mx-auto">
          <h1 className="text-2xl font-bold mb-7 text-center tracking-tight">Welcome back</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-foreground transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 px-3 pr-10 border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-foreground transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div>
              <button type="button" className="text-sm text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity">
                Forgot your password?
              </button>
            </div>

            {/* Mock CAPTCHA */}
            <div className="border border-border rounded-[3px] bg-muted/20 flex items-center justify-between px-4 py-3">
              <label className="flex items-center gap-3 cursor-pointer select-none text-sm">
                <div
                  onClick={() => setCaptchaChecked((v) => !v)}
                  className={`w-5 h-5 border-2 flex items-center justify-center cursor-pointer transition-colors ${
                    captchaChecked ? "border-foreground bg-foreground" : "border-border bg-background"
                  }`}
                >
                  {captchaChecked && (
                    <svg className="w-3 h-3 text-background" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                I'm not a robot
              </label>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground font-mono leading-tight">reCAPTCHA</div>
                <div className="text-[8px] text-muted-foreground/60 font-mono">Privacy · Terms</div>
              </div>
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          {/* Social logins */}
          <div className="mt-4 space-y-3">
            <button
              type="button"
              className="w-full h-11 border border-border bg-background text-sm font-medium hover:bg-muted/30 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Log in with Google
            </button>
            <button
              type="button"
              className="w-full h-11 border border-border bg-background text-sm font-medium hover:bg-muted/30 transition-colors"
            >
              Log in with SSO
            </button>
          </div>

          {/* Sign up prompt */}
          <div className="mt-7 flex items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground">Don't have a Campaign account?</span>
            <button
              type="button"
              onClick={() => setLocation("/")}
              className="px-3 py-1.5 border border-border text-sm font-medium hover:bg-muted/30 transition-colors"
            >
              Let's get started
            </button>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Legal</a>
          <span className="opacity-40">|</span>
          <a href="#" className="hover:text-foreground transition-colors">Contact Support</a>
        </div>
      </div>

      {/* ── RIGHT: Promo panel ── */}
      <div className="hidden md:flex flex-1 flex-col bg-foreground text-background overflow-hidden relative">
        {/* Top text block */}
        <div className="relative z-10 px-14 pt-16 pb-10 max-w-[560px]">
          <motion.h2
            className="text-5xl lg:text-6xl font-bold tracking-tighter mb-4 leading-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Meet Composer
          </motion.h2>
          <motion.p
            className="text-xl font-medium mb-4 opacity-90"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            The automation agent that gets your business—and gets results.
          </motion.p>
          <motion.p
            className="text-sm leading-relaxed opacity-60 mb-8 max-w-[440px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Powered by your business context and performance history, Composer helps you stay one step ahead with campaigns designed to drive growth. Every recommendation is tailored to your brand.
          </motion.p>
          <motion.button
            className="px-6 py-3 bg-background text-foreground text-sm font-medium hover:bg-background/90 transition-colors"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Learn more
          </motion.button>
        </div>

        {/* Mock product UI */}
        <motion.div
          className="flex-1 mx-10 rounded-t-[4px] border border-white/10 bg-background/5 overflow-hidden relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-9 border-b border-white/10 flex items-center px-4 gap-2">
            <div className="w-2.5 h-2.5 rounded-full border border-white/20" />
            <div className="w-2.5 h-2.5 rounded-full border border-white/20" />
            <div className="w-2.5 h-2.5 rounded-full border border-white/20" />
            <div className="ml-3 h-4 w-48 rounded-[2px] bg-white/10" />
          </div>
          <div className="flex h-full">
            <div className="w-[180px] border-r border-white/10 p-4 flex flex-col gap-3">
              <div className="h-3 w-20 bg-white/30 rounded-[1px]" />
              {[80, 60, 90, 50, 70].map((w, i) => (
                <div key={i} className="h-7 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-[1px] bg-white/15" />
                  <div className="h-2.5 bg-white/15 rounded-[1px]" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
            <div className="flex-1 p-5 space-y-4">
              <div className="bg-background rounded-[3px] p-5 border border-white/10 shadow-xl max-w-[280px] mx-auto mt-4">
                <div className="text-foreground text-[11px] opacity-50 mb-1 font-mono">Morning, Alex!</div>
                <div className="text-foreground font-bold text-base mb-4 leading-tight">What should we work<br />on today?</div>
                {["Create a campaign", "Audit my segments", "Audit my flows"].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-t border-border text-foreground text-xs font-medium">
                    <span>{item}</span>
                    <span className="opacity-40">›</span>
                  </div>
                ))}
                <div className="mt-3 flex items-center gap-2 border border-border rounded-[2px] px-3 py-2">
                  <span className="text-[11px] text-muted-foreground flex-1">Ask Campaign anything…</span>
                  <div className="w-5 h-5 bg-foreground flex items-center justify-center">
                    <svg className="w-3 h-3 text-background" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[["REVENUE", "$284K"], ["OPEN RATE", "41.2%"], ["FLOWS LIVE", "18"]].map(([label, val], i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-[2px] p-3">
                    <div className="text-[9px] font-mono text-white/40 mb-1">{label}</div>
                    <div className="text-white font-bold text-base">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
