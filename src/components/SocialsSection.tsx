import { useState, useEffect, useRef } from "react";
import { Instagram, Mail, Facebook, Gamepad2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface SocialItem {
  name: string;
  icon: typeof Facebook;
  url?: string;
  color: string;
  action?: "copy";
  copyValue?: string;
  label?: string;
  customIcon?: boolean;
}

const socials: SocialItem[] = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/SadewJayawardhanaii/",
    color: "hover:text-[#1877F2] hover:shadow-[0_0_30px_rgba(24,119,242,0.5)]",
  },
  {
    name: "Discord",
    icon: Copy,
    action: "copy",
    copyValue: "sadew_jay",
    label: "sadew_jay",
    color: "hover:text-[#5865F2] hover:shadow-[0_0_30px_rgba(88,101,242,0.5)]",
  },
  {
    name: "Steam",
    icon: Gamepad2,
    url: "https://steamcommunity.com/id/sadewjay/",
    color: "hover:text-[#c7d5e0] hover:shadow-[0_0_30px_rgba(199,213,224,0.5)]",
    customIcon: true,
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/sadew_jayawardhana/",
    color: "hover:text-[#E4405F] hover:shadow-[0_0_30px_rgba(228,64,95,0.5)]",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:sadewprabuddha52@gmail.com",
    color: "hover:text-primary hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]",
  },
];

export const SocialsSection = () => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Discord username copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="socials"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative"
    >
      <div className="absolute inset-0 grid-background opacity-20" />

      <div className="relative z-10 text-center space-y-12 max-w-4xl mx-auto">
        <div className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm font-mono text-primary tracking-[0.3em] uppercase">
            // ESTABLISH CONNECTION
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-black text-primary text-glow-primary tracking-wider">
            CONNECT
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            Choose your preferred channel
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-6">
          {socials.map((social, index) => {
            const delayStyle = { transitionDelay: `${300 + index * 100}ms` };
            const animClass = `transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
            return (
              <div key={social.name} className={animClass} style={delayStyle}>
                {social.action === "copy" ? (
                  <button
                    onClick={() => handleCopy(social.copyValue!)}
                    className={`group flex flex-col items-center gap-4 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-lg transition-all duration-300 hover:border-primary hover:bg-card/80 cursor-pointer w-full h-full ${social.color}`}
                  >
                    <div className="relative">
                      {copied ? (
                        <Check className="w-10 h-10 text-accent transition-transform duration-300" />
                      ) : (
                        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 127.14 96.36" fill="currentColor">
                          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                        </svg>
                      )}
                      <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-current" />
                    </div>
                    <span className="text-sm font-mono tracking-wider uppercase text-foreground/80 group-hover:text-foreground transition-colors">
                      {social.name}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground group-hover:text-foreground/60 transition-colors">
                      {copied ? "copied!" : social.label}
                    </span>
                  </button>
                ) : (
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center gap-4 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-lg transition-all duration-300 hover:border-primary hover:bg-card/80 h-full ${social.color}`}
                  >
                    <div className="relative">
                      {social.customIcon && social.name === "Steam" ? (
                        <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 233 233" fill="currentColor">
                          <path d="M108.18,0C46.86,2.01,0,51.07,0,113.21l58.3,24.13c4.94-3.38,10.92-5.36,17.37-5.36c.57,0,1.14.02,1.7.05l25.98-37.69v-.53c0-22.12,18-40.12,40.12-40.12s40.12,18,40.12,40.12-18,40.13-40.12,40.13h-.93l-37.07,26.46c.02.41.03.82.03,1.24c0,16.61-13.49,30.13-30.1,30.13c-14.84,0-27.25-10.79-29.66-24.97L4.63,147.24C18.3,196.3,63.93,232.38,117.92,232.38c64.52,0,116.84-52.32,116.84-116.84C234.76,49.02,176.92-2.21,108.18,0ZM73.43,180.5l-13.22-5.48c2.36,4.94,6.41,9.12,11.79,11.42c11.6,4.96,25.02-.51,29.98-12.11c2.41-5.62,2.44-11.82.1-17.46c-2.34-5.64-6.81-10.04-12.57-12.49c-5.7-2.42-11.82-2.34-17.17-.29l13.66,5.66c8.56,3.56,12.62,13.4,9.06,21.96-3.56,8.57-13.4,12.62-21.96,9.06l.33-.27ZM183.48,93.82c0-14.74-11.99-26.73-26.73-26.73s-26.73,11.99-26.73,26.73,11.99,26.74,26.73,26.74,26.73-12,26.73-26.74ZM143.44,93.82c0-7.38,5.97-13.37,13.37-13.37s13.37,5.99,13.37,13.37-5.97,13.37-13.37,13.37-13.37-5.99-13.37-13.37Z" />
                        </svg>
                      ) : (
                        <social.icon className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
                      )}
                      <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-current" />
                    </div>
                    <span className="text-sm font-mono tracking-wider uppercase text-foreground/80 group-hover:text-foreground transition-colors">
                      {social.name}
                    </span>
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 pt-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <span className="text-xs font-mono text-muted-foreground">
            SADEW JAY © 2026
          </span>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};
