export default function TicketModal({ isOpen, onClose, ticketData }) {
  if (!isOpen || !ticketData) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-[#120e1c] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-sm w-full relative text-center shadow-2xl animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-xl text-spooky-textDim hover:text-white leading-none transition-colors"
        >
          &times;
        </button>

        <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
          <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
          RSVP Successfully Recorded
        </h3>
        <p className="text-xs text-spooky-textMuted mb-6 leading-relaxed">
          Thank you for confirming your attendance for Viskal Fun Halloween.
        </p>

        {/* Digital Ticket Pass */}
        <div className="bg-[#161222] border border-white/10 rounded-xl p-4 text-left mb-6">
          <div className="flex justify-between items-center border-b border-white/[0.08] pb-2.5 mb-3">
            <span className="font-semibold text-xs text-white uppercase tracking-wider">
              Viskal Fun Halloween
            </span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
              ticketData.kehadiran === 'Yes' || ticketData.kehadiran === 'Ikut' || ticketData.kehadiran === 'Hadir'
                ? 'bg-orange-500/20 text-orange-400'
                : 'bg-rose-500/20 text-rose-300'
            }`}>
              {ticketData.kehadiran === 'Yes' || ticketData.kehadiran === 'Ikut' || ticketData.kehadiran === 'Hadir' ? 'Confirmed' : 'Recorded'}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-spooky-textDim">Name:</span>
              <strong className="text-white text-right max-w-[65%] truncate">
                {ticketData.nama}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-spooky-textDim">Status:</span>
              <span className={`font-semibold text-right ${
                ticketData.kehadiran === 'Yes' || ticketData.kehadiran === 'Ikut' || ticketData.kehadiran === 'Hadir' ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {ticketData.kehadiran === 'Yes' || ticketData.kehadiran === 'Ikut' || ticketData.kehadiran === 'Hadir' ? 'Attending' : 'Cannot Attend'}
              </span>
            </div>
            {ticketData.alasan && ticketData.alasan !== '-' && (
              <div className="flex justify-between items-start gap-2 pt-1 border-t border-white/[0.06]">
                <span className="text-spooky-textDim shrink-0">Reason:</span>
                <span className="text-spooky-textMuted text-right text-[11px] leading-relaxed break-words">
                  {ticketData.alasan}
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl font-medium text-xs sm:text-sm text-white bg-orange-600 hover:bg-orange-500 transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
