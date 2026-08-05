import SectionHeader from "@/components/SectionHeader";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    institution: "University of Technology",
    degree: "Bachelor of Science in Computer Science",
    period: "2015 – 2019",
    location: "Sydney, Australia",
    description:
      "Graduated with First Class Honours. Specialised in distributed systems and human-computer interaction. Thesis on adaptive UI personalisation using machine learning.",
    highlights: [
      "Dean's List — 2017, 2018, 2019",
      "Best Final Year Project Award",
      "President, Computer Science Society",
    ],
  },
  {
    institution: "Coursera / Stanford Online",
    degree: "Machine Learning Specialisation",
    period: "2020",
    location: "Online",
    description:
      "Completed Andrew Ng's foundational machine learning course series covering supervised learning, unsupervised learning, and best practices for ML systems.",
    highlights: [
      "Distinction — All three courses",
      "Capstone: Predictive text classification model",
    ],
  },
];

const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    year: "2022",
  },
  {
    name: "Professional Scrum Master I (PSM I)",
    issuer: "Scrum.org",
    year: "2021",
  },
  {
    name: "Google Cloud Professional Data Engineer",
    issuer: "Google Cloud",
    year: "2023",
  },
];

export default function Education() {
  return (
    <div className="page-section pt-32">
      <div className="container">
        <SectionHeader
          label="Academic Background"
          title="Education"
          subtitle="The foundations that underpin my approach to engineering and problem-solving."
        />

        {/* Education entries */}
        <div className="space-y-8 mb-20">
          {education.map((edu, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-8 card-lift animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                      <GraduationCap size={18} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3
                        className="font-serif text-xl text-foreground leading-tight"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-medium text-accent mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 ml-12">
                    {edu.description}
                  </p>

                  {edu.highlights.length > 0 && (
                    <ul className="ml-12 space-y-1.5">
                      {edu.highlights.map((h) => (
                        <li
                          key={h}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">
                    {edu.period}
                  </p>
                  <p className="text-xs text-muted-foreground/60 tracking-wide">
                    {edu.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="section-label">Certifications</span>
            <span className="flex-1 h-px bg-border" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <div
                key={cert.name}
                className="bg-card border border-border rounded-xl p-6 card-lift flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: `${(i + 2) * 80}ms` }}
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Award size={17} className="text-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h4
                    className="font-serif text-base text-foreground leading-snug mb-1"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {cert.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {cert.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
