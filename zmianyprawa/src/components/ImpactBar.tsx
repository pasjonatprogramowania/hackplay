import { cn } from "@/lib/utils";

interface ImpactBarProps {
  label: string;
  value: number;
  color?: "critical" | "high" | "medium" | "success";
}

const colorClasses = {
  critical: "bg-critical",
  high: "bg-high",
  medium: "bg-medium",
  success: "bg-success",
};

const textColorClasses = {
  critical: "text-critical",
  high: "text-high",
  medium: "text-medium",
  success: "text-success",
};

const ImpactBar = ({ label, value, color = "success" }: ImpactBarProps) => {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm">
        <span className="text-foreground">{label}</span>
        <span className={cn("font-semibold", textColorClasses[color])}>{value}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-500", colorClasses[color])}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default ImpactBar;
