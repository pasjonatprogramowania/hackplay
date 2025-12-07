import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquarePlus, Lightbulb, ThumbsUp, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Category = "problem" | "idea" | "praise" | null;
type Step = "category" | "input";

export const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<Category>(null);
  const [feedback, setFeedback] = useState("");

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat);
    setStep("input");
  };

  const handleBack = () => {
    setStep("category");
    setCategory(null);
  };

  const handleSend = () => {
    // Here you would typically send the feedback to an API
    console.log("Sending feedback:", { category, feedback });
    
    toast("Dziękujemy za opinię!", {
      description: "Twoje zgłoszenie zostało wysłane pomyślnie.",
      action: {
        label: "OK",
        onClick: () => console.log("Toast closed"),
      },
    });

    // Reset and close
    setStep("category");
    setCategory(null);
    setFeedback("");
    onClose();
  };

  const handleClose = () => {
    setStep("category");
    setCategory(null);
    setFeedback("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-white text-slate-900 border-slate-200">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            {step === "category" ? "Wybierz kategorię" : "Twoja opinia"}
          </DialogTitle>
        </DialogHeader>

        {step === "category" ? (
          <div className="space-y-4 py-4">
            <p className="text-center text-slate-500 text-sm mb-6">
              Wybierz kategorię, aby kontynuować.
            </p>
            
            <div className="grid gap-3">
              <Card 
                className="p-4 bg-white border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors group shadow-sm"
                onClick={() => handleCategorySelect("problem")}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-red-100 text-red-600 group-hover:bg-red-200">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Problem</h3>
                    <p className="text-sm text-slate-500">Zgłoś błąd lub problem prawny.</p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-4 bg-white border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors group shadow-sm"
                onClick={() => handleCategorySelect("idea")}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-200">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Pomysł</h3>
                    <p className="text-sm text-slate-500">Zaproponuj ulepszenie lub nową regulację.</p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-4 bg-white border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors group shadow-sm"
                onClick={() => handleCategorySelect("praise")}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-green-100 text-green-600 group-hover:bg-green-200">
                    <ThumbsUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Pochwała</h3>
                    <p className="text-sm text-slate-500">Podziel się pozytywną opinią.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Wpisz tutaj swoją opinię..."
              className="min-h-[150px] bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 resize-none focus-visible:ring-blue-500"
            />
          </div>
        )}

        <DialogFooter className="flex gap-2 sm:justify-between w-full mt-2">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="flex-1 bg-white border-slate-200 text-slate-900 hover:bg-slate-50"
          >
            Anuluj
          </Button>
          {step === "input" && (
            <Button 
              onClick={handleSend}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Send
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
