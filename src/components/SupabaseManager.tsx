import React, { useState, useEffect } from 'react';
import {
  Database,
  Key,
  Globe,
  Server,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Download,
  ExternalLink,
  Code2,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface SupabaseManagerProps {
  onSaved?: () => void;
  onClose?: () => void;
  isModal?: boolean;
}

function normalizeSupabaseUrl(input: string): string {
  let cleaned = (input || '').trim().replace(/\/+$/, '');
  if (cleaned.endsWith('/rest/v1')) {
    cleaned = cleaned.substring(0, cleaned.length - '/rest/v1'.length);
  }
  return cleaned.replace(/\/+$/, '');
}

export const SupabaseManager: React.FC<SupabaseManagerProps> = ({
  onSaved,
  onClose,
  isModal = false,
}) => {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [serviceRoleKey, setServiceRoleKey] = useState('');
  const [dbUri, setDbUri] = useState('');
  const [connected, setConnected] = useState(false);
  const [lastTestedAt, setLastTestedAt] = useState<string | null>(null);

  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    latencyMs?: number;
  } | null>(null);

  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlPreview, setShowSqlPreview] = useState(false);
  const [sqlContent, setSqlContent] = useState('');
  const [loadingSql, setLoadingSql] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load existing Supabase configuration on mount
  useEffect(() => {
    // 1. Check local storage
    try {
      const saved = localStorage.getItem('terranova_supabase_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.url) setUrl(normalizeSupabaseUrl(parsed.url));
        if (parsed.anonKey) setAnonKey(parsed.anonKey);
        if (parsed.serviceRoleKey) setServiceRoleKey(parsed.serviceRoleKey);
        if (parsed.dbUri) setDbUri(parsed.dbUri);
        if (parsed.connected) setConnected(Boolean(parsed.connected));
      }
    } catch {
      // Ignore
    }

    // 2. Fetch server-side saved config
    fetch('/api/admin/supabase-config')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (data.url) setUrl(normalizeSupabaseUrl(data.url));
          if (data.anonKey) setAnonKey(data.anonKey);
          if (data.serviceRoleKey) setServiceRoleKey(data.serviceRoleKey);
          if (data.dbUri) setDbUri(data.dbUri);
          if (data.connected !== undefined) setConnected(Boolean(data.connected));
          if (data.lastTestedAt) setLastTestedAt(data.lastTestedAt);
        }
      })
      .catch(() => {
        // Fallback to local storage if server unreachable
      });

    // 3. Pre-fetch SQL schema
    fetch('/api/admin/supabase-schema')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.schema) {
          setSqlContent(data.schema);
        }
      })
      .catch(() => {});
  }, []);

  const handleTestConnection = async () => {
    const cleanUrl = normalizeSupabaseUrl(url);
    const cleanKey = anonKey.trim();
    const cleanService = serviceRoleKey.trim();

    if (!cleanUrl || (!cleanKey && !cleanService)) {
      setTestResult({
        success: false,
        message: 'Please provide both the Supabase Project URL and Anon/Public API Key.',
      });
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      // Test via server-side endpoint first
      const res = await fetch('/api/admin/supabase-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: cleanUrl, anonKey: cleanKey, serviceRoleKey: cleanService }),
      });

      if (res.ok) {
        const data = await res.json();
        setTestResult(data);
        if (data.success) {
          setConnected(true);
          setLastTestedAt(new Date().toISOString());
          setNotice({ type: 'success', text: data.message });
        } else {
          setConnected(false);
          setNotice({ type: 'error', text: data.message });
        }
      } else {
        // Fallback to direct client-side fetch ping
        const pingUrl = `${cleanUrl}/rest/v1/`;
        const keyToUse = cleanKey || cleanService;
        const start = Date.now();
        const clientRes = await fetch(pingUrl, {
          method: 'GET',
          headers: {
            apikey: keyToUse,
            Authorization: `Bearer ${keyToUse}`,
          },
        });
        const duration = Date.now() - start;

        if (clientRes.ok || clientRes.status === 200) {
          setConnected(true);
          setTestResult({
            success: true,
            latencyMs: duration,
            message: `Connected successfully in ${duration}ms (HTTP ${clientRes.status})!`,
          });
          setNotice({ type: 'success', text: 'Supabase connection verified successfully!' });
        } else {
          setConnected(false);
          setTestResult({
            success: false,
            message: `Supabase returned HTTP ${clientRes.status}. Check your URL and anon key.`,
          });
          setNotice({
            type: 'error',
            text: `Supabase returned HTTP ${clientRes.status}. Please check credentials.`,
          });
        }
      }
    } catch (err: any) {
      setConnected(false);
      setTestResult({
        success: false,
        message: `Connection failed: ${err?.message || 'Network error or invalid Supabase URL format'}`,
      });
      setNotice({
        type: 'error',
        text: `Unable to connect: ${err?.message || 'Network error'}`,
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSaveConfig = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setNotice(null);

    const cleanUrl = url.trim();
    const cleanKey = anonKey.trim();
    const cleanService = serviceRoleKey.trim();
    const cleanDbUri = dbUri.trim();

    try {
      // 1. Save locally in localStorage for immediate client-side availability
      const localData = {
        url: cleanUrl,
        anonKey: cleanKey,
        serviceRoleKey: cleanService,
        dbUri: cleanDbUri,
        connected,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem('terranova_supabase_config', JSON.stringify(localData));

      // 2. Save on server
      const res = await fetch('/api/admin/supabase-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: cleanUrl,
          anonKey: cleanKey,
          serviceRoleKey: cleanService,
          dbUri: cleanDbUri,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.config?.connected) {
          setConnected(true);
        }
        setNotice({
          type: 'success',
          text: data.message || 'Supabase configuration saved and verified successfully!',
        });
        if (onSaved) onSaved();
      } else {
        setNotice({
          type: 'success',
          text: 'Saved locally in browser storage.',
        });
      }
    } catch (err: any) {
      setNotice({
        type: 'error',
        text: `Saved in browser, but server sync failed: ${err?.message}`,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCopySql = async () => {
    try {
      let script = sqlContent;
      if (!script) {
        setLoadingSql(true);
        const res = await fetch('/api/admin/supabase-schema');
        if (res.ok) {
          const data = await res.json();
          script = data.schema;
          setSqlContent(data.schema);
        }
        setLoadingSql(false);
      }

      if (script) {
        await navigator.clipboard.writeText(script);
        setCopiedSql(true);
        setNotice({
          type: 'success',
          text: 'Complete Supabase SQL Schema script copied to clipboard! Paste it into Supabase SQL Editor.',
        });
        setTimeout(() => setCopiedSql(false), 3000);
      }
    } catch {
      setNotice({
        type: 'error',
        text: 'Could not copy to clipboard. You can view and copy the script directly in the viewer below.',
      });
    }
  };

  const handleDownloadSql = () => {
    if (!sqlContent) return;
    const blob = new Blob([sqlContent], { type: 'text/plain;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'terranova_supabase_schema.sql';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
    setNotice({
      type: 'success',
      text: 'Downloaded terranova_supabase_schema.sql file.',
    });
  };

  const handleSyncData = async () => {
    if (!url.trim() || !anonKey.trim()) {
      setNotice({
        type: 'error',
        text: 'Please enter and save your Supabase Project URL and API Key first.',
      });
      return;
    }

    setSyncing(true);
    try {
      const res = await fetch('/api/admin/supabase-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotice({
          type: 'success',
          text: data.message || 'Website content and tables synchronized to Supabase successfully!',
        });
      } else {
        setNotice({
          type: 'error',
          text:
            data.message ||
            'Could not sync to Supabase table. Make sure you ran the SQL Schema script in Supabase first.',
        });
      }
    } catch (err: any) {
      setNotice({
        type: 'error',
        text: `Sync error: ${err?.message || 'Network error'}`,
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Status Card */}
      <div className="bg-gradient-to-r from-[#2C1A11] via-[#1F3323] to-[#14532D] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#D99B26]/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white/10 rounded-xl border border-white/20 shrink-0">
              <Database className="w-7 h-7 text-[#D99B26]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Supabase Database Connection
                </h1>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono-tabular font-bold uppercase tracking-wider ${
                    connected
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}
                  />
                  {connected ? 'Live Connected' : 'Not Connected'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-2xl leading-relaxed">
                Insert your Supabase project link and API keys below to connect TerraNova Energy Limited’s PostgreSQL database, sync corporate records, and run queries.
              </p>
            </div>
          </div>

          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="self-start sm:self-center px-4 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
            >
              Close Panel
            </button>
          )}
        </div>

        {lastTestedAt && (
          <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-stone-300 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              Last verified with Supabase PostgREST API:{' '}
              <strong className="text-white">{new Date(lastTestedAt).toLocaleString()}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Notice Banner */}
      {notice && (
        <div
          role="alert"
          className={`p-4 rounded-xl border flex items-start justify-between gap-3 text-xs sm:text-sm ${
            notice.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {notice.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            )}
            <span className="leading-relaxed">{notice.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="text-xs underline text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Connection Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div>
          <h2 className="font-display text-lg font-bold text-[#2C1A11] flex items-center gap-2">
            <span>Insert Your Supabase Links Here</span>
            <span className="text-xs font-normal text-stone-500 font-sans">
              (Paste what you copied from Supabase Dashboard)
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Fill in the two required fields (Project URL and Anon Key) to connect your project immediately.
          </p>
        </div>

        <form onSubmit={handleSaveConfig} className="space-y-5">
          {/* 1. Project URL */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="supabase-url"
                className="block text-xs sm:text-sm font-semibold text-[#2C1A11]"
              >
                1. Supabase Project URL <span className="text-red-600">*</span>
              </label>
              <span className="text-[11px] font-mono text-stone-500">
                Project Settings ➔ API ➔ Project URL
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <Globe className="w-4 h-4" />
              </div>
              <input
                id="supabase-url"
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-project-id.supabase.co"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono bg-[#FBF9F5] border border-stone-300 rounded-lg focus:outline-2 focus:outline-[#14532D]"
              />
            </div>
            <p className="text-[11px] text-stone-500">
              The base REST & GraphQL URL for your project. Example:{' '}
              <code className="bg-stone-100 px-1 py-0.5 rounded text-[#14532D]">
                https://xyzcompanyproject.supabase.co
              </code>
            </p>
          </div>

          {/* 2. Anon / Public Key */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="supabase-anon-key"
                className="block text-xs sm:text-sm font-semibold text-[#2C1A11]"
              >
                2. Supabase Anon / Public API Key <span className="text-red-600">*</span>
              </label>
              <span className="text-[11px] font-mono text-stone-500">
                Project Settings ➔ API ➔ Project API Keys (anon)
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <Key className="w-4 h-4" />
              </div>
              <input
                id="supabase-anon-key"
                type="text"
                required
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono bg-[#FBF9F5] border border-stone-300 rounded-lg focus:outline-2 focus:outline-[#14532D]"
              />
            </div>
            <p className="text-[11px] text-stone-500">
              The public API key starting with <code className="bg-stone-100 px-1 py-0.5 rounded">eyJ...</code>. This key is safe to use in frontend web apps with Row Level Security (RLS).
            </p>
          </div>

          {/* 3. Service Role Key (Optional) */}
          <div className="space-y-1.5 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <label
                htmlFor="supabase-service-key"
                className="block text-xs sm:text-sm font-semibold text-[#2C1A11]"
              >
                3. Supabase Service Role Key <span className="text-stone-400 font-normal">(Optional · Backend Only)</span>
              </label>
              <span className="text-[11px] font-mono text-stone-500">
                Project Settings ➔ API ➔ service_role
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <input
                id="supabase-service-key"
                type="password"
                value={serviceRoleKey}
                onChange={(e) => setServiceRoleKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (service_role secret)"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono bg-[#FBF9F5] border border-stone-300 rounded-lg focus:outline-2 focus:outline-[#14532D]"
              />
            </div>
            <p className="text-[11px] text-stone-500">
              Bypasses Row Level Security for administrative synchronization. Kept strictly on the backend.
            </p>
          </div>

          {/* 4. Database Connection String / URI (Optional) */}
          <div className="space-y-1.5 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <label
                htmlFor="supabase-db-uri"
                className="block text-xs sm:text-sm font-semibold text-[#2C1A11]"
              >
                4. PostgreSQL Connection String / URI <span className="text-stone-400 font-normal">(Optional · Direct SQL)</span>
              </label>
              <span className="text-[11px] font-mono text-stone-500">
                Project Settings ➔ Database ➔ Connection string
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <Server className="w-4 h-4" />
              </div>
              <input
                id="supabase-db-uri"
                type="text"
                value={dbUri}
                onChange={(e) => setDbUri(e.target.value)}
                placeholder="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono bg-[#FBF9F5] border border-stone-300 rounded-lg focus:outline-2 focus:outline-[#14532D]"
              />
            </div>
            <p className="text-[11px] text-stone-500">
              Direct connection string URI for database tools, migrations, or Drizzle ORM.
            </p>
          </div>

          {/* Test Result Display */}
          {testResult && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
                testResult.success
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-red-50 border-red-300 text-red-900'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="font-semibold">
                  {testResult.success ? 'Supabase Connection Verified!' : 'Connection Verification Failed'}
                </div>
                <div>{testResult.message}</div>
                {testResult.latencyMs !== undefined && (
                  <div className="text-[11px] font-mono text-stone-500">
                    Response Latency: {testResult.latencyMs}ms
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={testing || !url.trim() || !anonKey.trim()}
              onClick={handleTestConnection}
              className="px-5 py-2.5 rounded-lg border border-[#14532D] text-[#14532D] hover:bg-[#14532D]/10 disabled:opacity-50 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              {testing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#14532D]" />
                  <span>Testing Connection...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-[#D99B26]" />
                  <span>Test Connection</span>
                </>
              )}
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-lg bg-[#14532D] hover:bg-[#0F3F22] disabled:opacity-50 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 text-[#D99B26]" />
                  <span>Save Configuration & Connect</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={syncing || !url.trim()}
              onClick={handleSyncData}
              className="px-4 py-2.5 rounded-lg bg-[#2C1A11] hover:bg-[#1f120c] disabled:opacity-50 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              {syncing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 text-[#D99B26]" />
                  <span>Sync Corporate Data to Supabase</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Visual Guide: Where to Find Your Links in Supabase */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-[#D99B26]" />
          <h2 className="font-display text-lg font-bold text-[#2C1A11]">
            Where to Find These Links in Supabase
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Follow these 4 simple steps in your Supabase dashboard to copy your project links:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-[#FBF9F5] p-4 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#14532D]">
              <span className="w-5 h-5 rounded-full bg-[#14532D] text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Open Supabase</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Go to{' '}
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#14532D] font-semibold underline inline-flex items-center gap-1"
              >
                supabase.com/dashboard <ExternalLink className="w-3 h-3 inline" />
              </a>{' '}
              and click on your project.
            </p>
          </div>

          <div className="bg-[#FBF9F5] p-4 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#14532D]">
              <span className="w-5 h-5 rounded-full bg-[#14532D] text-white flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Project Settings</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              In the bottom left sidebar, click the <strong>Project Settings (⚙️ gear icon)</strong>.
            </p>
          </div>

          <div className="bg-[#FBF9F5] p-4 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#14532D]">
              <span className="w-5 h-5 rounded-full bg-[#14532D] text-white flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Click API Tab</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Select <strong>API</strong> under Configuration. You will see <strong>Project URL</strong> and <strong>Project API Keys</strong>.
            </p>
          </div>

          <div className="bg-[#FBF9F5] p-4 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#14532D]">
              <span className="w-5 h-5 rounded-full bg-[#14532D] text-white flex items-center justify-center text-[10px]">
                4
              </span>
              <span>Copy & Paste Here</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Click <strong>Copy</strong> on Project URL and Anon Key, then paste them directly into the fields above!
            </p>
          </div>
        </div>
      </div>

      {/* SQL Script Section: Copy & View */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#2C1A11]">
              <Code2 className="w-5 h-5 text-[#14532D]" />
              <h2 className="font-display text-lg font-bold">
                Supabase SQL Database Schema Script
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
              Run this SQL script in your Supabase <strong>SQL Editor</strong> to create all tables (projects, content, inquiries, media, statistics) with RLS security policies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopySql}
              className="px-4 py-2 bg-[#14532D] hover:bg-[#0F3F22] text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              {copiedSql ? (
                <>
                  <Check className="w-4 h-4 text-[#D99B26]" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#D99B26]" />
                  <span>Copy SQL Script</span>
                </>
              )}
            </button>

            {sqlContent && (
              <button
                type="button"
                onClick={handleDownloadSql}
                className="px-3.5 py-2 border border-stone-300 hover:bg-stone-50 text-[#2C1A11] text-xs sm:text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-stone-500" />
                <span>Download .sql</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowSqlPreview((prev) => !prev)}
              className="px-3.5 py-2 border border-stone-300 hover:bg-stone-50 text-[#2C1A11] text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              {showSqlPreview ? 'Hide Script' : 'View SQL Script'}
            </button>
          </div>
        </div>

        {/* Collapsible / Expandable SQL Viewer */}
        {showSqlPreview && (
          <div className="mt-4 pt-4 border-t border-stone-200 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>supabase_schema.sql (PostgreSQL 15+)</span>
              <button
                type="button"
                onClick={handleCopySql}
                className="text-[#14532D] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy All</span>
              </button>
            </div>
            <div className="bg-[#1C1917] text-stone-200 p-4 rounded-xl font-mono text-xs max-h-96 overflow-y-auto leading-relaxed border border-stone-800">
              {loadingSql ? (
                <div className="flex items-center justify-center py-10 gap-2 text-stone-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading schema script...</span>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap select-all font-mono">
                  {sqlContent || '-- Loading SQL script...'}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
