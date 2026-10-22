import CountdownTimer from './CountdownTimer';

export default function Hero() {
  return (
    <header className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Background Graphic - Darkened and subdued */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center -z-30 opacity-20 filter grayscale contrast-125 scale-105"
        style={{ backgroundImage: "url('/assets/hero_bg.jpg')" }}
      />

      {/* Deep smooth gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-spooky-deep/80 via-spooky-deep/95 to-spooky-deep -z-20" />

      {/* Subtle radial spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-950/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        {/* Sleek Minimalist Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-spooky-textMuted tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span>Viskal Office Gathering &bull; 2026</span>
        </div>

        {/* Main Title: Viskal Halloween Night */}
        <h1 className="mb-6">
          <span className="block text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-2">
            Viskal
          </span>
          <span className="block text-5xl sm:text-7xl md:text-8xl font-creepy text-orange-500 tracking-wider">
            Halloween Night
          </span>
        </h1>

        {/* Spooky Tagline */}
        <p className="text-sm sm:text-base md:text-lg text-spooky-textMuted max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          Tinggalkan meja kerjamu sebelum kegelapan menelan segalanya. Malam keramat di mana batas realitas kantor dan dunia lain melebur... Masuklah jika bernyali.
        </p>

        {/* Meta Info Grid - Clean, Spacious, and strictly Single-Line */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-4xl mx-auto mb-8 text-left">
          {/* Card 1: Tanggal - Strict single-line with whitespace-nowrap */}
          <div className="bg-spooky-surface/85 border border-white/15 p-4 sm:p-5 rounded-2xl flex items-center gap-3.5 shadow-card hover:border-orange-500/40 transition-colors">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight whitespace-nowrap">
                Jumat, 30 Okt 2026
              </div>
            </div>
          </div>

          {/* Card 2: Lokasi */}
          <div className="bg-spooky-surface/85 border border-white/15 p-4 sm:p-5 rounded-2xl flex items-center gap-3.5 shadow-card hover:border-orange-500/40 transition-colors">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight truncate">
                Kantor Viskal Id
              </div>
              <div className="text-xs sm:text-sm text-spooky-textMuted font-medium truncate mt-0.5">
                Jl. Tukad Citarum III
              </div>
            </div>
          </div>

          {/* Card 3: Dress Code */}
          <div className="bg-spooky-surface/85 border border-white/15 p-4 sm:p-5 rounded-2xl flex items-center gap-3.5 shadow-card hover:border-orange-500/40 transition-colors">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight truncate">
                Dress Code
              </div>
              <div className="text-xs sm:text-sm text-spooky-textMuted font-medium truncate mt-0.5">
                Kostum / Bebas
              </div>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <CountdownTimer />

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <a
            href="#rsvp-section"
            className="px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-orange-600 hover:bg-orange-500 shadow-softOrange hover:-translate-y-0.5 transition-all"
          >
            Konfirmasi Kehadiran (RSVP)
          </a>
          <a
            href="#rundown-section"
            className="px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base text-spooky-textMuted bg-white/[0.04] border border-white/10 hover:border-white/20 hover:text-white transition-all"
          >
            Lihat Susunan Acara
          </a>
        </div>
      </div>
    </header>
  );
}
