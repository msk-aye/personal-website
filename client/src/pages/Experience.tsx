import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    company: "Acme Corporation",
    role: "Senior Software Engineer",
    period: "Jan 2023 – Present",
    location: "San Francisco, CA",
    description:
      "Lead the architecture and development of the company's flagship SaaS platform, serving over 50,000 active users. Drove a 40% reduction in page load times through performance optimisation and introduced a component design system adopted across three product teams.",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    company: "Bright Labs",
    role: "Software Engineer",
    period: "Mar 2021 – Dec 2022",
    location: "Remote",
    description:
      "Built and maintained RESTful APIs and microservices powering a real-time analytics dashboard. Collaborated closely with product and design to ship features on a two-week sprint cycle. Mentored two junior engineers and ran weekly code review sessions.",
    tags: ["Python", "FastAPI", "React", "Redis", "Docker"],
  },
  {
    company: "Nexus Digital",
    role: "Junior Developer",
    period: "Jun 2019 – Feb 2021",
    location: "New York, NY",
    description:
      "Contributed to client-facing web applications across a variety of industries including fintech and e-commerce. Gained hands-on experience with agile methodologies, CI/CD pipelines, and cross-functional team collaboration.",
    tags: ["JavaScript", "Vue.js", "PHP", "MySQL"],
  },
];

export default function Experience() {
  return (
    <div className="page-section pt-32">
      <div className="container">
        <SectionHeader
          label="Career"
          title="Work Experience"
          subtitle="A timeline of the roles and companies that have shaped my professional journey."
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-[11.5rem] top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="relative grid md:grid-cols-[11.5rem_1fr] gap-6 md:gap-12 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Date / company column */}
                <div className="md:text-right md:pr-10 relative">
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute right-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-accent border-2 border-background" />

                  <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">
                    {exp.period}
                  </p>
                  <p className="text-xs text-muted-foreground/60 tracking-wide">
                    {exp.location}
                  </p>
                </div>

                {/* Content column */}
                <div className="bg-card border border-border rounded-xl p-7 card-lift">
                  <div className="mb-4">
                    <h3
                      className="font-serif text-xl text-foreground mb-1"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-accent tracking-wide">
                      {exp.company}
                    </p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-5">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs font-normal tracking-wide"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
