import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

interface DetailModalProps {
  tool: {
    id: string;
    name: string;
    icon: React.ElementType;
  };
  onClose: () => void;
}

export const DetailModal = ({ tool, onClose }: DetailModalProps) => {
  const Icon = tool.icon;

  const renderContent = () => {
    if (tool.id === "audio") {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-6 max-w-md w-full">
            <Icon className="h-16 w-16 text-primary mx-auto" />
            <h3 className="text-xl font-semibold">{tool.name}</h3>
            <div className="space-y-4">
              <AudioPlayer
                src="/data/Sądowa_cyfryzacja_Koniec_epoki_papieru_dla_prawników.mp3"
                autoPlay={false}
                className="rounded-lg overflow-hidden shadow-sm"
              />
              <p className="text-sm text-muted-foreground">
                Podsumowanie audio zmian w prawie.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (tool.id === "presentation") {
      const images = Array.from({ length: 11 }, (_, i) => ({
        original: `/data/pdf/Cyfryzacja_Postępowania_Cywilnego_Obowiązkowy_Portal_Informacyj ${i + 1} of 11.png`,
        thumbnail: `/data/pdf/Cyfryzacja_Postępowania_Cywilnego_Obowiązkowy_Portal_Informacyj ${i + 1} of 11.png`,
      }));

      return (
        <div className="flex items-center justify-center h-full">
          <div className="w-full h-full flex flex-col">
            <div className="text-center mb-4 flex-shrink-0">
              <Icon className="h-6 w-6 text-primary inline-block mr-2" />
              <h3 className="text-lg font-semibold inline">{tool.name}</h3>
            </div>
            <div className="flex-1 overflow-hidden border rounded-lg bg-black flex items-center justify-center">
              <ImageGallery
                items={images}
                autoPlay={false}
                showPlayButton={true}
                showFullscreenButton={true}
                useBrowserFullscreen={false}
              />
            </div>
          </div>
        </div>
      );
    }

    if (tool.id === "video_player") {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="w-full h-full flex flex-col">
            <div className="text-center mb-4 flex-shrink-0">
              <Icon className="h-6 w-6 text-primary inline-block mr-2" />
              <h3 className="text-lg font-semibold inline">{tool.name}</h3>
            </div>
            <div className="flex-1 overflow-hidden border rounded-lg bg-black flex items-center justify-center">
              <video 
                controls 
                className="w-full h-full object-contain"
                src="/data/Zmiany_w_Art.mp4"
              >
                Twój przeglądarka nie obsługuje elementu wideo.
              </video>
            </div>
          </div>
        </div>
      );
    }

    // Default placeholder for other tools
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4 max-w-md">
          <Icon className="h-16 w-16 text-primary mx-auto" />
          <h3 className="text-xl font-semibold">{tool.name}</h3>
          <p className="text-muted-foreground">
            Ten panel wyświetli szczegółowe informacje i funkcjonalność dla {tool.name.toLowerCase()}.
          </p>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`${tool.id === 'presentation' || tool.id === 'video_player' ? 'max-w-6xl h-[90vh]' : tool.id === 'audio' ? 'max-w-2xl h-auto' : 'max-w-3xl h-[70vh]'}`}>
        <div className={`${tool.id === 'audio' ? 'h-full p-4' : 'flex-1 h-full overflow-hidden p-4'}`}>
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
