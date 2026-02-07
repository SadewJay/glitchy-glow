import { Instagram, Youtube, Mail, Facebook } from "lucide-react";

const socials = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/SadewJayawardhanaii/",
    color: "hover:text-[#1877F2] hover:shadow-[0_0_30px_rgba(24,119,242,0.5)]",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@sadewjay",
    color: "hover:text-[#FF0000] hover:shadow-[0_0_30px_rgba(255,0,0,0.5)]",
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
  return (
    <section
      id="socials"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-background opacity-20" />

      <div className="relative z-10 text-center space-y-12 max-w-4xl mx-auto">
        {/* Section title */}
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

        {/* Social links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center gap-4 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-lg transition-all duration-300 hover:border-primary hover:bg-card/80 ${social.color}`}
            >
              <div className="relative">
                <social.icon className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
                {/* Glow effect */}
                <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-current" />
              </div>
              <span className="text-sm font-mono tracking-wider uppercase text-foreground/80 group-hover:text-foreground transition-colors">
                {social.name}
              </span>
            </a>
          ))}
        </div>

        {/* Decorative elements */}
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
