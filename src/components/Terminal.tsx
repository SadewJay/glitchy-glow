 import { useState, useEffect } from "react";
 
 const terminalLines = [
   "Initializing secure connection...",
   "Bypassing firewall protocols...",
   "Encrypting data stream [AES-256]...",
   "Establishing anonymous tunnel...",
   "Welcome user!",
 ];
 
 export const Terminal = () => {
   const [displayedLines, setDisplayedLines] = useState<string[]>([]);
   const [currentLineIndex, setCurrentLineIndex] = useState(0);
   const [currentText, setCurrentText] = useState("");
   const [showCursor, setShowCursor] = useState(true);
 
   useEffect(() => {
     const cursorInterval = setInterval(() => {
       setShowCursor((prev) => !prev);
     }, 530);
     return () => clearInterval(cursorInterval);
   }, []);
 
   useEffect(() => {
     if (currentLineIndex >= terminalLines.length) return;
 
     const currentFullLine = terminalLines[currentLineIndex];
     
     if (currentText.length < currentFullLine.length) {
       const timeout = setTimeout(() => {
         setCurrentText(currentFullLine.slice(0, currentText.length + 1));
       }, 30 + Math.random() * 20);
       return () => clearTimeout(timeout);
     } else {
       const timeout = setTimeout(() => {
         setDisplayedLines((prev) => [...prev, currentFullLine]);
         setCurrentText("");
         setCurrentLineIndex((prev) => prev + 1);
       }, 500);
       return () => clearTimeout(timeout);
     }
   }, [currentText, currentLineIndex]);
 
   return (
     <div className="w-full max-w-2xl mx-auto">
       <div className="bg-card border border-border rounded-lg overflow-hidden box-glow-primary">
         {/* Terminal header */}
         <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
           <div className="w-3 h-3 rounded-full bg-red-500" />
           <div className="w-3 h-3 rounded-full bg-yellow-500" />
           <div className="w-3 h-3 rounded-full bg-green-500" />
           <span className="ml-2 text-sm text-muted-foreground">novozzo@darknet:~</span>
         </div>
         
         {/* Terminal content */}
         <div className="p-4 min-h-[180px] font-mono text-sm">
           {displayedLines.map((line, index) => (
             <div key={index} className="flex items-center gap-2 mb-1">
               <span className="text-accent">→</span>
               <span className="text-foreground">{line}</span>
             </div>
           ))}
           {currentLineIndex < terminalLines.length && (
             <div className="flex items-center gap-2">
               <span className="text-accent">→</span>
               <span className="text-foreground">
                 {currentText}
                <span 
                  className="inline-block w-2 h-4 bg-primary ml-0.5 transition-opacity"
                  style={{ opacity: showCursor ? 1 : 0 }}
                />
               </span>
             </div>
           )}
         </div>
       </div>
     </div>
   );
 };