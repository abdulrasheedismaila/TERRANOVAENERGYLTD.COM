import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle2,
  Mail,
  Search,
  PlayCircle,
  Image as ImageIcon,
} from 'lucide-react';
import { PublicSitePayload, ProjectCategory } from '../types';
import { Reveal } from '../components/Reveal';
import { ResilientImage } from '../components/ResilientImage';
import { useEmailModal } from '../components/EmailModal';

interface ProjectsPageProps {
  data: PublicSitePayload;
  selectedSlug?: string;
  navigate: (path: string) => void;
}

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'Renewable Energy',
  'Environmental Restoration',
  'Mangrove & Coastal Ecosystems',
  'Carbon Initiatives',
  'Environmental Monitoring',
  'Community Development',
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  data,
  selectedSlug,
  navigate,
}) => {
  const { openEmailModal } = useEmailModal();
  const { content, projects, media, videos } = data;
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedProject = useMemo(() => {
    if (!selectedSlug) return null;
    return projects.find((p) => p.slug === selectedSlug || p.id === selectedSlug) || null;
  }, [projects, selectedSlug]);

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesCat = activeCategory === 'All' || proj.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.location.toLowerCase().includes(q) ||
        proj.summary.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  // PROJECT DETAIL VIEW
  if (selectedSlug && selectedProject) {
    const projectVideos = videos.filter((v) => v.projectId === selectedProject.id);

    return (
      <div className="bg-[#FBF9F5]">
        <section className="bg-[#2C1A11] text-[#FBF9F5] border-b border-[#D99B26]/30 py-12 md:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#D99B26] hover:text-white transition-colors mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Projects & Initiatives</span>
            </button>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-stone-300 mb-3">
              <span className="text-[#D99B26] font-semibold">{selectedProject.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedProject.status}</span>
              {selectedProject.isDemonstration && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Demonstration Concept Entry</span>
                </>
              )}
            </div>

            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-tight">
              {selectedProject.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D99B26]" />
                <span>{selectedProject.location}</span>
              </div>
              {selectedProject.startDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D99B26]" />
                  <span>Phase / Timeline: {selectedProject.startDate}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {selectedProject.isDemonstration && (
            <div className="mb-10 p-4 sm:p-5 rounded-xl bg-[#F3EFE6] border border-[#D99B26]/50 text-xs sm:text-sm text-[#2C1A11] leading-relaxed">
              <strong>Demonstration Portfolio Notice:</strong> This entry illustrates TerraNova Energy Limited’s proposed project development architecture and technical methodology in Nigeria.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="rounded-xl overflow-hidden border border-stone-200 bg-white">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <ResilientImage
                    src={selectedProject.coverImage}
                    alt={selectedProject.coverImageAlt}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-[#F3EFE6]/60 border-t border-stone-200/80 text-xs font-serif italic text-stone-600">
                  {selectedProject.coverImageAlt}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-[#2C1A11]">
                  Project Overview & Scope
                </h2>
                {selectedProject.description.split('\n\n').map((para, i) => (
                  <p key={i} className="text-base text-stone-700 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Embedded Project Video if present */}
              {(selectedProject.videoUrl || projectVideos.length > 0) && (
                <div className="space-y-4 pt-4">
                  <h3 className="font-display text-xl font-bold text-[#2C1A11]">
                    Project Multimedia & Video Briefing
                  </h3>
                  {selectedProject.videoUrl && (
                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-stone-200 bg-stone-900">
                      <iframe
                        src={selectedProject.videoUrl}
                        title={selectedProject.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  )}
                  {projectVideos.map((vid) => (
                    <div
                      key={vid.id}
                      className="rounded-xl overflow-hidden border border-stone-200 bg-white"
                    >
                      <div className="aspect-video w-full bg-stone-900">
                        <iframe
                          src={vid.embedUrl}
                          title={vid.title}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-semibold text-sm text-[#2C1A11]">{vid.title}</p>
                        {vid.description && (
                          <p className="text-xs text-stone-600 mt-1">{vid.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Additional Project Gallery Photographs */}
              {selectedProject.galleryImages && selectedProject.galleryImages.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h3 className="font-display text-xl font-bold text-[#2C1A11]">
                    Project Visual Gallery
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {selectedProject.galleryImages.map((img, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl border border-stone-200 overflow-hidden"
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden">
                          <ResilientImage
                            src={img.url}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3.5 text-xs text-stone-600">
                          <p className="font-serif italic">{img.caption || img.alt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Specifications & Direct Email Action */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl p-6 border border-stone-200/90 space-y-4">
                <h3 className="font-display text-lg font-bold text-[#2C1A11]">
                  Target Impact & Technical Indicators
                </h3>
                <ul className="space-y-3 text-sm text-stone-700">
                  {selectedProject.impactIndicators.map((ind, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#14532D] shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>

                <dl className="pt-4 border-t border-stone-200 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-stone-500">Category</dt>
                    <dd className="font-semibold text-[#2C1A11]">{selectedProject.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-stone-500">Status</dt>
                    <dd className="font-semibold text-[#14532D]">{selectedProject.status}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-[#2C1A11] text-[#FBF9F5] rounded-xl p-6 space-y-4">
                <h3 className="font-display text-lg font-bold text-white">
                  Collaborate on This Initiative
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Interested in technical partnership, project co-development, or climate finance evaluation for this initiative?
                </p>
                <div className="space-y-2.5 pt-1">
                  {/* Direct Email Link as Requested */}
                  <a
                    href="mailto:terranovaenergylimited@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      openEmailModal(`Project Inquiry: ${selectedProject.title}`);
                    }}
                    aria-label="Email TerraNova Energy Limited regarding this project"
                    title="Email TerraNova Energy Limited"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#14532D] hover:bg-[#0F3F22] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-[#D99B26]" />
                    <span>Email Project Team</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => navigate('/partnerships')}
                    className="w-full py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Submit Partnership Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // PORTFOLIO OVERVIEW
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
              <span>Projects & Environmental Initiatives</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 max-w-3xl">
              Portfolio of Renewable Energy, Carbon & Restoration Initiatives
            </h1>
            <p className="text-base sm:text-lg text-stone-300 mt-4 max-w-2xl leading-relaxed">
              Explore our project concepts and technical frameworks across renewable power, decarbonization engineering, coastal mangrove restoration, geospatial monitoring, and community sustainability.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Portfolio & Filter Controls */}
      <section className="py-12 md:py-20 bg-[#FBF9F5] border-b border-stone-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
            {/* Segmented Filter Buttons */}
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F3EFE6] rounded-xl border border-stone-200/90"
            >
              {CATEGORIES.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#2C1A11] text-white shadow-xs'
                        : 'text-stone-700 hover:text-[#2C1A11] hover:bg-white/60'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search project title or location..."
                aria-label="Search projects"
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-2 focus:outline-[#14532D]"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.id} variant="fade-up" delayMs={idx * 70}>
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

                      <h2 className="font-display text-xl font-bold text-[#2C1A11] leading-snug">
                        {project.title}
                      </h2>

                      <p className="text-xs text-stone-500 mt-1.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D99B26] shrink-0" />
                        <span>{project.location}</span>
                      </p>

                      <p className="text-sm text-stone-700 leading-relaxed mt-3">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/projects/${project.slug}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14532D] hover:text-[#2C1A11] transition-colors cursor-pointer"
                    >
                      <span>View Project Brief</span>
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
                      className="text-xs text-stone-500 hover:text-[#2C1A11] transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#14532D]" />
                      <span>Email Us</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="py-16 md:py-20 bg-[#F3EFE6]/60">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Reveal variant="fade-up">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#14532D] font-semibold">
                <ImageIcon className="w-4 h-4" />
                <span>Visual Documentation & Media Gallery</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C1A11] mt-1">
                Nigerian Energy Transition & Ecological Stewardship Gallery
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {media.map((item, idx) => (
              <Reveal key={item.id} variant="fade-up" delayMs={idx * 60}>
                <figure className="bg-white rounded-xl border border-stone-200/90 overflow-hidden h-full flex flex-col justify-between">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                    <ResilientImage
                      src={item.url}
                      alt={item.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="p-4 space-y-1.5">
                    <div className="font-display text-sm font-bold text-[#2C1A11]">
                      {item.title}
                    </div>
                    {item.caption && (
                      <p className="text-xs text-stone-600 font-serif italic">{item.caption}</p>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
