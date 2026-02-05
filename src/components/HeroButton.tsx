 import { Terminal } from "lucide-react";
 
 export const HeroButton = () => {
   return (
     <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold tracking-wider uppercase text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] animate-pulse-glow">
       {/* Animated border */}
       <span className="absolute inset-0 border border-primary" />
       
       {/* Hover effect */}
       <span className="absolute inset-0 bg-primary-foreground/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
       
       <Terminal className="w-4 h-4 relative z-10" />
       <span className="relative z-10">Access Operations</span>
     </button>
   );
 };