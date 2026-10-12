import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import {
  SiteContent,
  ImpactStatistic,
  ProjectRecord,
  MediaItem,
  VideoRecord,
  InquiryRecord,
} from './src/types';
import {
  initialSiteContent,
  initialStatistics,
  initialProjects,
  initialMediaItems,
  initialVideos,
} from './src/initialData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'terranova-db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DatabaseState {
  adminUser: {
    username: string;
    salt: string;
    hash: string;
  };
  content: SiteContent;
  statistics: ImpactStatistic[];
  projects: ProjectRecord[];
  media: MediaItem[];
  videos: VideoRecord[];
  inquiries: InquiryRecord[];
  supabaseConfig?: {
    url: string;
    anonKey: string;
    serviceRoleKey?: string;
    dbUri?: string;
    connected: boolean;
    lastTestedAt?: string;
  };
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

function initializeDatabase(): DatabaseState {
  const initialSalt = crypto.randomBytes(16).toString('hex');
  const defaultPassword = process.env.INITIAL_ADMIN_PASSWORD || 'TerraNova2026!Secure';
  const defaultUser = process.env.INITIAL_ADMIN_USERNAME || 'admin';

  return {
    adminUser: {
      username: defaultUser,
      salt: initialSalt,
      hash: hashPassword(defaultPassword, initialSalt),
    },
    content: initialSiteContent,
    statistics: initialStatistics,
    projects: initialProjects,
    media: initialMediaItems,
    videos: initialVideos,
    inquiries: [
      {
        id: 'inq-seed-1',
        type: 'partnership',
        fullName: 'Dr. Adebayo Ogunlesi',
        organization: 'West African Infrastructure & Climate Fund',
        email: 'a.ogunlesi@wa-climatefund.org',
        phone: '+234 803 555 0192',
        subjectOrInterest: 'Carbon Project Collaboration & Mangrove Restoration Co-Development',
        message:
          'We are evaluating blue carbon investments across coastal Rivers State and would like to review TerraNova Energy Limited’s proposed methodology and technical frameworks.',
        status: 'reviewed',
        createdAt: '2026-10-10T09:30:00.000Z',
      },
      {
        id: 'inq-seed-2',
        type: 'contact',
        fullName: 'Engr. Blessing Nwachukwu',
        organization: 'Niger Delta Clean Power Consortium',
        email: 'blessing.nwachukwu@ndcpc-energy.ng',
        phone: '+234 703 124 8890',
        subjectOrInterest: 'Decarbonization Engineering Services',
        message:
          'Inquiring regarding captive solar hybridization feasibility study for our logistics facility near Port Harcourt.',
        status: 'new',
        createdAt: '2026-10-11T08:15:00.000Z',
      },
    ],
    supabaseConfig: {
      url: process.env.SUPABASE_URL || '',
      anonKey: process.env.SUPABASE_ANON_KEY || '',
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      dbUri: process.env.SUPABASE_DB_URI || '',
      connected: false,
    },
  };
}

let dbState: DatabaseState;

function loadDatabase(): DatabaseState {
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      // Ensure logo, services images, and hero background match user explicit constraints
      if (parsed.content) {
        parsed.content.logoUrl = initialSiteContent.logoUrl;
        parsed.content.servicesFeaturedImage = initialSiteContent.servicesFeaturedImage;
        parsed.content.heroImage = initialSiteContent.heroImage;
        if (parsed.content.services && parsed.content.services[0]) {
          parsed.content.services[0].imageUrl = initialSiteContent.servicesFeaturedImage;
        }
      }
      if (!parsed.supabaseConfig) {
        parsed.supabaseConfig = {
          url: process.env.SUPABASE_URL || '',
          anonKey: process.env.SUPABASE_ANON_KEY || '',
          serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
          dbUri: process.env.SUPABASE_DB_URI || '',
          connected: false,
        };
      }
      return parsed;
    } catch {
      const fresh = initializeDatabase();
      saveDatabase(fresh);
      return fresh;
    }
  } else {
    const fresh = initializeDatabase();
    saveDatabase(fresh);
    return fresh;
  }
}

