import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "NimbusFlow — Smart Seating Planner",
    description:
      "A full-stack React/Express/PostgreSQL application that dynamically allocates workspaces based on team, availability, and user preferences. Includes admin dashboard, real-time availability, and booking management.",
    tags: ["React", "Express", "PostgreSQL", "TypeScript", "Docker"],
    github: "https://github.com/msk-aye",
    live: "https://nimbusflow.msk.fyi",
    featured: true,
  },
  {
    title: "Proxmox Home Lab",
    description:
      "A self-hosted homelab running 6 VMs and 3 LXCs on Proxmox VE. Includes a WireGuard VPN, AdGuard DNS, Nginx reverse proxy with 9 server blocks, and a complete observability stack with Prometheus, Grafana, Loki, and Falco.",
    tags: ["Proxmox", "Docker", "Linux", "Nginx", "WireGuard", "Prometheus", "Grafana"],
    github: null,
    live: null,
    featured: true,
  },
  {
    title: "CVE Intelligence Tool",
    description:
      "A Python automation tool that monitors CVE feeds and correlates vulnerabilities with internal asset inventories. Reduces manual triage time by 50% and prioritises remediation based on exposure and severity.",
    tags: ["Python", "Automation", "CVE", "REST APIs", "Security"],
    github: "https://github.com/msk-aye",
    live: null,
    featured: false,
  },
  {
    title: "ML Intrusion Detection System",
    description:
      "A machine learning model trained on network traffic data to detect anomalies and intrusions. Uses feature engineering on packet metadata and evaluates against standard IDS datasets for accuracy and false-positive rates.",
    tags: ["Python", "Machine Learning", "scikit-learn", "Network Security"],
    github: "https://github.com/msk-aye",
    live: null,
    featured: false,
  },
  {
    title: "AI Maze Solver",
    description:
      "An AI-powered maze solver that compares pathfinding algorithms (BFS, DFS, A*) across randomly generated mazes. Visualises the search process and benchmarks performance across maze sizes and complexities.",
    tags: ["Python", "Algorithms", "AI", "Pathfinding"],
    github: "https://github.com/msk-aye",
    live: null,
    featured: false,
  },
  {
    title: "Movie Finder",
    note: "My first web project — rough edges and all.",
    description:
      "A web application that searches and recommends movies using the TMDB API. Features genre filtering, user ratings, and a clean responsive interface. Deployed in Docker with Nginx reverse proxy.",
    tags: ["React", "API Integration", "Docker", "Nginx"],
    github: "https://github.com/msk-aye",
    live: "https://movies.msk.fyi",
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
          subtitle="A curated selection of work I'm proud of — from production systems to side experiments."
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
