export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-[#120a1e]/95 border border-spooky-orange text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(255,109,0,0.5)] animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-none">
      {message}
    </div>
  );
}