function saveDatabase(state: DatabaseState): void {
  try {
    const tmp = `${DB_FILE}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(state, null, 2), 'utf-8');
    fs.renameSync(tmp, DB_FILE);
  } catch (err) {
    console.error('Failed to write database:', err);
  }
}

dbState = loadDatabase();

// In-memory active tokens
const activeSessions = new Map<string, { username: string; expiresAt: number }>();

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Authentication token required.' });
  }
  const token = authHeader.substring(7);
  const session = activeSessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    if (session) activeSessions.delete(token);
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
  }
  next();
}

app.use(express.json({ limit: '10mb' }));

// -------------------------------------------------------------
// PUBLIC API ENDPOINTS
// -------------------------------------------------------------

app.get('/api/public/site', (_req: Request, res: Response) => {
  res.json({
    content: dbState.content,
    statistics: dbState.statistics,
    projects: dbState.projects.filter((p) => p.published),
    media: dbState.media,
    videos: dbState.videos.filter((v) => v.published),
  });
});

app.post('/api/inquiries', (req: Request, res: Response) => {
  const { type, fullName, organization, email, phone, subjectOrInterest, message, website_hp } =
    req.body;

  // Spam Honeypot Protection
  if (website_hp) {
    return res.json({ success: true, message: 'Inquiry received successfully.' });
  }

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: 'Please provide full name, email, and message.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const newInquiry: InquiryRecord = {
    id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: type === 'partnership' ? 'partnership' : 'contact',
    fullName: String(fullName).trim(),
    organization: organization ? String(organization).trim() : undefined,
    email: String(email).trim().toLowerCase(),
    phone: phone ? String(phone).trim() : undefined,
    subjectOrInterest: String(subjectOrInterest || 'General Inquiry').trim(),
    message: String(message).trim(),
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  dbState.inquiries.unshift(newInquiry);
  saveDatabase(dbState);

  res.json({
    success: true,
    message:
      'Thank you. Your message has been recorded. Our team will respond to your inquiry promptly.',
  });
});

// -------------------------------------------------------------
// ADMIN AUTHENTICATION & DASHBOARD
// -------------------------------------------------------------

const handleLoginRequest = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Please provide username and password.' });
  }

  if (username !== dbState.adminUser.username) {
    return res.status(401).json({ error: 'Invalid username or password credentials.' });
  }

  const calculatedHash = hashPassword(password, dbState.adminUser.salt);
  if (calculatedHash !== dbState.adminUser.hash) {
    return res.status(401).json({ error: 'Invalid username or password credentials.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  activeSessions.set(token, { username, expiresAt });

  res.json({
    token,
    username,
    expiresAt,
  });
};

const handleLogoutRequest = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    activeSessions.delete(token);
  }
  res.json({ success: true });
};

app.post('/api/admin/login', handleLoginRequest);
app.post('/api/auth/login', handleLoginRequest);

app.post('/api/admin/logout', handleLogoutRequest);
app.post('/api/auth/logout', handleLogoutRequest);

app.get('/api/admin/dashboard', requireAdmin, (_req: Request, res: Response) => {
  res.json({
    content: dbState.content,
    statistics: dbState.statistics,
    projects: dbState.projects,
    media: dbState.media,
    videos: dbState.videos,
    inquiries: dbState.inquiries,
    supabaseConfig: dbState.supabaseConfig || {
      url: process.env.SUPABASE_URL || '',
      anonKey: process.env.SUPABASE_ANON_KEY || '',
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      dbUri: process.env.SUPABASE_DB_URI || '',
      connected: false,
    },
    adminProfile: {
      username: dbState.adminUser.username,
      lastPasswordChange: '2026-10-10T12:00:00.000Z',
      recentUpdates: [
        {
          id: 'u-init',
          action: 'TerraNova Energy system online with verified corporate profile and assets',
          timestamp: new Date().toISOString(),
        },
      ],
    },
  });
});

app.put('/api/admin/content', requireAdmin, (req: Request, res: Response) => {
  const updated = req.body;
  if (!updated) {
    return res.status(400).json({ error: 'Missing content update payload.' });
  }
  // Enforce requested logo and services image
  updated.logoUrl = initialSiteContent.logoUrl;
  updated.servicesFeaturedImage = initialSiteContent.servicesFeaturedImage;
  dbState.content = { ...dbState.content, ...updated };
  saveDatabase(dbState);
  res.json({ success: true, content: dbState.content });
});

app.put('/api/admin/statistics', requireAdmin, (req: Request, res: Response) => {
  const { statistics } = req.body;
  if (Array.isArray(statistics)) {
    dbState.statistics = statistics;
    saveDatabase(dbState);
  }
  res.json({ success: true, statistics: dbState.statistics });
});

// Media upload & management
app.post('/api/admin/media/upload', requireAdmin, (req: Request, res: Response) => {
  const {
    title,
    alt,
    caption,
    section,
    projectId,
    published,
    isIllustrative,
    fileDataUrl,
    fileName,
    fileSize,
  } = req.body;

  if (!fileDataUrl) {
    return res.status(400).json({ error: 'No image data provided.' });
  }

  const newMedia: MediaItem = {
    id: `med-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title: title || fileName || 'Uploaded Image',
    altText: req.body.altText || req.body.alt || title || 'TerraNova Energy Limited Project Image',
    caption: caption || '',
    sectionAssignment: req.body.sectionAssignment || req.body.section || 'gallery',
    projectId: projectId || undefined,
    url: fileDataUrl,
    published: published !== undefined ? published : true,
    isIllustrative: isIllustrative !== undefined ? isIllustrative : true,
    mimeType: req.body.mimeType || 'image/jpeg',
    sizeBytes: Number(req.body.sizeBytes || fileSize || 0),
    createdAt: new Date().toISOString(),
  };

  dbState.media.unshift(newMedia);
  saveDatabase(dbState);
  res.json({ success: true, media: newMedia });
});

