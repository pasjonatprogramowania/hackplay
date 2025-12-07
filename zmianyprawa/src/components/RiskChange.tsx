import { Badge } from "@/components/ui/badge";

interface RiskChangeProps {
  level: "critical" | "high" | "medium" | "new" | "vacatio";
  oldValue?: string;
  newValue?: string;
  article: string;
  description: string;
}

const levelLabels = {
  critical: "KRYTYCZNE",
  high: "WYSOKIE",
  medium: "ISTOTNE",
  new: "NOWOŚĆ",
  vacatio: "VACATIO",
};

const RiskChange = ({ level, oldValue, newValue, article, description }: RiskChangeProps) => {
  return (
    <div className="space-y-1.5">
      <Badge variant={level}>{levelLabels[level]}</Badge>
      {oldValue && newValue && (
        <div className="text-sm">
          <span className="text-muted-foreground line-through">{oldValue}</span>
          <span className="mx-2 text-muted-foreground">→</span>
          <span className="text-critical font-semibold">{newValue}</span>
        </div>
      )}
      {!oldValue && newValue && (
        <div className="text-sm">
          <span className="font-mono text-success">{newValue}</span>
        </div>
      )}
      <div className="text-sm text-muted-foreground">
        {article} - {description}
      </div>
    </div>
  );
};

export default RiskChange;
