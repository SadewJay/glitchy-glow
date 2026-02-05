 import { useState, useEffect } from "react";
 
 const processingSteps = [
   { text: "Initializing payment gateway...", progress: 10 },
   { text: "Verifying card details...", progress: 25 },
   { text: "Authenticating transaction...", progress: 45 },
   { text: "Processing payment...", progress: 65 },
   { text: "Encrypting data stream...", progress: 80 },
   { text: "Transaction approved", progress: 100 },
 ];
 
 interface LoadingScreenProps {
   onComplete: () => void;
 }
 
 export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
   const [currentStep, setCurrentStep] = useState(0);
   const [isExiting, setIsExiting] = useState(false);
   const [cardFlip, setCardFlip] = useState(false);
 
   useEffect(() => {
     // Flip card animation
     const flipInterval = setInterval(() => {
       setCardFlip((prev) => !prev);
     }, 800);
 
     return () => clearInterval(flipInterval);
   }, []);
 
   useEffect(() => {
     if (currentStep < processingSteps.length - 1) {
       const timeout = setTimeout(() => {
         setCurrentStep((prev) => prev + 1);
       }, 600);
       return () => clearTimeout(timeout);
     } else {
       // Complete - start exit animation
       const timeout = setTimeout(() => {
         setIsExiting(true);
         setTimeout(onComplete, 500);
       }, 800);
       return () => clearTimeout(timeout);
     }
   }, [currentStep, onComplete]);
 
   const { text, progress } = processingSteps[currentStep];
 
   return (
     <div
       className={`fixed inset-0 z-50 bg-background flex items-center justify-center transition-opacity duration-500 ${
         isExiting ? "opacity-0" : "opacity-100"
       }`}
     >
       {/* Grid background */}
       <div className="absolute inset-0 grid-background opacity-20" />
 
       {/* Scanlines */}
       <div className="absolute inset-0 scanlines opacity-30" />
 
       <div className="relative z-10 flex flex-col items-center gap-8 px-4">
         {/* Credit card visual */}
         <div
           className={`relative w-72 h-44 rounded-xl transition-transform duration-500 preserve-3d ${
             cardFlip ? "rotate-y-10" : "-rotate-y-10"
           }`}
           style={{
             background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 50%, hsl(var(--secondary)) 100%)",
             boxShadow: "0 20px 60px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2)",
           }}
         >
           {/* Card chip */}
           <div className="absolute top-8 left-6 w-12 h-9 rounded-md bg-primary-foreground/30 border border-primary-foreground/50">
             <div className="w-full h-full grid grid-cols-3 gap-0.5 p-1">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="bg-primary-foreground/40 rounded-sm" />
               ))}
             </div>
           </div>
 
           {/* Card number placeholder */}
           <div className="absolute bottom-16 left-6 right-6 flex gap-4">
             {[...Array(4)].map((_, i) => (
               <div key={i} className="flex gap-1">
                 {[...Array(4)].map((_, j) => (
                   <div
                     key={j}
                     className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-pulse"
                     style={{ animationDelay: `${(i * 4 + j) * 50}ms` }}
                   />
                 ))}
               </div>
             ))}
           </div>
 
           {/* Card holder */}
           <div className="absolute bottom-4 left-6 text-xs font-mono text-primary-foreground/80 tracking-widest">
             NOVOZZO OPERATOR
           </div>
 
           {/* Expiry */}
           <div className="absolute bottom-4 right-6 text-xs font-mono text-primary-foreground/80">
             ••/••
           </div>
 
           {/* Scanning line effect */}
           <div
             className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
           >
             <div
               className="absolute w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-scan-card"
             />
           </div>
         </div>
 
         {/* Processing text */}
         <div className="text-center space-y-4">
           <p className="text-sm font-mono text-primary text-glow-primary tracking-wider">
             {text}
           </p>
 
           {/* Progress bar */}
           <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
             <div
               className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500 ease-out"
               style={{ width: `${progress}%` }}
             />
           </div>
 
           {/* Progress percentage */}
           <p className="text-xs font-mono text-muted-foreground">
             {progress}% COMPLETE
           </p>
         </div>
 
         {/* Processing dots */}
         <div className="flex gap-2">
           {[...Array(3)].map((_, i) => (
             <div
               key={i}
               className="w-2 h-2 rounded-full bg-primary animate-bounce"
               style={{ animationDelay: `${i * 150}ms` }}
             />
           ))}
         </div>
       </div>
     </div>
   );
 };