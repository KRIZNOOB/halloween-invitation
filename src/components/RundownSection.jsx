export default function RundownSection() {
  const events = [
    {
      time: '14:45 - 15:00',
      title: 'Gathering & Costume Registration',
      desc: 'Gather in full costume as a prerequisite to join the event.',
      isHighlight: false,
    },
    {
      time: '15:00 - 15:15',
      title: 'Event Briefing',
      desc: 'Official opening, event guidelines, and carnival competition rules.',
      isHighlight: false,
    },
    {
      time: '15:15 - 16:00',
      title: 'Costume Fashion Show',
      desc: 'Runway showcase of all participants to compete for the best costume awards!',
      isHighlight: true,
    },
    {
      time: '16:00 - 17:30',
      title: 'Carnival Games',
      desc: 'Exciting games, interactive challenges, and special prizes.',
      isHighlight: false,
    },
    {
      time: '17:30 - Finish',
      title: 'Free Time & After Party',
      desc: 'Relaxation session, group photos, dinner, and celebration.',
      isHighlight: false,
    },
  ];

  return (
    <section id="rundown-section" className="bg-spooky-surface/60 border border-white/[0.08] rounded-2xl p-6 sm:p-10 relative">
      <div className="mb-8">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
          Schedule
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
          Event Rundown
        </h2>
        <p className="text-xs sm:text-sm text-spooky-textMuted mt-1">
          Estimated timeline and itinerary for the Viskal Halloween celebration.
        </p>
      </div>

      <div className="space-y-3.5">
        {events.map((ev, idx) => (
          <div
            key={idx}
            className={`flex flex-col sm:flex-row gap-3 sm:gap-6 p-4 sm:p-5 rounded-xl border transition-all duration-200 ${ev.isHighlight
                ? 'bg-orange-500/[0.06] border-orange-500/30'
                : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15'
              }`}
          >
            <div className="sm:w-36 shrink-0">
              <span
                className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${ev.isHighlight
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'bg-white/[0.05] text-spooky-textMuted'
                  }`}
              >
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
