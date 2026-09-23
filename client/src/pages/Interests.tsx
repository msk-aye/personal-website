import SectionHeader from "@/components/SectionHeader";
import {
  BookOpen,
  Camera,
  Coffee,
  Globe,
  Headphones,
  Mountain,
  Palette,
  Terminal,
} from "lucide-react";

const interests = [
  {
    icon: Terminal,
    title: "Home Lab",
    description:
      "Running a Proxmox lab with 6 VMs and 3 LXCs, a full observability stack with Prometheus, Grafana, and Loki, plus a WireGuard VPN and AdGuard DNS. Constantly expanding.",
    color: "oklch(0.72 0.12 75)",
  },
  {
    icon: Globe,
    title: "Cybersecurity",
    description:
      "Deep interest in threat intelligence, incident response, and secure systems. Regularly run Cyberbit live-fire exercises and track emerging CVEs.",
    color: "oklch(0.65 0.15 200)",
  },
  {
    icon: Headphones,
    title: "Music",
    description:
      "Eclectic taste spanning jazz, ambient, and indie rock. Music is a constant companion while coding — the right playlist unlocks flow state.",
    color: "oklch(0.65 0.18 300)",
  },
  {
    icon: Mountain,
    title: "Hiking & Outdoors",
    description:
      "Brisbane's trails provide a great escape from the screen. I try to get outside regularly to clear my head and reset.",
    color: "oklch(0.62 0.15 145)",
  },
  {
    icon: BookOpen,
    title: "Reading",
    description:
      "Voracious reader across technical non-fiction, philosophy, and fiction. Currently working through systems thinking and distributed computing texts.",
    color: "oklch(0.65 0.15 200)",
  },
  {
    icon: Coffee,
    title: "Specialty Coffee",
    description:
      "Home barista and coffee enthusiast. I enjoy the ritual of pour-over brewing and exploring single-origin beans from around the world.",
    color: "oklch(0.55 0.12 55)",
  },
];

export default function Interests() {
  return (
    <div className="page-section pt-32">
      <div className="container">
        <SectionHeader
          label="Beyond the Screen"
          title="Interests & Passions"
          subtitle="The pursuits and curiosities that keep me inspired outside of work."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {interests.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group bg-card border border-border rounded-xl p-6 card-lift flex flex-col gap-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  style={{ background: `${item.color}18` }}
                >
                  <Icon
                    size={20}
                    style={{ color: item.color }}
                    strokeWidth={1.5}
                  />
                </div>

                <div>
                  <h3
                    className="font-serif text-base text-foreground mb-2"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div
                  className="mt-auto h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: item.color }}
                />
              </div>
            );
          })}
        </div>

        {/* Quote */}
        <div className="mt-20 text-center">
          <blockquote className="relative inline-block">
            <span
              className="absolute -top-6 -left-4 font-serif text-7xl text-accent/20 leading-none select-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              "
            </span>
            <p
              className="font-serif text-2xl md:text-3xl text-foreground/80 italic max-w-2xl leading-relaxed"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The best systems are the ones you never have to think about.
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
