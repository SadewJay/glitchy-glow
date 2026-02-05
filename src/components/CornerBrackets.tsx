 export const CornerBrackets = () => {
   return (
     <>
       {/* Top Left */}
       <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-border opacity-30" />
       
       {/* Top Right */}
       <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-border opacity-30" />
       
       {/* Bottom Left */}
       <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-border opacity-30" />
       
       {/* Bottom Right */}
       <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-border opacity-30" />
       
       {/* Center decorative lines */}
       <div className="absolute top-1/2 left-4 w-8 h-px bg-border opacity-20" />
       <div className="absolute top-1/2 right-4 w-8 h-px bg-border opacity-20" />
     </>
   );
 };