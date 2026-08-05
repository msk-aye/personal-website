import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-foreground) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container relative z-10 pt-24 pb-16">
          <div className="grid md:grid-cols-[1fr_auto] gap-16 items-center">
            {/* Text */}
            <div>
              <span
                className="section-label block mb-6 animate-fade-in-up"
                style={{ animationDelay: "0ms" }}
              >
                Hello, I'm
              </span>
              <h1
                className="font-serif text-foreground mb-6 animate-fade-in-up"
                style={{
                  fontFamily: "var(--font-serif)",
                  animationDelay: "80ms",
                }}
              >
                Your Name
              </h1>
              <p
                className="text-xl text-muted-foreground leading-relaxed max-w-lg mb-8 animate-fade-in-up"
                style={{ animationDelay: "160ms" }}
              >
                A passionate software engineer who loves building elegant,
                thoughtful products — from pixel-perfect interfaces to robust
                backend systems.
              </p>

              {/* Social links */}
              <div
                className="flex items-center gap-4 mb-10 animate-fade-in-up"
                style={{ animationDelay: "240ms" }}
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:hello@example.com"
                  className="p-2.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-200"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>

              {/* CTA buttons */}
              <div
                className="flex flex-wrap gap-4 animate-fade-in-up"
                style={{ animationDelay: "320ms" }}
              >
                <Link href="/projects">
                  <Button
                    className="px-8 py-3 h-auto text-sm tracking-widest uppercase font-medium"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    View Projects
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="px-8 py-3 h-auto text-sm tracking-widest uppercase font-medium bg-transparent"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>

            {/* Profile portrait area */}
            <div
              className="hidden md:flex flex-col items-center gap-6 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -inset-3 border border-accent/30 rounded-full" />
                <div className="absolute -inset-6 border border-accent/15 rounded-full" />
                {/* Avatar placeholder */}
                <div className="w-52 h-52 rounded-full bg-secondary border border-border flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div
                      className="font-serif text-5xl text-muted-foreground/40 select-none"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      YN
                    </div>
                  </div>
                </div>
              </div>

              {/* Status badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Open to opportunities
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={14} />
        </div>
      </section>

      {/* ── Quick stats ── */}
      <section className="border-t border-border py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5+", label: "Years Experience" },
              { value: "20+", label: "Projects Shipped" },
              { value: "10+", label: "Technologies" },
              { value: "∞", label: "Cups of Coffee" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div
                  className="font-serif text-4xl text-foreground mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {value}
                </div>
                <div className="text-xs text-muted-foreground tracking-widest uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About blurb ── */}
      <section className="page-section">
        <div className="container">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
            <div>
              <span className="section-label block mb-4">About Me</span>
              <h2 className="section-heading mb-4">
                Crafting digital experiences with purpose
              </h2>
              <span className="divider-line mt-6" />
            </div>
            <div className="space-y-5">
              <p className="text-muted-foreground leading-relaxed">
                I'm a software engineer based in [Your City], with a deep
                passion for building products that are both technically sound
                and genuinely delightful to use. I believe that great software
                lives at the intersection of engineering rigour and thoughtful
                design.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not writing code, you'll find me exploring new
                technologies, contributing to open-source projects, or enjoying
                the outdoors. I'm always looking for the next interesting
                problem to solve.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I'm currently open to new opportunities — feel free to reach
                out if you'd like to work together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
