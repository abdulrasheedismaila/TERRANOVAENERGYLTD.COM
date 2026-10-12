import React, { useState, useEffect, useCallback } from 'react';
import { PublicSitePayload } from './types';
import {
  initialSiteContent,
  initialStatistics,
  initialProjects,
  initialMediaItems,
  initialVideos,
} from './initialData';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { StrategyPage } from './pages/StrategyPage';
import { CommunityPage } from './pages/CommunityPage';
import { PartnershipsPage } from './pages/PartnershipsPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPages';
import { AdminPortal } from './pages/AdminPortal';

import { EmailModalProvider } from './components/EmailModal';

// Resolves current route from window.location.hash (e.g. #/admin) or pathname
const getRouteFromLocation = (): string => {
  if (typeof window === 'undefined') {
    return '/';
  }

  // 1. Check window.location.hash (supports #/admin, #admin, #/admin?tab=supabase)
  const hash = window.location.hash || '';
  if (hash) {
    const rawHash = hash.replace(/^#\/?/, '/');
    if (
      rawHash === '/admin' ||
      rawHash.startsWith('/admin/') ||
      rawHash.startsWith('/admin?')
    ) {
      return rawHash;
    }
    // Also support any direct hash subpage (e.g. #/about, #/services)
    if (rawHash.startsWith('/')) {
      return rawHash;
    }
  }

  // 2. Fallback to standard pathname
  return window.location.pathname || '/';
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => getRouteFromLocation());

  const [siteData, setSiteData] = useState<PublicSitePayload>({
    content: initialSiteContent,
    statistics: initialStatistics,
    projects: initialProjects,
    media: initialMediaItems,
    videos: initialVideos,
  });

  // Fetch updated public data if backend server is available
  const fetchPublicData = useCallback(async () => {
    try {
      const res = await fetch('/api/public/site');
      if (res.ok) {
        const json = await res.json();
        if (json && json.content) {
          setSiteData(json);
        }
      }
    } catch {
      // Graceful fallback to initial embedded state
    }
  }, []);

  useEffect(() => {
    fetchPublicData();
  }, [fetchPublicData]);

  // Sync route with browser history (popstate) and hash changes (hashchange)
  useEffect(() => {
    const handleRouteSync = () => {
      setCurrentPath(getRouteFromLocation());
    };
    window.addEventListener('popstate', handleRouteSync);
    window.addEventListener('hashchange', handleRouteSync);
    return () => {
      window.removeEventListener('popstate', handleRouteSync);
      window.removeEventListener('hashchange', handleRouteSync);
    };
  }, []);

  const navigate = useCallback((path: string) => {
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        // Clear hash and update URL when returning to public routes
        window.history.pushState(null, '', path);
      } else if (path !== window.location.pathname) {
        window.history.pushState(null, '', path);
      }
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Admin Portal rendered full-screen if on /admin (via pathname or #/admin hash)
  if (
    currentPath === '/admin' ||
    currentPath.startsWith('/admin/') ||
    currentPath.startsWith('/admin?')
  ) {
    return (
      <AdminPortal
        onPublicDataChanged={fetchPublicData}
        navigatePublic={(path) => navigate(path)}
      />
    );
  }

  // Render subpage content based on currentPath
  const renderCurrentPage = () => {
    if (currentPath === '/') {
      return <HomePage data={siteData} navigate={navigate} />;
    }
    if (currentPath === '/about') {
      return <AboutPage content={siteData.content} navigate={navigate} />;
    }
    if (currentPath === '/services') {
      return <ServicesPage content={siteData.content} navigate={navigate} />;
    }
    if (currentPath.startsWith('/projects')) {
      const slug = currentPath.startsWith('/projects/')
        ? currentPath.replace('/projects/', '')
        : undefined;
      return <ProjectsPage data={siteData} selectedSlug={slug} navigate={navigate} />;
    }
    if (currentPath === '/strategy') {
      return (
        <StrategyPage
          content={siteData.content}
          statistics={siteData.statistics}
          navigate={navigate}
        />
      );
    }
    if (currentPath === '/community') {
      return <CommunityPage content={siteData.content} navigate={navigate} />;
    }
    if (currentPath === '/partnerships') {
      return <PartnershipsPage content={siteData.content} navigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage content={siteData.content} />;
    }
    if (currentPath === '/privacy-policy') {
      return <LegalPage type="privacy" content={siteData.content} />;
    }
    if (currentPath === '/terms') {
      return <LegalPage type="terms" content={siteData.content} />;
    }

    // Default Fallback to HomePage
    return <HomePage data={siteData} navigate={navigate} />;
  };

  return (
    <EmailModalProvider>
      <Layout
        currentPath={currentPath}
        navigate={navigate}
        content={siteData.content}
      >
        {renderCurrentPage()}
      </Layout>
    </EmailModalProvider>
  );
}
