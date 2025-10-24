import { Menu, Search, HelpCircle, Settings, Grid3x3 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const InboxHeader = () => {
  return (
    <header className="h-16 border-b border-border bg-background px-4 flex items-center gap-4">
      <Button variant="ghost" size="sm" className="lg:hidden">
        <Menu className="w-5 h-5" />
      </Button>

      <h1 className="text-xl text-foreground font-normal hidden lg:block">Inbox</h1>

      <div className="flex-1 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Szukaj w poczcie"
            className="pl-10 bg-[hsl(var(--inbox-sidebar-bg))] border-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm">
          <HelpCircle className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm">
          <Settings className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm">
          <Grid3x3 className="w-5 h-5" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium text-sm ml-2">
          A
        </div>
      </div>
    </header>
  );
};
