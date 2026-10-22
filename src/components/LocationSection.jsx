export default function LocationSection() {
  const gmapsUrl = 'https://www.google.com/maps/search/?api=1&query=Viskal+Id+Jalan+Tukad+Citarum+III+No+10+Renon+Denpasar';

  return (
    <section className="bg-spooky-surface/60 border border-white/[0.08] rounded-2xl p-6 sm:p-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
            Lokasi Acara
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">
            Kantor Viskal Id
          </h2>
          <p className="text-xs sm:text-sm text-spooky-textMuted mb-6 leading-relaxed">
            Jl. Tukad Citarum III No. 10, Renon, Denpasar Selatan, Kota Denpasar, Bali.
          </p>

          <div>
            <a
              href={gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium border border-orange-500/40 bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
            >
              <span>Buka di Google Maps</span>
              <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.06] p-5 sm:p-6 rounded-xl">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-spooky-textMuted mb-3.5">
            Informasi Tambahan
          </h3>
          <ul className="space-y-2.5 text-xs text-spooky-textMuted">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
              <span>Mohon mengisi formulir RSVP agar kami dapat memastikan katering dan akomodasi mencukupi.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
              <span>Area parkir kendaraan tersedia di sekitar lokasi kantor.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
              <span>Dress code bebas, dipersilakan jika ingin mengenakan kostum atau pakaian bertema.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
