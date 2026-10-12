import React from 'react';
import { SiteContent } from '../types';
import { Reveal } from '../components/Reveal';
import { Mail } from 'lucide-react';
import { useEmailModal } from '../components/EmailModal';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  content: SiteContent;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, content }) => {
  const { openEmailModal } = useEmailModal();
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms and Conditions';
  const lastUpdated = isPrivacy
    ? content.privacyPolicyLastUpdated
    : content.termsLastUpdated;
  const bodyText = isPrivacy ? content.privacyPolicyText : content.termsText;

  return (
    <div>
      <section className="bg-[#2C1A11] text-[#FBF9F5] border-b border-[#D99B26]/30 py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up">
            <div className="flex items-center gap-3 text-xs font-mono-tabular uppercase tracking-widest text-[#D99B26]">
              <img
                src={content.logoUrl}
                alt="TerraNova Energy Logo"
                referrerPolicy="no-referrer"
                className="h-8 w-auto object-contain rounded bg-white/10 p-0.5"
              />
              <span>Legal & Governance · {content.companyName} (RC: {content.rcNumber})</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 font-mono-tabular">
              Last Reviewed / Updated: {lastUpdated}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#FBF9F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-6 sm:p-10 border border-stone-200 space-y-6">
            {bodyText.split('\n\n').map((block, idx) => (
              <p
                key={idx}
                className="text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-line"
              >
                {block}
              </p>
            ))}

            <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <img
                  src={content.logoUrl}
                  alt="TerraNova Energy Limited"
                  referrerPolicy="no-referrer"
                  className="h-6 w-auto object-contain rounded"
                />
                <span><strong>{content.companyName}</strong> · RC {content.rcNumber}</span>
              </div>
              <a
                href="mailto:terranovaenergylimited@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openEmailModal('Legal & Governance Inquiry');
                }}
                aria-label="Email TerraNova Energy Limited directly"
                title="Email TerraNova Energy Limited directly"
                className="inline-flex items-center gap-1.5 font-semibold text-[#14532D] hover:underline cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>terranovaenergylimited@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