app.put('/api/admin/media/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = dbState.media.findIndex((m) => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Media not found.' });
  }
  dbState.media[index] = {
    ...dbState.media[index],
    ...req.body,
  };
  saveDatabase(dbState);
  res.json({ success: true, media: dbState.media[index] });
});

app.delete('/api/admin/media/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  dbState.media = dbState.media.filter((m) => m.id !== id);
  saveDatabase(dbState);
  res.json({ success: true });
});

// Video management
app.post('/api/admin/videos', requireAdmin, (req: Request, res: Response) => {
  const { title, description, originalUrl, url, sectionAssignment, section, projectId, published, embedUrl, provider } = req.body;
  const targetUrl = originalUrl || url;
  if (!title || !targetUrl) {
    return res.status(400).json({ error: 'Title and URL are required.' });
  }
  const newVideo: VideoRecord = {
    id: `vid-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title,
    description: description || '',
    originalUrl: targetUrl,
    embedUrl: embedUrl || targetUrl,
    provider: provider || 'youtube',
    sectionAssignment: sectionAssignment || section || 'gallery',
    projectId: projectId || undefined,
    published: published !== undefined ? published : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dbState.videos.unshift(newVideo);
  saveDatabase(dbState);
  res.json({ success: true, video: newVideo });
});

app.put('/api/admin/videos/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = dbState.videos.findIndex((v) => v.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Video not found.' });
  }
  dbState.videos[index] = {
    ...dbState.videos[index],
    ...req.body,
  };
  saveDatabase(dbState);
  res.json({ success: true, video: dbState.videos[index] });
});

app.delete('/api/admin/videos/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  dbState.videos = dbState.videos.filter((v) => v.id !== id);
  saveDatabase(dbState);
  res.json({ success: true });
});

app.post('/api/admin/projects', requireAdmin, (req: Request, res: Response) => {
  const project = req.body;
  if (!project.title || !project.category) {
    return res.status(400).json({ error: 'Project title and category are required.' });
  }
  const newProject: ProjectRecord = {
    ...project,
    id: project.id || `proj-${Date.now()}`,
    slug:
      project.slug ||
      project.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dbState.projects.unshift(newProject);
  saveDatabase(dbState);
  res.json({ success: true, project: newProject });
});

app.put('/api/admin/projects/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = dbState.projects.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  dbState.projects[index] = {
    ...dbState.projects[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  saveDatabase(dbState);
  res.json({ success: true, project: dbState.projects[index] });
});

app.delete('/api/admin/projects/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  dbState.projects = dbState.projects.filter((p) => p.id !== id);
  saveDatabase(dbState);
  res.json({ success: true });
});

app.patch('/api/admin/inquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  const inq = dbState.inquiries.find((i) => i.id === id);
  if (!inq) {
    return res.status(404).json({ error: 'Inquiry not found.' });
  }
  if (status) inq.status = status;
  if (adminNotes !== undefined) inq.adminNotes = adminNotes;
  saveDatabase(dbState);
  res.json({ success: true, inquiry: inq });
});

app.delete('/api/admin/inquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  dbState.inquiries = dbState.inquiries.filter((i) => i.id !== id);
  saveDatabase(dbState);
  res.json({ success: true });
});

const handlePasswordChange = (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 8 characters long with valid current credentials.' });
  }

  const checkHash = hashPassword(currentPassword, dbState.adminUser.salt);
  if (checkHash !== dbState.adminUser.hash) {
    return res.status(401).json({ error: 'Current password does not match.' });
  }

  const newSalt = crypto.randomBytes(16).toString('hex');
  dbState.adminUser.salt = newSalt;
  dbState.adminUser.hash = hashPassword(newPassword, newSalt);
  saveDatabase(dbState);

  res.json({ success: true, message: 'Admin password changed successfully.' });
};

app.post('/api/admin/change-password', requireAdmin, handlePasswordChange);
app.post('/api/admin/settings/password', requireAdmin, handlePasswordChange);

// -------------------------------------------------------------
// SUPABASE DATABASE CONNECTION MANAGEMENT
// -------------------------------------------------------------

function normalizeSupabaseUrl(input: string): string {
  let cleaned = (input || '').trim().replace(/\/+$/, '');
  if (cleaned.endsWith('/rest/v1')) {
    cleaned = cleaned.substring(0, cleaned.length - '/rest/v1'.length);
  }
  return cleaned.replace(/\/+$/, '');
}

app.get('/api/admin/supabase-config', (_req: Request, res: Response) => {
  const cfg = dbState.supabaseConfig || {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    dbUri: process.env.SUPABASE_DB_URI || '',
    connected: false,
  };
  res.json({
    url: normalizeSupabaseUrl(cfg.url || ''),
    anonKey: cfg.anonKey || '',
    serviceRoleKey: cfg.serviceRoleKey || '',
    dbUri: cfg.dbUri || '',
    connected: Boolean(cfg.connected),
    lastTestedAt: cfg.lastTestedAt,
  });
});

app.post('/api/admin/supabase-config', async (req: Request, res: Response) => {
  const { url, anonKey, serviceRoleKey, dbUri } = req.body || {};
  const cleanUrl = normalizeSupabaseUrl(typeof url === 'string' ? url : '');
  const cleanKey = typeof anonKey === 'string' ? anonKey.trim() : '';
  const cleanServiceKey = typeof serviceRoleKey === 'string' ? serviceRoleKey.trim() : '';
  const cleanDbUri = typeof dbUri === 'string' ? dbUri.trim() : '';

  let isConnected = false;
  let testMessage = 'Saved Supabase configuration successfully.';

  // If URL and Anon Key are supplied, run an immediate live ping to verify
  if (cleanUrl && (cleanKey || cleanServiceKey)) {
    try {
      const pingUrl = `${cleanUrl}/rest/v1/`;
      const keyToUse = cleanKey || cleanServiceKey;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      let testRes = await fetch(pingUrl, {
        method: 'GET',
        headers: {
          apikey: keyToUse,
          Authorization: `Bearer ${keyToUse}`,
        },
        signal: controller.signal,
      });

      if (testRes.status === 401 && cleanServiceKey && cleanServiceKey !== keyToUse) {
        testRes = await fetch(pingUrl, {
          method: 'GET',
          headers: {
            apikey: cleanServiceKey,
            Authorization: `Bearer ${cleanServiceKey}`,
          },
        });
      }

      clearTimeout(timeoutId);

      if (testRes.ok || testRes.status === 200 || testRes.status === 404 || testRes.status === 300) {
        isConnected = true;
        testMessage = `Supabase credentials verified successfully! (HTTP ${testRes.status})`;
      } else {
        const text = await testRes.text().catch(() => '');
        testMessage = `Supabase responded with HTTP ${testRes.status}: ${text || 'Please check project URL and key'}`;
      }
    } catch (err: any) {
      testMessage = `Could not reach Supabase endpoint: ${err?.message || 'Network error'}`;
    }
  }

  dbState.supabaseConfig = {
    url: cleanUrl,
    anonKey: cleanKey,
    serviceRoleKey: cleanServiceKey,
    dbUri: cleanDbUri,
    connected: isConnected,
    lastTestedAt: new Date().toISOString(),
  };
  saveDatabase(dbState);

  // Sync to .env file for environment persistence
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf-8');
    }
    const updateEnvVar = (key: string, val: string) => {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `${key}="${val}"`);
      } else {
        envContent += `\n${key}="${val}"`;
      }
    };
    if (cleanUrl) updateEnvVar('SUPABASE_URL', cleanUrl);
    if (cleanKey) updateEnvVar('SUPABASE_ANON_KEY', cleanKey);
    if (cleanServiceKey) updateEnvVar('SUPABASE_SERVICE_ROLE_KEY', cleanServiceKey);
    if (cleanDbUri) updateEnvVar('SUPABASE_DB_URI', cleanDbUri);
    fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf-8');
  } catch (err) {
    console.warn('Could not write to .env file:', err);
  }

  res.json({
    success: true,
    config: dbState.supabaseConfig,
    message: testMessage,
  });
});

app.post('/api/admin/supabase-test', async (req: Request, res: Response) => {
  const { url, anonKey, serviceRoleKey } = req.body || {};
  const rawUrl = (typeof url === 'string' && url.trim()) || dbState.supabaseConfig?.url || '';
  const cleanUrl = normalizeSupabaseUrl(rawUrl);
  const targetKey = (typeof anonKey === 'string' && anonKey.trim()) || dbState.supabaseConfig?.anonKey || '';
  const targetServiceKey = (typeof serviceRoleKey === 'string' && serviceRoleKey.trim()) || dbState.supabaseConfig?.serviceRoleKey || '';

  if (!cleanUrl || (!targetKey && !targetServiceKey)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both the Supabase Project URL and Anon/Public API Key.',
    });
  }

  const keyToUse = targetKey || targetServiceKey;
  const baseUrl = `${cleanUrl}/rest/v1/`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);
    const start = Date.now();
    let testRes = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        apikey: keyToUse,
        Authorization: `Bearer ${keyToUse}`,
      },
      signal: controller.signal,
    });
    let durationMs = Date.now() - start;

    // If root endpoint rejected anon key because OpenAPI schema requires service role, try with service role
    if (testRes.status === 401 && targetServiceKey && targetServiceKey !== keyToUse) {
      testRes = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          apikey: targetServiceKey,
          Authorization: `Bearer ${targetServiceKey}`,
        },
      });
      durationMs = Date.now() - start;
    }

    clearTimeout(timeoutId);

    if (testRes.ok || testRes.status === 200) {
      if (dbState.supabaseConfig) {
        dbState.supabaseConfig.connected = true;
        dbState.supabaseConfig.lastTestedAt = new Date().toISOString();
        saveDatabase(dbState);
      }
      return res.json({
        success: true,
        latencyMs: durationMs,
        status: testRes.status,
        message: `Successfully connected to Supabase PostgREST API in ${durationMs}ms!`,
      });
    } else {
      const errText = await testRes.text().catch(() => '');
      return res.json({
        success: false,
        status: testRes.status,
        message: `Supabase returned HTTP ${testRes.status}: ${errText || 'Invalid URL or API Key'}`,
      });
    }
  } catch (err: any) {
    return res.json({
      success: false,
      message: `Failed to connect: ${err?.message || 'Network error or invalid Supabase URL format'}`,
    });
  }
});

app.get('/api/admin/supabase-schema', (_req: Request, res: Response) => {
  const schemaPath = path.resolve(process.cwd(), 'supabase_schema.sql');
  if (fs.existsSync(schemaPath)) {
    const sql = fs.readFileSync(schemaPath, 'utf-8');
    res.json({ success: true, schema: sql, filename: 'supabase_schema.sql' });
  } else {
    res.status(404).json({ error: 'supabase_schema.sql file not found.' });
  }
});

app.post('/api/admin/supabase-sync', async (_req: Request, res: Response) => {
  const cfg = dbState.supabaseConfig;
  if (!cfg?.url || !cfg?.anonKey) {
    return res.status(400).json({
      error: 'Supabase is not configured yet. Please enter and save your Supabase URL and Key first.',
    });
  }

  // Attempt to sync site_content to Supabase via REST endpoint
  const targetUrl = cfg.url.endsWith('/') ? cfg.url : `${cfg.url}/`;
  const restEndpoint = `${targetUrl}rest/v1/site_content`;
  const authKey = cfg.serviceRoleKey || cfg.anonKey;

  try {
    const payload = {
      id: 'current',
      company_name: dbState.content.companyName,
      logo_url: dbState.content.logoUrl,
      rc_number: dbState.content.rcNumber,
      head_office: dbState.content.headOffice,
      regional_office: dbState.content.regionalOffice,
      phone: dbState.content.phone,
      email: dbState.content.email,
      short_description: dbState.content.shortDescription,
      hero_headline: dbState.content.heroHeadline,
      hero_subheadline: dbState.content.heroSubheadline,
      hero_image: dbState.content.heroImage,
      hero_image_alt: dbState.content.heroImageAlt,
      hero_image_caption: dbState.content.heroImageCaption,
      intro_title: dbState.content.introTitle,
      intro_body: dbState.content.introBody,
      services_featured_image: dbState.content.servicesFeaturedImage,
      services_featured_image_alt: dbState.content.servicesFeaturedImageAlt,
      sustainability_preview_title: dbState.content.sustainabilityPreviewTitle,
      sustainability_preview_body: dbState.content.sustainabilityPreviewBody,
      partnership_cta_title: dbState.content.partnershipCtaTitle,
      partnership_cta_body: dbState.content.partnershipCtaBody,
      about_overview: dbState.content.aboutOverview,
      about_positioning: dbState.content.aboutPositioning,
      vision_statement: dbState.content.visionStatement,
      mission_statement: dbState.content.missionStatement,
      core_values: dbState.content.coreValues,
      sustainability_commitment: dbState.content.sustainabilityCommitment,
      energy_transition_strategy: dbState.content.energyTransitionStrategy,
      community_commitment: dbState.content.communityCommitment,
      about_image: dbState.content.aboutImage,
      about_image_alt: dbState.content.aboutImageAlt,
      services: dbState.content.services,
      roadmap: dbState.content.roadmap,
      community_intro: dbState.content.communityIntro,
      community_hero_image: dbState.content.communityHeroImage,
      community_hero_alt: dbState.content.communityHeroAlt,
      community_sections: dbState.content.communitySections,
      partnership_intro: dbState.content.partnershipIntro,
      partnership_opportunities: dbState.content.partnershipOpportunities,
      privacy_policy_last_updated: dbState.content.privacyPolicyLastUpdated,
      privacy_policy_text: dbState.content.privacyPolicyText,
      terms_last_updated: dbState.content.termsLastUpdated,
      terms_text: dbState.content.termsText,
      seo_title: dbState.content.seoTitle,
      seo_description: dbState.content.seoDescription,
      max_upload_size_mb: dbState.content.maxUploadSizeMb,
      allow_public_video_embeds: dbState.content.allowPublicVideoEmbeds,
      updated_at: new Date().toISOString(),
    };

    const postRes = await fetch(restEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: authKey,
        Authorization: `Bearer ${authKey}`,
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify(payload),
    });

    if (postRes.ok || postRes.status === 201 || postRes.status === 200 || postRes.status === 204) {
      return res.json({
        success: true,
        message: 'Successfully synchronized corporate content and settings to Supabase!',
      });
    } else {
      const errText = await postRes.text().catch(() => '');
      return res.json({
        success: false,
        message: `Supabase table upsert returned HTTP ${postRes.status}: ${errText}. Please ensure you ran the SQL Schema in your Supabase SQL Editor first.`,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      error: `Sync error: ${err?.message || 'Failed to sync with Supabase'}`,
    });
  }
});

// -------------------------------------------------------------
// VITE DEV SERVER / STATIC ASSET SERVING
// -------------------------------------------------------------

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`TerraNova Energy Limited server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
