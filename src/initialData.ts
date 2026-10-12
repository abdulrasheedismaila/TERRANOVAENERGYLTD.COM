import {
  SiteContent,
  ImpactStatistic,
  ProjectRecord,
  MediaItem,
  VideoRecord,
} from './types';

export const LOGO_URL = 'https://i.ibb.co/Ndq0RkLQ/Whats-App-Image-2026-1.jpg';
export const SERVICES_FEATURED_IMAGE = 'https://i.ibb.co/TD31x202/Whats-App-Image-2026-10-10-at-11-06-01-PM.jpg';
export const HERO_BACKGROUND_IMAGE = 'https://i.ibb.co/HTwzJw0n/46698.jpg';

export const IMG_HERO_SOLAR = 'https://i.ibb.co/HTwzJw0n/46698.jpg';
export const IMG_MANGROVE = '/src/assets/images/niger_delta_mangrove_restoration_1791722197259.jpg';
export const IMG_AI_MONITOR = '/src/assets/images/nigerian_environmental_monitoring_drone_1791722207952.jpg';
export const IMG_COMMUNITY = '/src/assets/images/nigerian_community_sustainability_1791722219823.jpg';

export const initialSiteContent: SiteContent = {
  companyName: 'TerraNova Energy Limited',
  logoUrl: LOGO_URL,
  rcNumber: '9478210',
  headOffice: '123 Energy Way, Port Harcourt, Rivers State, Nigeria',
  regionalOffice: '45 Diplomatic Drive, Abuja, Nigeria',
  phone: '+234 701 650 4968',
  email: 'terranovaenergylimited@gmail.com',
  shortDescription:
    'TerraNova Energy Limited (RC: 9478210) advances energy transition, decarbonization engineering, carbon project development, renewable energy opportunities, and coastal ecosystem restoration across Nigeria.',
  heroHeadline: 'Powering a Net-Zero Future Through Innovation and Nature',
  heroSubheadline:
    'TerraNova Energy Limited advances energy transition and environmental sustainability through innovative carbon solutions, renewable energy opportunities, ecosystem restoration, and strategic partnerships.',
  heroImage: HERO_BACKGROUND_IMAGE,
  heroImageAlt:
    'TerraNova Energy Limited clean energy infrastructure and environmental stewardship in Nigeria',
  heroImageCaption:
    'TerraNova Energy Limited clean energy transition and ecosystem restoration in Nigeria.',
  introTitle: 'Integrating Engineering Rigor with Natural Climate Solutions in Nigeria',
  introBody:
    'Headquartered in Port Harcourt with a regional presence in Abuja, TerraNova Energy Limited operates at the intersection of industrial decarbonization, renewable power development, carbon solutions, and ecological restoration. We work to build practical frameworks that align Nigeria’s energy requirements with long-term environmental stewardship and community prosperity.',
  servicesFeaturedImage: SERVICES_FEATURED_IMAGE,
  servicesFeaturedImageAlt:
    'TerraNova Energy Limited Services and Technical Solutions in Nigeria',
  sustainabilityPreviewTitle: 'Environmental Restoration & Inclusive Community Participation',
  sustainabilityPreviewBody:
    'Lasting environmental progress in the Niger Delta and across Nigeria depends on respectful consultation, local capacity building, youth technical training, and women’s inclusion in clean energy value chains.',
  partnershipCtaTitle: 'Collaborate on Nigeria’s Energy Transition & Climate Resilience',
  partnershipCtaBody:
    'We welcome inquiries from international climate finance institutions, government regulators, energy operators, ESG organizations, and technical partners seeking structured collaboration in Nigeria.',
  aboutOverview:
    'TerraNova Energy Limited (Registered in Nigeria under RC Number: 9478210) is a corporate energy and environmental solutions enterprise focused on supporting the transition toward lower-carbon operations, renewable energy deployment, and nature-based climate resilience.',
  aboutPositioning:
    'Operating from Port Harcourt in Rivers State and Abuja, the company is positioned to connect technical engineering capabilities, environmental science, and local stakeholder engagement. Rather than treating energy security and environmental protection as competing priorities, TerraNova Energy Limited focuses on practical pathways where emissions reduction, clean power generation, and ecosystem conservation reinforce one another.',
  visionStatement:
    'To contribute to a sustainable future through innovative energy solutions, responsible carbon initiatives, and environmental stewardship.',
  missionStatement:
    'To develop and support practical energy and environmental solutions that create long-term value for partners, communities, and the environment.',
  coreValues: [
    {
      id: 'cv-1',
      title: 'Integrity',
      description:
        'Maintaining transparent governance, accurate environmental reporting, and honest communication with regulators, investors, and host communities.',
    },
    {
      id: 'cv-2',
      title: 'Innovation',
      description:
        'Applying modern engineering practices, clean energy architectures, and digital monitoring tools suited to Nigerian operational contexts.',
    },
    {
      id: 'cv-3',
      title: 'Environmental Responsibility',
      description:
        'Prioritizing measurable emissions abatement, biodiversity protection, and the restoration of sensitive coastal and terrestrial ecosystems.',
    },
    {
      id: 'cv-4',
      title: 'Collaboration',
      description:
        'Building structured partnerships across energy operators, technical specialists, research bodies, government institutions, and climate financiers.',
    },
    {
      id: 'cv-5',
      title: 'Community Impact',
      description:
        'Respecting local priorities through consultative engagement, skills transfer, youth empowerment, and inclusive participation.',
    },
    {
      id: 'cv-6',
      title: 'Long-Term Value Creation',
      description:
        'Designing initiatives for operational durability, environmental permanence, and sustained socioeconomic benefit.',
    },
  ],
  sustainabilityCommitment:
    'TerraNova Energy Limited approaches sustainability as an operational discipline. Every proposed initiative is evaluated for technical feasibility, environmental integrity, transparent baseline accounting, and constructive alignment with host community livelihoods.',
  energyTransitionStrategy:
    'Our strategy bridges conventional energy sector decarbonization with scalable renewable energy and nature-based carbon initiatives. By addressing process efficiency and flare reduction alongside solar deployment and mangrove conservation, we aim to support a pragmatic, well-governed transition pathway.',
  communityCommitment:
    'We recognize that environmental and energy initiatives succeed only when local communities are respected participants. Our approach emphasizes early consultation, transparent grievance channels, gender-inclusive training opportunities, and practical livelihood support.',
  aboutImage: SERVICES_FEATURED_IMAGE,
  aboutImageAlt:
    'TerraNova Energy Limited operational and environmental leadership in Nigeria',
  services: [
    {
      id: 'srv-decarb',
      slug: 'decarbonization-engineering',
      number: '01',
      title: 'Decarbonization Engineering',
      subtitle: 'Practical engineering assessments, energy efficiency, and operational emissions reduction',
      overview:
        'We support industrial operators, energy facilities, and commercial enterprises in identifying and evaluating technical pathways to lower greenhouse gas intensity. Through process audits, electrification feasibility studies, waste-heat recovery analysis, and methane/flare abatement planning, our engineering framework helps organizations transition toward cleaner, more efficient operations.',
      benefits: [
        'Structured identification of operational energy losses and fugitive emissions sources',
        'Engineering feasibility studies for hybrid solar-industrial power integration',
        'Alignment of facility operations with emerging domestic and international ESG disclosure standards',
        'Pragmatic phased implementation roadmaps tailored to Nigerian industrial infrastructure',
      ],
      applications: [
        'Oil and gas midstream and upstream facility efficiency assessments',
        'Flare gas utilization and methane leak detection planning',
        'Commercial and industrial captive power hybridization (diesel-to-solar transition)',
        'Energy efficiency retrofits for processing and logistics facilities',
      ],
      imageUrl: SERVICES_FEATURED_IMAGE,
      imageAlt:
        'TerraNova Energy Limited Decarbonization Engineering and technical solutions',
      ctaLabel: 'Inquire About Engineering Solutions',
    },
    {
      id: 'srv-carbon',
      slug: 'carbon-credit-solutions',
      number: '02',
      title: 'Carbon Credit Solutions',
      subtitle: 'Carbon project structuring, baseline accounting, and technical partner coordination',
      overview:
        'TerraNova Energy Limited develops frameworks for high-integrity carbon initiatives across both technological avoidance/reduction and nature-based removals. We work alongside independent technical specialists, monitoring partners, and project stakeholders to structure project design documents, establish defensible emissions baselines, and prepare initiatives for recognized carbon market standards.',
      benefits: [
        'Rigorous project screening for additionality, permanence, and leakage risk management',
        'Transparent greenhouse gas baseline modeling and monitoring protocol design',
        'Coordination with accredited third-party validation and verification bodies (VVBs)',
        'Equitable benefit-sharing frameworks for community-linked carbon initiatives',
      ],
      applications: [
        'Nature-based reforestation and coastal wetland carbon project preparation',
        'Clean distributed energy and industrial emissions-reduction project structuring',
        'Corporate carbon inventory scoping and climate transition advisory',
        'Joint venture development for climate finance readiness',
      ],
      imageUrl: IMG_HERO_SOLAR,
      imageAlt:
        'Renewable energy and carbon project structuring in Nigeria',
      ctaLabel: 'Discuss Carbon Collaboration',
      disclaimer:
        'Notice: TerraNova Energy Limited facilitates project development, emissions accounting, and technical coordination. Carbon credit issuance is always subject to independent validation, verification, and registration by accredited international or domestic standards bodies.',
    },
    {
      id: 'srv-blue-carbon',
      slug: 'blue-carbon-mangrove-restoration',
      number: '03',
      title: 'Blue Carbon and Mangrove Restoration',
      subtitle: 'Coastal ecosystem recovery, biodiversity protection, and Niger Delta resilience',
      overview:
        'Nigeria’s coastal mangrove forests—particularly across the Niger Delta—represent vital ecological buffers and high-capacity natural carbon sinks. We design collaborative restoration and conservation initiatives focused on rehabilitating degraded tidal wetlands, protecting estuarine biodiversity, reducing coastal erosion, and supporting community-based nursery stewardship.',
      benefits: [
        'High-density natural carbon sequestration in mangrove biomass and tidal sediment soils',
        'Natural shoreline stabilization and flood resilience for coastal settlements',
        'Habitat recovery for estuarine fisheries and native Niger Delta biodiversity',
        'Direct participation of local communities, women, and youth in seedling nurseries and site stewardship',
      ],
      applications: [
        'Degraded tidal creek and estuary hydrology assessment and replanting',
        'Community-managed mangrove seedling nurseries and ecological monitoring',
        'Biodiversity corridor conservation in coastal Rivers State and neighboring delta regions',
        'Blue carbon feasibility studies for institutional climate finance partners',
      ],
      imageUrl: IMG_MANGROVE,
      imageAlt:
        'Nigerian conservationists and Niger Delta community members planting mangrove saplings along a coastal estuary',
      ctaLabel: 'Explore Restoration Partnerships',
    },
    {
      id: 'srv-ai-monitoring',
      slug: 'ai-driven-environmental-monitoring',
      number: '04',
      title: 'AI-Driven Environmental Monitoring',
      subtitle: 'Geospatial intelligence, remote sensing, and digital measurement, reporting, and verification (dMRV)',
      overview:
        'Credible environmental management requires continuous, verifiable data. We integrate satellite earth observation, drone photogrammetry, field sensor networks, and analytical models to monitor vegetation health, land-use change, biomass growth, and environmental indicators across project sites.',
      benefits: [
        'Objective, repeatable spatial tracking of reforestation and mangrove canopy recovery',
        'Early detection of environmental stressors, encroachment, or pipeline corridor anomalies',
        'Streamlined data aggregation for investor reporting, regulatory compliance, and audit trails',
        'Reduced cost and higher spatial accuracy compared to manual-only field surveys',
      ],
      applications: [
        'Digital Measurement, Reporting, and Verification (dMRV) for carbon and restoration projects',
        'Multispectral drone mapping of coastal wetlands and agricultural buffers',
        'Environmental baseline assessments and ongoing ecological impact tracking',
        'Spatial decision-support dashboards for project partners and regulators',
      ],
      imageUrl: IMG_AI_MONITOR,
      imageAlt:
        'Nigerian environmental data researcher operating a survey drone and field geospatial laptop near a tropical river corridor',
      ctaLabel: 'Request Monitoring Capabilities Brief',
    },
  ],
  roadmap: [
    {
      id: 'rm-short',
      stage: 'Short-Term Strategy',
      timeframe: 'Phase I · Foundation & Structuring (Proposed)',
      title: 'Institutional Partnerships, Opportunity Screening & Baseline Governance',
      subtitle:
        'Establishing technical processes, stakeholder frameworks, and high-priority project pipelines.',
      items: [
        'Develop strategic partnerships with technical specialists, energy operators, and research institutions.',
        'Identify suitable renewable energy, decarbonization, and environmental restoration opportunities in Nigeria.',
        'Establish rigorous project development, baseline accounting, and digital monitoring processes.',
        'Strengthen stakeholder engagement with regulatory bodies and prospective host communities.',
      ],
    },
    {
      id: 'rm-medium',
      stage: 'Medium-Term Strategy',
      timeframe: 'Phase II · Pilot Execution & Capability Expansion (Proposed)',
      title: 'Advancing Selected Projects & Community-Focused Sustainability Initiatives',
      subtitle:
        'Moving validated opportunities into structured development and technical implementation.',
      items: [
        'Advance selected renewable energy and environmental restoration projects through feasibility and pilot stages.',
        'Expand internal and partner-led carbon project development and dMRV capabilities.',
        'Strengthen technical collaboration with international climate finance and engineering partners.',
        'Develop community-focused sustainability, youth skills training, and women’s inclusion initiatives.',
      ],
    },
    {
      id: 'rm-long',
      stage: 'Long-Term Strategy',
      timeframe: 'Phase III · Regional Scale & Long-Term Value (Proposed)',
      title: 'Scaling Proven Models Across Nigeria’s Energy & Ecological Landscape',
      subtitle:
        'Contributing measurably to regional decarbonization, ecosystem recovery, and resilient livelihoods.',
      items: [
        'Scale successful renewable energy and nature-based project models across key Nigerian corridors.',
        'Support broader national and industrial energy transition objectives.',
        'Expand mangrove, blue carbon, and terrestrial environmental restoration opportunities.',
        'Develop enduring institutional partnerships and sustainable long-term value creation.',
      ],
    },
  ],
  communityIntro:
    'At TerraNova Energy Limited, responsible environmental stewardship is inseparable from the wellbeing of Nigerian communities—particularly in the Niger Delta and host regions where energy and conservation activities take place. Below we outline our consultation principles and proposed community sustainability programmes.',
  communityHeroImage: IMG_COMMUNITY,
  communityHeroAlt:
    'Community consultation and clean-energy technical training workshop in Nigeria with women, youth, and facilitators',
  communitySections: [
    {
      id: 'com-1',
      title: 'Community Engagement and Consultation',
      statusNote: 'Core Operational Principle',
      description:
        'Before initiating field assessments or project development, our framework prioritizes open, respectful dialogue with traditional authorities, local leadership, youth groups, and women’s associations to ensure local priorities inform project design.',
      keyPoints: [
        'Early, transparent disclosure of proposed project scopes and environmental objectives',
        'Respect for local customs, land-use practices, and estuarine fishing livelihoods',
        'Accessible channels for community feedback and continuous dialogue',
      ],
    },
    {
      id: 'com-2',
      title: 'Community Trust Committees (Where Established)',
      statusNote: 'Proposed Governance Model',
      description:
        'As site-specific projects are formally established with host communities, TerraNova Energy Limited proposes to work through representative Community Trust Committees to guide local participation and benefit governance. (Note: Specific committees are formed only upon formal project commencement with host communities.)',
      keyPoints: [
        'Joint representation including elders, youth representatives, and women leaders',
        'Transparent oversight of community-linked project milestones',
        'Alignment with applicable Nigerian host-community engagement guidelines',
      ],
    },
    {
      id: 'com-3',
      title: 'Youth Empowerment and Technical Skills Development',
      statusNote: 'Proposed Programme Direction',
      description:
        'Nigeria’s young workforce is central to the clean energy transition. Our proposed project models incorporate practical training in solar installation maintenance, nursery management, GPS field mapping, and environmental data collection.',
      keyPoints: [
        'Hands-on field training in ecological monitoring and seedling propagation',
        'Introductory technical modules on solar PV maintenance and safety',
        'Pathways for local youth participation in environmental survey teams',
      ],
    },
    {
      id: 'com-4',
      title: 'Women’s Participation and Inclusion',
      statusNote: 'Proposed Programme Direction',
      description:
        'Women in coastal and rural Nigerian communities play a vital role in local agriculture, fisheries processing, and household energy management. We design proposed initiatives to support equitable participation by women in nursery stewardship, clean energy access, and project consultation.',
      keyPoints: [
        'Dedicated consultation sessions to incorporate women’s perspectives in project planning',
        'Opportunities in community mangrove nurseries and sustainable agro-forestry supply chains',
        'Support for clean energy solutions that improve productive livelihoods',
      ],
    },
    {
      id: 'com-5',
      title: 'Environmental Awareness, Mangrove Protection & Biodiversity',
      statusNote: 'Ongoing Focus & Proposed Field Initiatives',
      description:
        'Protecting mangrove ecosystems against unsustainable harvesting and degradation requires shared ecological stewardship. We promote environmental education alongside practical conservation incentives that support native fish breeding grounds and shoreline stability.',
      keyPoints: [
        'Community-focused awareness on the role of mangroves in flood protection and fisheries',
        'Collaborative biodiversity monitoring and protection of regenerating wetland zones',
        'Promotion of sustainable local livelihoods compatible with ecosystem recovery',
      ],
    },
    {
      id: 'com-6',
      title: 'Social Infrastructure: Schools, Clinics, and Water Projects (Where Applicable)',
      statusNote: 'Proposed Future Project-Linked Initiatives',
      description:
        'Where project scale, partner funding, and community needs align, future long-term initiatives may support targeted community infrastructure such as solar-powered water boreholes, rural clinic electrification, or educational facility support. No completed school, clinic, or water infrastructure projects are claimed at this stage.',
      keyPoints: [
        'Needs-based assessment conducted directly with host community representatives',
        'Focus on clean water access and solar electrification for essential community facilities',
        'Implemented strictly in partnership with verified funding institutions and local authorities',
      ],
    },
  ],
  partnershipIntro:
    'TerraNova Energy Limited seeks structured, transparent collaborations with domestic and international institutions committed to advancing practical energy transition, carbon abatement, and environmental restoration across Nigeria.',
  partnershipOpportunities: [
    {
      id: 'part-1',
      title: 'Carbon Project Collaboration',
      sector: 'Carbon Markets & Climate Finance',
      description:
        'Co-development of nature-based blue carbon, reforestation, and industrial emissions-avoidance initiatives structured for rigorous third-party validation.',
    },
    {
      id: 'part-2',
      title: 'Joint Ventures',
      sector: 'Strategic Project Development',
      description:
        'Project-level equity and operational joint ventures with energy companies, infrastructure developers, and institutional investors in Nigeria.',
    },
    {
      id: 'part-3',
      title: 'Renewable Energy Development',
      sector: 'Clean Power Infrastructure',
      description:
        'Collaborative development of commercial/industrial solar arrays, hybrid microgrids, and clean energy solutions for Nigerian industries and communities.',
    },
    {
      id: 'part-4',
      title: 'Technical Partnerships & Technology Transfer',
      sector: 'Engineering & Systems Integration',
      description:
        'Alliances with engineering firms, sensor manufacturers, and clean-technology providers to localize low-carbon engineering solutions.',
    },
    {
      id: 'part-5',
      title: 'Environmental Research and Monitoring',
      sector: 'Science, Geospatial & dMRV',
      description:
        'Collaboration with universities, ecological research institutes, and earth-observation specialists on Niger Delta biodiversity and carbon flux studies.',
    },
    {
      id: 'part-6',
      title: 'Climate Funding & ESG Collaboration',
      sector: 'Institutional Finance & Corporate ESG',
      description:
        'Structuring bankable environmental initiatives and corporate ESG sustainability programmes with clear governance, reporting, and community co-benefits.',
    },
  ],
  privacyPolicyLastUpdated: 'October 2026',
  privacyPolicyText: `1. Introduction
TerraNova Energy Limited (RC Number: 9478210), with offices at 123 Energy Way, Port Harcourt, Rivers State, Nigeria and 45 Diplomatic Drive, Abuja, Nigeria ("we", "our", or "the Company"), respects the privacy of visitors to our corporate website. This policy outlines how information submitted through our website is handled.

2. Information We Collect
We collect personal and organizational contact details that you voluntarily provide when submitting our Contact Form or Partnership Inquiry Form, including your full name, organization name, email address, telephone number, inquiry category, and message content.

3. How We Use Information
Submitted inquiries are used strictly to:
• Respond to your business, partnership, regulatory, or community inquiries;
• Evaluate potential technical, investment, or sustainability collaborations;
• Maintain the security and operational integrity of our website and administrator portal.

4. Data Storage and Security
Inquiries submitted via this website are stored in our protected backend database for review by authorized TerraNova Energy Limited personnel. We do not sell or rent visitor contact information to third parties.

5. Your Choices and Contact
If you wish to request the update or deletion of contact details you have submitted to us, please contact us directly at terranovaenergylimited@gmail.com or call +234 701 650 4968.`,
  termsLastUpdated: 'October 2026',
  termsText: `1. Corporate Information & Scope
This website is operated by TerraNova Energy Limited (Registered in Nigeria, RC Number: 9478210), with its Corporate Head Office at 123 Energy Way, Port Harcourt, Rivers State, Nigeria, and Regional Office at 45 Diplomatic Drive, Abuja, Nigeria.

2. Informational Purpose & Non-Reliance
All content on this website—including proposed strategic targets, project concepts, demonstration portfolio items, and sustainability roadmaps—is provided for general corporate informational purposes only. Nothing on this website constitutes a binding financial offer or securities solicitation unless accompanied by formal, executed transaction documentation.

3. Illustrative & Demonstration Content
Certain photographs, proposed impact figures (such as proposed MW capacity, carbon offset targets, restoration hectare targets, and green job targets), and demonstration project entries are presented to illustrate the Company’s strategic focus areas and technical capabilities. They are clearly labeled as proposed targets or demonstration concepts until replaced with verified project records.

4. Intellectual Property & Acceptable Use
Visitors may view and download publicly available information for legitimate business evaluation. Unauthorized attempts to access the /admin portal, bypass authentication controls, submit automated spam, or disrupt website operations are strictly prohibited.

5. Contact
For formal inquiries regarding these Terms and Conditions, please email terranovaenergylimited@gmail.com.`,
  seoTitle: 'TerraNova Energy Limited – Energy Transition & Carbon Solutions in Nigeria',
  seoDescription:
    'TerraNova Energy Limited (RC: 9478210) advances energy transition and environmental sustainability in Nigeria through decarbonization engineering, carbon solutions, mangrove restoration, and strategic partnerships.',
  maxUploadSizeMb: 10,
  allowPublicVideoEmbeds: true,
  updatedAt: new Date().toISOString(),
};

