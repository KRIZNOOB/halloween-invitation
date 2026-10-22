export default function RundownSection() {
  const events = [
    {
      time: '18:30 - 19:15',
      title: 'Welcome Drink & Registration',
      desc: 'Registrasi kehadiran, sambutan minuman pembuka, dan sesi foto santai di photo booth.',
      isHighlight: false,
    },
    {
      time: '19:15 - 20:15',
      title: 'Dinner & Social Gathering',
      desc: 'Makan malam bersama dengan hidangan prasmanan, makanan ringan, dan minuman free flow.',
      isHighlight: false,
    },
    {
      time: '20:15 - 21:15',
      title: 'Costume Showcase & Prize Giving',
      desc: 'Sesi parade kostum bagi rekan yang berpartisipasi dan pembagian hadiah untuk kategori terbaik.',
      isHighlight: true,
    },
    {
      time: '21:15 - Selesai',
      title: 'Music & Networking Session',
      desc: 'Sesi santai, musik akustik & DJ set, serta karaoke bersama bagi yang ingin bersantai lebih lama.',
      isHighlight: false,
    },
  ];

  return (
    <section id="rundown-section" className="bg-spooky-surface/60 border border-white/[0.08] rounded-2xl p-6 sm:p-10 relative">
      <div className="mb-8">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
          Rundown
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
          Susunan Acara
        </h2>
        <p className="text-xs sm:text-sm text-spooky-textMuted mt-1">
          Jadwal perkiraan rangkaian acara pada malam pesta.
        </p>
      </div>

      <div className="space-y-3.5">
        {events.map((ev, idx) => (
          <div
            key={idx}
            className={`flex flex-col sm:flex-row gap-3 sm:gap-6 p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
              ev.isHighlight
                ? 'bg-orange-500/[0.06] border-orange-500/30'
                : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15'
            }`}
          >
            <div className="sm:w-36 shrink-0">
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${
                ev.isHighlight
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'bg-white/[0.05] text-spooky-textMuted'
              }`}>
                {ev.time}
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                {ev.title}
              </h3>
              <p className="text-xs text-spooky-textMuted leading-relaxed">
                {ev.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
