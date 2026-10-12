import React, { useState } from 'react';
import {
  ArrowRight,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Handshake,
} from 'lucide-react';
import { SiteContent } from '../types';
import { Reveal } from '../components/Reveal';
import { useEmailModal } from '../components/EmailModal';

interface PartnershipsPageProps {
  content: SiteContent;
  navigate: (path: string) => void;
}

const INTEREST_AREAS = [
  'Carbon Project Collaboration',
  'Joint Ventures & Project Equity',
  'Renewable Energy Development',
  'Technical Partnerships & Engineering',
  'Technology Transfer & dMRV',
  'Environmental Research & Monitoring',
  'Climate Funding & Institutional Finance',
  'ESG Collaboration',
  'Community-Based Sustainability Initiatives',
];

export const PartnershipsPage: React.FC<PartnershipsPageProps> = ({
  content,
  navigate,
}) => {
  const { openEmailModal } = useEmailModal();
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState(INTEREST_AREAS[0]);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please complete your name, email address, and partnership inquiry message.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'partnership',
          fullName,
          organization,
          email,
          phone,
          subjectOrInterest: areaOfInterest,
          message,
          website_hp: honeypot,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || 'Could not submit inquiry. Please check your inputs.');
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
        'Network error while communicating with the server. You can also reach us directly at terranovaenergylimited@gmail.com.'
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
              <span>Institutional Collaborations & Joint Ventures · RC {content.rcNumber}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 max-w-3xl">
              Strategic Partnerships for Climate Finance, Clean Energy & Carbon Solutions
            </h1>
            <p className="text-base sm:text-lg text-stone-300 mt-4 max-w-2xl leading-relaxed">
              {content.partnershipIntro}
            </p>
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <a
                href="mailto:terranovaenergylimited@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openEmailModal('Strategic Partnership Inquiry');
                }}
                aria-label="Email TerraNova Energy Limited directly"
                title="Email TerraNova Energy Limited directly"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#D99B26]" />
                <span>Email Partnership Desk</span>
              </a>
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#2C1A11] bg-[#D99B26] hover:bg-[#e5a932] rounded-lg transition-colors cursor-pointer"
              >
                <span>Discuss a Partnership</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Collaboration Verticals */}
      <section className="py-16 md:py-24 bg-[#FBF9F5] border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up">
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                Collaboration Verticals
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C1A11] mt-2">
                Opportunities for Institutional & Technical Collaboration
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-2">
                We structure partnerships across nine core areas spanning carbon project development, renewable energy infrastructure, technology transfer, ESG programmes, and community resilience.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.partnershipOpportunities.map((opp, idx) => (
              <Reveal key={opp.id} variant="fade-up" delayMs={idx * 70}>
                <div className="bg-white rounded-xl p-6 border border-stone-200/90 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono-tabular text-[#14532D] font-semibold">
                      0{idx + 1} · {opp.sector}
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#2C1A11] mt-2">
                      {opp.title}
                    </h3>
                    <p className="text-sm text-stone-700 leading-relaxed mt-3">
                      {opp.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How Potential Partners Can Express Interest + Inquiry Form */}
      <section className="py-16 md:py-24 bg-[#F3EFE6]/70">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Engagement Process */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal variant="fade-up">
                <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                  Engagement Protocol
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C1A11] mt-2">
                  How Prospective Partners Can Express Interest
                </h2>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-3">
                  Whether you represent an international climate fund, an energy operator in Nigeria, an environmental research institute, or a clean-tech engineering provider, we follow a structured four-step onboarding dialogue:
                </p>
              </Reveal>

              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    title: 'Submit Expression of Interest',
                    desc: 'Use the partnership form on this page or email terranovaenergylimited@gmail.com directly.',
                  },
                  {
                    step: '02',
                    title: 'Introductory Scoping Briefing',
                    desc: 'Our team in Port Harcourt or Abuja schedules a technical and strategic call to align on objectives and governance standards.',
                  },
                  {
                    step: '03',
                    title: 'Mutual Due Diligence & Technical Review',
                    desc: 'Where appropriate, parties exchange non-disclosure documentation to review baseline studies and engineering data.',
                  },
                  {
                    step: '04',
                    title: 'Joint Framework or MoU Structuring',
                    desc: 'Define clear roles, milestones, and monitoring responsibilities prior to project execution.',
                  },
                ].map((item, idx) => (
                  <Reveal key={item.step} variant="fade-up" delayMs={idx * 70}>
                    <div className="bg-white rounded-xl p-5 border border-stone-200/90">
                      <div className="text-xs font-mono-tabular text-[#D99B26] font-semibold">
                        Step {item.step}
                      </div>
                      <h3 className="font-display text-base font-bold text-[#2C1A11] mt-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="mailto:terranovaenergylimited@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openEmailModal('Partnership Discussion');
                  }}
                  aria-label="Email TerraNova Energy Limited directly"
                  title="Email TerraNova Energy Limited directly"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#14532D] hover:text-[#2C1A11] transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#D99B26]" />
                  <span>Direct Email: terranovaenergylimited@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Right Column: Partnership Inquiry Form */}
            <div className="lg:col-span-7">
              <Reveal variant="fade-up" delayMs={120}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-xs">
                  <div className="flex items-center gap-2.5 text-[#14532D] text-xs font-mono-tabular uppercase tracking-wider font-semibold mb-2">
                    <Handshake className="w-4 h-4" />
                    <span>Partnership Expression of Interest</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#2C1A11]">
                    Submit a Partnership Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 mb-6">
                    Submissions are recorded directly in TerraNova Energy Limited’s secure database for review by our corporate and technical team.
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
                            openEmailModal('Partnership Inquiry Follow-up');
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
                      <label htmlFor="partner-hp">Website</label>
                      <input
                        id="partner-hp"
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
                          htmlFor="partner-name"
                          className="block text-xs font-semibold text-[#2C1A11] mb-1.5"
                        >
                          Full Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="partner-name"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g., Dr. Chidi Okonkwo"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-lg focus:bg-white focus:outline-2 focus:outline-[#14532D]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="partner-org"
                          className="block text-xs font-semibold text-[#2C1A11] mb-1.5"
                        >
                          Organization / Institution <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="partner-org"
                          type="text"
                          required
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="Company, Agency, or Fund Name"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-lg focus:bg-white focus:outline-2 focus:outline-[#14532D]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="partner-email"
                          className="block text-xs font-semibold text-[#2C1A11] mb-1.5"
                        >
                          Official Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="partner-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@organization.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-lg focus:bg-white focus:outline-2 focus:outline-[#14532D]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="partner-phone"
                          className="block text-xs font-semibold text-[#2C1A11] mb-1.5"
                        >
                          Telephone Number (Optional)
                        </label>
                        <input
                          id="partner-phone"
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
                        htmlFor="partner-interest"
                        className="block text-xs font-semibold text-[#2C1A11] mb-1.5"
                      >
                        Primary Area of Partnership Interest <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="partner-interest"
                        value={areaOfInterest}
                        onChange={(e) => setAreaOfInterest(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-stone-300 rounded-lg focus:bg-white focus:outline-2 focus:outline-[#14532D]"
                      >
                        {INTEREST_AREAS.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="partner-message"
                        className="block text-xs font-semibold text-[#2C1A11] mb-1.5"
                      >
                        Partnership Proposal or Inquiry Summary <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="partner-message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your proposed collaboration scope..."
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
                            <span>Recording Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Partnership Inquiry</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      {/* Direct Mailto Link */}
                      <a
                        href="mailto:terranovaenergylimited@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          openEmailModal('Partnership Direct Inquiry');
                        }}
                        aria-label="Email TerraNova Energy Limited directly"
                        title="Email TerraNova Energy Limited directly"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2C1A11] hover:text-[#14532D] transition-colors cursor-pointer"
                      >
                        <Mail className="w-4 h-4 text-[#14532D]" />
                        <span>Or email directly: terranovaenergylimited@gmail.com</span>
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
