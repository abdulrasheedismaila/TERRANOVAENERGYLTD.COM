-- ==============================================================================
-- TerraNova Energy Limited (RC: 9478210)
-- Complete Supabase PostgreSQL Database Schema & Seed Script
-- Compatible with Supabase SQL Editor (Paste & Run)
-- ==============================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- ==============================================================================
-- 2. TABLE DEFINITIONS
-- ==============================================================================

-- 2.1 Corporate Website Content & Configuration
create table if not exists public.site_content (
    id text primary key default 'current',
    company_name text not null default 'TerraNova Energy Limited',
    logo_url text not null default 'https://i.ibb.co/Ndq0RkLQ/Whats-App-Image-2026-1.jpg',
    rc_number text not null default '9478210',
    head_office text not null default '123 Energy Way, Port Harcourt, Rivers State, Nigeria',
    regional_office text not null default '45 Diplomatic Drive, Abuja, Nigeria',
    phone text not null default '+234 701 650 4968',
    email text not null default 'terranovaenergylimited@gmail.com',
    short_description text not null,
    hero_headline text not null,
    hero_subheadline text not null,
    hero_image text not null default 'https://i.ibb.co/HTwzJw0n/46698.jpg',
    hero_image_alt text not null,
    hero_image_caption text,
    intro_title text not null,
    intro_body text not null,
    services_featured_image text not null default 'https://i.ibb.co/TD31x202/Whats-App-Image-2026-10-10-at-11-06-01-PM.jpg',
    services_featured_image_alt text not null,
    sustainability_preview_title text,
    sustainability_preview_body text,
    partnership_cta_title text,
    partnership_cta_body text,
    about_overview text,
    about_positioning text,
    vision_statement text,
    mission_statement text,
    core_values jsonb default '[]'::jsonb,
    sustainability_commitment text,
    energy_transition_strategy text,
    community_commitment text,
    about_image text default 'https://i.ibb.co/TD31x202/Whats-App-Image-2026-10-10-at-11-06-01-PM.jpg',
    about_image_alt text,
    services jsonb default '[]'::jsonb,
    roadmap jsonb default '[]'::jsonb,
    community_intro text,
    community_hero_image text,
    community_hero_alt text,
    community_sections jsonb default '[]'::jsonb,
    partnership_intro text,
    partnership_opportunities jsonb default '[]'::jsonb,
    privacy_policy_last_updated text default 'October 2026',
    privacy_policy_text text,
    terms_last_updated text default 'October 2026',
    terms_text text,
    seo_title text default 'TerraNova Energy Limited – Energy Transition & Carbon Solutions in Nigeria',
    seo_description text,
    max_upload_size_mb integer default 10,
    allow_public_video_embeds boolean default true,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2.2 Strategic Impact Statistics & Proposed Targets
create table if not exists public.statistics (
    id text primary key,
    label text not null,
    value text not null,
    sublabel text not null,
    is_proposed_target boolean default true,
    category text default 'impact',
    sort_order integer default 0,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2.3 Project Portfolio Records
create table if not exists public.projects (
    id text primary key,
    title text not null,
    slug text unique not null,
    category text not null,
    status text not null check (status in ('Proposed Pipeline', 'Pre-Feasibility Stage', 'Technical Feasibility', 'Framework Development', 'Pilot Program', 'Active Operations')),
    location text not null,
    short_description text not null,
    description text not null,
    start_date text,
    completion_date text,
    impact_indicators jsonb default '[]'::jsonb,
    cover_image text not null,
    cover_image_alt text not null,
    gallery_images jsonb default '[]'::jsonb,
    video_url text,
    featured boolean default false,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2.4 Media Gallery & Section Assets
create table if not exists public.media (
    id text primary key,
    title text not null,
    alt_text text not null,
    caption text default '',
    url text not null,
    mime_type text default 'image/jpeg',
    size_bytes bigint default 0,
    section_assignment text not null check (section_assignment in ('gallery', 'hero', 'about', 'services', 'community', 'project')),
    project_id text references public.projects(id) on delete set null,
    published boolean default true,
    is_illustrative boolean default true,
    created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2.5 Video Records & Technical Embeds
create table if not exists public.videos (
    id text primary key,
    title text not null,
    description text default '',
    original_url text not null,
    embed_url text not null,
    provider text not null check (provider in ('youtube', 'gdrive')),
    section_assignment text not null check (section_assignment in ('homepage', 'projects', 'community', 'gallery')),
    project_id text references public.projects(id) on delete set null,
    published boolean default true,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2.6 Stakeholder & Partnership Inquiries
create table if not exists public.inquiries (
    id text primary key default ('inq-' || extract(epoch from now())::bigint || '-' || substr(md5(random()::text), 1, 6)),
    type text not null check (type in ('contact', 'partnership')),
    full_name text not null,
    organization text,
    email text not null,
    phone text,
    subject_or_interest text not null default 'General Inquiry',
    message text not null,
    status text not null default 'new' check (status in ('new', 'reviewed', 'archived')),
    admin_notes text,
    created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2.7 Portal Admin Profile & Metadata
create table if not exists public.admin_users (
    id uuid primary key default uuid_generate_v4(),
    username text unique not null,
    email text unique,
    role text default 'administrator',
    last_login timestamptz,
    created_at timestamptz default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 3. AUTOMATIC TIMESTAMP TRIGGERS
-- ==============================================================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

drop trigger if exists set_site_content_updated_at on public.site_content;
create trigger set_site_content_updated_at
    before update on public.site_content
    for each row execute function public.handle_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
    before update on public.projects
    for each row execute function public.handle_updated_at();

drop trigger if exists set_videos_updated_at on public.videos;
create trigger set_videos_updated_at
    before update on public.videos
    for each row execute function public.handle_updated_at();

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.site_content enable row level security;
alter table public.statistics enable row level security;
alter table public.projects enable row level security;
alter table public.media enable row level security;
alter table public.videos enable row level security;
alter table public.inquiries enable row level security;
alter table public.admin_users enable row level security;

-- 4.1 Public Read Access
create policy "Allow public read on site_content"
    on public.site_content for select
    using (true);

create policy "Allow public read on statistics"
    on public.statistics for select
    using (true);

create policy "Allow public read on projects"
    on public.projects for select
    using (true);

create policy "Allow public read on published media"
    on public.media for select
    using (published = true);

create policy "Allow public read on published videos"
    on public.videos for select
    using (published = true);

-- 4.2 Public Inquiries Submission
create policy "Allow public insert on inquiries"
    on public.inquiries for insert
    with check (
        length(trim(full_name)) > 0 and
        length(trim(email)) > 3 and
        length(trim(message)) > 0
    );

-- 4.3 Authenticated Administrator Full Access
create policy "Allow authenticated admin full access on site_content"
    on public.site_content for all
    to authenticated
    using (true)
    with check (true);

create policy "Allow authenticated admin full access on statistics"
    on public.statistics for all
    to authenticated
    using (true)
    with check (true);

create policy "Allow authenticated admin full access on projects"
    on public.projects for all
    to authenticated
    using (true)
    with check (true);

create policy "Allow authenticated admin full access on media"
    on public.media for all
    to authenticated
    using (true)
    with check (true);

create policy "Allow authenticated admin full access on videos"
    on public.videos for all
    to authenticated
    using (true)
    with check (true);

create policy "Allow authenticated admin full access on inquiries"
    on public.inquiries for all
    to authenticated
    using (true)
    with check (true);

create policy "Allow authenticated admin access on admin_users"
    on public.admin_users for all
    to authenticated
    using (true)
    with check (true);

-- ==============================================================================
-- 5. INITIAL SEED DATA INSERTION
-- ==============================================================================

-- 5.1 Insert Core Corporate Profile
insert into public.site_content (
    id,
    company_name,
    logo_url,
    rc_number,
    head_office,
    regional_office,
    phone,
    email,
    short_description,
    hero_headline,
    hero_subheadline,
    hero_image,
    hero_image_alt,
    hero_image_caption,
    intro_title,
    intro_body,
    services_featured_image,
    services_featured_image_alt,
    sustainability_preview_title,
    sustainability_preview_body,
    partnership_cta_title,
    partnership_cta_body,
    about_overview,
    about_positioning,
    vision_statement,
    mission_statement,
    core_values,
    sustainability_commitment,
    energy_transition_strategy,
    community_commitment,
    about_image,
    about_image_alt,
    services,
    roadmap,
    community_intro,
    community_sections,
    partnership_intro,
    privacy_policy_text,
    terms_text
) values (
    'current',
    'TerraNova Energy Limited',
    'https://i.ibb.co/Ndq0RkLQ/Whats-App-Image-2026-1.jpg',
    '9478210',
    '123 Energy Way, Port Harcourt, Rivers State, Nigeria',
    '45 Diplomatic Drive, Abuja, Nigeria',
    '+234 701 650 4968',
    'terranovaenergylimited@gmail.com',
    'TerraNova Energy Limited (RC: 9478210) advances energy transition, decarbonization engineering, carbon project development, renewable energy opportunities, and coastal ecosystem restoration across Nigeria.',
    'Powering a Net-Zero Future Through Innovation and Nature',
    'TerraNova Energy Limited advances energy transition and environmental sustainability through innovative carbon solutions, renewable energy opportunities, ecosystem restoration, and strategic partnerships.',
    'https://i.ibb.co/HTwzJw0n/46698.jpg',
    'TerraNova Energy Limited clean energy infrastructure and environmental stewardship in Nigeria',
    'TerraNova Energy Limited clean energy transition and ecosystem restoration in Nigeria.',
    'Integrating Engineering Rigor with Natural Climate Solutions in Nigeria',
    'Headquartered in Port Harcourt with a regional presence in Abuja, TerraNova Energy Limited operates at the intersection of industrial decarbonization, renewable power development, carbon solutions, and ecological restoration. We work to build practical frameworks that align Nigeria’s energy requirements with long-term environmental stewardship and community prosperity.',
    'https://i.ibb.co/TD31x202/Whats-App-Image-2026-10-10-at-11-06-01-PM.jpg',
    'TerraNova Energy Limited Services and Technical Solutions in Nigeria',
    'Committed to High-Integrity Environmental & Climate Action',
    'We adopt internationally recognized measurement, reporting, and verification (MRV) protocols. Our initiatives align with Nigeria’s Climate Change Act (2021), the Energy Transition Plan (ETP), and United Nations Sustainable Development Goals (SDGs 7, 8, 13, and 15).',
    'Collaborate With TerraNova Energy Limited',
    'We invite energy producers, climate finance institutions, academic researchers, and host communities to partner with us in pioneering credible decarbonization and ecological restoration models across Nigeria.',
    'TerraNova Energy Limited (RC: 9478210) is a Nigerian energy transition and environmental solutions company incorporated to lead sustainable industrial transformation, carbon asset development, clean energy deployment, and nature-based ecosystem restoration.',
    'Our multidisciplinary leadership combines experience across Nigerian energy markets, environmental science, regulatory compliance, project finance, and community engagement. We operate with dual hubs in Port Harcourt and Abuja to bridge industrial field execution with high-level institutional governance.',
    'To be West Africa’s foremost catalyst for pragmatic energy transition, bridging industrial decarbonization with nature-positive climate solutions that generate enduring value for people and the planet.',
    'To deliver engineering-grounded decarbonization, develop high-integrity carbon offset projects, deploy reliable renewable energy, and restore fragile ecosystems across Nigeria through scientific rigor, transparency, and inclusive community partnerships.',
    '[
        {"title": "Integrity & Scientific Rigor", "description": "Every metric, emission calculation, and environmental baseline we establish is grounded in empirical methodology and verifiable protocols."},
        {"title": "Environmental Stewardship", "description": "We treat ecological conservation and biodiversity renewal as essential pillars of lasting economic prosperity, not mere compliance checkboxes."},
        {"title": "Local Partnership & Value Creation", "description": "Sustainable climate action is impossible without community leadership. We prioritize local employment, capacity building, and shared benefit mechanisms."},
        {"title": "Transparency & Regulatory Alignment", "description": "We maintain open reporting and full compliance with the Federal Ministry of Environment, the National Council on Climate Change (NCCC), and international carbon standards."}
    ]'::jsonb,
    'Our operational frameworks prioritize environmental conservation, reduction of fugitive emissions, and the preservation of biological diversity across sensitive Niger Delta wetlands and coastal zones.',
    'Nigeria’s energy transition demands a balanced pathway: lowering the carbon intensity of existing industrial baselines while concurrently deploying off-grid and distributed renewable energy for productive economic growth.',
    'Host communities are co-custodians of environmental assets. Our community engagement framework ensures participatory decision-making, local stewardship stipends, and educational infrastructure support.',
    'https://i.ibb.co/TD31x202/Whats-App-Image-2026-10-10-at-11-06-01-PM.jpg',
    'TerraNova Energy Limited Corporate Governance and Technical Operations',
    '[
        {
            "id": "srv-1",
            "title": "Decarbonization Engineering",
            "shortDescription": "Industrial energy efficiency audits, flare reduction engineering, captive cogeneration, and waste heat recovery.",
            "fullDescription": "We partner with heavy industry and commercial operators in Nigeria to map emissions baselines, conduct rigorous Scope 1 and Scope 2 accounting, and implement practical engineering interventions that reduce thermal and electrical energy wastage while improving operational margins.",
            "imageUrl": "https://i.ibb.co/TD31x202/Whats-App-Image-2026-10-10-at-11-06-01-PM.jpg",
            "scopeHighlights": [
                "Industrial facility carbon footprinting & GHG inventory accounting",
                "Associated flare gas utilization and small-scale gas-to-power feasibility",
                "Industrial motor efficiency, heat exchange, and boiler optimization",
                "Captive solar-hybrid engineering integration for industrial clusters"
            ],
            "targetSectors": "Manufacturing, Port Logistics, Petrochemical Processing, Heavy Agro-allied Industries"
        },
        {
            "id": "srv-2",
            "title": "Carbon Asset Development & Blue Carbon",
            "shortDescription": "High-integrity carbon credit project design, baseline MRV, and coastal wetland blue carbon co-development.",
            "fullDescription": "We structure nature-based and technological carbon removal projects aligned with leading international registries (Verra VCS, Gold Standard) and Article 6 carbon market guidelines under Nigeria’s National Council on Climate Change.",
            "imageUrl": "https://i.ibb.co/TD31x202/Whats-App-Image-2026-10-10-at-11-06-01-PM.jpg",
            "scopeHighlights": [
                "Project Design Document (PDD) preparation and methodology drafting",
                "Mangrove and coastal wetland carbon stock remote sensing and soil core sampling",
                "Community Free, Prior, and Informed Consent (FPIC) frameworks",
                "Blockchain-verifiable MRV data integration for carbon buyers"
            ],
            "targetSectors": "Carbon Funds, Institutional Investors, ESG Asset Managers, Conservation Donors"
        },
        {
            "id": "srv-3",
            "title": "Renewable Power Solutions",
            "shortDescription": "Distributed solar PV, hybrid microgrids, and battery energy storage systems (BESS) for commercial facilities.",
            "fullDescription": "We design, co-develop, and manage reliable distributed clean power installations that replace expensive, polluting diesel generators with resilient solar-hybrid microgrids.",
            "imageUrl": "https://i.ibb.co/TD31x202/Whats-App-Image-2026-10-10-at-11-06-01-PM.jpg",
            "scopeHighlights": [
                "Commercial rooftop & ground-mounted solar PV engineering",
                "Lithium iron phosphate (LiFePO4) Battery Energy Storage Sizing",
                "Power purchase agreement (PPA) and energy-as-a-service financial structuring",
                "Remote supervisory control and data acquisition (SCADA) monitoring"
            ],
            "targetSectors": "Agro-processing hubs, logistics centers, telecom towers, remote healthcare facilities"
        },
        {
            "id": "srv-4",
            "title": "Ecosystem & Wetland Restoration",
            "shortDescription": "Holistic reforestation, tidal hydrological restoration, and community mangrove nursery stewardship.",
            "fullDescription": "In collaboration with local community trusts and environmental scientists, we design large-scale mangrove reforestation and soil remediation initiatives across oil-impacted coastal estuaries.",
            "imageUrl": "https://i.ibb.co/TD31x202/Whats-App-Image-2026-10-10-at-11-06-01-PM.jpg",
            "scopeHighlights": [
                "Rhizophora and Avicennia mangrove seedling propagation and nursery establishment",
                "Tidal hydrology channel clearing and salinity balancing",
                "Biodiversity monitoring including fish nursery stock and avifauna recovery",
                "Community ranger employment and anti-logging surveillance patrols"
            ],
            "targetSectors": "State Ministries of Environment, Bilateral Development Banks, Corporate Net-Zero Sponsors"
        }
    ]'::jsonb,
    '[
        {"stageNumber": "01", "phase": "Phase 1: Baselines & Pilot Deployment", "timeframe": "2026 - 2027", "objective": "Establish baseline data and pilot feasibility studies.", "focusAreas": ["Complete coastal mangrove baseline carbon density study across Rivers State", "Execute first 2 MWp commercial solar-hybrid pilot in Port Harcourt industrial corridor", "Engage 10 host communities with formal FPIC agreements"]},
        {"stageNumber": "02", "phase": "Phase 2: Scale-Up & Verification", "timeframe": "2027 - 2029", "objective": "Scale project pipeline and achieve international carbon verification.", "focusAreas": ["Achieve validation for 2,500 hectares of mangrove blue carbon under international standard", "Deploy 25 MW aggregate distributed solar-diesel displacement capacity", "Deploy AI drone environmental monitoring network"]},
        {"stageNumber": "03", "phase": "Phase 3: Regional Leadership", "timeframe": "2029 - 2032", "objective": "Expand across Gulf of Guinea as benchmark decarbonization operator.", "focusAreas": ["5,000+ hectares protected under community-custody conservation agreements", "100+ MW clean pipeline in full operation across Nigeria", "Facilitate cross-border Article 6 internationally transferred mitigation outcomes (ITMOs)"]}
    ]'::jsonb,
    'TerraNova Energy Limited believes environmental projects can only succeed with deep, equitable community ownership. We partner directly with traditional institutions, youth groups, and women associations across our host communities in Rivers State and neighboring Niger Delta states.',
    '[
        {"title": "Community-Operated Seedling Nurseries", "description": "We fund the establishment of local nurseries, paying fair daily wages to community members for tending and propagating indigenous mangrove species.", "iconName": "Sprout"},
        {"title": "Ecosystem Ranger Stipends", "description": "Trained community youth are employed as certified ecological wardens, providing regular monitoring reports and protecting restoration tracts against illegal clearing.", "iconName": "Shield"},
        {"title": "Clean Energy for Essential Services", "description": "As part of every commercial development, we allocate clean electricity access to local primary healthcare centers and clean drinking water pumping stations.", "iconName": "SunMedium"}
    ]'::jsonb,
    'We collaborate with forward-thinking enterprises, government agencies, capital allocators, and local stakeholders who share our commitment to a practical, equitable energy transition.',
    'TerraNova Energy Limited (RC: 9478210) values privacy and transparent governance. We collect and process personal data in full compliance with the Nigeria Data Protection Act (NDPA) 2023. We do not sell or trade user data.',
    'Welcome to the TerraNova Energy Limited website. By accessing our services, you agree to these Terms. All figures labeled as proposed targets represent strategic planning objectives and not certified financial claims.'
)
on conflict (id) do update set
    company_name = excluded.company_name,
    logo_url = excluded.logo_url,
    rc_number = excluded.rc_number,
    hero_image = excluded.hero_image,
    services_featured_image = excluded.services_featured_image,
    email = excluded.email,
    updated_at = timezone('utc'::text, now());

-- 5.2 Insert Impact Statistics
insert into public.statistics (id, label, value, sublabel, is_proposed_target, sort_order) values
('stat-1', 'Clean Energy Pipeline', '100+ MW', 'Proposed cumulative capacity across distributed commercial solar and captive hybrid installations', true, 1),
('stat-2', 'Mangrove & Blue Carbon Habitats', '5,000+ Ha', 'Target restoration and conservation zones identified across coastal Niger Delta estuaries', true, 2),
('stat-3', 'Lifetime GHG Abatement Target', '1.2M+ tCO2e', 'Projected lifecycle carbon dioxide equivalent emissions mitigation from pipeline projects', true, 3),
('stat-4', 'Host Communities Engagement Benchmark', '25+ Communities', 'Target community partnerships slated for shared-benefit restoration and capacity building', true, 4)
on conflict (id) do update set
    label = excluded.label,
    value = excluded.value,
    sublabel = excluded.sublabel,
    is_proposed_target = excluded.is_proposed_target,
    sort_order = excluded.sort_order,
    updated_at = timezone('utc'::text, now());

-- 5.3 Insert Project Portfolio Records
insert into public.projects (
    id, title, slug, category, status, location, short_description, description,
    start_date, completion_date, impact_indicators, cover_image, cover_image_alt, featured
) values
(
    'proj-1',
    'Niger Delta Mangrove Reforestation & Blue Carbon Initiative',
    'niger-delta-mangrove-reforestation',
    'Mangrove & Coastal Ecosystems',
    'Technical Feasibility',
    'Degraded tidal estuaries near Bonny and Degema, Rivers State',
    'Restoring 2,500 hectares of degraded mangrove forest through community nurseries, hydrological restoration, and international carbon credit validation.',
    'This flagship initiative combines ecological science with carbon finance to restore critical coastal ecosystems in Rivers State. Working closely with traditional councils and youth associations, the project establishes 15 community-managed nurseries to cultivate native Rhizophora racemosa and Avicennia germinans mangroves. Hydrological interventions reconnect natural tidal flows that were impeded by past industrial activities.',
    'Q1 2026',
    'Q4 2029 (Proposed)',
    '["2,500 Hectares Target Restoration", "650,000+ tCO2e Estimated 20-Year Carbon Removal", "180+ Local Nursery & Ranger Jobs Created", "Protection of Artisanal Fishery Spawning Grounds"]'::jsonb,
    '/src/assets/images/niger_delta_mangrove_restoration_1791722197259.jpg',
    'Community mangrove seedling nursery along tidal estuary in Rivers State, Nigeria',
    true
),
(
    'proj-2',
    'Captive Industrial Solar-Hybrid Microgrid Installation',
    'captive-industrial-solar-hybrid',
    'Renewable Energy',
    'Technical Feasibility',
    'Trans-Amadi Industrial Layout, Port Harcourt, Rivers State',
    'Deploying an 8.5 MWp ground-and-rooftop solar PV system coupled with 12 MWh battery energy storage for high-demand manufacturing operations.',
    'Designed to reduce reliance on heavy fuel oil and diesel generators in Port Harcourt’s Trans-Amadi manufacturing corridor, this captive power project pairs high-efficiency bifacial solar PV panels with containerized Lithium Iron Phosphate (LiFePO4) energy storage.',
    'Q2 2026',
    'Q3 2027 (Proposed)',
    '["8.5 MWp Solar Generation Capacity", "12 MWh Battery Energy Storage System", "7,200 Metric Tons Annual CO2 Offset", "Up to 34% Reduction in Baseline Energy Cost"]'::jsonb,
    '/src/assets/images/hero_nigerian_energy_solar_1791722187718.jpg',
    'Commercial solar photovoltaic array on industrial facility in Port Harcourt, Nigeria',
    true
),
(
    'proj-3',
    'Associated Petroleum Gas Decarbonization Feasibility Study',
    'flare-gas-decarbonization-feasibility',
    'Carbon Initiatives',
    'Pre-Feasibility Stage',
    'Onshore Flowstations, Eastern Niger Delta',
    'Technical and economic modeling to capture routine flare gas from stranded marginal fields and convert it into low-carbon domestic power.',
    'Aligned with Nigeria’s Gas Flare Commercialization Programme (NGFCP), TerraNova Energy Limited is conducting engineering assessments across select onshore flowstation clusters. The study evaluates modular small-scale gas processing, micro-LNG, and pressurized transport solutions.',
    'Q3 2026',
    'Q1 2027 (Study Phase)',
    '["Assessment of 15 MMCFD Stranded Flare Gas", "Identification of 40 MW Domestic Power Potential", "Potential Mitigation of 320,000 tCO2e Annually", "Assessment of Local Sulfur Scrubbing Technology"]'::jsonb,
    'https://i.ibb.co/TD31x202/Whats-App-Image-2026-10-10-at-11-06-01-PM.jpg',
    'TerraNova Energy Limited engineering and decarbonization analysis in Nigeria',
    true
),
(
    'proj-4',
    'Community Clean Water & Solar Electrification Hubs',
    'community-solar-water-hubs',
    'Community Development',
    'Proposed Pipeline',
    'Coastal fishing settlements in Rivers and Bayelsa States',
    'Constructing 5 off-grid solar-powered mini-hubs that provide clean drinking water, community health cold storage, and street illumination.',
    'This social impact and corporate social responsibility (CSR) initiative provides sustainable infrastructure to off-grid coastal communities that lack municipal services.',
    'Q4 2026',
    'Q4 2027 (Proposed)',
    '["5 Off-grid Coastal Hubs Planned", "Over 12,000 Residents with Clean Water Access", "Vaccine and Cold-chain Support for 3 Health Clinics", "Zero Diesel Fuel Reliance for Municipal Pumping"]'::jsonb,
    '/src/assets/images/nigerian_community_sustainability_179172219823.jpg',
    'Nigerian community gathering near clean energy installation in coastal village',
    false
),
(
    'proj-5',
    'AI-Enhanced Wetland & Forest Drone Monitoring Network',
    'ai-wetland-drone-monitoring',
    'Environmental Monitoring',
    'Technical Feasibility',
    'Coastal mangrove belt of Rivers and Akwa Ibom States',
    'Deploying multi-spectral drone surveying and machine learning canopy density models for precision carbon stock verification and illegal logging detection.',
    'To guarantee integrity in carbon offset measurement, reporting, and verification (MRV), TerraNova Energy Limited is developing an autonomous aerial surveying protocol. Equipped with LiDAR and multi-spectral sensors, drones map canopy biomass, tree height, and water salinity.',
    'Q1 2026',
    'Q3 2026 (System Launch)',
    '["Sub-centimeter Canopy Biomass Resolution", "Real-time Deforestation Alerting Within 4 Hours", "Direct Integration with International Carbon Registries", "Training 12 Local Youth as Licensed Drone Operators"]'::jsonb,
    '/src/assets/images/nigerian_environmental_monitoring_drone_1791722207952.jpg',
    'Specialist environmental monitoring drone operating over tropical wetland canopy in Nigeria',
    false
),
(
    'proj-6',
    'Green Hydrogen & Ammonia Production Pre-Feasibility Study',
    'green-hydrogen-feasibility',
    'Renewable Energy',
    'Pre-Feasibility Stage',
    'Deepwater Logistics Hub, Onne, Rivers State',
    'Assessing the viability of utilizing surplus solar and hydro power for green hydrogen generation to supply maritime logistics and export markets.',
    'Evaluating long-range technology roadmaps for Nigeria’s role in future hydrogen economies, TerraNova Energy Limited is conducting strategic pre-feasibility modeling at Onne port.',
    'Q4 2026',
    'Q2 2027 (Study Phase)',
    '["Techno-economic Modeling for 50 MW Electrolyzer", "Export Logistics Optimization via Gulf of Guinea", "Assessment of Local Green Ammonia for Nitrogen Fertilizer", "Regulatory Pathway Alignment with Federal Ministry of Petroleum"]'::jsonb,
    '/src/assets/images/hero_nigerian_energy_solar_1791722187718.jpg',
    'Clean energy and industrial transition infrastructure near coastal port in Nigeria',
    false
)
on conflict (id) do update set
    title = excluded.title,
    slug = excluded.slug,
    category = excluded.category,
    status = excluded.status,
    location = excluded.location,
    short_description = excluded.short_description,
    description = excluded.description,
    impact_indicators = excluded.impact_indicators,
    cover_image = excluded.cover_image,
    featured = excluded.featured,
    updated_at = timezone('utc'::text, now());

-- 5.4 Insert Sample Inquiries
insert into public.inquiries (
    id, type, full_name, organization, email, phone, subject_or_interest, message, status
) values
(
    'inq-seed-1',
    'partnership',
    'Dr. Adebayo Ogunlesi',
    'West African Infrastructure & Climate Fund',
    'a.ogunlesi@wa-climatefund.org',
    '+234 803 555 0192',
    'Carbon Project Collaboration & Mangrove Restoration Co-Development',
    'We are evaluating blue carbon investments across coastal Rivers State and would like to review TerraNova Energy Limited proposed methodology and technical frameworks.',
    'reviewed'
),
(
    'inq-seed-2',
    'contact',
    'Engr. Blessing Nwachukwu',
    'Niger Delta Clean Power Consortium',
    'blessing.nwachukwu@ndcpc-energy.ng',
    '+234 703 124 8890',
    'Decarbonization Engineering Services',
    'Inquiring regarding captive solar hybridization feasibility study for our logistics facility near Port Harcourt.',
    'new'
)
on conflict (id) do nothing;

-- ==============================================================================
-- END OF SUPABASE SCRIPT
-- ==============================================================================
