import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import { SiteContent } from '../types';
import { useEmailModal } from './EmailModal';

export type RoutePath =
  | '/'
  | '/about'
  | '/services'
  | '/projects'
  | '/strategy'
  | '/community'
  | '/partnerships'
  | '/contact'
  | '/privacy-policy'
  | '/terms'
  | '/admin'
  | `/projects/${string}`;

interface LayoutProps {
  currentPath: string;
  navigate: (path: string) => void;
  content: SiteContent;
  children: React.ReactNode;
}

const NAV_ITEMS: { label: string; path: RoutePath }[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Strategy', path: '/strategy' },
  { label: 'Community', path: '/community' },
  { label: 'Partnerships', path: '/partnerships' },
  { label: 'Contact', path: '/contact' },
];

export const Layout: React.FC<LayoutProps> = ({
  currentPath,
  navigate,
  content,
  children,
}) => {
  const { openEmailModal } = useEmailModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] overflow-x-hidden">
      {/* Top Bar: 3 Zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/90 shadow-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark with Official Logo Image */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-3 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D]"
          >
            <img
              src={content.logoUrl}
              alt="TerraNova Energy Limited Official Logo"
              referrerPolicy="no-referrer"
              className="h-9 sm:h-11 w-auto object-contain rounded-md"
            />
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#2C1A11] whitespace-nowrap">
              TerraNova Energy
            </span>
          </a>

          {/* Zone 2: Single-line navigation links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  aria-current={active ? 'page' : undefined}
                  className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D] ${
                    active
                      ? 'border-[#14532D] text-[#2C1A11] font-semibold'
                      : 'border-transparent hover:text-[#2C1A11] hover:border-[#D99B26]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Direct Email CTA Button + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Direct Email Action Button */}
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
              className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D]"
            >
              <Mail className="w-4 h-4 text-[#D99B26]" />
              <span>Email Us</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-stone-300 text-[#2C1A11] hover:bg-stone-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#14532D]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden border-b border-stone-200 bg-[#FBF9F5] px-4 pt-3 pb-6 shadow-lg"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className={`flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      active
                        ? 'bg-[#14532D]/10 text-[#14532D] font-semibold'
                        : 'text-[#2C1A11] hover:bg-stone-100'
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
            <div className="mt-4 pt-4 border-t border-stone-200 flex flex-col gap-2.5">
              <a
                href="mailto:terranovaenergylimited@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  openEmailModal();
                }}
                aria-label="Email TerraNova Energy Limited directly"
                title="Email TerraNova Energy Limited directly"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-lg transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#D99B26]" />
                <span>Email Us Directly</span>
              </a>

              <a
                href="/partnerships"
                onClick={(e) => handleLinkClick(e, '/partnerships')}
                className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-[#2C1A11] border border-stone-300 bg-white hover:bg-stone-50 rounded-lg transition-colors"
              >
                Partner With Us
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* Global Corporate Footer */}
      <footer className="bg-[#2C1A11] text-[#FBF9F5] border-t border-[#D99B26]/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Column 1: Brand & Logo */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={content.logoUrl}
                  alt="TerraNova Energy Limited Logo"
                  referrerPolicy="no-referrer"
                  className="h-10 sm:h-12 w-auto object-contain rounded-md bg-white/10 p-1"
                />
                <div className="font-display text-2xl font-bold tracking-tight text-white">
                  {content.companyName}
                </div>
              </div>
              <p className="text-xs font-mono-tabular text-[#D99B26] tracking-wider">
                RC NUMBER: {content.rcNumber} · NIGERIA
              </p>
              <p className="text-sm text-stone-300 leading-relaxed max-w-sm">
                {content.shortDescription}
              </p>

              {/* Official Social Media & Direct Email Icon */}
              <div className="pt-2">
                <p className="text-xs text-stone-400 mb-3">Connect with TerraNova Energy Limited</p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* TikTok */}
                  <a
                    href="https://tiktok.com/@terranovaenergyli"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TerraNova Energy Limited on TikTok"
                    title="Follow TerraNova Energy Limited on TikTok"
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#14532D] text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#D99B26]"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/share/1D7S3BNsrJ/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TerraNova Energy Limited on Facebook"
                    title="Follow TerraNova Energy Limited on Facebook"
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#14532D] text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#D99B26]"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href="https://x.com/TeraNovaEnergy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TerraNova Energy Limited on X (Twitter)"
                    title="Follow TerraNova Energy Limited on X (Twitter)"
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#14532D] text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#D99B26]"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/terracenovaenergylimited?igsh=Z25wcGoxdGlkN3o="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TerraNova Energy Limited on Instagram"
                    title="Follow TerraNova Energy Limited on Instagram"
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#14532D] text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#D99B26]"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  {/* Snapchat */}
                  <a
                    href="https://www.snapchat.com/add/terranovaenergy?share_id=debbLCWhoW4&locale=en-GB"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TerraNova Energy Limited on Snapchat"
                    title="Add TerraNova Energy Limited on Snapchat"
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#14532D] text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#D99B26]"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.166 3c.796 0 3.495.223 4.769 2.943.442.952.337 2.572.244 3.86l-.021.306c-.01.166.068.299.211.363.266.122.617.195.957.266.364.075.741.153.972.345.219.182.301.438.238.738-.091.433-.503.727-1.158.938-.109.035-.228.07-.351.106-.49.143-1.046.306-1.224.642-.116.219-.067.508.146.859.68 1.12 1.832 2.404 3.332 2.867.278.086.484.289.495.553.012.288-.216.578-.655.774-.725.324-1.563.452-2.373.575-.167.026-.335.051-.498.08-.311.056-.498.248-.696.528-.406.574-.965 1.247-2.094 1.247-.527 0-1.015-.148-1.487-.291-.443-.134-.862-.261-1.326-.261-.464 0-.883.127-1.326.261-.472.143-.96.291-1.487.291-1.129 0-1.688-.673-2.094-1.247-.198-.28-.385-.472-.696-.528-.163-.029-.331-.054-.498-.08-.81-.123-1.648-.251-2.373-.575-.439-.196-.667-.486-.655-.774.011-.264.217-.467.495-.553 1.5-.463 2.652-1.747 3.332-2.867.213-.351.262-.64.146-.859-.178-.336-.734-.499-1.224-.642-.123-.036-.242-.071-.351-.106-.655-.211-1.067-.505-1.158-.938-.063-.3.019-.556.238-.738.231-.192.608-.27.972-.345.34-.071.691-.144.957-.266.143-.064.221-.197.211-.363l-.021-.306c-.093-1.288-.198-2.908.244-3.86C8.671 3.223 11.37 3 12.166 3z" />
                    </svg>
                  </a>

                  {/* Official Direct Email Icon */}
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
                    className="w-10 h-10 rounded-lg bg-[#D99B26]/20 hover:bg-[#D99B26] text-[#D99B26] hover:text-[#2C1A11] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D99B26]"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Navigation */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#D99B26]">
                Navigation
              </h3>
              <ul className="space-y-2 text-sm text-stone-300">
                {NAV_ITEMS.map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      className="hover:text-white transition-colors inline-block py-0.5"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Core Solutions */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#D99B26]">
                Solutions & Focus
              </h3>
              <ul className="space-y-2 text-sm text-stone-300">
                <li>
                  <a
                    href="/services"
                    onClick={(e) => handleLinkClick(e, '/services')}
                    className="hover:text-white transition-colors inline-block py-0.5"
                  >
                    01. Decarbonization Engineering
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    onClick={(e) => handleLinkClick(e, '/services')}
                    className="hover:text-white transition-colors inline-block py-0.5"
                  >
                    02. Carbon Credit Solutions
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    onClick={(e) => handleLinkClick(e, '/services')}
                    className="hover:text-white transition-colors inline-block py-0.5"
                  >
                    03. Blue Carbon & Mangrove Restoration
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    onClick={(e) => handleLinkClick(e, '/services')}
                    className="hover:text-white transition-colors inline-block py-0.5"
                  >
                    04. AI-Driven Environmental Monitoring
                  </a>
                </li>
                <li className="pt-2">
                  <a
                    href="/partnerships"
                    onClick={(e) => handleLinkClick(e, '/partnerships')}
                    className="inline-flex items-center gap-1 text-[#D99B26] hover:underline font-medium text-xs"
                  >
                    <span>Institutional Partnerships</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Confirmed Offices & Direct Contact */}
            <div className="lg:col-span-3 space-y-3.5 text-sm text-stone-300">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#D99B26]">
                Offices & Contact
              </h3>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D99B26] shrink-0 mt-1" />
                <div>
                  <span className="block text-xs font-semibold text-white">Corporate Head Office</span>
                  <span>{content.headOffice}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D99B26] shrink-0 mt-1" />
                <div>
                  <span className="block text-xs font-semibold text-white">Regional Office</span>
                  <span>{content.regionalOffice}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#D99B26] shrink-0" />
                <a
                  href={`tel:${content.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white font-mono-tabular transition-colors"
                >
                  {content.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D99B26] shrink-0" />
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
                  className="hover:text-white break-all transition-colors font-medium text-[#D99B26] cursor-pointer"
                >
                  terranovaenergylimited@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Discreet Admin Access Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <div>
              © {new Date().getFullYear()} {content.companyName} (RC: {content.rcNumber}). All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="/privacy-policy"
                onClick={(e) => handleLinkClick(e, '/privacy-policy')}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                onClick={(e) => handleLinkClick(e, '/terms')}
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
