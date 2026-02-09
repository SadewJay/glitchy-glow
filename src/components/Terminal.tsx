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

const weatherCodeToText = (code: number): { text: string; icon: string } => {
  if (code === 0) return { text: "Clear sky", icon: "☀" };
  if (code <= 3) return { text: "Partly cloudy", icon: "⛅" };
  if (code <= 48) return { text: "Foggy", icon: "🌫" };
  if (code <= 57) return { text: "Drizzle", icon: "🌦" };
  if (code <= 67) return { text: "Rain", icon: "🌧" };
  if (code <= 77) return { text: "Snow", icon: "❄" };
  if (code <= 82) return { text: "Rain showers", icon: "🌧" };
  if (code <= 86) return { text: "Snow showers", icon: "🌨" };
  if (code <= 99) return { text: "Thunderstorm", icon: "⛈" };
  return { text: "Unknown", icon: "?" };
};

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
}

export const Terminal = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [bootPhase, setBootPhase] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [dateTime, setDateTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState(false);
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

  // Real-time clock (Colombo timezone)
  useEffect(() => {
    if (bootPhase < 5) return;
    const i = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(i);
  }, [bootPhase]);

  // Fetch weather from Open-Meteo (Colombo: 6.9271°N, 79.8612°E)
  useEffect(() => {
    if (bootPhase < 5) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=6.9271&longitude=79.8612&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Asia/Colombo"
        );
        const data = await res.json();
        setWeather({
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          windSpeed: data.current.wind_speed_10m,
          weatherCode: data.current.weather_code,
        });
        setWeatherError(false);
      } catch {
        setWeatherError(true);
      }
    };

    fetchWeather();
    const i = setInterval(fetchWeather, 60000); // refresh every minute
    return () => clearInterval(i);
  }, [bootPhase]);

  const colomboTime = dateTime.toLocaleString("en-US", {
    timeZone: "Asia/Colombo",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const weatherInfo = weather ? weatherCodeToText(weather.weatherCode) : null;

  const bootLines = [
    { phase: 1, prefix: "system", text: "initializing sadewjay_os v3.1.7..." },
    { phase: 2, prefix: "success", text: "kernel modules loaded [OK]" },
    { phase: 3, prefix: "success", text: "network interfaces online [OK]" },
    { phase: 4, prefix: "highlight", text: "location services activated — Colombo, LK" },
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
            terminal — percysix9@sadewjay
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

          {/* Date/Time & Weather */}
          {bootPhase >= 5 && (
            <div className="mt-3 pt-3 border-t border-primary/20 space-y-2 animate-line-in">
              {/* Date & Time */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-14">TIME</span>
                <span className="text-primary text-glow-primary font-bold tracking-wide">
                  {colomboTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-14">ZONE</span>
                <span className="text-foreground/80">Asia/Colombo (UTC+5:30)</span>
              </div>

              {/* Weather */}
              <div className="mt-2 pt-2 border-t border-primary/10 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground w-14">LOC</span>
                  <span className="text-secondary text-glow-cyan">Colombo, Sri Lanka</span>
                </div>

                {weatherError && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-14">WX</span>
                    <span className="text-destructive">⚠ weather data unavailable</span>
                  </div>
                )}

                {weatherInfo && weather && (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground w-14">WX</span>
                      <span className="text-primary text-glow-primary text-lg leading-none mr-1">
                        {weatherInfo.icon}
                      </span>
                      <span className="text-foreground/90">{weatherInfo.text}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground w-14">TEMP</span>
                      <span className="text-primary text-glow-primary font-bold">
                        {weather.temperature}°C
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground w-14">HUM</span>
                      <span className="text-accent">{weather.humidity}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground w-14">WIND</span>
                      <span className="text-foreground/80">{weather.windSpeed} km/h</span>
                    </div>
                  </>
                )}

                {!weather && !weatherError && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-14">WX</span>
                    <span className="text-muted-foreground animate-pulse">fetching weather data...</span>
                  </div>
                )}
              </div>

              {/* Prompt */}
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
