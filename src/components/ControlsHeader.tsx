import {
  ListFilter,
  Share2,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Zap,
  Heart,
} from 'lucide-react';
import { QuestionPreset, ThemeId } from '../types';
import { THEME_CONFIGS } from '../data/questions';

interface ControlsHeaderProps {
  currentPreset: QuestionPreset;
  onOpenPicker: () => void;
  onOpenShare: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  evasiveNo: boolean;
  onToggleEvasive: () => void;
  onReset: () => void;
  currentTheme: ThemeId;
  onChangeTheme: (theme: ThemeId) => void;
  recipientName?: string;
}

export const ControlsHeader = ({
  currentPreset,
  onOpenPicker,
  onOpenShare,
  soundEnabled,
  onToggleSound,
  evasiveNo,
  onToggleEvasive,
  onReset,
  currentTheme,
  onChangeTheme,
  recipientName,
}: ControlsHeaderProps) => {
  const themes: ThemeId[] = ['rose', 'lavender', 'peach', 'midnight', 'mint', 'sunset'];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-2.5 sm:pt-4 pb-2 flex items-center justify-between gap-2 pointer-events-none"
      style={{
        paddingTop: 'max(0.6rem, env(safe-area-inset-top))',
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
      }}
    >
      {/* Left: Question switcher button + Creator Badge */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={onOpenPicker}
          className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-white/70 shadow-[0_4px_20px_rgba(0,0,0,0.06)] text-gray-800 hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-all group active:scale-95 cursor-pointer"
          title="Change Question or Category"
        >
          <span className="text-base sm:text-lg group-hover:scale-110 transition-transform">
            {currentPreset.emoji}
          </span>
          <div className="flex flex-col text-left">
            <span className="text-[9px] sm:text-[10px] uppercase font-extrabold tracking-wider text-rose-500">
              {recipientName ? `To: ${recipientName}` : 'Question'}
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-900 max-w-[110px] xs:max-w-[140px] sm:max-w-[210px] truncate leading-tight">
              {currentPreset.question}
            </span>
          </div>
          <ListFilter className="w-3.5 h-3.5 text-gray-400 group-hover:text-rose-500 transition-colors ml-0.5 sm:ml-1 shrink-0" />
        </button>

        {/* Creator tag: Credit to hxni */}
        <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-[11px] font-semibold text-gray-700 shadow-sm">
          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
          <span>by</span>
          <span className="font-extrabold text-rose-600 tracking-wide">hxni</span>
        </div>
      </div>

      {/* Right controls: Share, Sound, Evasive Mode, Theme, Reset */}
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 bg-white/90 backdrop-blur-md border border-white/70 p-1 sm:p-1.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        {/* Share Button */}
        <button
          onClick={onOpenShare}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer"
          title="Share personalized link"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {/* Evasive Toggle */}
        <button
          onClick={onToggleEvasive}
          className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 cursor-pointer ${
            evasiveNo
              ? 'bg-purple-100 text-purple-700 border border-purple-200'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title={evasiveNo ? 'Runaway No: ON (No button dodges tap/mouse!)' : 'Runaway No: OFF'}
        >
          <Zap className={`w-3.5 h-3.5 ${evasiveNo ? 'fill-purple-500 text-purple-500' : ''}`} />
          <span className="hidden md:inline">Runaway</span>
        </button>

        {/* Theme quick picker */}
        <div className="relative group hidden sm:block">
          <button
            className="p-1.5 sm:p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition active:scale-95 cursor-pointer"
            title="Change Theme"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
          </button>
          <div className="absolute right-0 top-full mt-2 hidden group-hover:flex flex-col bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 p-1.5 gap-1 min-w-[150px] z-50 animate-fade-in">
            {themes.map((th) => (
              <button
                key={th}
                onClick={() => onChangeTheme(th)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold text-left flex items-center justify-between transition cursor-pointer ${
                  currentTheme === th
                    ? 'bg-rose-50 text-rose-600 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{THEME_CONFIGS[th].name}</span>
                <span className="text-sm">{THEME_CONFIGS[th].floatingSymbols[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className="p-1.5 sm:p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition active:scale-95 cursor-pointer"
          title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="p-1.5 sm:p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-rose-600 transition active:scale-95 cursor-pointer"
          title="Restart / Try Again"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
