import { useState, useEffect } from 'react';

export default function WelcomeCover({ onOpen }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  // Lock scroll while cover is visible
  useEffect(() => {
    if (!isRemoved) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isRemoved]);

  const handleOpenClick = () => {
    if (isClosing) return;
    setIsClosing(true);
    if (onOpen) onOpen();

    // Remove from DOM after cinematic slide-up animation finishes
    setTimeout(() => {
      setIsRemoved(true);
    }, 950);
  };

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-[999] bg-spooky-deep flex flex-col items-center justify-center text-center px-4 overflow-hidden transition-all duration-900 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isClosing
          ? '-translate-y-full opacity-90 pointer-events-none shadow-2xl'
          : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Background Graphic */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center -z-20 opacity-25 filter grayscale contrast-125 scale-105"
        style={{ backgroundImage: "url('/assets/hero_bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-spooky-deep/80 via-spooky-deep/95 to-spooky-deep -z-10" />

      {/* Floating subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-950/30 blur-[140px] rounded-full pointer-events-none -z-5" />

      <div
        className={`max-w-xl mx-auto relative z-10 w-full px-4 transition-all duration-500 ${
          isClosing ? 'opacity-0 -translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.05] border border-white/15 text-xs sm:text-sm text-spooky-textMuted tracking-widest uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span>Viskal Office Gathering &bull; 2026</span>
        </div>

        {/* Title */}
        <div className="mb-6">
          <span className="block text-xs sm:text-sm uppercase tracking-[7px] text-spooky-textMuted mb-2 font-medium">
            The Official Invitation
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-1">
            Viskal
          </span>
          <span className="block text-6xl sm:text-7xl md:text-8xl font-creepy text-orange-500 tracking-wider">
            Halloween Night
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm sm:text-base md:text-lg text-spooky-textMuted max-w-lg mx-auto mb-10 font-normal leading-relaxed">
          Tinggalkan meja kerjamu sebelum kegelapan menjemput. Masuklah jika bernyali...
        </p>

        {/* Well-Proportioned Button (Tidak Gepeng) */}
        <div>
          <button
            type="button"
            onClick={handleOpenClick}
            className="group inline-flex items-center justify-center gap-3 min-w-[220px] sm:min-w-[240px] h-[54px] sm:h-[58px] px-8 rounded-full font-bold text-sm sm:text-base text-white bg-orange-600 hover:bg-orange-500 shadow-[0_8px_30px_rgba(234,88,12,0.4)] hover:shadow-[0_12px_40px_rgba(234,88,12,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Buka Undangan</span>
            {/* Crisp, High-Contrast White Jack-O'-Lantern Vector Icon */}
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 fill-white drop-shadow group-hover:rotate-12 transition-transform shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M11.5 2a.75.75 0 0 1 .75.75v1.35c3.27.42 5.92 2.37 6.94 5.09 1.15 3.09.43 6.64-1.78 8.87-2.12 2.14-5.22 3.12-8.21 2.58-3.08-.56-5.63-2.63-6.61-5.38-1.04-2.91-.45-6.27 1.54-8.48C5.9 4.8 8.35 3.75 11.5 3.6V2.75A.75.75 0 0 1 11.5 2zM7.5 10a1 1 0 0 0-.8 1.6l1.2 1.6a1 1 0 0 0 1.6-1.2L8.3 10.4A1 1 0 0 0 7.5 10zm9 0a1 1 0 0 0-.8.4l-1.2 1.6a1 1 0 0 0 1.6 1.2l1.2-1.6a1 1 0 0 0-.8-1.6zm-4.5 4.5a3.5 3.5 0 0 0-2.8 1.4.75.75 0 1 0 1.2.9 2 2 0 0 1 3.2 0 .75.75 0 1 0 1.2-.9 3.5 3.5 0 0 0-2.8-1.4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
