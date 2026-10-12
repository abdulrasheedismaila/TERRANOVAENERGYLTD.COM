import React from 'react';
import { CheckCircle2, ArrowRight, Mail, Layers } from 'lucide-react';
import { SiteContent } from '../types';
import { Reveal } from '../components/Reveal';
import { ResilientImage } from '../components/ResilientImage';
import { useEmailModal } from '../components/EmailModal';

interface ServicesPageProps {
  content: SiteContent;
  navigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ content, navigate }) => {
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
              <span>Services & Technical Solutions · {content.companyName}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 max-w-3xl">
              Services and Technical Solutions
            </h1>
            <p className="text-base sm:text-lg text-stone-300 mt-4 max-w-2xl leading-relaxed">
              Four integrated service pillars supporting lower-carbon industrial operations, high-integrity carbon project development, coastal resilience, and geospatial environmental monitoring in Nigeria.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured Header Showcase Image Requested by User */}
      <section className="py-10 bg-[#F3EFE6] border-b border-stone-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="scale-in">
            <div className="rounded-2xl overflow-hidden border border-stone-300 bg-white shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto lg:h-[420px] w-full overflow-hidden bg-stone-900">
                  <ResilientImage
                    src={content.servicesFeaturedImage}
                    alt={content.servicesFeaturedImageAlt}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#14532D] font-semibold">
                    <img
                      src={content.logoUrl}
                      alt="TerraNova Energy Limited"
                      referrerPolicy="no-referrer"
                      className="h-6 w-auto object-contain rounded"
                    />
                    <span>TerraNova Energy Limited</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C1A11]">
                    Services and Technical Solutions
                  </h2>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    Engineering assessments, carbon project development, Niger Delta blue carbon ecosystem restoration, and AI geospatial environmental monitoring.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href="mailto:terranovaenergylimited@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        openEmailModal('Services & Technical Solutions Inquiry');
                      }}
                      aria-label="Email TerraNova Energy Limited directly"
                      title="Email TerraNova Energy Limited directly"
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-[#D99B26]" />
                      <span>Email Us: terranovaenergylimited@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quick Anchor Bar */}
      <section className="bg-white border-b border-stone-200 py-4">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-stone-700">
          <span className="font-mono-tabular text-xs uppercase text-stone-500">Jump to pillar:</span>
          {content.services.map((srv) => (
            <a
              key={srv.id}
              href={`#${srv.slug}`}
              className="hover:text-[#14532D] transition-colors py-1"
            >
              {srv.number}. {srv.title}
            </a>
          ))}
        </div>
      </section>

      {/* Four Detailed Service Categories */}
      <section className="py-14 md:py-24 bg-[#FBF9F5] divide-y divide-stone-200/90">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {content.services.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <article
                key={service.id}
                id={service.slug}
                className="pt-12 first:pt-0 scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                  {/* Text & Specifications Column */}
                  <div
                    className={`lg:col-span-7 space-y-6 ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <Reveal variant="fade-up">
                      <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                        Service Pillar {service.number}
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C1A11] mt-1">
                        {service.title}
                      </h2>
                      <p className="text-sm sm:text-base font-medium text-stone-600 mt-1">
                        {service.subtitle}
                      </p>
                    </Reveal>

                    <Reveal variant="fade-up" delayMs={80}>
                      <div className="space-y-3">
                        <h3 className="text-xs font-mono-tabular uppercase tracking-wider text-stone-500 font-semibold">
                          Service Overview
                        </h3>
                        <p className="text-base text-stone-700 leading-relaxed">
                          {service.overview}
                        </p>
                      </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                      {/* Key Benefits */}
                      <Reveal variant="fade-up" delayMs={130}>
                        <div className="bg-white rounded-xl p-5 border border-stone-200/90 h-full">
                          <h3 className="text-xs font-mono-tabular uppercase tracking-wider text-[#14532D] font-semibold mb-3">
                            Key Benefits
                          </h3>
                          <ul className="space-y-2.5 text-sm text-stone-700">
                            {service.benefits.map((b, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#14532D] shrink-0 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Reveal>

                      {/* Potential Applications */}
                      <Reveal variant="fade-up" delayMs={180}>
                        <div className="bg-[#F3EFE6]/70 rounded-xl p-5 border border-stone-200/90 h-full">
                          <h3 className="text-xs font-mono-tabular uppercase tracking-wider text-[#2C1A11] font-semibold mb-3">
                            Potential Applications
                          </h3>
                          <ul className="space-y-2.5 text-sm text-stone-700">
                            {service.applications.map((app, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Layers className="w-4 h-4 text-[#D99B26] shrink-0 mt-0.5" />
                                <span>{app}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Reveal>
                    </div>

                    {service.disclaimer && (
                      <Reveal variant="fade-up" delayMs={210}>
                        <div className="p-4 rounded-lg bg-[#F3EFE6] border border-stone-300 text-xs text-stone-700 leading-relaxed">
                          {service.disclaimer}
                        </div>
                      </Reveal>
                    )}

                    <Reveal variant="fade-up" delayMs={240}>
                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        <a
                          href="mailto:terranovaenergylimited@gmail.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.preventDefault();
                            openEmailModal(`Service Inquiry: ${service.title}`);
                          }}
                          aria-label={`Email TerraNova Energy Limited about ${service.title}`}
                          title="Email TerraNova Energy Limited"
                          className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors cursor-pointer"
                        >
                          <Mail className="w-4 h-4 text-[#D99B26]" />
                          <span>{service.ctaLabel}</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => navigate('/contact')}
                          className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#2C1A11] bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                        >
                          <span>Contact Page</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </Reveal>
                  </div>

                  {/* Image Column */}
                  <div
                    className={`lg:col-span-5 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <Reveal variant="scale-in" delayMs={120}>
                      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                        <div className="aspect-[4/3] w-full overflow-hidden">
                          <ResilientImage
                            src={service.imageUrl}
                            alt={service.imageAlt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 bg-[#F3EFE6]/60 border-t border-stone-200/80">
                          <p className="text-xs font-serif italic text-stone-600">
                            Fig. {service.number} — {service.imageAlt}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom Partnership CTA */}
      <section className="py-16 bg-[#2C1A11] text-[#FBF9F5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Need a Tailored Technical Assessment or Project Scoping Brief?
            </h2>
            <p className="text-sm sm:text-base text-stone-300 mt-2">
              Connect with our engineering and sustainability specialists in Port Harcourt or Abuja to discuss your operational requirements.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="mailto:terranovaenergylimited@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openEmailModal('Technical Assessment Scoping Brief');
              }}
              aria-label="Email TerraNova Energy Limited directly"
              title="Email TerraNova Energy Limited directly"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#D99B26]" />
              <span>Email Us: terranovaenergylimited@gmail.com</span>
            </a>
            <button
              type="button"
              onClick={() => navigate('/partnerships')}
              className="px-6 py-3.5 text-sm font-semibold text-[#2C1A11] bg-[#D99B26] hover:bg-[#e5a932] rounded-lg transition-colors cursor-pointer"
            >
              Discuss a Partnership
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
