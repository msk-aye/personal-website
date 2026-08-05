import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Luminary — Design System",
    description:
      "A comprehensive, accessible component library built with React and TypeScript. Includes 60+ components, dark mode support, and full Storybook documentation. Used by three internal product teams.",
    tags: ["TypeScript", "React", "Storybook", "Radix UI", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    title: "Meridian — Analytics Platform",
    description:
      "A real-time analytics dashboard that processes millions of events per day. Features custom charting, cohort analysis, and a flexible query builder with sub-second response times.",
    tags: ["Next.js", "PostgreSQL", "Redis", "Recharts", "tRPC"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    title: "Pulse — Health Tracker",
    description:
      "A mobile-first progressive web app for tracking daily health metrics. Integrates with wearable APIs, provides personalised insights, and supports offline-first data sync.",
    tags: ["React", "PWA", "IndexedDB", "Node.js", "Chart.js"],
    github: "https://github.com",
    live: null,
    featured: false,
  },
  {
    title: "Carta — Markdown Editor",
    description:
      "A minimal, distraction-free markdown editor with live preview, custom themes, and export to PDF/HTML. Built as a desktop app with cross-platform support.",
    tags: ["Electron", "React", "CodeMirror", "Unified"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
  {
    title: "Beacon — Open Source CLI",
    description:
      "A developer tool for monitoring and alerting on API health. Supports webhook integrations, custom thresholds, and generates detailed incident reports.",
    tags: ["Go", "CLI", "REST APIs", "YAML"],
    github: "https://github.com",
    live: null,
    featured: false,
  },
  {
    title: "Folio — Portfolio Generator",
    description:
      "A static site generator that transforms a simple YAML config into a polished portfolio website. Zero configuration, one command deploy.",
    tags: ["Node.js", "Handlebars", "YAML", "GitHub Actions"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
];

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="page-section pt-32">
      <div className="container">
        <SectionHeader
          label="Portfolio"
          title="Selected Projects"
          subtitle="A curated selection of work I'm proud of — from side projects to production systems."
        />

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((project, i) => (
            <div
              key={project.title}
              className="bg-card border border-border rounded-xl p-8 card-lift flex flex-col gap-5 animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="section-label text-[0.65rem] mb-2 block">
                    Featured
                  </span>
                  <h3
                    className="font-serif text-xl text-foreground"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3 shrink-0 mt-1">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={17} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Live site"
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Other projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((project, i) => (
            <div
              key={project.title}
              className="bg-card border border-border rounded-xl p-6 card-lift flex flex-col gap-4 animate-fade-in-up"
              style={{ animationDelay: `${(i + 2) * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <h3
                  className="font-serif text-lg text-foreground leading-snug"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {project.title}
                </h3>
                <div className="flex items-center gap-2.5 shrink-0 mt-0.5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={15} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Live site"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
