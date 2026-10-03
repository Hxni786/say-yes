import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  RotateCcw,
  Sparkles,
  Smile,
} from 'lucide-react';
import { QuestionPreset, ThemeId } from './types';
import {
  QUESTION_PRESETS,
  THEME_CONFIGS,
} from './data/questions';
import {
  playNoSound,
  playDodgeSound,
  playYesVictorySound,
  isSoundEnabled,
  setSoundEnabled,
} from './utils/sound';
import { FloatingElements } from './components/FloatingElements';
import { QuestionPickerModal } from './components/QuestionPickerModal';
import { ShareModal } from './components/ShareModal';
import { ControlsHeader } from './components/ControlsHeader';
import { PrivacyModal } from './components/PrivacyModal';

export default function App() {
  // All presets + custom
  const [presets, setPresets] = useState<QuestionPreset[]>(QUESTION_PRESETS);
  const [currentPreset, setCurrentPreset] = useState<QuestionPreset>(QUESTION_PRESETS[0]);
  const [activeTheme, setActiveTheme] = useState<ThemeId>(QUESTION_PRESETS[0].theme);

  // Recipient name (e.g. from URL ?to=Sarah)
  const [recipientName, setRecipientName] = useState<string>('');

  // Interactive state
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [evasiveNo, setEvasiveNo] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);

  // Sound toggle
  const [soundOn, setSoundOn] = useState<boolean>(true);

  // Modals
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Fallback gif image tracking
  const [imageError, setImageError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Hydrate state from URL on initial mount
  useEffect(() => {
    setSoundOn(isSoundEnabled());

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const questionId = params.get('q');
      const toParam = params.get('to');
      const evasiveParam = params.get('evasive');

      if (toParam) {
        setRecipientName(toParam.trim());
      }
      if (evasiveParam === '1' || evasiveParam === 'true') {
        setEvasiveNo(true);
      }

      if (questionId) {
        const found = QUESTION_PRESETS.find((p) => p.id === questionId);
        if (found) {
          setCurrentPreset(found);
          setActiveTheme(found.theme);
        }
      }
    }
  }, []);

  // Sync document title with current question, recipient, and credit to hxni
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = recipientName
        ? `${recipientName}: ${currentPreset.question} 💖 • by hxni`
        : `${currentPreset.question} 💖 • by hxni`;
    }
  }, [currentPreset, recipientName]);

  // Update theme when preset changes (unless user explicitly picks a theme)
  const handleSelectPreset = (preset: QuestionPreset) => {
    setCurrentPreset(preset);
    setActiveTheme(preset.theme);
    handleReset();
  };

  const handleSelectCustom = (customPreset: QuestionPreset) => {
    setPresets((prev) => [customPreset, ...prev]);
    setCurrentPreset(customPreset);
    setActiveTheme(customPreset.theme);
    handleReset();
  };

  const handleReset = () => {
    setNoCount(0);
    setYesPressed(false);
    setNoButtonPos(null);
    setImageError(false);
  };

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  // Evasive No Button dodge logic (Optimized for iOS touch & Desktop mouse)
  const moveNoButton = () => {
    if (!evasiveNo && noCount < 2) return;

    playDodgeSound();

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // Ignore
      }
    }

    const padding = 20;
    const maxX = Math.max(30, (window.innerWidth || 360) - 150);
    const maxY = Math.max(100, (window.innerHeight || 600) - 90);

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding + 80, Math.floor(Math.random() * maxY));

    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleNoClick = () => {
    playNoSound(noCount + 1);
    setNoCount((prev) => prev + 1);

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // Ignore
      }
    }

    if (evasiveNo || noCount >= 1) {
      moveNoButton();
    }
  };

  const fireConfetti = () => {
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([20, 50, 40]);
        } catch {
          // Ignore
        }
      }

      // Center burst
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#c9184a', '#ffb3c1', '#ffd166', '#a78bfa'],
      });

      // Left & right cannons
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.05, y: 0.7 },
          colors: ['#ff4d6d', '#c9184a', '#a78bfa'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.95, y: 0.7 },
          colors: ['#ff4d6d', '#c9184a', '#a78bfa'],
        });
      }, 300);
    } catch {
      // Confetti fallback
    }
  };

  const handleYesClick = () => {
    playYesVictorySound();
    setYesPressed(true);
    fireConfetti();
  };

  // Current Pleading Phrase for "No"
  const getNoButtonText = () => {
    const phrases = currentPreset.pleadingPhrases && currentPreset.pleadingPhrases.length > 0
      ? currentPreset.pleadingPhrases
      : ['No', 'Are you sure?', 'Pretty please? 🥺', 'Don’t break my heart!'];

    if (noCount === 0) return currentPreset.noText || 'No';
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // Dynamic responsive scale calculation for Yes button
  // Intelligently constrained on small mobile screens to prevent layout breaking
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const maxScale = isMobile ? 2.1 : 3.0;
  const scaleMultiplier = Math.min(1 + noCount * 0.18, maxScale);
  const yesFontSize = Math.min(16 + noCount * 4, isMobile ? 28 : 38);

  const themeConfig = THEME_CONFIGS[activeTheme] || THEME_CONFIGS.rose;

  // Local fallback images ensuring 100% reliability
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const fallbackAsk = `${cleanBase}gifs/love-ask.gif`;
  const fallbackCelebrate = `${cleanBase}gifs/love-celebrate.gif`;

  const currentAskGif = imageError ? fallbackAsk : (currentPreset.askGif || fallbackAsk);
  const currentCelebrateGif = imageError ? fallbackCelebrate : (currentPreset.celebrateGif || fallbackCelebrate);

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[100dvh] w-full flex flex-col items-center justify-between px-3 sm:px-6 py-4 transition-colors duration-700 select-none bg-gradient-to-br ${themeConfig.bgGradient} overflow-x-hidden`}
      style={{
        paddingTop: 'max(4.5rem, calc(env(safe-area-inset-top, 0px) + 3.8rem))',
        paddingBottom: 'max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))',
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right, 0px))',
      }}
    >
      {/* Background Floating symbols (hearts, sparkles, etc.) */}
      <FloatingElements theme={activeTheme} />

      {/* Top Floating Controls Header with iOS safe-area styling */}
      <ControlsHeader
        currentPreset={currentPreset}
        onOpenPicker={() => setIsPickerOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        soundEnabled={soundOn}
        onToggleSound={handleToggleSound}
        evasiveNo={evasiveNo}
        onToggleEvasive={() => setEvasiveNo(!evasiveNo)}
        onReset={handleReset}
        currentTheme={activeTheme}
        onChangeTheme={(th) => setActiveTheme(th)}
        recipientName={recipientName}
      />

      {/* Main Interactive Card */}
      <main className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center my-auto">
        {yesPressed ? (
          // =================== CELEBRATION VIEW ===================
          <div className="flex flex-col items-center animate-fade-in p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-white/70 shadow-[0_10px_35px_rgba(0,0,0,0.08)] w-full">
            <div className="relative mb-4 group min-h-[140px] flex items-center justify-center">
              <img
                key={currentCelebrateGif}
                src={currentCelebrateGif}
                alt="Celebration Bear"
                onError={() => {
                  if (!imageError) setImageError(true);
                }}
                className="h-44 sm:h-56 w-auto object-contain rounded-2xl drop-shadow-md animate-gentle-bounce select-none pointer-events-none"
              />
              <div className="absolute -top-3 -right-3 bg-rose-500 text-white p-2 rounded-full shadow-lg">
                <Heart className="w-5 h-5 fill-white" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>It's Official!</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-snug my-2">
              {recipientName ? `${recipientName}, ` : ''}
              {currentPreset.celebrationTitle}
            </h1>

            <p className="text-xs sm:text-base text-gray-600 max-w-md my-2 font-medium">
              {currentPreset.celebrationSubtitle}
            </p>

            {/* Post-celebration action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6">
              <button
                onClick={fireConfetti}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                More Confetti! 🎉
              </button>

              <button
                onClick={() => setIsPickerOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 cursor-pointer"
              >
                <Smile className="w-4 h-4 text-purple-500" />
                Try Another
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold text-xs transition active:scale-95 cursor-pointer"
                title="Restart this question"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Replay
              </button>
            </div>
          </div>
        ) : (
          // =================== QUESTION VIEW ===================
          <div className="flex flex-col items-center p-5 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-white/70 shadow-[0_10px_35px_rgba(0,0,0,0.07)] w-full transition-all">
            {/* Cute GIF */}
            <div className="relative mb-3 min-h-[140px] flex items-center justify-center">
              <img
                key={currentAskGif}
                src={currentAskGif}
                alt="Cute Asking Bear"
                onError={() => {
                  if (!imageError) setImageError(true);
                }}
                className="h-40 sm:h-52 w-auto object-contain rounded-2xl drop-shadow-sm select-none pointer-events-none"
              />
              <span className="absolute -bottom-2 -right-2 text-2xl drop-shadow">
                {currentPreset.emoji}
              </span>
            </div>

            {/* Recipient tag if personalized */}
            {recipientName && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-extrabold uppercase tracking-wider mb-2">
                <Heart className="w-3 h-3 fill-rose-500" />
                <span>To: {recipientName}</span>
              </div>
            )}

            {/* Main Question */}
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight my-2 leading-tight">
              {currentPreset.question}
            </h1>

            {/* Subtitle / Tease */}
            {currentPreset.subtitle && (
              <p className="text-xs sm:text-sm text-gray-500 mb-5 font-semibold">
                {currentPreset.subtitle}
              </p>
            )}

            {/* Pleading counter badge if clicked multiple times */}
            {noCount > 0 && (
              <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold animate-pulse">
                <span>🥺 Pleading level: {noCount}</span>
                {noCount >= 4 && <span className="font-extrabold">(Resistance is futile!)</span>}
              </div>
            )}

            {/* Action Buttons: YES and NO */}
            <div className="relative flex flex-wrap items-center justify-center gap-3 sm:gap-4 min-h-[90px] w-full px-2 mt-2">
              {/* YES BUTTON (Grows bigger on each No click, with mobile safety bounds) */}
              <button
                onClick={handleYesClick}
                className="relative rounded-2xl font-black text-white transition-all duration-200 shadow-lg hover:brightness-110 active:scale-95 bg-emerald-500 hover:bg-emerald-600 cursor-pointer animate-pulse-glow z-20 flex items-center justify-center text-center max-w-[85vw]"
                style={{
                  fontSize: `${yesFontSize}px`,
                  padding: `${Math.min(10 + noCount * 2.5, 24)}px ${Math.min(20 + noCount * 5, 50)}px`,
                  transform: `scale(${scaleMultiplier})`,
                  transformOrigin: 'center',
                }}
              >
                <span>{currentPreset.yesText || 'Yes! ❤️'}</span>
              </button>

              {/* NO BUTTON (Pleading text & iOS touch/desktop mouse dodging) */}
              <button
                onClick={handleNoClick}
                onMouseEnter={() => {
                  if (evasiveNo) moveNoButton();
                }}
                onTouchStart={(e) => {
                  if (evasiveNo || noCount >= 2) {
                    e.preventDefault();
                    moveNoButton();
                    handleNoClick();
                  }
                }}
                className={`rounded-2xl font-bold text-white transition-all duration-200 shadow-md hover:bg-rose-600 bg-rose-500 text-xs sm:text-sm px-4 py-2.5 z-10 select-none cursor-pointer active:scale-95 ${
                  noButtonPos ? 'fixed transition-all duration-150 ease-out' : 'relative'
                }`}
                style={
                  noButtonPos
                    ? {
                        left: `${noButtonPos.x}px`,
                        top: `${noButtonPos.y}px`,
                        zIndex: 50,
                      }
                    : undefined
                }
              >
                {getNoButtonText()}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer with credit to hxni */}
      <footer className="relative z-10 text-center text-xs text-gray-500/80 mt-auto pt-6 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-sm text-gray-700 text-xs font-semibold">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          <span>by</span>
          <span className="font-extrabold text-rose-600 tracking-wide">hxni</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-gray-500 font-medium">
          <button
            onClick={() => setIsPickerOpen(true)}
            className="text-rose-600 font-bold hover:underline cursor-pointer"
          >
            16+ Questions
          </button>
          <span>•</span>
          <button
            onClick={() => setIsPrivacyOpen(true)}
            className="text-gray-600 font-semibold hover:underline hover:text-gray-900 cursor-pointer"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <span>Fitted for iOS & Desktop</span>
        </div>
      </footer>

      {/* Question Picker & Custom Creator Modal */}
      <QuestionPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        presets={presets}
        currentPreset={currentPreset}
        onSelectPreset={handleSelectPreset}
        onSelectCustom={handleSelectCustom}
      />

      {/* Share & Personalize Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        currentPreset={currentPreset}
        recipientName={recipientName}
        onRecipientNameChange={setRecipientName}
        evasiveNo={evasiveNo}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
