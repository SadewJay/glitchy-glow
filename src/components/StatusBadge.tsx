 import { Shield, Eye } from "lucide-react";
 
 export const StatusBadge = () => {
   return (
     <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-full bg-card/50 backdrop-blur-sm">
       <Shield className="w-4 h-4 text-primary" />
       <span className="text-xs tracking-widest text-muted-foreground uppercase">
         Identity Verified
       </span>
       <span className="text-muted-foreground">•</span>
       <span className="text-xs tracking-widest text-foreground uppercase">
         Clearance: Classified
       </span>
       <Shield className="w-4 h-4 text-primary" />
     </div>
   );
 };
 
 export const ViewCounter = ({ count }: { count: number }) => {
   return (
     <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-card/50 backdrop-blur-sm">
       <Eye className="w-4 h-4 text-primary" />
       <span className="text-xl font-bold text-primary">{count}</span>
       <span className="text-xs tracking-widest text-muted-foreground uppercase">Views</span>
     </div>
   );
 };
 
 export const SystemStatus = () => {
   return (
     <div className="flex flex-col gap-1">
       <div className="flex items-center gap-2">
         <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
         <span className="text-xs tracking-widest text-muted-foreground uppercase">System Online</span>
       </div>
       <div className="text-xs text-muted-foreground">
         IP: <span className="text-foreground">127.0.0.1</span> <span className="text-muted-foreground">[MASKED]</span>
       </div>
     </div>
   );
 };
 
 export const EncryptionStatus = () => {
   return (
     <div className="text-right">
       <div className="text-xs tracking-widest text-muted-foreground uppercase">Encryption:</div>
       <div className="text-sm text-accent font-semibold">AES-256-GCM</div>
     </div>
   );
 };