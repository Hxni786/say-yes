import { X, ShieldCheck, Heart, Lock, EyeOff, ServerOff } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg max-h-[90dvh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-rose-100 overflow-hidden text-gray-800"
        style={{
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
        }}
      >
        {/* iOS Drag Handle on Mobile */}
        <div className="sm:hidden w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2 shrink-0" />

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-rose-50/70 via-purple-50/60 to-pink-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 leading-tight">
                Privacy Policy
              </h2>
              <span className="text-[11px] font-semibold text-gray-500">
                100% Private & Client-Side • by hxni
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policy Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-600 -webkit-overflow-scrolling-touch leading-relaxed">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-emerald-900 font-bold mb-0.5">
                Zero Data Collection Guarantee
              </strong>
              Your messages, recipient names, and question responses are processed 100% locally in your browser. We never log, store, or transmit your private moments to any server.
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 mb-1">
              <ServerOff className="w-4 h-4 text-rose-500" />
              1. No Databases or External Logging
            </h4>
            <p>
              When you personalize a question (e.g. <code>?to=Sarah</code>), that name exists only in the link string. No remote database or analytics server tracks who sent or received the question.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 mb-1">
              <EyeOff className="w-4 h-4 text-purple-500" />
              2. No Trackers or Ads
            </h4>
            <p>
              This app has zero advertising trackers, zero third-party telemetry, and zero behavioral monitoring cookies.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              3. Local Storage Usage
            </h4>
            <p>
              The application uses your browser's local device storage only to save minor user preferences, such as your audio mute/unmute toggle. This data never leaves your device.
            </p>
          </div>

          <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500">
            For questions or licensing, contact the author and copyright owner <strong>hxni</strong>.
          </div>
        </div>

        {/* Modal Footer with Credit to hxni */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium shrink-0">
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>by</span>
            <span className="font-extrabold text-rose-600">hxni</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-gray-900 text-white font-bold text-xs hover:bg-gray-800 transition active:scale-95 cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
