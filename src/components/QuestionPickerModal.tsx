import { useState, type FormEvent } from 'react';
import {
  X,
  Search,
  Dices,
  Sparkles,
  Heart,
  PlusCircle,
  CheckCircle2,
} from 'lucide-react';
import { QuestionPreset, CategoryId, ThemeId } from '../types';
import { CATEGORIES, THEME_CONFIGS, COMMON_LOVE_PLEADINGS } from '../data/questions';

interface QuestionPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  presets: QuestionPreset[];
  currentPreset: QuestionPreset;
  onSelectPreset: (preset: QuestionPreset) => void;
  onSelectCustom: (customPreset: QuestionPreset) => void;
}

export const QuestionPickerModal = ({
  isOpen,
  onClose,
  presets,
  currentPreset,
  onSelectPreset,
  onSelectCustom,
}: QuestionPickerModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all' | 'custom'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Custom question state
  const [customQuestion, setCustomQuestion] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [customYesText, setCustomYesText] = useState('Yes! Absolutely! ❤️');
  const [customNoText, setCustomNoText] = useState('No');
  const [customCelebTitle, setCustomCelebTitle] = useState('WOOHOO! Best answer ever! 🎉');
  const [customCelebSubtitle, setCustomCelebSubtitle] = useState('I knew you would say yes! ❤️');
  const [customTheme, setCustomTheme] = useState<ThemeId>('rose');

  if (!isOpen) return null;

  // Filter presets
  const filteredPresets = presets.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      p.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleRandomSelect = () => {
    const randomPreset = presets[Math.floor(Math.random() * presets.length)];
    onSelectPreset(randomPreset);
    onClose();
  };

  const handleCreateCustom = (e: FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    const newPreset: QuestionPreset = {
      id: `custom-${Date.now()}`,
      category: 'custom',
      question: customQuestion.trim(),
      subtitle: customSubtitle.trim() || undefined,
      emoji: '✨',
      yesText: customYesText.trim() || 'Yes!',
      noText: customNoText.trim() || 'No',
      pleadingPhrases: COMMON_LOVE_PLEADINGS,
      celebrationTitle: customCelebTitle.trim() || 'WOOHOO! 🎉',
      celebrationSubtitle: customCelebSubtitle.trim() || 'So happy right now! ❤️',
      askGif: `${import.meta.env.BASE_URL || './'}gifs/flowerBear.gif`,
      celebrateGif: `${import.meta.env.BASE_URL || './'}gifs/kisses.gif`,
      theme: customTheme,
    };

    onSelectCustom(newPreset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[92dvh] sm:max-h-[85vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-rose-100 overflow-hidden text-gray-800"
        style={{
          paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))',
        }}
      >
        {/* iOS Drag Handle on Mobile */}
        <div className="sm:hidden w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2 shrink-0" />

        {/* Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-rose-50/70 via-purple-50/60 to-pink-50/70 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-rose-600 font-extrabold text-[11px] tracking-wider uppercase mb-0.5">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Question Library</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-gray-900 leading-tight">
              Select or Create a Question
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomSelect}
              title="Pick Random Question"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm active:scale-95 cursor-pointer"
            >
              <Dices className="w-4 h-4 text-purple-600" />
              <span className="hidden xs:inline">Random</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search bar & Category filters */}
        <div className="px-4 sm:px-6 pt-3 pb-2.5 border-b border-gray-100 bg-white space-y-2.5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions (e.g. love, forgive, boba, marry)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100 outline-none text-base sm:text-sm font-medium transition"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🌟 All ({presets.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            ))}
            <button
              onClick={() => setSelectedCategory('custom')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedCategory === 'custom'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:opacity-90 border border-purple-200'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>✍️ Custom</span>
            </button>
          </div>
        </div>

        {/* Question Grid or Custom Builder */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[60dvh] flex-1 bg-gray-50/60 -webkit-overflow-scrolling-touch">
          {selectedCategory === 'custom' ? (
            <form onSubmit={handleCreateCustom} className="space-y-4 max-w-lg mx-auto bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Create Your Own Question</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Your Question *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Will you go to prom with me? / Can I steal a hug?"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-base sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Subtitle / Tease (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Say yes or I’ll cry 🥺"
                  value={customSubtitle}
                  onChange={(e) => setCustomSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-base sm:text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Yes Button Text
                  </label>
                  <input
                    type="text"
                    value={customYesText}
                    onChange={(e) => setCustomYesText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-rose-500 text-base sm:text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    No Button Text
                  </label>
                  <input
                    type="text"
                    value={customNoText}
                    onChange={(e) => setCustomNoText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-rose-500 text-base sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Celebration Message (When Yes is clicked)
                </label>
                <input
                  type="text"
                  value={customCelebTitle}
                  onChange={(e) => setCustomCelebTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-rose-500 text-base sm:text-sm outline-none mb-2"
                />
                <input
                  type="text"
                  value={customCelebSubtitle}
                  onChange={(e) => setCustomCelebSubtitle(e.target.value)}
                  placeholder="Subtitle for celebration screen"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-rose-500 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Color Theme
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(Object.keys(THEME_CONFIGS) as ThemeId[]).map((thm) => (
                    <button
                      type="button"
                      key={thm}
                      onClick={() => setCustomTheme(thm)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition text-left flex items-center justify-between cursor-pointer ${
                        customTheme === thm
                          ? 'border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-200'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{THEME_CONFIGS[thm].name}</span>
                      {customTheme === thm && <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black text-sm shadow-md transition active:scale-95 cursor-pointer"
              >
                Use Custom Question ✨
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
              {filteredPresets.map((preset) => {
                const isCurrent = currentPreset.id === preset.id;
                const catInfo = CATEGORIES.find((c) => c.id === preset.category);

                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      onSelectPreset(preset);
                      onClose();
                    }}
                    className={`relative cursor-pointer p-4 rounded-2xl border transition-all duration-200 text-left flex flex-col justify-between group active:scale-[0.98] ${
                      isCurrent
                        ? 'border-rose-500 bg-rose-50/80 shadow-md ring-2 ring-rose-300'
                        : 'border-gray-200/90 bg-white hover:border-rose-300 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{preset.emoji}</span>
                        {catInfo && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${catInfo.badgeColor}`}
                          >
                            {catInfo.name}
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-gray-900 group-hover:text-rose-600 transition leading-snug">
                        {preset.question}
                      </h4>
                      {preset.subtitle && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1 font-medium">
                          {preset.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                      <span className="text-[11px] font-bold text-emerald-600 truncate max-w-[170px]">
                        Yes: {preset.yesText}
                      </span>
                      {isCurrent && (
                        <span className="flex items-center gap-1 text-rose-600 font-extrabold text-[11px] shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredPresets.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500">
                  <p className="text-sm font-medium">No questions found matching your search.</p>
                  <button
                    onClick={() => setSelectedCategory('custom')}
                    className="mt-2 text-rose-500 font-bold text-xs hover:underline cursor-pointer"
                  >
                    Create a custom question instead &rarr;
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with Credit to hxni */}
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-500 font-medium shrink-0 flex items-center justify-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>by</span>
          <span className="font-extrabold text-rose-600 tracking-wide">hxni</span>
        </div>
      </div>
    </div>
  );
};
