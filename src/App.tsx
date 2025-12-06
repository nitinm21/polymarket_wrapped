import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProgressBar } from './components/ui/ProgressBar';
import { CursorGlow } from './components/ui/CursorGlow';
import { useSwipe } from './hooks/useSwipe';
import { sampleData } from './data/sampleData';

// Import screens
import { OpeningScreen } from './components/screens/OpeningScreen';
import { DaysActiveScreen } from './components/screens/DaysActiveScreen';
import { YourArenaScreen } from './components/screens/YourArenaScreen';
import { ContrarianScreen } from './components/screens/ContrarianScreen';
import { BestCallScreen } from './components/screens/BestCallScreen';
import { MissedCallScreen } from './components/screens/MissedCallScreen';
import { TimingScreen } from './components/screens/TimingScreen';
import { WorldviewScreen } from './components/screens/WorldviewScreen';
import { PersonalityScreen } from './components/screens/PersonalityScreen';
import { LeaderboardScreen } from './components/screens/LeaderboardScreen';
import { CryptoDegenScreen } from './components/screens/CryptoDegenScreen';
import { WhatsNextScreen } from './components/screens/WhatsNextScreen';
import { ShareCardScreen } from './components/screens/ShareCardScreen';

const TOTAL_SCREENS = 13;

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const data = sampleData;

  const goToNext = useCallback(() => {
    setCurrentScreen((prev) => {
      const next = prev + 1;
      // Loop back to start on last screen
      return next >= TOTAL_SCREENS ? 0 : next;
    });
    // Haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentScreen((prev) => Math.max(prev - 1, 0));
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, []);

  const goToStart = useCallback(() => {
    setCurrentScreen(0);
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, []);

  const swipeHandlers = useSwipe({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrev,
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Handle click/tap on left and right sides
  const handleClick = (e: React.MouseEvent) => {
    const { clientX } = e;
    const { innerWidth } = window;

    // Left 30% goes back, right 70% goes forward
    if (clientX < innerWidth * 0.3) {
      goToPrev();
    } else {
      goToNext();
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return <OpeningScreen key="opening" data={data} />;
      case 1:
        return <DaysActiveScreen key="days" data={data} />;
      case 2:
        return <YourArenaScreen key="arena" data={data} />;
      case 3:
        return <ContrarianScreen key="contrarian" data={data} />;
      case 4:
        return <BestCallScreen key="best" data={data} />;
      case 5:
        return <MissedCallScreen key="missed" data={data} />;
      case 6:
        return <TimingScreen key="timing" data={data} />;
      case 7:
        return <WorldviewScreen key="worldview" data={data} />;
      case 8:
        return <PersonalityScreen key="personality" data={data} />;
      case 9:
        return <LeaderboardScreen key="leaderboard" data={data} />;
      case 10:
        return <CryptoDegenScreen key="crypto" data={data} />;
      case 11:
        return <WhatsNextScreen key="next" data={data} />;
      case 12:
        return <ShareCardScreen key="share" data={data} onStartOver={goToStart} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#0d0d14]"
      onClick={handleClick}
      {...swipeHandlers}
    >
      <CursorGlow />
      <ProgressBar currentIndex={currentScreen} totalScreens={TOTAL_SCREENS} />

      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>

      {/* Navigation hints (desktop only) */}
      <div className="pointer-events-none absolute bottom-6 left-0 right-0 hidden items-center justify-center gap-4 text-xs text-white/30 md:flex safe-bottom">
        <span>Use arrow keys or click to navigate</span>
      </div>
    </div>
  );
}

export default App;
