import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-14", centered && "text-center", className)}>
      {label && (
        <span className="section-label block mb-4">{label}</span>
      )}
      <h2 className="section-heading mb-4">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-xl leading-relaxed mt-3">
          {subtitle}
        </p>
      )}
      <span className={cn("divider-line mt-6", centered && "mx-auto")} />
    </div>
  );
}
