import { useState, useEffect, useRef } from "react";

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
    case "label":
      return "text-muted-foreground";
    case "value":
      return "text-primary text-glow-primary font-bold";
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

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const formatUptime = (seconds: number) => {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${d}d ${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const makeBar = (percent: number, width = 20) => {
  const filled = Math.round((percent / 100) * width);
  const empty = width - filled;
  const color =
    percent > 85 ? "text-destructive" : percent > 60 ? "text-primary" : "text-accent";
  return (
    <span>
      <span className="text-muted-foreground">[</span>
      <span className={color}>{"█".repeat(filled)}</span>
      <span className="text-muted-foreground/30">{"░".repeat(empty)}</span>
      <span className="text-muted-foreground">]</span>
      <span className={`${color} ml-1`}>{percent}%</span>
    </span>
  );
};

export const Terminal = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [bootPhase, setBootPhase] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [cpu, setCpu] = useState(23);
  const [mem, setMem] = useState(41);
  const [net, setNet] = useState({ in: 1.2, out: 0.4 });
  const [uptime, setUptime] = useState(284719);
  const [processes, setProcesses] = useState(137);
  const [disk, setDisk] = useState(67);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Cursor blink
  useEffect(() => {
    const i = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(i);
  }, []);

  // Boot sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setIsBooted(true), 100),
      setTimeout(() => setBootPhase(1), 400),
      setTimeout(() => setBootPhase(2), 900),
      setTimeout(() => setBootPhase(3), 1400),
      setTimeout(() => setBootPhase(4), 1800),
      setTimeout(() => setBootPhase(5), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Live stats updates
  useEffect(() => {
    if (bootPhase < 5) return;
    const i = setInterval(() => {
      setCpu(randomBetween(8, 72));
      setMem((p) => Math.min(95, Math.max(30, p + randomBetween(-3, 4))));
      setNet({ in: +(Math.random() * 4 + 0.1).toFixed(1), out: +(Math.random() * 2 + 0.05).toFixed(1) });
      setUptime((p) => p + 1);
      setProcesses(randomBetween(130, 155));
      setDisk((p) => Math.min(89, Math.max(60, p + randomBetween(-1, 1))));
    }, 1000);
    return () => clearInterval(i);
  }, [bootPhase]);

  const bootLines = [
    { phase: 1, prefix: "system", text: "initializing sadewjay_os v3.1.7..." },
    { phase: 2, prefix: "success", text: "kernel modules loaded [OK]" },
    { phase: 3, prefix: "success", text: "network interfaces online [OK]" },
    { phase: 4, prefix: "highlight", text: "system monitor activated" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        ref={terminalRef}
        className={`bg-card border border-primary/50 rounded-lg overflow-hidden box-glow-primary ${isBooted ? "animate-terminal-boot" : "opacity-0"}`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/80 border-b border-primary/30">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="ml-2 text-xs text-primary/80 font-bold tracking-wider">
            system_monitor — percysix9@sadewjay
          </span>
        </div>

        {/* Content */}
        <div className="p-4 font-mono text-xs md:text-sm bg-black/60 space-y-1 transition-all duration-300">
          {/* Boot lines */}
          {bootLines.map(
            (line, i) =>
              bootPhase >= line.phase && (
                <div key={i} className="flex items-start gap-2 animate-line-in">
                  <span className="mt-0.5 flex-shrink-0 w-4 text-center">
                    {getPrefix(line.prefix)}
                  </span>
                  <span className={getLineStyle(line.prefix)}>{line.text}</span>
                </div>
              )
          )}

          {/* Live monitor */}
          {bootPhase >= 5 && (
            <div className="mt-3 pt-3 border-t border-primary/20 space-y-1.5 animate-line-in">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-12">CPU</span>
                {makeBar(cpu)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-12">MEM</span>
                {makeBar(mem)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-12">DISK</span>
                {makeBar(disk)}
              </div>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <span className="w-12">NET</span>
                <span className="text-accent">↓ {net.in} MB/s</span>
                <span className="text-primary ml-2">↑ {net.out} MB/s</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-12">PROC</span>
                <span className="text-foreground/80">{processes} active</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-12">UP</span>
                <span className="text-secondary text-glow-cyan">{formatUptime(uptime)}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-accent">❯</span>
                <span className="text-foreground/60">_</span>
                <span
                  className="inline-block w-1.5 h-3.5 bg-accent ml-0.5"
                  style={{ opacity: showCursor ? 1 : 0 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
