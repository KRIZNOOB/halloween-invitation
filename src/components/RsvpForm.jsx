import { useState } from 'react';

export default function RsvpForm({ scriptUrl, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    nama: '',
    kehadiran: 'Yes',
    alasan: '',
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
      newErrors.nama = 'Please enter your name.';
    }

    if (formData.kehadiran === 'No') {
      if (!formData.alasan.trim() || formData.alasan.trim().length < 2) {
        newErrors.alasan = 'Please let us know why you cannot attend.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const isAttending = formData.kehadiran === 'Yes' || formData.kehadiran === 'Ikut';
    const payload = {
      nama: formData.nama.trim(),
      kehadiran: isAttending ? 'Yes' : 'No',
      alasan: isAttending ? '-' : formData.alasan.trim(),
      kostum: isAttending ? 'Attending' : `Can't Attend (Reason: ${formData.alasan.trim()})`,
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
      kehadiran: 'Yes',
      alasan: '',
    });
  };

  return (
    <section
      id="rsvp-section"
      className="bg-spooky-surface/70 border border-orange-500/20 rounded-2xl p-6 sm:p-10 relative"
    >
      <div className="mb-8 text-center max-w-xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
          RSVP &bull; Confirmation
        </span>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-2 font-creepy tracking-wider text-orange-500">
          Are you in?
        </h2>
        <p className="text-xs sm:text-sm text-orange-300/80 font-medium tracking-wide mb-1">
          Don't forget to wear your best costume
        </p>
        <p className="text-xs text-spooky-textMuted leading-relaxed">
          Confirm your attendance below to help us prepare the best party experience!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5" noValidate>
        {/* Name (tidak pakai nama lengkap & placeholder baru) */}
        <div className="space-y-1.5">
          <label htmlFor="rsvp-nama" className="block text-xs font-semibold text-spooky-textMuted uppercase tracking-wider">
            Name <span className="text-orange-500">*</span>
          </label>
          <input
            id="rsvp-nama"
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full bg-spooky-input border border-white/10 text-white rounded-xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-orange-500/60 focus:bg-[#151022] transition-all placeholder:text-gray-500"
            required
          />
          {errors.nama && <p className="text-xs text-red-400">{errors.nama}</p>}
        </div>

        {/* Choice: Are you in? */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-spooky-textMuted uppercase tracking-wider">
            Are you in? <span className="text-orange-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                val: 'Yes',
                title: "I'm In!",
                desc: 'Ready to join & party',
                isPositive: true,
              },
              {
                val: 'No',
                title: "Can't Make It",
                desc: 'Unable to attend',
                isPositive: false,
              },
            ].map((opt) => {
              const isSelected = formData.kehadiran === opt.val;
              return (
                <label
                  key={opt.val}
                  className={`cursor-pointer rounded-xl p-4 border transition-all duration-200 text-center flex flex-col items-center ${isSelected
                    ? opt.isPositive
                      ? 'border-orange-500/80 bg-orange-500/10 text-white shadow-sm ring-1 ring-orange-500/30'
                      : 'border-rose-500/80 bg-rose-500/10 text-white shadow-sm ring-1 ring-rose-500/30'
                    : 'border-white/10 bg-white/[0.02] text-spooky-textMuted hover:border-white/20 hover:text-white'
                    }`}
                >
                  <input
                    type="radio"
                    name="kehadiran"
                    value={opt.val}
                    checked={isSelected}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {/* Refined Smooth Line Icon */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center mb-2.5 transition-colors ${isSelected
                      ? opt.isPositive
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : 'bg-white/[0.04] text-spooky-textDim border border-white/10'
                      }`}
                  >
                    {opt.isPositive ? (
                      <svg
                        className="w-3.5 h-3.5 stroke-current fill-none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg
                        className="w-3.5 h-3.5 stroke-current fill-none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                  </div>
                  <strong className="block text-xs sm:text-sm font-semibold mb-0.5">{opt.title}</strong>
                  <span className="block text-[11px] text-spooky-textDim">{opt.desc}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Reason when not attending */}
        {formData.kehadiran === 'No' && (
          <div className="space-y-1.5 transition-all duration-200">
            <label htmlFor="rsvp-alasan" className="block text-xs font-semibold text-rose-300 uppercase tracking-wider">
              Reason for Absence <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="rsvp-alasan"
              name="alasan"
              rows={3}
              value={formData.alasan}
              onChange={handleChange}
              placeholder="Tell us why you won't be able to make it..."
              className="w-full bg-spooky-input border border-rose-500/40 text-white rounded-xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-rose-500 focus:bg-[#151022] transition-all resize-none placeholder:text-gray-500"
              required
            />
            {errors.alasan && <p className="text-xs text-rose-400 font-medium">{errors.alasan}</p>}
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-5 rounded-xl font-medium text-xs sm:text-sm text-white bg-orange-600 hover:bg-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-softOrange cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Submitting confirmation...</span>
              </>
            ) : (
              <span>Submit RSVP</span>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
