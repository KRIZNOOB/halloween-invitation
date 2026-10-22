import { useState } from 'react';

export default function RsvpForm({ scriptUrl, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    nama: '',
    kehadiran: 'Hadir',
    kostum: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const playSuccessChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.2); // E5

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.8);
    } catch (e) {
      // Audio not initialized or permitted
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.nama.trim() || formData.nama.trim().length < 2) {
      newErrors.nama = 'Nama lengkap wajib diisi.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      nama: formData.nama.trim(),
      kehadiran: formData.kehadiran,
      kostum: formData.kostum.trim() || 'Bebas / Kasual',
      timestamp: new Date().toISOString(),
    };

    // 1. Simpan di local storage
    try {
      const existing = JSON.parse(localStorage.getItem('HALLOWEEN_RSVP_ENTRIES') || '[]');
      existing.unshift(payload);
      localStorage.setItem('HALLOWEEN_RSVP_ENTRIES', JSON.stringify(existing.slice(0, 50)));
    } catch (err) {
      console.error(err);
    }

    // 2. Kirim ke Google Apps Script Web App jika ada URL
    let sentToGoogle = false;
    if (scriptUrl && scriptUrl.startsWith('http')) {
      try {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        sentToGoogle = true;
      } catch (err) {
        console.warn('Gagal kirim ke Google Apps Script:', err);
      }
    } else {
      await new Promise((r) => setTimeout(r, 600));
    }

    setIsSubmitting(false);
    playSuccessChime();

    if (onSubmitSuccess) {
      onSubmitSuccess(payload, sentToGoogle);
    }

    // Reset form
    setFormData({
      nama: '',
      kehadiran: 'Hadir',
      kostum: '',
    });
  };

  return (
    <section
      id="rsvp-section"
      className="bg-spooky-surface/70 border border-orange-500/20 rounded-2xl p-6 sm:p-10 relative"
    >
      <div className="mb-8 text-center max-w-xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
          Konfirmasi Kehadiran
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-2">
          Formulir RSVP
        </h2>
        <p className="text-xs sm:text-sm text-spooky-textMuted leading-relaxed">
          Mohon konfirmasikan kehadiran rekan-rekan untuk mempermudah perhitungan katering dan akomodasi acara.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5" noValidate>
        {/* Nama Lengkap */}
        <div className="space-y-1.5">
          <label htmlFor="rsvp-nama" className="block text-xs font-semibold text-spooky-textMuted uppercase tracking-wider">
            Nama Lengkap <span className="text-orange-500">*</span>
          </label>
          <input
            id="rsvp-nama"
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Contoh: Budi Santoso"
            className="w-full bg-spooky-input border border-white/10 text-white rounded-xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-orange-500/60 focus:bg-[#151022] transition-all"
            required
          />
          {errors.nama && <p className="text-xs text-red-400">{errors.nama}</p>}
        </div>

        {/* Status Kehadiran: Hadir dan Tidak Hadir */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-spooky-textMuted uppercase tracking-wider">
            Status Kehadiran <span className="text-orange-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: 'Hadir', title: 'Hadir', desc: 'Siap bergabung' },
              { val: 'Tidak Hadir', title: 'Tidak Hadir', desc: 'Berhalangan' },
            ].map((opt) => (
              <label
                key={opt.val}
                className={`cursor-pointer rounded-xl p-3.5 border transition-all duration-200 text-center ${
                  formData.kehadiran === opt.val
                    ? 'border-orange-500 bg-orange-500/10 text-white shadow-sm'
                    : 'border-white/10 bg-white/[0.02] text-spooky-textMuted hover:border-white/20 hover:text-white'
                }`}
              >
                <input
                  type="radio"
                  name="kehadiran"
                  value={opt.val}
                  checked={formData.kehadiran === opt.val}
                  onChange={handleChange}
                  className="sr-only"
                />
                <strong className="block text-xs sm:text-sm font-semibold mb-0.5">{opt.title}</strong>
                <span className="block text-[11px] text-spooky-textDim">{opt.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rencana Kostum */}
        <div className="space-y-1.5">
          <label htmlFor="rsvp-kostum" className="block text-xs font-semibold text-spooky-textMuted uppercase tracking-wider">
            Rencana Kostum / Penampilan <span className="text-[10px] lowercase text-spooky-textDim">(opsional)</span>
          </label>
          <input
            id="rsvp-kostum"
            type="text"
            name="kostum"
            value={formData.kostum}
            onChange={handleChange}
            placeholder="Contoh: Drakula, Kasual Hitam, Cosplay, dsb."
            className="w-full bg-spooky-input border border-white/10 text-white rounded-xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-orange-500/60 focus:bg-[#151022] transition-all"
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-5 rounded-xl font-medium text-xs sm:text-sm text-white bg-orange-600 hover:bg-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-softOrange"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Menyimpan konfirmasi...</span>
              </>
            ) : (
              <span>Kirim Konfirmasi Kehadiran</span>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
