export default function CostumeSection() {
  const categories = [
    {
      title: 'Lorem Ipsum Dolor',
      tag: 'Lorem Tag',
      desc: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    },
    {
      title: 'Amet Consectetur',
      tag: 'Ipsum Tag',
      desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    },
    {
      title: 'Adipiscing Elit Sed',
      tag: 'Dolor Tag',
      desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
    },
    {
      title: 'Tempor Incididunt',
      tag: 'Sit Tag',
      desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
    },
  ];

  return (
    <section className="bg-spooky-surface/60 border border-white/[0.08] rounded-2xl p-6 sm:p-10 relative">
      <div className="mb-8">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
          Kompetisi
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
          Kategori Penghargaan Kostum
        </h2>
        <p className="text-xs sm:text-sm text-spooky-textMuted mt-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.
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

      {/* Reminder Banner - Sleek & Refined */}
      <div className="mt-8 py-3.5 px-5 rounded-xl bg-orange-500/[0.06] border border-orange-500/20 flex items-center justify-center gap-2.5 text-center">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
        <p className="text-xs sm:text-sm font-medium text-orange-200/90 tracking-wider uppercase">
          Don't forget to wear ur best costume
        </p>
      </div>
    </section>
  );
}
