import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { User, Bot } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MainContentProps {
  messages: Message[];
}

export const MainContent = ({ messages }: MainContentProps) => {
  return (
    <div className="h-full p-6 max-w-5xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground leading-tight">
          The Future of AI Memory: Why Your Chatbot Still Has the Memory of a Goldfish
        </h1>

        <div className="bg-accent rounded-lg p-6 border border-primary/20">
          <p className="text-accent-foreground leading-relaxed">
            Current AI models, particularly large language models (LLMs) like those powering
            popular chatbots, exhibit significant limitations in their memory capabilities. While they
            can process and generate human-like text within a given context window, their ability
            to retain information across conversations or even within a single, extended dialogue
            is restricted. This "goldfish memory" phenomenon stems from the underlying
            architecture of these models, which are primarily designed for in-context learning
            rather than long-term information storage and retrieval.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div>
            <h3 className="font-semibold text-primary mb-3">Topics</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>• Artificial Intelligence</li>
              <li>• Large Language Models (LLMs)</li>
              <li>• AI Memory Limitations</li>
              <li>• Context Windows</li>
              <li>• Future of Conversational AI</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://pipecat.ai" className="text-primary hover:underline">
                  https://pipecat.ai
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-3">Companies Concerned</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>• OpenAI</li>
              <li>• Google</li>
              <li>• Meta</li>
              <li>• Anthropic</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-primary mb-3">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              #AIMemory
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              #LLM
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              #Chatbots
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              #AI
            </Badge>
          </div>
        </div>

        {/* Chat Messages */}
        {messages.length > 0 && (
          <div className="mt-12 space-y-4">
            <div className="border-t border-border pt-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Conversation</h2>
              <div className="space-y-4">
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
                    <Card className={`p-4 max-w-[70%] ${
                      message.role === "user" 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-card"
                    }`}>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {message.role === "user" ? "You" : "AI Assistant"}
                          </span>
                          <span className={`text-xs ${
                            message.role === "user" 
                              ? "text-primary-foreground/70" 
                              : "text-muted-foreground"
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
