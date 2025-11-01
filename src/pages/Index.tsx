// Index.tsx
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code2, Users, Rocket, Sun, Moon, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Combined A (Futuristic), B (Elegant), C (Community) — one file.
 * Logic unchanged: reads username from localStorage, shows logout.
 * Frontend enhanced for clarity, accessibility, and modern feel.
 */

type Accent = "neon" | "elegant" | "vibe";

const Index = () => {
  // --- logic kept exactly the same ---
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("username");
    if (loggedUser) setUser(loggedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUser(null);
  };
  // ------------------------------------

  // UI state: theme & accent modes (combine A/B/C)
  const [dark, setDark] = useState(true);
  const [accent, setAccent] = useState<Accent>("neon");

  // Community avatars (illustrative)
  const community = useMemo(
    () => [
      { name: "Aisha", initials: "A", color: "from-pink-400 to-red-500" },
      { name: "Rohit", initials: "R", color: "from-purple-400 to-indigo-500" },
      { name: "Maya", initials: "M", color: "from-green-300 to-teal-400" },
      { name: "Ishan", initials: "I", color: "from-yellow-300 to-orange-400" },
    ],
    []
  );

  const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  // Accessibility: skip to main content
  // (Note: wrap main content with main tag if needed in app)

  return (
    <div className={`${dark ? "dark" : ""}`} aria-label="TechPath main layout">
      <main className="min-h-screen bg-gradient-to-b from-[#061021] via-[#071024] to-[#050409] text-slate-100 overflow-hidden">
        {/* Layered decorative backgrounds (A/B/C) */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          {/* Futuristic neon blobs (A) */}
          <div className="absolute -left-40 -top-40 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#00E5FF]/30 to-[#6C33FF]/20 blur-3xl" />

          <div className="absolute right-12 -bottom-28 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#FF6B6B]/18 to-[#FFB86B]/18 blur-3xl" />

          {/* Elegant subtle grid overlay (B) */}
          <svg className="w-full h-full opacity-5" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M56 0H0V56" fill="none" stroke="currentColor" strokeWidth="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-white" />
          </svg>

          {/* Community confetti (C) */}
          <div className="absolute left-1/2 top-10 -translate-x-1/2 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.12, y: 8 }}
              transition={{ yoyo: Infinity, duration: 3 }}
              className="flex gap-2"
            >
              {community.map((c, i) => (
                <div key={i} className={`w-2 h-2 rounded-full bg-gradient-to-br ${c.color} opacity-90`} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Navigation bar (sticky) */}
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] md:w-[85%] lg:w-[75%] bg-white/6 dark:bg-black/40 border border-white/6 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`p-2 rounded-md bg-gradient-to-br ${
                  accent === "neon" ? "from-[#00E5FF] to-[#6C33FF]" : accent === "elegant" ? "from-slate-200 to-slate-400" : "from-pink-400 to-amber-400"
                } text-black/10`}
              >
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-extrabold leading-tight">TechPath</div>
                <div className="text-xs text-white/50 -mt-1">Learn — Build — Ship</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Links (hidden on small screens) */}
            <div className="hidden md:flex items-center gap-6 pr-2">
              <Link to="/roadmaps" className="text-sm text-white/70 hover:text-white transition">Roadmaps</Link>
              <Link to="/programs" className="text-sm text-white/70 hover:text-white transition">Programs</Link>
              <Link to="/companies" className="text-sm text-white/70 hover:text-white transition">Companies</Link>
            </div>

            {/* Accent selector (A/B/C) */}
            <div className="flex items-center gap-2 bg-white/4 px-2 py-1 rounded-full border border-white/6" aria-label="Accent selector">
              {(["neon", "elegant", "vibe"] as Accent[]).map((a) => (
                <button
                  key={a}
                  title={a}
                  onClick={() => setAccent(a)}
                  className={`w-8 h-8 rounded-full transition-transform ${accent === a ? "scale-110 ring-2 ring-primary/60" : "opacity-60"}`}
                >
                  <span
                    className={`w-full h-full rounded-full block ${a === "neon" ? "bg-gradient-to-br from-cyan-400 to-indigo-500" : a === "elegant" ? "bg-gradient-to-br from-slate-200 to-slate-400" : "bg-gradient-to-br from-pink-400 to-yellow-400"}`}
                  />
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              aria-label="Toggle theme"
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-md bg-white/4 hover:bg-white/6 transition"
            >
              {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* User actions */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium" aria-live="polite">{user}</div>
                <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-white">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </nav>

        {/* HERO */}
        <header className="pt-28 pb-12" aria-label="Hero section">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left: main hero */}
              <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
                <motion.div variants={fadeUp} className="mb-4">
                  <span className={`inline-flex items-center gap-3 rounded-full px-4 py-1 text-sm font-medium ${accent === "neon" ? "bg-white/6" : accent === "elegant" ? "bg-white/4" : "bg-white/5"}`}>
                    <span className="text-xs" aria-label="rocket emoji">🚀</span>
                    <strong className="ml-1">Your Tech Journey — Unified</strong>
                  </span>
                </motion.div>

                <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                  {user ? (
                    <>Hello <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6]">{user}</span>, welcome back 👋</>
                  ) : (
                    <>
                      Master Tech with <br />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#67E8F9] to-[#C084FC]">Structured Learning, Real Community, Real Jobs</span>
                    </>
                  )}
                </motion.h1>

                <motion.p variants={fadeUp} className="mt-6 text-lg text-white/70 max-w-2xl">
                  From curated roadmaps to hands-on programs and a buzzing community — everything designed to get you from zero to product-ready.
                </motion.p>

                <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3 items-center" aria-label="Primary actions">
                  <Link to="/roadmap-generator">
                    <Button size="lg" className={`group flex items-center gap-3 px-6 py-3 ${accent === "neon" ? "bg-gradient-to-r from-cyan-400 to-indigo-500 text-black" : accent === "elegant" ? "bg-white text-black" : "bg-gradient-to-r from-pink-400 to-yellow-400 text-black"}`}>
                      <span>Generate My Roadmap</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <Link to="/programs">
                    <Button size="lg" variant="outline" className="px-6 py-3 border-white/10 text-white/90">
                      View Programs
                    </Button>
                  </Link>

                  <div className="ml-2 text-sm text-white/60" aria-label="Micro CTA">
                    <span className="font-medium">Avg time:</span> 3–6 months · <span className="font-medium">Commitment:</span> 6–10 hrs/week
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: combined visual (C + A + B) */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <Card className={`p-6 md:p-8 border border-white/8 backdrop-blur-md ${accent === "elegant" ? "bg-white/6" : "bg-black/30"}`} aria-label="Active cohort card">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-white/70">Active cohorts</div>
                      <div className="text-2xl font-semibold">Frontend Fundamentals</div>
                    </div>
                    <div className="text-sm text-white/60">Starts in 3 days</div>
                  </div>

                  <div className="flex items-center gap-4 mb-4" aria-label="Community avatars">
                    <div className="flex -space-x-3">
                      {community.map((c, i) => (
                        <motion.div
                          key={c.name}
                          whileHover={{ scale: 1.12, y: -6 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="w-10 h-10 rounded-full ring-2 ring-white/8 overflow-hidden flex items-center justify-center text-sm font-medium"
                          title={c.name}
                          style={{ zIndex: community.length - i }}
                        >
                          <div className={`w-full h-full rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-black/80`}>
                            {c.initials}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="text-sm text-white/60" aria-label="Learner stat">1.2k learners · 98% completion</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3" aria-label="Cohort details">
                    <div className="rounded-md p-3 bg-white/3">
                      <div className="text-xs text-white/60">Next session</div>
                      <div className="text-sm font-medium">Live Q&A — Sat, 7 PM</div>
                    </div>
                    <div className="rounded-md p-3 bg-white/3">
                      <div className="text-xs text-white/60">Mentors</div>
                      <div className="text-sm font-medium">Weekly office hours</div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-white/60">Projects: 12 · Interviews: 8</div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="text-white/80">Explore</Button>
                      <Button size="sm" className="bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-black">Join</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </header>

        {/* FEATURES — B + A + C combined */}
        <section className="pb-20" aria-label="Features">
          <div className="container mx-auto px-6">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-4">Why TechPath works</motion.h2>
              <motion.p variants={fadeUp} className="text-white/70 max-w-3xl mb-8">
                A unified experience — curated roadmaps, collaborative learning, and placement-driven programs.
              </motion.p>

              <div className="grid md:grid-cols-3 gap-6">
                <motion.div variants={fadeUp}>
                  <Card className="p-6 hover:scale-[1.02] transition-transform border border-white/6 bg-gradient-to-tr from-white/4 to-transparent">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-white/6">
                        <Code2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Structured Roadmaps</h3>
                        <div className="text-xs text-white/60">Month-by-month learning paths for every stack.</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-white/60">Curated resources, checkpoints, and mini-projects to keep you on track.</div>
                  </Card>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Card className="p-6 hover:scale-[1.02] transition-transform border border-white/6 bg-white/4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-white/6">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Peer Learning</h3>
                        <div className="text-xs text-white/60">Study together, build together.</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-white/60">Study groups, pair programming, and mentor office hours included.</div>
                  </Card>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Card className="p-6 hover:scale-[1.02] transition-transform border border-white/6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-white/6">
                        <Rocket className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Top Internships</h3>
                        <div className="text-xs text-white/60">GSOC, MLH, and more.</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-white/60">Placement kits, interview practice, and project reviews to help you land roles.</div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FOOTER CTA (B: elegant + C: community) */}
        <footer className="py-12" aria-label="Footer CTA">
          <div className="container mx-auto px-6">
            <div className="bg-white/4 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xl font-bold">Ready to build something real?</div>
                <div className="text-sm text-white/70">Join cohorts, build projects, and get pro feedback.</div>
              </div>

              <div className="flex items-center gap-3">
                <Link to="/roadmap-generator">
                  <Button className="px-6 py-3 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-black">Get my roadmap</Button>
                </Link>
                <Link to="/programs">
                  <Button variant="outline" className="px-5 py-3 border-white/10 text-white/90">See programs</Button>
                </Link>
              </div>
            </div>

            <div className="mt-6 text-xs text-white/50 text-center">
              © {new Date().getFullYear()} TechPath · Crafted with ❤️ for learners
            </div>
          </div>
        </footer>
      </main>

      {/* Inline small animation helpers (Tailwind-friendly) */}
      <style jsx>{`
        .animate-blob {
          animation: blob 12s infinite;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 30px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Index;