export const initialStatistics: ImpactStatistic[] = [
  {
    id: 'stat-1',
    value: '500 MW',
    label: 'Renewable Energy Capacity',
    sublabel: 'Proposed Long-Term Target',
    isProposedTarget: true,
    order: 1,
  },
  {
    id: 'stat-2',
    value: '10 Million Tonnes CO₂',
    label: 'Carbon Offset Target',
    sublabel: 'Proposed Abatement & Removal Target',
    isProposedTarget: true,
    order: 2,
  },
  {
    id: 'stat-3',
    value: '5,000+ Hectares',
    label: 'Restoration Target',
    sublabel: 'Proposed Mangrove & Ecosystem Target',
    isProposedTarget: true,
    order: 3,
  },
  {
    id: 'stat-4',
    value: '1,000+',
    label: 'Green Jobs Target',
    sublabel: 'Proposed Livelihoods & Skills Target',
    isProposedTarget: true,
    order: 4,
  },
];

export const initialProjects: ProjectRecord[] = [
  {
    id: 'proj-1',
    slug: 'niger-delta-blue-carbon-mangrove-corridor',
    title: 'Niger Delta Estuarine Mangrove Restoration & Blue Carbon Initiative',
    category: 'Mangrove & Coastal Ecosystems',
    location: 'Coastal Estuary Corridor, Rivers State, Nigeria (Proposed Scope)',
    status: 'Proposed Concept (Demonstration)',
    isDemonstration: true,
    featured: true,
    published: true,
    summary:
      'Demonstration project framework for community-led mangrove rehabilitation, tidal hydrology assessment, and blue carbon baseline scoping in coastal Rivers State.',
    description:
      'This demonstration entry illustrates TerraNova Energy Limited’s project development methodology for coastal blue carbon and mangrove restoration in the Niger Delta. The proposed framework combines multispectral drone baseline mapping, community-managed Rhizophora seedling nurseries, and hydrological channel clearing to restore degraded tidal flats while supporting estuarine fishery habitats.\n\nNotice: This entry is presented as demonstration content illustrating proposed project architecture prior to formal site sign-off and third-party registry validation.',
    startDate: 'Proposed Phase I Scoping',
    completionDate: 'Multi-Year Framework',
    impactIndicators: [
      'Target Scope: Phased coastal mangrove seedling propagation and tidal wetland recovery (Proposed)',
      'Methodology: High-resolution geospatial canopy monitoring and sediment carbon sampling (Proposed)',
      'Community Role: Local women and youth nursery stewardship and field monitoring teams (Proposed)',
    ],
    coverImage: IMG_MANGROVE,
    coverImageAlt:
      'Nigerian conservationists and community members planting mangrove seedlings in a coastal estuary',
    galleryImages: [
      {
        url: IMG_MANGROVE,
        alt: 'Mangrove seedling restoration along a calm Niger Delta tidal creek',
        caption: 'Community-participatory mangrove planting in coastal wetlands.',
      },
      {
        url: IMG_AI_MONITOR,
        alt: 'Geospatial drone monitoring of coastal vegetation corridors',
        caption: 'Remote-sensing field survey operations.',
      },
    ],
    createdAt: '2026-10-01T09:00:00.000Z',
    updatedAt: '2026-10-10T12:00:00.000Z',
  },
  {
    id: 'proj-2',
    slug: 'industrial-solar-hybrid-decarbonization-framework',
    title: 'Commercial & Industrial Solar Hybridization Initiative',
    category: 'Renewable Energy',
    location: 'Port Harcourt & Regional Industrial Corridors, Nigeria (Proposed Scope)',
    status: 'Feasibility Model (Demonstration)',
    isDemonstration: true,
    featured: true,
    published: true,
    summary:
      'Demonstration engineering model for integrating utility-scale and captive solar photovoltaic systems with existing industrial power operations to reduce diesel and gas turbine emissions.',
    description:
      'Reliable, lower-carbon power is essential for Nigerian industrial competitiveness. This demonstration project outlines TerraNova Energy Limited’s approach to structuring captive solar PV and battery storage hybrid systems for commercial and industrial energy users.\n\nNotice: This portfolio item is a demonstration concept illustrating technical capabilities and is editable or replaceable via the Administrator Dashboard.',
    startDate: 'Concept Evaluation',
    completionDate: 'Subject to Partner Offtake',
    impactIndicators: [
      'Objective: Displacement of high-emission captive diesel generation with solar PV hybrid architectures (Proposed)',
      'Engineering Scope: Load profile auditing, grid-tie synchronization, and modular array sizing (Proposed)',
    ],
    coverImage: IMG_HERO_SOLAR,
    coverImageAlt:
      'Nigerian renewable energy engineers inspecting a utility-scale solar array at golden hour',
    galleryImages: [
      {
        url: IMG_HERO_SOLAR,
        alt: 'Solar photovoltaic array installation in Nigeria',
        caption: 'Utility-scale solar PV infrastructure in a tropical coastal environment.',
      },
    ],
    createdAt: '2026-10-02T10:00:00.000Z',
    updatedAt: '2026-10-10T12:00:00.000Z',
  },
  {
    id: 'proj-3',
    slug: 'digital-mrv-geospatial-wetland-observatory',
    title: 'Geospatial & Drone Environmental Monitoring Framework (dMRV)',
    category: 'Environmental Monitoring',
    location: 'Niger Delta & Central Nigeria Corridors (Proposed Scope)',
    status: 'Technical Framework (Demonstration)',
    isDemonstration: true,
    featured: true,
    published: true,
    summary:
      'Demonstration digital Measurement, Reporting, and Verification (dMRV) architecture combining satellite imagery, UAV photogrammetry, and field telemetry for transparent ecological tracking.',
    description:
      'High-integrity environmental and carbon initiatives require verifiable, tamper-evident monitoring data. This demonstration entry highlights how TerraNova Energy Limited integrates remote sensing, UAV field surveys, and structured geospatial databases to track vegetation recovery, land-use stability, and project performance over time.\n\nNotice: Presented as an illustrative demonstration of monitoring methodology.',
    startDate: 'Methodology Design',
    completionDate: 'Ongoing Technical Capability',
    impactIndicators: [
      'Capability: Multispectral vegetation indexing (NDVI/EVI) and canopy height modeling (Proposed)',
      'Transparency: Audit-ready spatial reporting for institutional partners and regulators (Proposed)',
    ],
    coverImage: IMG_AI_MONITOR,
    coverImageAlt:
      'Nigerian environmental data researcher operating a survey drone and rugged field laptop near a wetland river',
    galleryImages: [
      {
        url: IMG_AI_MONITOR,
        alt: 'Field drone telemetry and geospatial mapping in Nigeria',
        caption: 'Field geospatial data collection.',
      },
    ],
    createdAt: '2026-10-03T11:00:00.000Z',
    updatedAt: '2026-10-10T12:00:00.000Z',
  },
  {
    id: 'proj-4',
    slug: 'services-technical-solutions-decarbonization',
    title: 'Services & Technical Solutions Engineering',
    category: 'Carbon Initiatives',
    location: 'Port Harcourt & Abuja, Nigeria',
    status: 'Active Framework',
    isDemonstration: false,
    featured: true,
    published: true,
    summary:
      'Comprehensive decarbonization engineering, blue carbon solutions, and AI-powered environmental monitoring.',
    description:
      'TerraNova Energy Limited delivers specialized energy transition engineering, emissions auditing, and ecological restoration frameworks across Nigeria.',
    startDate: 'Active',
    completionDate: 'Ongoing',
    impactIndicators: [
      'Decarbonization engineering audits for industrial energy facilities',
      'High-resolution dMRV remote sensing and ecological restoration',
    ],
    coverImage: SERVICES_FEATURED_IMAGE,
    coverImageAlt:
      'TerraNova Energy Limited Services & Technical Solutions',
    galleryImages: [
      {
        url: SERVICES_FEATURED_IMAGE,
        alt: 'TerraNova Energy Services & Technical Solutions visual',
        caption: 'Operational solutions across Nigeria.',
      },
    ],
    createdAt: '2026-10-04T12:00:00.000Z',
    updatedAt: '2026-10-10T12:00:00.000Z',
  },
];

