import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    submitMutation.mutate(form);
  };

  return (
    <div className="page-section pt-32">
      <div className="container">
        <SectionHeader
          label="Get in Touch"
          title="Contact"
          subtitle="Have a project in mind, a question, or just want to say hello? I'd love to hear from you."
        />

        <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
          {/* Info column */}
          <div className="space-y-10">
            <div>
              <h3
                className="font-serif text-xl text-foreground mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Let's start a conversation
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether you're looking for a collaborator on an exciting
                project, want to discuss a potential role, or simply want to
                connect — my inbox is always open.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "hello@yourname.com",
                  href: "mailto:hello@yourname.com",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Sydney, Australia",
                  href: null,
                },
                {
                  icon: Clock,
                  label: "Response time",
                  value: "Usually within 24 hours",
                  href: null,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground/60 tracking-widest uppercase mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-foreground hover:text-accent transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form column */}
          <div className="bg-card border border-border rounded-xl p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-5 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-green-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h3
                    className="font-serif text-xl text-foreground mb-2"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Message sent
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                    Thank you for reaching out. I'll get back to you as soon as
                    possible.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="mt-2 bg-transparent text-sm"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs tracking-widest uppercase text-muted-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="bg-background border-border focus:border-accent transition-colors h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs tracking-widest uppercase text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="bg-background border-border focus:border-accent transition-colors h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs tracking-widest uppercase text-muted-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project, idea, or question…"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="bg-background border-border focus:border-accent transition-colors resize-none min-h-[140px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 text-sm tracking-widest uppercase font-medium"
                  style={{ letterSpacing: "0.1em" }}
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? "Sending…" : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
