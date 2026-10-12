import React from 'react';
import { CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import { SiteContent, ImpactStatistic } from '../types';
import { Reveal } from '../components/Reveal';
import { useEmailModal } from '../components/EmailModal';

interface StrategyPageProps {
  content: SiteContent;
  statistics: ImpactStatistic[];
  navigate: (path: string) => void;
}

export const StrategyPage: React.FC<StrategyPageProps> = ({
  content,
  statistics,
  navigate,
}) => {
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
              <span>Strategy & Phased Roadmap · {content.companyName}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 max-w-3xl">
              Long-Term Strategic Direction for Energy Transition and Ecosystem Recovery
            </h1>
            <p className="text-base sm:text-lg text-stone-300 mt-4 max-w-2xl leading-relaxed">
              A structured three-stage strategic roadmap progressing from partnership formation and baseline governance to pilot implementation and regional scaling across Nigeria.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Visual Three-Stage Timeline */}
      <section className="py-16 md:py-24 bg-[#FBF9F5] border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up">
            <div className="max-w-2xl mb-14">
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                Three-Horizon Framework
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C1A11] mt-2">
                Phased Institutional & Technical Roadmap
              </h2>
            </div>
          </Reveal>

          <div className="relative space-y-10">
            {content.roadmap.map((stage, idx) => (
              <Reveal key={stage.id} variant="fade-up" delayMs={idx * 100}>
                <div className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-stone-200 pb-6 lg:pb-0 lg:pr-8">
                      <div className="text-xs font-mono-tabular text-[#D99B26] font-semibold uppercase tracking-wider">
                        Stage 0{idx + 1} · {stage.timeframe}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-[#2C1A11]">
                        {stage.stage}
                      </h3>
                      <p className="text-sm font-medium text-[#14532D]">{stage.title}</p>
                      <p className="text-xs text-stone-600 leading-relaxed pt-1">
                        {stage.subtitle}
                      </p>
                    </div>

                    <div className="lg:col-span-8">
                      <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-stone-500 font-semibold mb-4">
                        Proposed Strategic Priorities & Milestones
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {stage.items.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className="p-4 rounded-lg bg-[#FBF9F5] border border-stone-200/80 flex items-start gap-3"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#14532D] shrink-0 mt-0.5" />
                            <span className="text-sm text-stone-700 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Target Indicators */}
      <section className="py-16 md:py-20 bg-[#F3EFE6]/70 border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up">
            <div className="mb-10">
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                Proposed Horizon Benchmarks
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C1A11] mt-1">
                Target Indicators Guiding Our Strategy
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, idx) => (
              <Reveal key={stat.id} variant="fade-up" delayMs={idx * 70}>
                <div className="bg-white rounded-xl p-6 border border-stone-200">
                  <div className="text-xs font-mono-tabular text-stone-500">
                    Proposed Target 0{idx + 1}
                  </div>
                  <div className="font-mono-tabular text-2xl font-bold text-[#2C1A11] mt-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-[#14532D] mt-1">{stat.label}</div>
                  <div className="text-xs text-stone-500 mt-2">{stat.sublabel}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#2C1A11] text-[#FBF9F5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Align With Our Strategic Roadmap
            </h2>
            <p className="text-sm text-stone-300 mt-2">
              We invite technical partners, climate finance institutions, and host-region stakeholders to engage with our team on Phase I and Phase II opportunities.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:terranovaenergylimited@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openEmailModal('Strategic Roadmap Alignment Inquiry');
              }}
              aria-label="Email TerraNova Energy Limited directly"
              title="Email TerraNova Energy Limited directly"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#D99B26]" />
              <span>Email Strategy Team</span>
            </a>
            <button
              type="button"
              onClick={() => navigate('/partnerships')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#2C1A11] bg-[#D99B26] hover:bg-[#e5a932] rounded-lg transition-colors cursor-pointer"
            >
              <span>Explore Partnerships</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
