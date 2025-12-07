import { CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionItemProps {
  text: string;
  status: "pending" | "completed" | "urgent";
}

const ActionItem = ({ text, status }: ActionItemProps) => {
  const Icon = status === "completed" ? CheckCircle2 : status === "urgent" ? AlertCircle : Circle;
  
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className={cn(
        "w-5 h-5 mt-0.5 flex-shrink-0",
        status === "completed" && "text-success",
        status === "pending" && "text-muted-foreground",
        status === "urgent" && "text-critical"
      )} />
      <span className={cn(
        "text-sm",
        status === "completed" && "text-muted-foreground"
      )}>
        {text}
      </span>
    </div>
  );
};

export default ActionItem;
