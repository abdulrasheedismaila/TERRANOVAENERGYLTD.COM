import React from 'react';
import { CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import { SiteContent } from '../types';
import { Reveal } from '../components/Reveal';
import { ResilientImage } from '../components/ResilientImage';
import { IMG_MANGROVE } from '../initialData';
import { useEmailModal } from '../components/EmailModal';

interface CommunityPageProps {
  content: SiteContent;
  navigate: (path: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ content, navigate }) => {
  const { openEmailModal } = useEmailModal();
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
              <span>Community & Sustainability · {content.companyName}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 max-w-3xl">
              Inclusive Host-Community Engagement & Ecological Stewardship
            </h1>
            <p className="text-base sm:text-lg text-stone-300 mt-4 max-w-2xl leading-relaxed">
              Building respectful partnerships with Nigerian and Niger Delta communities through consultative dialogue, youth technical training, women’s participation, and mangrove biodiversity protection.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Intro & Visual Section */}
      <section className="py-16 md:py-24 bg-[#FBF9F5] border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <Reveal variant="fade-up">
                <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                  People & Ecosystems in Harmony
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C1A11] mt-2 leading-tight">
                  Respecting Local Priorities Across the Niger Delta and Host Regions
                </h2>
              </Reveal>
              <Reveal variant="fade-up" delayMs={80}>
                <p className="text-base text-stone-700 leading-relaxed">
                  {content.communityIntro}
                </p>
              </Reveal>
              <Reveal variant="fade-up" delayMs={140}>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Whether scoping a mangrove restoration corridor in coastal Rivers State or assessing solar hybridization opportunities, our methodology places local insight, transparent dialogue, and practical livelihood benefits at the core of project design.
                </p>
              </Reveal>
              <Reveal variant="fade-up" delayMs={180}>
                <div className="pt-2">
                  <a
                    href="mailto:terranovaenergylimited@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      openEmailModal('Community & Sustainability Inquiry');
                    }}
                    aria-label="Email TerraNova Energy Limited directly"
                    title="Email TerraNova Energy Limited directly"
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#D99B26]" />
                    <span>Email Community Desk</span>
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Reveal variant="scale-in" delayMs={100}>
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden h-full flex flex-col justify-between">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <ResilientImage
                      src={content.communityHeroImage}
                      alt={content.communityHeroAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3.5 bg-[#F3EFE6]/60 border-t border-stone-200/80 text-xs font-serif italic text-stone-600">
                    Community consultation and clean-energy technical training workshop in Nigeria.
                  </div>
                </div>
              </Reveal>

              <Reveal variant="scale-in" delayMs={180}>
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden h-full flex flex-col justify-between">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <ResilientImage
                      src={IMG_MANGROVE}
                      alt="Nigerian conservationists and community members restoring coastal mangrove wetlands"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3.5 bg-[#F3EFE6]/60 border-t border-stone-200/80 text-xs font-serif italic text-stone-600">
                    Participatory mangrove seedling propagation in Niger Delta tidal estuaries.
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Six Core Community & Sustainability Focus Areas */}
      <section className="py-16 md:py-24 bg-[#F3EFE6]/60 border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up">
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                Pillars of Responsible Engagement
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C1A11] mt-2">
                Community & Sustainability Framework
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.communitySections.map((sec, idx) => (
              <Reveal key={sec.id} variant="fade-up" delayMs={idx * 70}>
                <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200/90 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono-tabular text-[#14532D] font-semibold mb-2">
                      0{idx + 1} · {sec.statusNote}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#2C1A11]">
                      {sec.title}
                    </h3>
                    <p className="text-sm text-stone-700 leading-relaxed mt-3">
                      {sec.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100">
                    <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-stone-500 font-semibold mb-3">
                      Key Focus Points
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                      {sec.keyPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#14532D] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Community Dialogue CTA */}
      <section className="py-16 bg-[#2C1A11] text-[#FBF9F5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Engage With Our Community & Sustainability Team
            </h2>
            <p className="text-sm text-stone-300 mt-2">
              We welcome dialogue with community representatives, civil society organizations, environmental researchers, and development partners across Nigeria.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:terranovaenergylimited@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openEmailModal('Community & Sustainability Engagement');
              }}
              aria-label="Email TerraNova Energy Limited directly"
              title="Email TerraNova Energy Limited directly"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#D99B26]" />
              <span>Email Community Desk</span>
            </a>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#2C1A11] bg-[#D99B26] hover:bg-[#e5a932] rounded-lg transition-colors cursor-pointer"
            >
              <span>Contact Directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
