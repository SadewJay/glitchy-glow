import { useState, useEffect, useRef } from "react";
 
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
  const [isBooted, setIsBooted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const cursorInterval = setInterval(() => {
       setShowCursor((prev) => !prev);
     }, 530);
     return () => clearInterval(cursorInterval);
   }, []);
 
  useEffect(() => {
    // Trigger boot animation after mount
    const timeout = setTimeout(() => setIsBooted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

   useEffect(() => {
    if (!isBooted || currentLineIndex >= terminalLines.length) return;
 
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
      <div 
        ref={terminalRef}
        className={`bg-card border border-primary/50 rounded-lg overflow-hidden box-glow-primary ${isBooted ? 'animate-terminal-boot' : 'opacity-0'}`}
      >
         {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/80 border-b border-primary/30">
           <div className="w-3 h-3 rounded-full bg-red-500" />
           <div className="w-3 h-3 rounded-full bg-yellow-500" />
           <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-sm text-primary/80 font-bold">novozzo@darknet:~</span>
         </div>
         
         {/* Terminal content */}
        <div className="p-4 min-h-[180px] font-mono text-sm bg-black/40">
           {displayedLines.map((line, index) => (
             <div key={index} className="flex items-center gap-2 mb-1">
              <span className="text-accent text-glow-green">→</span>
              <span className="text-primary/90 font-medium">{line}</span>
             </div>
           ))}
           {currentLineIndex < terminalLines.length && (
             <div className="flex items-center gap-2">
              <span className="text-accent text-glow-green">→</span>
              <span className="text-primary font-medium">
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