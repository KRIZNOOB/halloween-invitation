import { useState, useEffect } from 'react';

const TARGET_EVENT_DATE = new Date('2026-10-30T00:00:00+08:00').getTime();

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      let diff = TARGET_EVENT_DATE - now;

      if (diff < 0) diff = 0;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-10 max-w-lg mx-auto">
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {/* Days */}
        <div className="bg-spooky-surface/80 border border-white/10 rounded-2xl py-3.5 px-2 text-center shadow-card">
          <span className="block text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-none mb-1">
            {timeLeft.days}
          </span>
          <span className="text-[10px] sm:text-xs text-spooky-textDim uppercase font-medium tracking-wider">
            Hari
          </span>
        </div>

        {/* Hours */}
        <div className="bg-spooky-surface/80 border border-white/10 rounded-2xl py-3.5 px-2 text-center shadow-card">
          <span className="block text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-none mb-1">
            {timeLeft.hours}
          </span>
          <span className="text-[10px] sm:text-xs text-spooky-textDim uppercase font-medium tracking-wider">
            Jam
          </span>
        </div>

        {/* Minutes */}
        <div className="bg-spooky-surface/80 border border-white/10 rounded-2xl py-3.5 px-2 text-center shadow-card">
          <span className="block text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-none mb-1">
            {timeLeft.minutes}
          </span>
          <span className="text-[10px] sm:text-xs text-spooky-textDim uppercase font-medium tracking-wider">
            Menit
          </span>
        </div>

        {/* Seconds */}
        <div className="bg-spooky-surface/80 border border-white/10 rounded-2xl py-3.5 px-2 text-center shadow-card">
          <span className="block text-2xl sm:text-3xl font-semibold text-orange-400 tracking-tight leading-none mb-1">
            {timeLeft.seconds}
          </span>
          <span className="text-[10px] sm:text-xs text-spooky-textDim uppercase font-medium tracking-wider">
            Detik
          </span>
        </div>
      </div>
    </div>
  );
}