export const initialMediaItems: MediaItem[] = [
  {
    id: 'media-logo',
    title: 'TerraNova Energy Limited Official Logo',
    altText: 'TerraNova Energy Limited Official Logo',
    caption: 'Official corporate logo for TerraNova Energy Limited.',
    url: LOGO_URL,
    mimeType: 'image/jpeg',
    sizeBytes: 150000,
    sectionAssignment: 'hero',
    published: true,
    isIllustrative: false,
    createdAt: '2026-10-01T07:00:00.000Z',
  },
  {
    id: 'media-services',
    title: 'Services and Technical Solutions Image',
    altText: 'TerraNova Energy Limited Services and Technical Solutions',
    caption: 'Services and Technical Solutions operational image.',
    url: SERVICES_FEATURED_IMAGE,
    mimeType: 'image/jpeg',
    sizeBytes: 240000,
    sectionAssignment: 'services',
    published: true,
    isIllustrative: false,
    createdAt: '2026-10-01T07:30:00.000Z',
  },
  {
    id: 'media-1',
    title: 'Utility-Scale Solar PV & Coastal Ecosystem Context',
    altText:
      'Nigerian renewable energy engineers inspecting a solar photovoltaic installation bordered by tropical coastal vegetation at golden hour',
    caption:
      'Utility-scale solar generation integrated with environmental stewardship in Nigeria.',
    url: IMG_HERO_SOLAR,
    mimeType: 'image/jpeg',
    sizeBytes: 420000,
    sectionAssignment: 'hero',
    published: true,
    isIllustrative: true,
    createdAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'media-3',
    title: 'Niger Delta Mangrove Seedling Restoration',
    altText:
      'Nigerian conservationists and local community members planting young mangrove saplings in tidal wetlands',
    caption:
      'Community-participatory mangrove restoration and blue carbon stewardship in the Niger Delta.',
    url: IMG_MANGROVE,
    mimeType: 'image/jpeg',
    sizeBytes: 450000,
    sectionAssignment: 'gallery',
    published: true,
    isIllustrative: true,
    createdAt: '2026-10-01T08:10:00.000Z',
  },
  {
    id: 'media-4',
    title: 'Geospatial & Drone Environmental Monitoring (dMRV)',
    altText:
      'Nigerian environmental data researcher operating an aerial survey drone and field geospatial computer beside a wetland corridor',
    caption:
      'Digital measurement, reporting, and verification (dMRV) using drone photogrammetry and field sensors.',
    url: IMG_AI_MONITOR,
    mimeType: 'image/jpeg',
    sizeBytes: 410000,
    sectionAssignment: 'gallery',
    published: true,
    isIllustrative: true,
    createdAt: '2026-10-01T08:15:00.000Z',
  },
  {
    id: 'media-5',
    title: 'Community Clean Energy & Ecological Consultation Workshop',
    altText:
      'Nigerian women, youth, and environmental facilitators collaborating around solar equipment and restoration maps in a community hall',
    caption:
      'Inclusive community consultation, youth technical training, and women’s participation.',
    url: IMG_COMMUNITY,
    mimeType: 'image/jpeg',
    sizeBytes: 430000,
    sectionAssignment: 'community',
    published: true,
    isIllustrative: true,
    createdAt: '2026-10-01T08:20:00.000Z',
  },
];

export const initialVideos: VideoRecord[] = [];
