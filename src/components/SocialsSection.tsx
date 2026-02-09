import { useState } from "react";
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
    color: "hover:text-[#1b2838] hover:shadow-[0_0_30px_rgba(27,40,56,0.5)]",
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

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Discord username copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="socials"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative"
    >
      <div className="absolute inset-0 grid-background opacity-20" />

      <div className="relative z-10 text-center space-y-12 max-w-4xl mx-auto">
        <div className="space-y-4">
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
          {socials.map((social) =>
            social.action === "copy" ? (
              <button
                key={social.name}
                onClick={() => handleCopy(social.copyValue!)}
                className={`group flex flex-col items-center gap-4 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-lg transition-all duration-300 hover:border-primary hover:bg-card/80 cursor-pointer ${social.color}`}
              >
                <div className="relative">
                  {copied ? (
                    <Check className="w-10 h-10 text-accent transition-transform duration-300" />
                  ) : (
                    <svg className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
                    </svg>
                  )}
                  <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-current" />
                </div>
                <span className="text-sm font-mono tracking-wider uppercase text-foreground/80 group-hover:text-foreground transition-colors">
                  {social.name}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground group-hover:text-foreground/60 transition-colors">
                  {copied ? "copied!" : "click to copy"}
                </span>
              </button>
            ) : (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center gap-4 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-lg transition-all duration-300 hover:border-primary hover:bg-card/80 ${social.color}`}
              >
                <div className="relative">
                  <social.icon className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-current" />
                </div>
                <span className="text-sm font-mono tracking-wider uppercase text-foreground/80 group-hover:text-foreground transition-colors">
                  {social.name}
                </span>
              </a>
            )
          )}
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
