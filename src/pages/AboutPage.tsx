import React from 'react';
import { MapPin, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { SiteContent } from '../types';
import { Reveal } from '../components/Reveal';
import { ResilientImage } from '../components/ResilientImage';
import { useEmailModal } from '../components/EmailModal';

interface AboutPageProps {
  content: SiteContent;
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ content, navigate }) => {
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
              <span>About {content.companyName} · RC {content.rcNumber}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 max-w-3xl">
              Advancing Energy Transition and Environmental Stewardship in Nigeria
            </h1>
            <p className="text-base sm:text-lg text-stone-300 mt-4 max-w-2xl leading-relaxed">
              Positioned across Port Harcourt and Abuja to connect decarbonization engineering, renewable energy development, carbon project structuring, and coastal ecosystem restoration.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Company Overview & Strategic Positioning */}
      <section className="py-16 md:py-24 bg-[#FBF9F5] border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <Reveal variant="fade-up">
                <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                  01 · Corporate Overview & Strategic Positioning
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C1A11] mt-2">
                  Practical Pathways for Lower-Carbon Operations and Ecosystem Recovery
                </h2>
              </Reveal>

              <Reveal variant="fade-up" delayMs={80}>
                <p className="text-base text-stone-700 leading-relaxed">
                  {content.aboutOverview}
                </p>
              </Reveal>

              <Reveal variant="fade-up" delayMs={140}>
                <p className="text-base text-stone-700 leading-relaxed">
                  {content.aboutPositioning}
                </p>
              </Reveal>

              {/* Vision & Mission Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <Reveal variant="fade-up" delayMs={180}>
                  <div className="bg-white rounded-xl p-6 border border-stone-200/90 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#14532D] font-semibold">
                        Proposed Vision Statement
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#2C1A11] mt-2">
                        Our Vision
                      </h3>
                      <p className="text-sm text-stone-700 leading-relaxed mt-3">
                        “{content.visionStatement}”
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal variant="fade-up" delayMs={240}>
                  <div className="bg-white rounded-xl p-6 border border-stone-200/90 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#D99B26] font-semibold">
                        Proposed Mission Statement
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#2C1A11] mt-2">
                        Our Mission
                      </h3>
                      <p className="text-sm text-stone-700 leading-relaxed mt-3">
                        “{content.missionStatement}”
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <Reveal variant="scale-in" delayMs={120}>
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <ResilientImage
                      src={content.servicesFeaturedImage}
                      alt={content.servicesFeaturedImageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-[#F3EFE6]/60 border-t border-stone-200/80">
                    <p className="text-xs font-serif italic text-stone-600">
                      TerraNova Energy Limited operations and strategic technical solutions in Nigeria.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="fade-up" delayMs={200}>
                <div className="bg-[#F3EFE6] rounded-xl p-6 border border-stone-200/90 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#2C1A11] font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#14532D]" />
                    <span>Corporate Registration & Governance</span>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between py-1.5 border-b border-stone-300/70">
                      <dt className="text-stone-600">Registered Name</dt>
                      <dd className="font-semibold text-[#2C1A11]">{content.companyName}</dd>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-stone-300/70">
                      <dt className="text-stone-600">CAC Registration</dt>
                      <dd className="font-mono-tabular font-semibold text-[#14532D]">
                        RC {content.rcNumber}
                      </dd>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <dt className="text-stone-600">Jurisdiction</dt>
                      <dd className="font-medium text-[#2C1A11]">Federal Republic of Nigeria</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-[#F3EFE6]/70 border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up">
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                02 · Guiding Principles
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C1A11] mt-2">
                Our Core Values
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-2">
                Six institutional commitments that govern our technical work, stakeholder relationships, and environmental initiatives.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.coreValues.map((val, idx) => (
              <Reveal key={val.id} variant="fade-up" delayMs={idx * 70}>
                <div className="bg-white rounded-xl p-6 border border-stone-200/90 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono-tabular text-[#D99B26] font-semibold">
                      0{idx + 1} · Core Value
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#2C1A11] mt-2">
                      {val.title}
                    </h3>
                    <p className="text-sm text-stone-700 leading-relaxed mt-3">
                      {val.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Confirmed Corporate & Regional Offices */}
      <section className="py-16 md:py-20 bg-[#2C1A11] text-[#FBF9F5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-3">
                <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#D99B26]">
                  Confirmed Office Locations
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Corporate Presence in Port Harcourt and Abuja
                </h2>
                <p className="text-sm text-stone-300 leading-relaxed">
                  Reach our team directly via telephone, email, or our institutional inquiry portal.
                </p>
                <div className="pt-3 flex flex-wrap items-center gap-3">
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
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#D99B26]" />
                    <span>Email Us Directly</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#2C1A11] bg-[#D99B26] hover:bg-[#e5a932] rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Contact Directory</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#3A2317] rounded-xl p-6 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-[#D99B26] text-xs font-mono-tabular uppercase">
                    <MapPin className="w-4 h-4" />
                    <span>Corporate Head Office</span>
                  </div>
                  <p className="font-display text-lg font-bold text-white">Port Harcourt</p>
                  <p className="text-sm text-stone-300">{content.headOffice}</p>
                  <div className="pt-2 border-t border-white/10 text-xs text-stone-300 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#D99B26]" />
                    <a href={`tel:${content.phone.replace(/\s+/g, '')}`} className="hover:text-white font-mono-tabular">
                      {content.phone}
                    </a>
                  </div>
                </div>

                <div className="bg-[#3A2317] rounded-xl p-6 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-[#D99B26] text-xs font-mono-tabular uppercase">
                    <MapPin className="w-4 h-4" />
                    <span>Regional Office</span>
                  </div>
                  <p className="font-display text-lg font-bold text-white">Abuja (FCT)</p>
                  <p className="text-sm text-stone-300">{content.regionalOffice}</p>
                  <div className="pt-2 border-t border-white/10 text-xs text-stone-300 flex items-center gap-2">
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
                      className="inline-flex items-center gap-2 hover:text-white break-all font-medium text-[#D99B26] cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#D99B26]" />
                      <span>terranovaenergylimited@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
