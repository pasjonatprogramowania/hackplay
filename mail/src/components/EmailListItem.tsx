import { cn } from "@/lib/utils";

interface EmailListItemProps {
  sender: string;
  subject: string;
  preview: string;
  date: string;
  badge?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const EmailListItem = ({
  sender,
  subject,
  preview,
  date,
  badge,
  isSelected,
  onClick,
}: EmailListItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 p-4 cursor-pointer transition-colors border-b border-border",
        isSelected
          ? "bg-[hsl(var(--inbox-selected))]"
          : "hover:bg-[hsl(var(--inbox-item-hover))]"
      )}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[hsl(var(--avatar-bg))] flex items-center justify-center text-white font-medium">
        {sender[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="font-medium text-foreground truncate">{sender}</span>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {badge || date}
          </span>
        </div>
        <div className="text-sm font-medium text-foreground mb-1 truncate">
          {subject}
        </div>
        <div className="text-sm text-muted-foreground truncate">{preview}</div>
      </div>
    </div>
  );
};
