export default function CostumeSection() {
  const categories = [
    {
      title: 'Best Overall Costume',
      tag: 'Juara Utama',
      desc: 'Kostum dengan detail dan penampilan yang paling memukau serta totalitas.',
    },
    {
      title: 'Most Relatable / Funniest',
      tag: 'Paling Lucu & Menghibur',
      desc: 'Kostum bertema komedi, satir dunia kerja (corporate humor), atau karakter unik.',
    },
    {
      title: 'Scariest Look',
      tag: 'Karakter Terseram',
      desc: 'Riasan atau kostum bertema horor klasik/modern yang paling meyakinkan.',
    },
    {
      title: 'Best Duo / Group',
      tag: 'Kompak Bertim',
      desc: 'Kekompakan kostum berdua atau bertiga dengan rekan satu tim/divisi.',
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
          Partisipasi bersifat opsional. Kamu bebas berkreasi atau sekadar mengenakan pakaian hitam kasual.
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
    </section>
  );
}
