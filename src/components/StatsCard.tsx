 import { Shield, DollarSign, Server, Activity } from "lucide-react";
 
 interface StatsCardProps {
   icon: React.ReactNode;
   value: string;
   label: string;
 }
 
 const StatsCard = ({ icon, value, label }: StatsCardProps) => {
   return (
     <div className="flex flex-col items-center justify-center p-6 border border-border bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
       <div className="text-primary mb-3 group-hover:scale-110 transition-transform">
         {icon}
       </div>
       <div className="text-2xl md:text-3xl font-bold text-primary font-display tracking-wider">
         {value}
       </div>
       <div className="text-xs tracking-widest text-muted-foreground uppercase mt-1">
         {label}
       </div>
     </div>
   );
 };
 
 export const StatsGrid = () => {
   const stats = [
     { icon: <Shield className="w-6 h-6" />, value: "99.8%", label: "Success Rate" },
     { icon: <DollarSign className="w-6 h-6" />, value: "$1M+", label: "Transaction Value" },
     { icon: <Server className="w-6 h-6" />, value: "15+", label: "Gateways" },
     { icon: <Activity className="w-6 h-6" />, value: "99.9%", label: "Uptime" },
   ];
 
   return (
     <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
       {stats.map((stat, index) => (
         <StatsCard key={index} {...stat} />
       ))}
     </div>
   );
 };