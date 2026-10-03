import { useState } from 'react';
import { Copy, Check, Share2, MessageCircle, X, Sparkles, Heart } from 'lucide-react';
import { QuestionPreset } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPreset: QuestionPreset;
  recipientName: string;
  onRecipientNameChange: (name: string) => void;
  evasiveNo: boolean;
}

export const ShareModal = ({
  isOpen,
  onClose,
  currentPreset,
  recipientName,
  onRecipientNameChange,
  evasiveNo,
}: ShareModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Build the shareable URL
  const baseUrl = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();
  params.set('q', currentPreset.id);
  if (recipientName.trim()) {
    params.set('to', recipientName.trim());
  }
  if (evasiveNo) {
    params.set('evasive', '1');
  }

  const shareUrl = `${baseUrl}?${params.toString()}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentPreset.question,
          text: recipientName
            ? `Hey ${recipientName}, I have a special question for you! 💖 (by hxni)`
            : `I have a special question for you! 💖 (by hxni)`,
          url: shareUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  const shareText = encodeURIComponent(
    recipientName
      ? `Hey ${recipientName}! ${currentPreset.question} 🥺👉👈 (by hxni) Answer here: ${shareUrl}`
      : `Hey! ${currentPreset.question} 🥺👉👈 (by hxni) Answer here: ${shareUrl}`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(currentPreset.question + ' 💖')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-sm animate-fade-in select-auto">
      <div
        className="relative w-full max-w-md max-h-[90dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-rose-100/80 text-gray-800 animate-slide-up overscroll-contain"
        style={{
          paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 1rem))',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
        }}
      >
        {/* iOS Drag Handle on Mobile */}
        <div className="sm:hidden w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 mb-1.5 text-rose-600 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Personalize & Send</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-1">
          Share Your Question 💌
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-4">
          Add their name to display a personal greeting on their screen!
        </p>

        {/* Recipient Name Input */}
        <div className="mb-4">
          <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Recipient's Name or Nickname
          </label>
          <input
            type="text"
            placeholder="e.g. Sarah, Babe, Honey, Alex..."
            value={recipientName}
            onChange={(e) => onRecipientNameChange(e.target.value)}
            maxLength={30}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-base sm:text-sm transition font-medium text-gray-900 bg-gray-50/50 focus:bg-white"
          />
        </div>

        {/* Link preview & Copy */}
        <div className="mb-4">
          <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Your Custom Share Link
          </label>
          <div className="flex items-center gap-2 rounded-xl bg-gray-100/80 border border-gray-200 p-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full bg-transparent text-xs text-gray-700 outline-none select-all font-mono"
            />
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-sm shrink-0 cursor-pointer ${
                copied
                  ? 'bg-emerald-600 hover:bg-emerald-700 scale-105'
                  : 'bg-rose-500 hover:bg-rose-600 active:scale-95'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Quick share actions */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold transition border border-green-200 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-green-600" />
            WhatsApp
          </a>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition border border-sky-200 active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-sky-600" />
            Telegram
          </a>
        </div>

        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="w-full mt-2.5 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            Share via iOS / Android Share Sheet
          </button>
        )}

        {/* Credit to hxni */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>by</span>
          <span className="font-extrabold text-rose-600 tracking-wide">hxni</span>
        </div>
      </div>
    </div>
  );
};
