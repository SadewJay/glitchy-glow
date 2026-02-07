import { useState } from "react";
import { ChevronUp, ChevronDown, X } from "lucide-react";

export const SpotifyWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-[#1DB954] hover:bg-[#1ed760] text-black px-3 py-2 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <span className="text-sm font-medium">Music</span>
      </button>
    );
  }

  const handleToggleEmbed = () => {
    if (!showEmbed) {
      setShowEmbed(true);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setShowEmbed(false);
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 transition-all duration-300">
      <div className="bg-card/95 backdrop-blur-md border border-primary/30 rounded-lg overflow-hidden shadow-2xl box-glow-primary">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-primary/20">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span className="text-xs text-foreground/80 font-medium">Spotify</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleEmbed}
              className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
            >
              {showEmbed && isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Spotify Embed */}
        {showEmbed && (
          <div 
            className="transition-all duration-300 overflow-hidden"
            style={{ height: isExpanded ? "380px" : "152px" }}
          >
            <iframe
              src="https://open.spotify.com/embed/artist/3aly4xJOy3LVznzvRIvFYC?utm_source=generator&theme=0"
              width="300"
              height={isExpanded ? 380 : 152}
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: "0 0 12px 12px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
