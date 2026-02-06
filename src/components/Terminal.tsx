import { useState, useEffect, useRef } from "react";
 
const terminalLines = [
  { type: "highlight", text: "new chapter loading..." },
];
 
 const getLineStyle = (type: string) => {
   switch (type) {
     case "system":
       return "text-foreground/80";
     case "success":
       return "text-accent text-glow-green";
     case "warning":
       return "text-primary text-glow-primary";
     case "highlight":
       return "text-secondary text-glow-cyan font-bold";
     default:
       return "text-foreground";
   }
 };
 
 const getPrefix = (type: string) => {
   switch (type) {
     case "system":
       return <span className="text-muted-foreground">$</span>;
     case "success":
       return <span className="text-accent">✓</span>;
     case "warning":
       return <span className="text-primary">!</span>;
     case "highlight":
       return <span className="text-secondary">▶</span>;
     default:
       return <span className="text-muted-foreground">→</span>;
   }
 };
 
 export const Terminal = () => {
   const [displayedLines, setDisplayedLines] = useState<typeof terminalLines>([]);
   const [currentLineIndex, setCurrentLineIndex] = useState(0);
   const [currentText, setCurrentText] = useState("");
   const [showCursor, setShowCursor] = useState(true);
   const [isBooted, setIsBooted] = useState(false);
   const terminalRef = useRef<HTMLDivElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const cursorInterval = setInterval(() => {
       setShowCursor((prev) => !prev);
     }, 530);
     return () => clearInterval(cursorInterval);
   }, []);
 
   useEffect(() => {
     const timeout = setTimeout(() => setIsBooted(true), 100);
     return () => clearTimeout(timeout);
   }, []);
 
   useEffect(() => {
     if (!isBooted || currentLineIndex >= terminalLines.length) return;
 
     const currentFullLine = terminalLines[currentLineIndex].text;
 
     if (currentText.length < currentFullLine.length) {
       const timeout = setTimeout(() => {
         setCurrentText(currentFullLine.slice(0, currentText.length + 1));
       }, 18 + Math.random() * 12);
       return () => clearTimeout(timeout);
     } else {
       const timeout = setTimeout(() => {
         setDisplayedLines((prev) => [...prev, terminalLines[currentLineIndex]]);
         setCurrentText("");
         setCurrentLineIndex((prev) => prev + 1);
         if (contentRef.current) {
           contentRef.current.scrollTop = contentRef.current.scrollHeight;
         }
       }, 250);
       return () => clearTimeout(timeout);
     }
   }, [currentText, currentLineIndex, isBooted]);
 
   return (
     <div className="w-full max-w-2xl mx-auto">
       <div
         ref={terminalRef}
         className={`bg-card border border-primary/50 rounded-lg overflow-hidden box-glow-primary ${isBooted ? "animate-terminal-boot" : "opacity-0"}`}
       >
         {/* Terminal header */}
         <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/80 border-b border-primary/30">
           <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
           <div className="w-2.5 h-2.5 rounded-full bg-primary" />
           <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="ml-2 text-xs text-primary/80 font-bold tracking-wider">
            percysix9@sadewjay.com
          </span>
         </div>
 
         {/* Terminal content */}
         <div
           ref={contentRef}
          className="p-4 font-mono text-xs md:text-sm bg-black/60 overflow-hidden transition-all duration-300 ease-out"
          style={{
            minHeight: displayedLines.length === 0 && currentLineIndex === 0 ? "40px" : undefined,
            maxHeight: "300px",
          }}
         >
           {displayedLines.map((line, index) => (
            <div key={index} className="flex items-start gap-2 mb-1 leading-relaxed animate-line-in">
               <span className="mt-0.5 flex-shrink-0 w-4 text-center">
                 {getPrefix(line.type)}
               </span>
               <span className={getLineStyle(line.type)}>{line.text}</span>
             </div>
           ))}
           {currentLineIndex < terminalLines.length && (
             <div className="flex items-start gap-2">
               <span className="mt-0.5 flex-shrink-0 w-4 text-center">
                 {getPrefix(terminalLines[currentLineIndex].type)}
               </span>
               <span className={getLineStyle(terminalLines[currentLineIndex].type)}>
                 {currentText}
                 <span
                   className="inline-block w-1.5 h-3.5 bg-accent ml-0.5 align-middle"
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