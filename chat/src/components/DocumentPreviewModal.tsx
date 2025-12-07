import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DocumentPreviewModalProps {
  document: {
    id: string;
    type: "pdf" | "link";
    name: string;
    url?: string;
  };
  onClose: () => void;
}

export const DocumentPreviewModal = ({ document, onClose }: DocumentPreviewModalProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{document.name}</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto border rounded-lg bg-muted/30 p-4">
          {document.type === "pdf" ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">📄</div>
                <p className="text-muted-foreground">
                  Podgląd PDF: {document.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  W pełnej implementacji wyświetlona zostałaby zawartość PDF
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full">
              {document.url ? (
                <iframe
                  src={document.url}
                  className="w-full h-full rounded border-0"
                  title={document.name}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Brak dostępnego adresu URL do podglądu</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
