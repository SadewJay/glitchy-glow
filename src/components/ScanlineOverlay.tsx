 export const ScanlineOverlay = () => {
   return (
     <>
       {/* Scanlines */}
       <div className="fixed inset-0 scanlines pointer-events-none z-50 opacity-30" />
       
       {/* Moving scan line */}
       <div className="fixed left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-scan pointer-events-none z-50" />
       
       {/* Vignette effect */}
       <div className="fixed inset-0 bg-radial-gradient pointer-events-none z-40" 
         style={{
           background: 'radial-gradient(ellipse at center, transparent 0%, hsl(0 0% 0% / 0.4) 100%)'
         }} 
       />
     </>
   );
 };