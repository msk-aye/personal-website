import SectionHeader from "@/components/SectionHeader";
import {
  BookOpen,
  Globe,
  Headphones,
  Music,
  Terminal,
  Trophy,
} from "lucide-react";

const interests = [
  {
    icon: Terminal,
    title: "Homelab",
    description:
      "Running a Proxmox lab with VMs and LXCs, experimenting with self-hosting, open source software, dev tooling, and AI. Constantly tinkering and expanding.",
    color: "oklch(0.72 0.12 75)",
  },
  {
    icon: Trophy,
    title: "F1",
    description:
      "Passionate about the sport, the innovation and technical design of the cars, and the art of racing. Love go karting when time allows. Always heartbroken about Ferrari. Don't like the new regs.",
    color: "oklch(0.75 0.18 25)",
  },
  {
    icon: Music,
    title: "Piano",
    description:
      "Learning to play piano — still an extreme novice but working through simple pieces. A lot to learn and enjoy the process of getting better.",
    color: "oklch(0.65 0.18 300)",
  },
  {
    icon: BookOpen,
    title: "Reading",
    description:
      "Catching up on classical literature, especially 20th century dystopian fiction. Also exploring philosophy — Nietzsche, Marx, and the ancient Greeks.",
    color: "oklch(0.65 0.15 200)",
  },
  {
    icon: Headphones,
    title: "Gaming",
    description:
      "Competitive FPS games are the main thing — Valorant and Siege. Also hit a Minecraft phase about every two weeks or so.",
    color: "oklch(0.62 0.15 145)",
  },
  {
    icon: Globe,
    title: "Travel",
    description:
      "Visited Malaysia, Indonesia, Singapore, Philippines, Pakistan, UAE, Saudi Arabia, and Türkiye. Dream destinations: Japan, the Central Asian stans, China, and New Zealand.",
    color: "oklch(0.65 0.15 200)",
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
