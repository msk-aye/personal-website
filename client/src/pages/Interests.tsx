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
    title: "Open Source",
    description:
      "Contributing to and maintaining open-source projects. I believe in the power of collaborative software and giving back to the community.",
    color: "oklch(0.72 0.12 75)",
  },
  {
    icon: BookOpen,
    title: "Reading",
    description:
      "Voracious reader across fiction, philosophy, and technical non-fiction. Currently working through a deep dive into systems thinking.",
    color: "oklch(0.65 0.15 200)",
  },
  {
    icon: Mountain,
    title: "Hiking & Outdoors",
    description:
      "There's nothing like a long trail to reset the mind. I try to get into the mountains at least once a month.",
    color: "oklch(0.62 0.15 145)",
  },
  {
    icon: Camera,
    title: "Photography",
    description:
      "Street and landscape photography. I shoot on a mirrorless camera and enjoy the meditative process of finding the perfect frame.",
    color: "oklch(0.60 0.18 30)",
  },
  {
    icon: Headphones,
    title: "Music",
    description:
      "Eclectic taste spanning jazz, ambient, and indie rock. Music is a constant companion while coding — the right playlist unlocks flow state.",
    color: "oklch(0.65 0.18 300)",
  },
  {
    icon: Palette,
    title: "Design",
    description:
      "A deep appreciation for typography, colour theory, and visual hierarchy. I follow the design community closely and enjoy UI explorations.",
    color: "oklch(0.68 0.18 340)",
  },
  {
    icon: Globe,
    title: "Travel",
    description:
      "Slow travel through new cultures, cuisines, and landscapes. I keep a travel journal and try to visit at least two new countries each year.",
    color: "oklch(0.62 0.16 220)",
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {interests.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group bg-card border border-border rounded-xl p-6 card-lift flex flex-col gap-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Icon */}
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

                {/* Content */}
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

                {/* Accent line */}
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
              The richest experiences in life are found at the intersection of
              curiosity and action.
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
