import { useState, useEffect, useRef } from 'react';
import WelcomeCover from './components/WelcomeCover';
import SpookyCanvas from './components/SpookyCanvas';
import AudioWidget from './components/AudioWidget';
import Hero from './components/Hero';
import RundownSection from './components/RundownSection';
import CostumeSection from './components/CostumeSection';
import LocationSection from './components/LocationSection';
import RsvpForm from './components/RsvpForm';
import Footer from './components/Footer';
import TicketModal from './components/TicketModal';
import Toast from './components/Toast';

// Mendukung Environment Variable di Vercel (VITE_GOOGLE_SCRIPT_URL) atau isi langsung di sini
const DEFAULT_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

export default function App() {
  const [scriptUrl] = useState(() => {
    return localStorage.getItem('HALLOWEEN_SCRIPT_URL') || DEFAULT_SCRIPT_URL;
  });

  const [toastMessage, setToastMessage] = useState(null);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  // Audio State
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const [isOpened, setIsOpened] = useState(false);

  // Handler when user clicks "Open Invitation"
  const handleOpenInvitation = async () => {
    setIsOpened(true);
    if (audioRef.current) {
      try {
        audioRef.current.volume = 0.70;
        await audioRef.current.play();
        setIsPlaying(true);
        showToast('Halloween music playing');
      } catch (err) {
        console.error('Audio play error:', err);
      }
    }
  };

  // Handler toggle audio on/off
  const handleToggleAudio = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      showToast('Music paused');
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        showToast('Halloween music playing');
      } catch (err) {
        console.error('Audio play error:', err);
      }
    }
  };

  const handleRsvpSuccess = (payload, sentToGoogle) => {
    setTicketData(payload);
    setTicketModalOpen(true);
    if (sentToGoogle) {
      showToast('RSVP synced to Google Sheets');
    } else {
      showToast('RSVP successfully recorded');
    }
  };

  return (
    <div className="relative min-h-screen bg-spooky-deep text-[#f3f4f6] font-sans selection:bg-orange-500/20 selection:text-white">
      {/* Layar Pembuka / Cover "Buka Undangan" */}
      <WelcomeCover onOpen={handleOpenInvitation} />

      {/* Elemen Audio Native HTML5 */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/assets/sound.weba" type="audio/webm" />
        <source src="/assets/halloween_sound.weba" type="audio/webm" />
        <source src="/assets/spooky_ghost.wav" type="audio/wav" />
      </audio>

      {/* Subtle Background Interactive Canvas */}
      <SpookyCanvas />

      {/* Audio Controller Button di Pojok Kanan Atas */}
      <AudioWidget isPlaying={isPlaying} onToggle={handleToggleAudio} />

      {/* Main Content Layout with smooth reveal transition */}
      <div
        className={`relative z-10 w-full transition-all duration-1000 ease-out ${isOpened
          ? 'opacity-100 scale-100 translate-y-0 filter-none'
          : 'opacity-0 scale-[0.98] translate-y-6'
          }`}
      >
        <Hero />

        <main className="max-w-4xl mx-auto px-4 py-8 sm:py-14 space-y-10 sm:space-y-14">
          <RundownSection />
          <CostumeSection />
          <LocationSection />
          <RsvpForm
            scriptUrl={scriptUrl}
            onSubmitSuccess={handleRsvpSuccess}
          />
        </main>

        <Footer />
      </div>

      {/* Digital Admission Ticket Modal */}
      <TicketModal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        ticketData={ticketData}
      />

      {/* Toast Alert */}
      <Toast message={toastMessage} />
    </div>
  );
}
