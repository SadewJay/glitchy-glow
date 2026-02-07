import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Autoplay on first user interaction (browsers block autoplay without interaction)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(() => {});
      }
    };

    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/background-music.mp3" loop preload="auto" />
      <button
        onClick={togglePlay}
        className="fixed bottom-4 left-4 z-50 bg-card/90 backdrop-blur-md border border-primary/30 rounded-full px-3 py-2 flex items-center gap-2 transition-all duration-300 shadow-lg hover:border-primary/60 box-glow-primary"
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 text-primary" />
            <div className="flex items-center gap-[2px]">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-[3px] bg-primary rounded-full animate-pulse"
                  style={{
                    height: `${8 + i * 4}px`,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: "0.6s",
                  }}
                />
              ))}
            </div>
            <Volume2 className="w-3.5 h-3.5 text-muted-foreground" />
          </>
        ) : (
          <>
            <Play className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground font-mono">PLAY</span>
            <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
          </>
        )}
      </button>
    </>
  );
};
