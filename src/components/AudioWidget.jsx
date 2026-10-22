export default function AudioWidget({ isPlaying, onToggle }) {
  return (
    <aside aria-label="Audio controls" className="fixed top-4 right-4 z-50">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-md border text-xs font-semibold cursor-pointer transition-all duration-300 ${
          isPlaying
            ? 'bg-[#181126] border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(234,88,12,0.4)] ring-1 ring-orange-500/50 scale-105'
            : 'bg-[#120e1c]/80 border-white/15 text-spooky-textMuted hover:border-orange-500/50 hover:text-white'
        }`}
        title={isPlaying ? 'Klik untuk mematikan musik' : 'Klik untuk menyalakan musik'}
      >
        <span className={`text-base ${isPlaying ? 'animate-bounce' : ''}`}>
          {isPlaying ? '🔊' : '🔇'}
        </span>
        <span>
          {isPlaying ? 'Musik: ON' : 'Musik: OFF'}
        </span>
        {isPlaying && (
          <span className="flex items-center gap-0.5">
            <span className="w-1 h-3 bg-orange-400 rounded-full animate-pulse" />
            <span className="w-1 h-4 bg-orange-400 rounded-full animate-pulse [animation-delay:0.2s]" />
            <span className="w-1 h-2 bg-orange-400 rounded-full animate-pulse [animation-delay:0.4s]" />
          </span>
        )}
      </button>
    </aside>
  );
}
