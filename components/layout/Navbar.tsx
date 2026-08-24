'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Terminal,
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Tickets', href: '#tickets', id: 'tickets' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'Certifications', href: '#certifications', id: 'certifications' },
  { name: 'Training', href: '#training', id: 'training' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Active section tracking with IntersectionObserver
  useEffect(() => {
    const handleScrollSpy = () => {
      const sectionIds = NAV_LINKS.map((link) => link.id);
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      if (window.scrollY < 150) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800/80 shadow-md px-4 sm:px-6 lg:px-8">
      <nav
        id="main-nav"
        className="max-w-5xl mx-auto h-16 flex items-center justify-between"
        aria-label="Main Navigation"
      >
        {/* Brand Logo & Profile Name */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-slate-100 hover:text-blue-400 transition-colors group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-950 border border-blue-800/80 flex items-center justify-center text-blue-400 group-hover:border-blue-500 transition-all duration-300">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-sm sm:text-base lg:text-lg block text-slate-100 leading-none">
              Simphiwe Tebogo Morare
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-blue-400 tracking-wider uppercase block mt-0.5">
              Information Technology
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs xl:text-sm font-medium px-2.5 py-1.5 rounded-md transition-all duration-200 relative ${
                  isActive
                    ? 'text-blue-400 bg-blue-950/60 font-semibold'
                    : 'text-slate-300 hover:text-blue-300 hover:bg-slate-900/60'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-500 rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Medium Screen Nav (More compact) */}
        <div className="hidden md:flex lg:hidden items-center gap-2">
          {NAV_LINKS.slice(0, 5).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                activeSection === link.id
                  ? 'text-blue-400 font-semibold'
                  : 'text-slate-300 hover:text-blue-300'
              }`}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            type="button"
            className="p-1.5 rounded-lg text-slate-300 hover:text-blue-400 hover:bg-slate-900 border border-slate-800"
            aria-label="More navigation links"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="p-2.5 rounded-lg text-slate-300 hover:text-blue-400 hover:bg-slate-900 border border-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer & Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-16 bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="lg:hidden relative z-50 border-t border-slate-800/80 py-4 bg-[#0B0F17] overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2 px-2 max-h-[70vh] overflow-y-auto">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-blue-950/90 text-blue-300 border border-blue-800/80 font-bold'
                          : 'text-slate-200 hover:text-blue-300 hover:bg-slate-900 border border-transparent'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
