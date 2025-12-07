import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { User, Bot, MessageSquare } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { ChatInput } from "@/components/ChatInput";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MainContentProps {
  messages: Message[];
  onSend: (message: string) => void;
}

export const MainContent = ({ messages, onSend }: MainContentProps) => {
  const exampleQuestions = [
    "Jakie są główne zmiany w Art. 125 KPC?",
    "Kiedy wchodzi w życie obowiązek posiadania konta w portalu informacyjnym?",
    "Czy zmiany dotyczą też postępowań wieczystoksięgowych?",
    "Jakie są skutki dla pełnomocników zawodowych?"
  ];

  if (messages.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 max-w-3xl mx-auto">
        <div className="text-center space-y-8 w-full">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Temat zmiany ustaw
          </h1>
          
          <div className="w-full">
            <ChatInput onSend={onSend} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {exampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto py-4 px-6 text-left justify-start whitespace-normal hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => onSend(question)}
              >
                <MessageSquare className="w-4 h-4 mr-3 flex-shrink-0 text-primary" />
                <span className="text-sm">{question}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-6 max-w-5xl mx-auto">
      <div className="space-y-6">
        {/* Chat Messages */}
        <div className="space-y-6 pb-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}>
                {message.role === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <Card className={`p-4 max-w-[85%] ${
                message.role === "user" 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-card"
              }`}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      {message.role === "user" ? "Ty" : "Asystent AI"}
                    </span>
                    <span className={`text-xs ${
                      message.role === "user" 
                        ? "text-primary-foreground/70" 
                        : "text-muted-foreground"
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {message.role === "user" ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  ) : (
                    <div className="text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
