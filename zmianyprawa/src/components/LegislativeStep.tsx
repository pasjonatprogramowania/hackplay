import { ChevronDown, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Document {
  title: string;
  date: string;
  hasVersionA?: boolean;
  hasVersionB?: boolean;
}

interface LegislativeStepProps {
  number: number;
  title: string;
  date: string;
  isActive?: boolean;
  documents?: Document[];
}

const LegislativeStep = ({ number, title, date, isActive = false, documents }: LegislativeStepProps) => {
  const [isOpen, setIsOpen] = useState(isActive);

  return (
    <div className="animate-slide-in" style={{ animationDelay: `${number * 50}ms` }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200",
          isActive 
            ? "step-gradient text-primary-foreground shadow-md" 
            : "bg-card hover:bg-secondary/50 text-foreground border border-border/50"
        )}
      >
        <ChevronDown 
          className={cn(
            "w-5 h-5 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
        <div className="text-left flex-1">
          <div className="font-semibold text-sm">
            {number}. {title}
          </div>
          <div className={cn(
            "text-xs mt-0.5",
            isActive ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            Data ostatniej modyfikacji: {date}
          </div>
        </div>
      </button>

      {isOpen && documents && documents.length > 0 && (
        <div className="mt-2 ml-8 space-y-2">
          {documents.map((doc, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50 animate-slide-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <FileText className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{doc.title}</div>
                <div className="text-xs text-muted-foreground">({doc.date})</div>
              </div>
              {(doc.hasVersionA || doc.hasVersionB) && (
                <div className="flex gap-1">
                  {doc.hasVersionA && (
                    <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                      A
                    </span>
                  )}
                  {doc.hasVersionB && (
                    <span className="w-7 h-7 rounded-full bg-success text-success-foreground flex items-center justify-center text-xs font-semibold">
                      B
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LegislativeStep;
