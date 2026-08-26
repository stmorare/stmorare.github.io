'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Download,
  Mail,
  Github,
  MapPin,
  CheckCircle2,
  Phone,
  Check,
  Copy,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { SectionHeader } from '../ui/SectionHeader';

export const HeroSection: React.FC = () => {
  const [profileImgSrc, setProfileImgSrc] = useState<string>('/headshot.png');
  const [hasImageError, setHasImageError] = useState<boolean>(false);
  const [imageFallbackIndex, setImageFallbackIndex] = useState<number>(0);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);

  const fallbackPaths = [
    '/headshot.png',
    '/resources/images/headshot.png',
    '/images/headshot.png',
  ];

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleImageError = () => {
    if (imageFallbackIndex + 1 < fallbackPaths.length) {
      const nextIndex = imageFallbackIndex + 1;
      setImageFallbackIndex(nextIndex);
      setProfileImgSrc(fallbackPaths[nextIndex]);
    } else {
      setHasImageError(true);
    }
  };

  return (
    <section id="hero" className="academic-grid-bg py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* LinkedIn-Style Top Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative"
        >
          
          {/* Cover Photo / Banner */}
          <div className="h-36 sm:h-48 w-full bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 relative overflow-hidden border-b border-blue-900/40">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-950/90 border border-blue-700/60 text-xs font-medium text-blue-300 shadow-md">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Open to Opportunities
              </span>
            </div>
          </div>

          {/* Profile Header Body */}
          <div className="p-6 pt-0 relative">
            
            {/* Avatar & Verification Badge */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
              
              {/* Profile Avatar Frame (Locked & Read-Only) */}
              <div className="relative shrink-0 group">
                <div
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-[#0B0F17] bg-slate-900 shadow-2xl overflow-hidden relative flex items-center justify-center ring-2 ring-blue-500/20"
                >
                  {!hasImageError ? (
                    <Image
                      src={profileImgSrc}
                      alt="Simphiwe Tebogo Morare"
                      width={144}
                      height={144}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      priority
                      unoptimized
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-blue-200">
                      <span className="text-2xl font-bold tracking-wider text-blue-400">SM</span>
                      <span className="text-[10px] text-blue-300 font-mono mt-0.5">IT Professional</span>
                    </div>
                  )}
                </div>

                {/* Verified Enterprise Badge */}
                <div
                  className="absolute bottom-1 right-1 bg-blue-900 border border-blue-500 text-blue-300 p-1.5 rounded-full shadow-lg"
                  title="Verified Enterprise Experience"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                </div>
              </div>

            </div>

            {/* Profile Information */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
                    Simphiwe Tebogo Morare
                  </h1>
                  <span title="Verified IT Professional">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <Badge variant="blue">Service Desk Analyst</Badge>
                  <Badge variant="blue">Desktop Support Specialist</Badge>
                  <Badge variant="blue">Technical Support Engineer</Badge>
                  <Badge variant="blue">Technical Administrator</Badge>
                </div>
              </div>

              {/* Location & Direct Contact Info */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  Springs, Gauteng, 1575
                </span>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-1">
                  <a href="mailto:morarest@outlook.com" className="flex items-center gap-1 text-slate-300 hover:text-blue-400 hover:underline">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    morarest@outlook.com
                  </a>
                  <button
                    onClick={() => handleCopy('morarest@outlook.com', 'email')}
                    className="p-1 text-slate-400 hover:text-blue-300 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-1">
                  <a href="tel:0614629169" className="flex items-center gap-1 text-slate-300 hover:text-blue-400 hover:underline">
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    061 462 9169
                  </a>
                  <button
                    onClick={() => handleCopy('0614629169', 'phone')}
                    className="p-1 text-slate-400 hover:text-blue-300 transition-colors"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Quick Competency Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="slate">ITIL (Service Desk Operations)</Badge>
                <Badge variant="slate">On-Prem & Cloud Infrastructure</Badge>
                <Badge variant="slate">System & Application Software</Badge>
                <Badge variant="slate">Networking</Badge>
                <Badge variant="slate">Security</Badge>
                <Badge variant="slate">Procurement</Badge>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-blue-900/40 hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Request CV</span>
                </a>

                <a
                  href="https://github.com/stmorare"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-blue-900/40 hover:-translate-y-0.5"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href="mailto:morarest@outlook.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-blue-900/40 hover:-translate-y-0.5"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>

            </div>

          </div>

        </motion.div>

        {/* "About" Section */}
        <motion.div
          id="about"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="pt-2"
        >
          <SectionHeader badge="Summary" title="About" />

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              IT professional with over 5 years of experience in providing first and second line technical support within <span className="text-blue-400 font-semibold">enterprise and Managed Service Provider (MSP) environments</span>. Applied diagnosis, and resolved hardware, software, and network issues, consistently maintaining service level agreements (SLAs) above 90%. Dedicated to delivering reliable support and exceptional service to customers, while working to minimize interruptions to business operations.
            </p>
            <p>
              Possess a solid understanding of <span className="text-blue-400 font-semibold">ITIL-based service desk operations, Microsoft 365 tenant administration</span>, Active Directory, and network services. Additionally, skilled in using email security and endpoint protection tools, including Mimecast and Webroot. Experienced in managing ticket queues with Kaseya BMS, Cherwell Service Management, and CA Service Desk in fast-paced enterprise environments.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
