export interface CoreValue {
  id: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  overview: string;
  benefits: string[];
  applications: string[];
  imageUrl: string;
  imageAlt: string;
  ctaLabel: string;
  disclaimer?: string;
}

export interface RoadmapStage {
  id: string;
  stage: 'Short-Term Strategy' | 'Medium-Term Strategy' | 'Long-Term Strategy';
  timeframe: string;
  title: string;
  subtitle: string;
  items: string[];
}

export interface CommunitySectionItem {
  id: string;
  title: string;
  statusNote: string;
  description: string;
  keyPoints: string[];
}

export interface PartnershipOpportunity {
  id: string;
  title: string;
  sector: string;
  description: string;
}

export interface ImpactStatistic {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  isProposedTarget: boolean;
  order: number;
}

export interface ProjectGalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

export type ProjectCategory =
  | 'Renewable Energy'
  | 'Environmental Restoration'
  | 'Mangrove & Coastal Ecosystems'
  | 'Carbon Initiatives'
  | 'Environmental Monitoring'
  | 'Community Development';

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  status: string;
  isDemonstration: boolean;
  featured: boolean;
  published: boolean;
  summary: string;
  description: string;
  startDate?: string;
  completionDate?: string;
  impactIndicators: string[];
  coverImage: string;
  coverImageAlt: string;
  galleryImages: ProjectGalleryImage[];
  videoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  title: string;
  altText: string;
  caption: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  sectionAssignment: 'gallery' | 'hero' | 'about' | 'services' | 'community' | 'project';
  projectId?: string;
  published: boolean;
  isIllustrative: boolean;
  createdAt: string;
}

export interface VideoRecord {
  id: string;
  title: string;
  description: string;
  originalUrl: string;
  embedUrl: string;
  provider: 'youtube' | 'gdrive';
  sectionAssignment: 'homepage' | 'projects' | 'community' | 'gallery';
  projectId?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryRecord {
  id: string;
  type: 'contact' | 'partnership';
  fullName: string;
  organization?: string;
  email: string;
  phone?: string;
  subjectOrInterest: string;
  message: string;
  status: 'new' | 'reviewed' | 'archived';
  adminNotes?: string;
  createdAt: string;
}

export interface SiteContent {
  companyName: string;
  logoUrl: string;
  rcNumber: string;
  headOffice: string;
  regionalOffice: string;
  phone: string;
  email: string;
  shortDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageCaption: string;
  introTitle: string;
  introBody: string;
  servicesFeaturedImage: string;
  servicesFeaturedImageAlt: string;
  sustainabilityPreviewTitle: string;
  sustainabilityPreviewBody: string;
  partnershipCtaTitle: string;
  partnershipCtaBody: string;
  aboutOverview: string;
  aboutPositioning: string;
  visionStatement: string;
  missionStatement: string;
  coreValues: CoreValue[];
  sustainabilityCommitment: string;
  energyTransitionStrategy: string;
  communityCommitment: string;
  aboutImage: string;
  aboutImageAlt: string;
  services: ServiceItem[];
  roadmap: RoadmapStage[];
  communityIntro: string;
  communityHeroImage: string;
  communityHeroAlt: string;
  communitySections: CommunitySectionItem[];
  partnershipIntro: string;
  partnershipOpportunities: PartnershipOpportunity[];
  privacyPolicyLastUpdated: string;
  privacyPolicyText: string;
  termsLastUpdated: string;
  termsText: string;
  seoTitle: string;
  seoDescription: string;
  maxUploadSizeMb: number;
  allowPublicVideoEmbeds: boolean;
  updatedAt: string;
}

export interface PublicSitePayload {
  content: SiteContent;
  statistics: ImpactStatistic[];
  projects: ProjectRecord[];
  media: MediaItem[];
  videos: VideoRecord[];
}

export interface SupabaseConfigData {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
  dbUri?: string;
  connected: boolean;
  lastTestedAt?: string;
}

export interface AdminDashboardPayload extends PublicSitePayload {
  inquiries: InquiryRecord[];
  supabaseConfig?: SupabaseConfigData;
  adminProfile: {
    username: string;
    lastPasswordChange: string;
    recentUpdates: { id: string; action: string; timestamp: string }[];
  };
}
