import { useEffect, useRef } from "react";

const KANJI = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン零壱弐参肆伍陸漆捌玖拾";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  opacity: number;
  drift: number;
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
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 20000);
      particlesRef.current = Array.from({ length: Math.min(count, 60) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        char: KANJI[Math.floor(Math.random() * KANJI.length)],
        size: 14 + Math.random() * 16,
        opacity: 0.04 + Math.random() * 0.07,
        drift: (Math.random() - 0.5) * 0.3,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particlesRef.current) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 160;

        if (dist < radius && dist > 0) {
          const force = (radius - dist) / radius;
          p.vx += (dx / dist) * force * 3;
          p.vy += (dy / dist) * force * 3;
        }

        // gentle upward float + horizontal drift
        p.vy -= 0.02;
        p.vx += p.drift * 0.01;

        // damping
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.y < -30) { p.y = canvas.height + 30; }
        if (p.y > canvas.height + 30) { p.y = -30; }
        if (p.x < -30) { p.x = canvas.width + 30; }
        if (p.x > canvas.width + 30) { p.x = -30; }

        ctx.font = `${p.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `hsla(50, 100%, 55%, ${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
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
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};
