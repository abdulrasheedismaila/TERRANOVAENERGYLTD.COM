import React from 'react';
import { ArrowRight, Mail, MapPin, CheckCircle2, PlayCircle } from 'lucide-react';
import { PublicSitePayload } from '../types';
import { Reveal } from '../components/Reveal';
import { ResilientImage } from '../components/ResilientImage';
import { useEmailModal } from '../components/EmailModal';

interface HomePageProps {
  data: PublicSitePayload;
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ data, navigate }) => {
  const { openEmailModal } = useEmailModal();
  const { content, statistics, projects, videos } = data;
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const homepageVideos = videos.filter(
    (v) => v.sectionAssignment === 'homepage' || v.sectionAssignment === 'gallery'
  );

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative bg-[#2C1A11] text-[#FBF9F5] border-b border-[#D99B26]/30 overflow-hidden">
        {/* Full Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/HTwzJw0n/46698.jpg"
            alt="TerraNova Energy Limited Hero Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-105"
          />
          {/* Deep brand gradient overlays ensuring crisp text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C1A11]/95 via-[#2C1A11]/88 to-[#2C1A11]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A11] via-transparent to-[#2C1A11]/60" />
          <div className="absolute inset-0 bg-[#14532D]/25 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <Reveal variant="fade-up">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#D99B26] font-mono-tabular tracking-wider uppercase">
                  <img
                    src={content.logoUrl}
                    alt="TerraNova Energy Logo"
                    referrerPolicy="no-referrer"
                    className="h-8 w-auto object-contain rounded bg-white/10 p-0.5"
                  />
                  <span>{content.companyName}</span>
                  <span aria-hidden="true">·</span>
                  <span>RC {content.rcNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>Port Harcourt & Abuja, Nigeria</span>
                </div>
              </Reveal>

              <Reveal variant="fade-up" delayMs={80}>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-[3.35rem] font-bold tracking-tight text-white leading-[1.12]">
                  {content.heroHeadline}
                </h1>
              </Reveal>

              <Reveal variant="fade-up" delayMs={150}>
                <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl">
                  {content.heroSubheadline}
                </p>
              </Reveal>

              <Reveal variant="fade-up" delayMs={220}>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  {/* Direct Email Button */}
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
                  >
                    <Mail className="w-4 h-4 text-[#D99B26]" />
                    <span>Email Us Directly</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => navigate('/partnerships')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#FBF9F5] bg-white/10 hover:bg-white/20 border border-white/25 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
                  >
                    <span>Partner With Us</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/projects')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Explore Our Projects</span>
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 flex flex-col">
              <Reveal variant="scale-in" delayMs={160} className="h-full flex flex-col">
                <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] lg:min-h-full rounded-xl overflow-hidden border border-white/15 bg-stone-900">
                  <ResilientImage
                    src={content.heroImage}
                    alt={content.heroImageAlt}
                    priority
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-xs text-stone-200 leading-relaxed">
                    <p className="font-serif italic text-stone-200/95">
                      {content.heroImageCaption}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATISTICS STRIP (PROPOSED TARGETS) */}
      <section
        aria-labelledby="impact-targets-heading"
        className="bg-[#F3EFE6] border-b border-stone-200/90 py-12 md:py-14"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-300/80">
              <div>
                <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                  Strategic Vision Benchmarks
                </p>
                <h2
                  id="impact-targets-heading"
                  className="font-display text-xl sm:text-2xl font-bold text-[#2C1A11] mt-1"
                >
                  Proposed Long-Term Impact Targets
                </h2>
              </div>
              <p className="text-xs text-stone-600 max-w-md leading-relaxed">
                Note: Figures below represent proposed strategic targets and illustrative planning benchmarks, not completed projects or independently certified achievements.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, idx) => (
              <Reveal key={stat.id} variant="fade-up" delayMs={idx * 70}>
                <div className="bg-white rounded-xl p-6 border border-stone-200/90 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-stone-500 font-mono-tabular mb-2">
                      0{idx + 1} · {stat.isProposedTarget ? 'Proposed Target' : 'Indicator'}
                    </div>
                    <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#2C1A11] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-[#14532D] mt-2">
                      {stat.label}
                    </div>
                  </div>
                  <p className="text-xs text-stone-500 mt-3 pt-3 border-t border-stone-100">
                    {stat.sublabel}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY INTRODUCTION */}
      <section className="py-16 md:py-24 bg-[#FBF9F5] border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <Reveal variant="fade-up">
                <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                  <img
                    src={content.logoUrl}
                    alt="TerraNova Energy Limited"
                    referrerPolicy="no-referrer"
                    className="h-6 w-auto object-contain rounded"
                  />
                  <span>Corporate Profile · RC {content.rcNumber}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C1A11] mt-2 leading-tight">
                  {content.introTitle}
                </h2>
              </Reveal>
              <Reveal variant="fade-up" delayMs={90}>
                <p className="text-base text-stone-700 leading-relaxed max-w-2xl">
                  {content.introBody}
                </p>
              </Reveal>
              <Reveal variant="fade-up" delayMs={150}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-stone-700">
                  <div className="p-4 rounded-lg bg-[#F3EFE6]/70 border border-stone-200/80">
                    <div className="flex items-center gap-2 font-semibold text-[#2C1A11]">
                      <MapPin className="w-4 h-4 text-[#14532D]" />
                      <span>Corporate Head Office</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">{content.headOffice}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#F3EFE6]/70 border border-stone-200/80">
                    <div className="flex items-center gap-2 font-semibold text-[#2C1A11]">
                      <MapPin className="w-4 h-4 text-[#14532D]" />
                      <span>Regional Office</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">{content.regionalOffice}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal variant="fade-up" delayMs={200}>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => navigate('/about')}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#14532D] hover:text-[#2C1A11] transition-colors cursor-pointer"
                  >
                    <span>Read Our Full Corporate Mandate & Vision</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
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
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#D99B26] hover:text-[#2C1A11] transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Us: terranovaenergylimited@gmail.com</span>
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal variant="fade-in" delayMs={120}>
                <div className="rounded-xl overflow-hidden border border-stone-200 bg-white">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <ResilientImage
                      src={content.servicesFeaturedImage}
                      alt={content.servicesFeaturedImageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-[#F3EFE6]/50 border-t border-stone-200/80">
                    <p className="text-xs font-serif italic text-stone-600">
                      TerraNova Energy Limited operations and strategic technical solutions in Nigeria.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES AND TECHNICAL SOLUTIONS PREVIEW */}
      <section className="py-16 md:py-24 bg-[#F3EFE6]/60 border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                  <img
                    src={content.logoUrl}
                    alt="TerraNova Energy Limited"
                    referrerPolicy="no-referrer"
                    className="h-5 w-auto object-contain rounded"
                  />
                  <span>Core Capabilities</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C1A11] mt-2">
                  Services and Technical Solutions
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigate('/services')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#2C1A11] bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
              >
                <span>View All 4 Service Pillars</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>

          {/* Featured Services Visual Hero */}
          <Reveal variant="fade-up" delayMs={60}>
            <div className="mb-10 rounded-2xl overflow-hidden border border-stone-200 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto lg:h-[380px] w-full overflow-hidden bg-stone-900">
                  <ResilientImage
                    src={content.servicesFeaturedImage}
                    alt={content.servicesFeaturedImageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
                  <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#14532D] font-semibold">
                    Featured Capability
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#2C1A11]">
                    Integrated Energy Transition & Technical Solutions
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    Connecting industrial decarbonization engineering, carbon project development, Niger Delta mangrove restoration, and AI remote sensing across Nigeria.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/services')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Explore Services</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href="mailto:terranovaenergylimited@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        openEmailModal('Technical Services Inquiry');
                      }}
                      aria-label="Email TerraNova Energy Limited directly"
                      title="Email TerraNova Energy Limited directly"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#2C1A11] bg-[#D99B26] hover:bg-[#e5a932] rounded-lg transition-colors cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email Technical Team</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.services.map((service, index) => (
              <Reveal key={service.id} variant="fade-up" delayMs={index * 80}>
                <article className="bg-white rounded-xl border border-stone-200/90 overflow-hidden h-full flex flex-col justify-between transition-colors hover:border-[#D99B26]">
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 border-b border-stone-200/70">
                      <ResilientImage
                        src={service.imageUrl}
                        alt={service.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 sm:p-7">
                      <div className="text-xs font-mono-tabular text-[#14532D] font-semibold mb-2">
                        {service.number}. Service Pillar
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#2C1A11]">
                        {service.title}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">{service.subtitle}</p>
                      <p className="text-sm text-stone-700 leading-relaxed mt-4">
                        {service.overview}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => navigate('/services')}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#14532D] hover:text-[#2C1A11] transition-colors cursor-pointer"
                    >
                      <span>Explore Technical Scope</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href="mailto:terranovaenergylimited@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        openEmailModal(`Service Inquiry: ${service.title}`);
                      }}
                      aria-label="Email TerraNova Energy Limited directly"
                      title="Email TerraNova Energy Limited directly"
                      className="text-xs font-medium text-stone-500 hover:text-[#2C1A11] transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#14532D]" />
                      <span>Email Inquiry</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-16 md:py-24 bg-[#FBF9F5] border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                  Projects & Environmental Initiatives
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C1A11] mt-2">
                  Featured Project Initiatives
                </h2>
                <p className="text-sm text-stone-600 mt-2 max-w-2xl">
                  Initial portfolio entries below illustrate proposed project architectures across Nigeria.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/projects')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#2C1A11] hover:bg-[#43281B] rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
              >
                <span>View Full Portfolio ({projects.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <Reveal key={project.id} variant="fade-up" delayMs={idx * 90}>
                <article className="bg-white rounded-xl border border-stone-200/90 overflow-hidden h-full flex flex-col justify-between hover:border-[#14532D] transition-colors">
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 border-b border-stone-200/70">
                      <ResilientImage
                        src={project.coverImage}
                        alt={project.coverImageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 mb-2">
                        <span className="font-semibold text-[#14532D]">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.status}</span>
                      </div>

                      <h3 className="font-display text-lg sm:text-xl font-bold text-[#2C1A11] leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-xs text-stone-500 mt-1.5">
                        Location: {project.location}
                      </p>

                      <p className="text-sm text-stone-700 leading-relaxed mt-3 line-clamp-3">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => navigate(`/projects/${project.slug}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14532D] hover:text-[#2C1A11] transition-colors cursor-pointer"
                    >
                      <span>View Project Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href="mailto:terranovaenergylimited@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        openEmailModal(`Project Inquiry: ${project.title}`);
                      }}
                      aria-label="Email TerraNova Energy Limited directly"
                      title="Email TerraNova Energy Limited directly"
                      className="text-xs text-stone-500 hover:text-[#2C1A11] transition-colors cursor-pointer"
                    >
                      Inquire via Email
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC VIDEO SHOWCASE */}
      {homepageVideos.length > 0 && (
        <section className="py-16 bg-[#F3EFE6] border-b border-stone-200/80">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal variant="fade-up">
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                  <PlayCircle className="w-4 h-4" />
                  <span>Featured Multimedia</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C1A11] mt-1">
                  Video Briefings & Field Perspectives
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {homepageVideos.slice(0, 2).map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden"
                >
                  <div className="aspect-video w-full bg-stone-900">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-[#2C1A11]">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-sm text-stone-600 mt-1">{video.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SUSTAINABILITY & COMMUNITY SECTION */}
      <section className="py-16 md:py-24 bg-[#FBF9F5] border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal variant="fade-in">
                <div className="rounded-xl overflow-hidden border border-stone-200 bg-white">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <ResilientImage
                      src={content.communityHeroImage}
                      alt={content.communityHeroAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-[#F3EFE6]/60 border-t border-stone-200/80">
                    <p className="text-xs font-serif italic text-stone-600">
                      Nigerian community consultation, women’s inclusion, and clean-energy vocational training.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <Reveal variant="fade-up">
                <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                  Community & Environmental Stewardship
                </div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C1A11] mt-2 leading-tight">
                  {content.sustainabilityPreviewTitle}
                </h2>
              </Reveal>

              <Reveal variant="fade-up" delayMs={80}>
                <p className="text-base text-stone-700 leading-relaxed">
                  {content.sustainabilityPreviewBody}
                </p>
              </Reveal>

              <Reveal variant="fade-up" delayMs={140}>
                <ul className="space-y-2.5 text-sm text-stone-700 pt-1">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#14532D] shrink-0 mt-1" />
                    <span>Respectful host-community consultation and transparent engagement frameworks</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#14532D] shrink-0 mt-1" />
                    <span>Youth technical skills development in solar maintenance and ecological monitoring</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#14532D] shrink-0 mt-1" />
                    <span>Women’s inclusion in mangrove seedling nurseries and clean-energy livelihoods</span>
                  </li>
                </ul>
              </Reveal>

              <Reveal variant="fade-up" delayMs={200}>
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => navigate('/community')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Explore Community & Sustainability</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
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
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#2C1A11] bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#14532D]" />
                    <span>Email Community Desk</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP CALL TO ACTION */}
      <section className="py-16 md:py-20 bg-[#2C1A11] text-[#FBF9F5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal variant="fade-up">
            <div className="rounded-2xl bg-[#3A2317] border border-[#D99B26]/30 p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#D99B26]">
                  Institutional & Technical Collaboration
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {content.partnershipCtaTitle}
                </h2>
                <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                  {content.partnershipCtaBody}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <a
                  href="mailto:terranovaenergylimited@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openEmailModal('Institutional Collaboration Inquiry');
                  }}
                  aria-label="Email TerraNova Energy Limited directly"
                  title="Email TerraNova Energy Limited directly"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#D99B26]" />
                  <span>Send Us a Message Directly</span>
                </a>

                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#2C1A11] bg-[#D99B26] hover:bg-[#e5a932] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Contact Our Offices</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
