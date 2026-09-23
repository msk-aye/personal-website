import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    company: "Boeing Defence Australia",
    role: "Graduate DevSecOps Engineer",
    period: "Feb 2026 – Present",
    location: "Brisbane, Australia",
    description:
      "Integrate static and dependency scanning into GitLab CI/CD pipelines. Manage Cosign artifact signing for supply chain integrity, maintain ISM compliance, and integrate Splunk for security observability. Deploy and support air-gapped LLM infrastructure.",
    tags: ["DevSecOps", "GitLab CI/CD", "SAST", "SCA", "Cosign", "Splunk", "Python"],
  },
  {
    company: "UQ",
    role: "Information Security Tutor",
    period: "Jun 2025 – Feb 2026",
    location: "Brisbane, Australia",
    description:
      "Tutored undergraduate students in information security fundamentals, covering network security, cryptography, and secure coding practices. Led practical lab sessions and provided individual guidance on assignments and exam preparation.",
    tags: ["Teaching", "Information Security", "Cryptography", "Mentoring"],
  },
  {
    company: "NOJA Power",
    role: "Automation Intern",
    period: "Feb 2025 – Nov 2025",
    location: "Brisbane, Australia",
    description:
      "Built a CVE intelligence tool that automated vulnerability triage, reducing manual analysis time by 50%. Automated deployment and configuration workflows, improving release reliability and infrastructure consistency.",
    tags: ["Python", "Automation", "CVE", "DevOps", "REST APIs"],
  },
  {
    company: "CompliantERP",
    role: "Security Intern",
    period: "Feb 2025 – Sep 2025",
    location: "Brisbane, Australia",
    description:
      "Contributed to ISO 27001 certification by implementing security controls and documentation. Managed Azure and Microsoft 365 environments, configured network security, and supported incident response activities.",
    tags: ["Azure", "M365", "ISO 27001", "Security", "Cloud"],
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
          <div className="absolute left-0 md:left-[11.5rem] top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="relative grid md:grid-cols-[11.5rem_1fr] gap-6 md:gap-12 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="md:text-right md:pr-10 relative">
                  <div className="hidden md:block absolute right-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-accent border-2 border-background" />
                  <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">
                    {exp.period}
                  </p>
                  <p className="text-xs text-muted-foreground/60 tracking-wide">
                    {exp.location}
                  </p>
                </div>
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
