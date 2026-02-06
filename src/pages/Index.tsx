import { useState, useEffect } from "react";
import { Terminal } from "@/components/Terminal";
import { StatusBadge, ViewCounter, SystemStatus, EncryptionStatus } from "@/components/StatusBadge";
import { CornerBrackets } from "@/components/CornerBrackets";
import { HeroButton } from "@/components/HeroButton";
import { ScanlineOverlay } from "@/components/ScanlineOverlay";
import { DecryptText } from "@/components/DecryptText";
import { SpotifyWidget } from "@/components/SpotifyWidget";
import { SocialsSection } from "@/components/SocialsSection";

const Index = () => {
  const [viewCount, setViewCount] = useState(86);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulate view count incrementing
    const interval = setInterval(() => {
      setViewCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSocials = () => {
    document.getElementById("socials")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className={`relative min-h-screen bg-background overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Background grid */}
        <div className="fixed inset-0 grid-background opacity-30" />
        
        {/* Scan effects */}
        <ScanlineOverlay />
        
        {/* Corner decorations */}
        <CornerBrackets />
        
        {/* Main content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header status bar */}
          <header className="flex items-start justify-between p-6 md:p-8">
            <SystemStatus />
            <ViewCounter count={viewCount} />
          </header>
          
          {/* Encryption status - top right area */}
          <div className="absolute top-20 right-6 md:right-8">
            <EncryptionStatus />
          </div>
          
          {/* Hero Section */}
          <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              {/* Status badge */}
              <StatusBadge />
              
              {/* Main title */}
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-black text-primary text-glow-primary tracking-wider whitespace-nowrap text-center w-full flex justify-center">
                <DecryptText text="SADEW JAY" delay={300} duration={2500} />
              </h1>
              
              {/* Tagline */}
              <p className="text-lg md:text-xl text-foreground/80 tracking-[0.3em] uppercase">
                "<span className="text-primary/90 font-semibold">Nothing is true everything is permitted</span>"
              </p>
              
              {/* Terminal */}
              <div className="mt-8">
                <Terminal />
              </div>
              
              {/* CTA Button */}
              <div className="mt-8">
                <HeroButton onClick={scrollToSocials} />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Socials Section */}
      <SocialsSection />
      
      {/* Spotify Widget */}
      <SpotifyWidget />
    </>
  );
};

export default Index;
