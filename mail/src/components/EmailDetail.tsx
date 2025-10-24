import {
  Reply,
  ReplyAll,
  Forward,
  MoreVertical,
  Download,
  FileText,
} from "lucide-react";
import { Button } from "./ui/button";

interface EmailDetailProps {
  subject: string;
  sender: string;
  senderEmail: string;
  recipient: string;
  recipientEmail: string;
  date: string;
  content: React.ReactNode;
  attachment?: {
    name: string;
    size: string;
  };
}

export const EmailDetail = ({
  subject,
  sender,
  senderEmail,
  recipient,
  recipientEmail,
  date,
  content,
  attachment,
}: EmailDetailProps) => {
  return (
    <div className="flex flex-col h-full bg-background">
      {/* Action Bar */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-border">
        <Button variant="ghost" size="sm" className="gap-2">
          <Reply className="w-4 h-4" />
          <span className="hidden sm:inline">Odpowiedź</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <ReplyAll className="w-4 h-4" />
          <span className="hidden sm:inline">Odpowiedz wszystkim</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Forward className="w-4 h-4" />
          <span className="hidden sm:inline">Prześlij dalej</span>
        </Button>
        <Button variant="ghost" size="sm" className="ml-auto">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Email Header */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-normal text-foreground">{subject}</h1>
          <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
            {date}
          </span>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[hsl(var(--avatar-bg))] flex items-center justify-center text-white font-medium">
            {sender[0]}
          </div>
          <div className="flex-1">
            <div className="text-sm">
              <span className="font-medium text-foreground">{sender}</span>
              <span className="text-muted-foreground"> &lt;{senderEmail}&gt;</span>
            </div>
            <div className="text-sm text-muted-foreground">
              To: {recipient} &lt;{recipientEmail}&gt;
            </div>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {attachment && (
          <div className="mb-6 p-4 bg-[hsl(var(--attachment-bg))] rounded-lg flex items-center justify-between border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {attachment.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {attachment.size}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="prose prose-sm max-w-none text-foreground">
          {content}
        </div>
      </div>
    </div>
  );
};
