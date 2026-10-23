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

// Mengambil URL dari Environment Variable (VITE_GOOGLE_SCRIPT_URL)
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
  const [isOpened, setIsOpened] = useState(false);

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

  // Preload audio and prevent ghost audio when closing/leaving tab
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }

    const handleStopAudioOnExit = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleStopAudioOnExit();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handleStopAudioOnExit);
    window.addEventListener('beforeunload', handleStopAudioOnExit);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handleStopAudioOnExit);
      window.removeEventListener('beforeunload', handleStopAudioOnExit);
    };
  }, []);

  // Handler saat pengunjung klik "Buka Undangan"
  const handleOpenInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.75;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Audio play failed:', err);
          });
      }
    }
  };

  // Handler toggle musik on/off di pojok kanan atas
  const handleToggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      showToast('Musik dimatikan');
    } else {
      audioRef.current.volume = 0.75;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            showToast('🎵 Musik Halloween aktif');
          })
          .catch((err) => {
            console.error('Audio play error:', err);
          });
      }
    }
  };

  const handleRsvpSuccess = (payload, sentToGoogle) => {
    setTicketData(payload);
    setTicketModalOpen(true);
    if (sentToGoogle) {
      showToast('Konfirmasi tersinkronisasi ke Google Sheets');
    } else {
      showToast('Konfirmasi berhasil dicatat');
    }
  };

  return (
    <div className="relative min-h-screen bg-spooky-deep text-[#f3f4f6] font-sans selection:bg-orange-500/20 selection:text-white">
      {/* Layar Pembuka / Cover "Buka Undangan" */}
      <WelcomeCover onOpen={handleOpenInvitation} />

      {/* Elemen Audio Native HTML5 (MP3 first for 100% universal device/WhatsApp browser support) */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/assets/sound.mp3" type="audio/mpeg" />
        <source src="/assets/sound.weba" type="audio/webm" />
      </audio>

      {/* Subtle Background Interactive Canvas */}
      <SpookyCanvas />

      {/* Audio Controller Button di Pojok Kanan Atas */}
      <AudioWidget isPlaying={isPlaying} onToggle={handleToggleAudio} />

      {/* Main Content Layout with smooth reveal transition */}
      <div
        className={`relative z-10 w-full transition-all duration-1000 ease-out ${
          isOpened
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
