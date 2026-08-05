import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Interests", href: "/interests" },
  { label: "Education", href: "/education" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Navigation ── */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / Name */}
            <Link href="/">
              <span
                className="font-serif text-xl font-medium tracking-tight text-foreground hover:text-accent transition-colors duration-200"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Portfolio
              </span>
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive =
                  href === "/"
                    ? location === "/"
                    : location.startsWith(href);
                return (
                  <li key={label}>
                    <Link href={href}>
                      <span className={cn("nav-link", isActive && "active")}>
                        {label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-md animate-fade-in">
            <ul className="container flex flex-col py-4 gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive =
                  href === "/" ? location === "/" : location.startsWith(href);
                return (
                  <li key={label}>
                    <Link href={href}>
                      <span
                        className={cn(
                          "block py-3 text-sm font-medium tracking-widest uppercase transition-colors duration-150",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>

      {/* ── Main content ── */}
      <main className="flex-1">{children}</main>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            © {new Date().getFullYear()} — All rights reserved
          </p>
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href}>
                  <span className="text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors duration-150">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
