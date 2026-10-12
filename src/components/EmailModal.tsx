import React, { useState, createContext, useContext, useEffect } from 'react';
import {
  Mail,
  Copy,
  Check,
  X,
  ExternalLink,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface EmailModalContextType {
  isOpen: boolean;
  subject: string;
  openEmailModal: (subject?: string) => void;
  closeEmailModal: () => void;
}

const EmailModalContext = createContext<EmailModalContextType>({
  isOpen: false,
  subject: '',
  openEmailModal: () => {},
  closeEmailModal: () => {},
});

export const useEmailModal = () => useContext(EmailModalContext);

const OFFICIAL_EMAIL = 'terranovaenergylimited@gmail.com';

export const EmailModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [copied, setCopied] = useState(false);

  // Quick Send Form inside Modal
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderSubject, setSenderSubject] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  const openEmailModal = (initialSubject?: string) => {
    setSubject(initialSubject || '');
    setSenderSubject(initialSubject || '');
    setCopied(false);
    setShowQuickForm(false);
    setSendSuccess(null);
    setSendError(null);
    setIsOpen(true);
  };

  const closeEmailModal = () => {
    setIsOpen(false);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeEmailModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(OFFICIAL_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback copy
      const textArea = document.createElement('textarea');
      textArea.value = OFFICIAL_EMAIL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleQuickSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(null);
    setSendSuccess(null);

    if (!senderName.trim() || !senderEmail.trim() || !senderMessage.trim()) {
      setSendError('Please provide your name, email, and message.');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          fullName: senderName.trim(),
          email: senderEmail.trim(),
          subjectOrInterest: senderSubject.trim() || 'Website Email Inquiry',
          message: senderMessage.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSendError(data.error || 'Unable to send message. Please try opening Gmail or your mail app.');
      } else {
        setSendSuccess('Your message has been sent directly to terranovaenergylimited@gmail.com.');
        setSenderName('');
        setSenderEmail('');
        setSenderSubject('');
        setSenderMessage('');
      }
    } catch {
      setSendError('Network error. Please click "Open in Gmail" or "Open Mail App" above.');
    } finally {
      setSending(false);
    }
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    OFFICIAL_EMAIL
  )}${subject ? `&su=${encodeURIComponent(subject)}` : ''}`;

  const mailtoUrl = `mailto:${OFFICIAL_EMAIL}${
    subject ? `?subject=${encodeURIComponent(subject)}` : ''
  }`;

  const outlookComposeUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
    OFFICIAL_EMAIL
  )}${subject ? `&subject=${encodeURIComponent(subject)}` : ''}`;

  return (
    <EmailModalContext.Provider
      value={{
        isOpen,
        subject,
        openEmailModal,
        closeEmailModal,
      }}
    >
      {children}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
          onClick={closeEmailModal}
        >
          <div
            className="bg-[#FBF9F5] border border-stone-300 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden text-[#1C1917]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#2C1A11] text-white px-6 py-5 flex items-center justify-between border-b border-[#D99B26]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D99B26]/20 text-[#D99B26] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="email-modal-title" className="font-display text-lg font-bold">
                    Send Email to TerraNova Energy
                  </h3>
                  <p className="text-xs text-stone-300 font-mono-tabular">
                    RC: 9478210 · Port Harcourt & Abuja
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeEmailModal}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {/* Recipient Pill */}
              <div className="p-3.5 bg-white border border-stone-200 rounded-xl flex items-center justify-between gap-3 shadow-2xs">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-mono-tabular tracking-wider text-stone-500 font-semibold block">
                    Recipient Email Address
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#14532D] font-mono-tabular break-all">
                    {OFFICIAL_EMAIL}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  title="Copy email address"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons: Gmail, Default Mail, Webmail */}
              <div className="space-y-2.5">
                <p className="text-xs font-medium text-stone-600">
                  Choose how you would like to send your email:
                </p>

                {/* 1. Gmail Webmail (Highest Priority for Web Users) */}
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between p-3.5 rounded-xl bg-white hover:bg-red-50/60 border border-stone-300 hover:border-red-300 transition-all text-[#2C1A11] group shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm shrink-0">
                      M
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold flex items-center gap-2">
                        <span>Send via Gmail</span>
                        <span className="text-[10px] font-semibold bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                          Recommended
                        </span>
                      </div>
                      <div className="text-xs text-stone-500">
                        Opens Gmail web compose with {OFFICIAL_EMAIL}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-red-600 shrink-0" />
                </a>

                {/* 2. Default Email Application (mailto) */}
                <a
                  href={mailtoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between p-3.5 rounded-xl bg-white hover:bg-emerald-50/60 border border-stone-300 hover:border-[#14532D] transition-all text-[#2C1A11] group shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#14532D]/10 text-[#14532D] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold">
                        Open in Default Email App
                      </div>
                      <div className="text-xs text-stone-500">
                        Apple Mail, Microsoft Outlook, Thunderbird, etc.
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#14532D] shrink-0" />
                </a>

                {/* 3. Outlook.com Webmail */}
                <a
                  href={outlookComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between p-3 rounded-xl bg-white hover:bg-sky-50/60 border border-stone-300 hover:border-sky-400 transition-all text-[#2C1A11] group shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0">
                      O
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold">Send via Outlook Web</div>
                      <div className="text-[11px] text-stone-500">Outlook.com / Hotmail</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-sky-600 shrink-0" />
                </a>
              </div>

              {/* Separator / Quick In-App Message Option */}
              <div className="pt-2 border-t border-stone-200">
                {!showQuickForm ? (
                  <button
                    type="button"
                    onClick={() => setShowQuickForm(true)}
                    className="w-full py-2.5 px-4 rounded-xl border border-dashed border-stone-300 bg-white/70 hover:bg-white text-xs font-semibold text-stone-700 hover:text-[#14532D] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Or Send Message Online (Without Leaving This Page)</span>
                  </button>
                ) : (
                  <div className="bg-white p-4 rounded-xl border border-stone-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2C1A11]">
                        Quick Online Message to {OFFICIAL_EMAIL}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowQuickForm(false)}
                        className="text-[11px] text-stone-500 hover:text-stone-800"
                      >
                        Hide
                      </button>
                    </div>

                    {sendSuccess && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{sendSuccess}</span>
                      </div>
                    )}

                    {sendError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-900 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{sendError}</span>
                      </div>
                    )}

                    <form onSubmit={handleQuickSend} className="space-y-2.5">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-2 focus:outline-[#14532D]"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Your Email Address"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-2 focus:outline-[#14532D]"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Subject / Purpose"
                        value={senderSubject}
                        onChange={(e) => setSenderSubject(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-2 focus:outline-[#14532D]"
                      />
                      <textarea
                        rows={3}
                        placeholder="Your message to TerraNova Energy Limited..."
                        value={senderMessage}
                        onChange={(e) => setSenderMessage(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-2 focus:outline-[#14532D]"
                        required
                      />
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-2 px-4 rounded-lg bg-[#14532D] hover:bg-[#0F3F22] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {sending ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Message Now</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-stone-100 px-6 py-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span>TerraNova Energy Limited</span>
              <button
                type="button"
                onClick={closeEmailModal}
                className="text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </EmailModalContext.Provider>
  );
};
