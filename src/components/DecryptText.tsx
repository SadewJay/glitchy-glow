 import { useState, useEffect } from "react";
 
 interface DecryptTextProps {
   text: string;
   className?: string;
   delay?: number;
   duration?: number;
 }
 
 const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
 
 export const DecryptText = ({ text, className = "", delay = 0, duration = 2000 }: DecryptTextProps) => {
   const [displayText, setDisplayText] = useState("");
   const [isDecrypting, setIsDecrypting] = useState(false);
   const [isComplete, setIsComplete] = useState(false);
 
   useEffect(() => {
     const startTimeout = setTimeout(() => {
       setIsDecrypting(true);
     }, delay);
 
     return () => clearTimeout(startTimeout);
   }, [delay]);
 
   useEffect(() => {
     if (!isDecrypting) {
       // Show scrambled text initially
       setDisplayText(text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
       return;
     }
 
     const iterations = 15;
     const intervalTime = duration / iterations;
     let currentIteration = 0;
 
     const interval = setInterval(() => {
       currentIteration++;
       const progress = currentIteration / iterations;
       
       const newText = text
         .split("")
         .map((char, index) => {
           // Characters reveal from left to right based on progress
           const charProgress = index / text.length;
           if (charProgress < progress - 0.1) {
             return char; // Fully revealed
           } else if (charProgress < progress + 0.2) {
             // Currently decrypting - show random chars
             return Math.random() > 0.5 ? char : CHARS[Math.floor(Math.random() * CHARS.length)];
           } else {
             // Not yet reached - show random
             return CHARS[Math.floor(Math.random() * CHARS.length)];
           }
         })
         .join("");
 
       setDisplayText(newText);
 
       if (currentIteration >= iterations) {
         clearInterval(interval);
         setDisplayText(text);
         setIsComplete(true);
       }
     }, intervalTime);
 
     return () => clearInterval(interval);
   }, [isDecrypting, text, duration]);
 
   return (
     <span className={`${className} ${isComplete ? "" : "animate-glitch"}`}>
       {displayText}
     </span>
   );
 };