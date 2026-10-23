export default function CostumeSection() {
  const categories = [
    {
      title: 'Spookiest Character',
      tag: 'Spooky',
      desc: 'The most terrifying, spine-chilling, and ghost-worthy costume of the event.',
    },
    {
      title: 'Most Creative Design',
      tag: 'Creative',
      desc: 'Most innovative concept, DIY brilliance, and exceptional attention to detail.',
    },
    {
      title: 'Funniest Outfit',
      tag: 'Humor',
      desc: 'The most hilarious, witty, and meme-worthy outfit that brings pure laughter.',
    },
    {
      title: 'Best Duo / Team',
      tag: 'Squad',
      desc: 'Best coordinated thematic costumes crafted together with a colleague.',
    },
  ];

  return (
    <section className="bg-spooky-surface/60 border border-white/[0.08] rounded-2xl p-6 sm:p-10 relative">
      <div className="mb-8">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
          Contest
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
          Costume Award Categories
        </h2>
        <p className="text-xs sm:text-sm text-spooky-textMuted mt-1">
          Dress to impress! Stand a chance to win exclusive prizes and bragging rights.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c, i) => (
          <div
            key={i}
            className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-white/15 transition-all duration-200"
          >
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-orange-400/90 bg-orange-500/10 px-2 py-0.5 rounded mb-3">
              {c.tag}
            </span>
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2">
              {c.title}
            </h3>
            <p className="text-xs text-spooky-textMuted leading-relaxed">
              {c.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Reminder Banner */}
      <div className="mt-8 py-3.5 px-5 rounded-xl bg-orange-500/[0.06] border border-orange-500/20 flex items-center justify-center gap-2.5 text-center">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
        <p className="text-xs sm:text-sm font-medium text-orange-200/90 tracking-wider uppercase">
          Dress Code: Your Best Costume
        </p>
      </div>
    </section>
  );
}
