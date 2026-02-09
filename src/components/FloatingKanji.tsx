import { useEffect, useRef } from "react";

const KANJI = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン零壱弐参肆伍陸漆捌玖拾";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  opacity: number;
  speed: number;
}

export const FloatingKanji = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 25000);
      particlesRef.current = Array.from({ length: Math.min(count, 80) }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x, y, baseX: x, baseY: y,
          vx: 0, vy: 0,
          char: KANJI[Math.floor(Math.random() * KANJI.length)],
          size: 12 + Math.random() * 14,
          opacity: 0.03 + Math.random() * 0.06,
          speed: 0.2 + Math.random() * 0.5,
        };
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particlesRef.current) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 150;

        if (dist < radius) {
          const force = (radius - dist) / radius;
          p.vx += (dx / dist) * force * 2;
          p.vy += (dy / dist) * force * 2;
        }

        // drift back to base
        p.vx += (p.baseX - p.x) * 0.005;
        p.vy += (p.baseY - p.y) * 0.005;

        // gentle float
        p.baseY -= p.speed * 0.1;
        if (p.baseY < -20) {
          p.baseY = canvas.height + 20;
          p.y = p.baseY;
        }

        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += p.vx;
        p.y += p.vy;

        ctx.font = `${p.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `hsla(50, 100%, 55%, ${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ width: "100%", height: "100%" }}
    />
  );
};
