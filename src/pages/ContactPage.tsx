import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { SiteContent } from '../types';
import { Reveal } from '../components/Reveal';
import { useEmailModal } from '../components/EmailModal';

interface ContactPageProps {
  content: SiteContent;
}

const INQUIRY_CATEGORIES = [
  'General Corporate Inquiry',
  'Decarbonization Engineering Services',
  'Carbon Credit Project Collaboration',
  'Blue Carbon & Mangrove Restoration',
  'AI-Driven Environmental Monitoring',
  'Investment & Climate Finance Partnership',
  'Government & Regulatory Engagement',
  'Community & Sustainability Relations',
];

export const ContactPage: React.FC<ContactPageProps> = ({ content }) => {
  const { openEmailModal } = useEmailModal();
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subjectOrInterest, setSubjectOrInterest] = useState(INQUIRY_CATEGORIES[0]);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMsg('Please enter a message of at least 10 characters.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          fullName,
          organization,
          email,
          phone,
          subjectOrInterest,
          message,
          website_hp: honeypot,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || 'Unable to submit message. Please verify your inputs.');
      } else {
        setSuccessMsg(json.message);
        setFullName('');
        setOrganization('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch {
      setErrorMsg(
        'Connection error while submitting form. Please use the direct email link below (terranovaenergylimited@gmail.com).'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-[#2C1A11] text-[#FBF9F5] border-b border-[#D99B26]/30 py-14 md:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up">
            <div className="flex items-center gap-3 text-xs font-mono-tabular uppercase tracking-widest text-[#D99B26]">
              <img
                src={content.logoUrl}
                alt="TerraNova Energy Logo"
                referrerPolicy="no-referrer"
                className="h-8 w-auto object-contain rounded bg-white/10 p-0.5"
              />
              <span>Contact {content.companyName} · RC {content.rcNumber}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 max-w-3xl">
              Connect With Our Offices in Port Harcourt and Abuja
            </h1>
            <p className="text-base sm:text-lg text-stone-300 mt-4 max-w-2xl leading-relaxed">
              Reach TerraNova Energy Limited for technical consultations, project collaborations, regulatory correspondence, or community engagement inquiries.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Contact Directory & Form */}
      <section className="py-16 md:py-24 bg-[#FBF9F5] border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Confirmed Corporate Details */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal variant="fade-up">
                <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200/90 space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={content.logoUrl}
                        alt="TerraNova Energy Limited"
                        referrerPolicy="no-referrer"
                        className="h-10 w-auto object-contain rounded"
                      />
                      <div>
                        <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#14532D] font-semibold">
                          Official Corporate Directory
                        </div>
                        <h2 className="font-display text-xl font-bold text-[#2C1A11]">
                          {content.companyName}
                        </h2>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs font-mono-tabular text-stone-600">
                      <ShieldCheck className="w-4 h-4 text-[#14532D]" />
                      <span>Company Registration — RC Number: {content.rcNumber}</span>
                    </div>
                  </div>

                  <div className="space-y-5 pt-4 border-t border-stone-200">
                    {/* Corporate Head Office */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-[#14532D]/10 text-[#14532D] flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-mono-tabular uppercase tracking-wider text-stone-500 font-semibold">
                          Corporate Head Office
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-[#2C1A11] mt-0.5">
                          {content.headOffice}
                        </p>
                      </div>
                    </div>

                    {/* Regional Office */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-[#14532D]/10 text-[#14532D] flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-mono-tabular uppercase tracking-wider text-stone-500 font-semibold">
                          Regional Office
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-[#2C1A11] mt-0.5">
                          {content.regionalOffice}
                        </p>
                      </div>
                    </div>

                    {/* Telephone */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-[#14532D]/10 text-[#14532D] flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-mono-tabular uppercase tracking-wider text-stone-500 font-semibold">
                          Telephone
                        </h3>
                        <a
                          href="tel:+2347016504968"
                          aria-label="Call TerraNova Energy Limited at +234 701 650 4968"
                          className="text-sm sm:text-base font-mono-tabular font-semibold text-[#14532D] hover:text-[#2C1A11] transition-colors mt-0.5 inline-block"
                        >
                          {content.phone}
                        </a>
                      </div>
                    </div>

                    {/* Official Email */}
                    <div className="flex items-start gap-3.5">
                      <a
                        href="mailto:terranovaenergylimited@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          openEmailModal();
                        }}
                        aria-label="Email TerraNova Energy Limited directly"
                        title="Email TerraNova Energy Limited directly"
                        className="w-9 h-9 rounded-lg bg-[#14532D]/10 hover:bg-[#14532D] text-[#14532D] hover:text-white flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <div>
                        <h3 className="text-xs font-mono-tabular uppercase tracking-wider text-stone-500 font-semibold">
                          Official Email Address
                        </h3>
                        <a
                          href="mailto:terranovaenergylimited@gmail.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.preventDefault();
                            openEmailModal();
                          }}
                          aria-label="Email TerraNova Energy Limited directly"
                          title="Email TerraNova Energy Limited directly"
                          className="text-sm sm:text-base font-semibold text-[#14532D] hover:text-[#2C1A11] break-all transition-colors mt-0.5 inline-block cursor-pointer"
                        >
                          terranovaenergylimited@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Direct Email Action Buttons */}
                  <div className="pt-4 border-t border-stone-200 space-y-2.5">
                    <a
                      href="mailto:terranovaenergylimited@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        openEmailModal('Corporate General Inquiry');
                      }}
                      aria-label="Email TerraNova Energy Limited directly"
                      title="Email TerraNova Energy Limited directly"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#2C1A11] bg-[#D99B26] hover:bg-[#e5a932] rounded-lg transition-colors cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Us an Email</span>
                    </a>

                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=terranovaenergylimited@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Compose in Gmail to terranovaenergylimited@gmail.com"
                      title="Compose in Gmail to terranovaenergylimited@gmail.com"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                    >
                      <span className="w-4 h-4 rounded bg-red-600 text-white flex items-center justify-center font-bold text-[10px]">M</span>
                      <span>Open Directly in Gmail</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <Reveal variant="fade-up" delayMs={100}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-stone-200">
                  <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#14532D] font-semibold">
                    Direct Inquiry Submission
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C1A11] mt-1">
                    Send an Inquiry to TerraNova Energy Limited
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 mb-6">
                    Complete the form below to log your message, or click any email button to open{' '}
                    <a
                      href="mailto:terranovaenergylimited@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        openEmailModal();
                      }}
                      aria-label="Email TerraNova Energy Limited directly"
                      className="text-[#14532D] font-semibold underline cursor-pointer"
                    >
                      terranovaenergylimited@gmail.com
                    </a>{' '}
                    directly.
                  </p>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {successMsg && (
                    <div
                      role="status"
                      className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm space-y-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="font-medium">{successMsg}</span>
                      </div>
                      <div className="pl-6">
                        <a
                          href="mailto:terranovaenergylimited@gmail.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.preventDefault();
                            openEmailModal();
                          }}
                          aria-label="Email TerraNova Energy Limited directly"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14532D] underline cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Also open email client (terranovaenergylimited@gmail.com)</span>
                        </a>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="contact-hp">Company Website</label>
                      <input
                        id="contact-hp"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-fullname"
                          className="block text-xs font-semibold text-[#2C1A11] mb-1.5"
                        >
                          Full Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="contact-fullname"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-lg focus:bg-white focus:outline-2 focus:outline-[#14532D]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-org"
                          className="block text-xs font-semibold text-[#2C1A11] mb-1.5"
                        >
                          Organization (Optional)
                        </label>
                        <input
                          id="contact-org"
                          type="text"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="Company or Agency Name"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-lg focus:bg-white focus:outline-2 focus:outline-[#14532D]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold text-[#2C1A11] mb-1.5"
                        >
                          Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-lg focus:bg-white focus:outline-2 focus:outline-[#14532D]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-semibold text-[#2C1A11] mb-1.5"
                        >
                          Phone Number (Optional)
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+234 ..."
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-lg focus:bg-white focus:outline-2 focus:outline-[#14532D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-semibold text-[#2C1A11] mb-1.5"
                      >
                        Subject or Inquiry Category <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="contact-subject"
                        value={subjectOrInterest}
                        onChange={(e) => setSubjectOrInterest(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-lg focus:bg-white focus:outline-2 focus:outline-[#14532D]"
                      >
                        {INQUIRY_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-[#2C1A11] mb-1.5"
                      >
                        Message <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can TerraNova Energy Limited assist or collaborate with you?"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-lg focus:bg-white focus:outline-2 focus:outline-[#14532D]"
                      />
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] disabled:opacity-60 rounded-lg transition-colors cursor-pointer"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Inquiry</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      {/* Direct Mailto link */}
                      <a
                        href="mailto:terranovaenergylimited@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          openEmailModal();
                        }}
                        aria-label="Email TerraNova Energy Limited directly"
                        title="Email TerraNova Energy Limited directly"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2C1A11] hover:text-[#14532D] transition-colors cursor-pointer"
                      >
                        <Mail className="w-4 h-4 text-[#14532D]" />
                        <span>Direct Email: terranovaenergylimited@gmail.com</span>
                      </a>
                    </div>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
