'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { BookOpen, CheckCircle2, ExternalLink } from 'lucide-react';

export const TrainingSection: React.FC = () => {
  const trainingItems = [
    {
      title: 'Network and Systems Administrator Technical Training',
      organization: 'Udemy',
      githubPagesUrl: 'https://stmorare.github.io/Credentials/',
      tags: ['Cabling', 'Windows Server Administration', 'Switching and Routing (Cisco)', 'Firewalls', 'Storage', 'Network Addressing', 'Network Services'],
    },
    {
      title: 'MD-102: Endpoint Administrator Associate course with SIMS!',
      organization: 'Udemy',
      githubPagesUrl: 'https://stmorare.github.io/Credentials/',
      tags: ['Microsoft Intune', 'Microsoft Entra ID', 'Remote Services/Support', 'Endpoint Security', 'Patches', 'Policies'],
    },
    {
      title: 'Complete IT Helpdesk Technical Support with Complete Practical',
      organization: 'Udemy',
      githubPagesUrl: 'https://stmorare.github.io/Credentials/',
      tags: ['Microsoft Windows', 'Microsoft Windows Server', 'Cloud Computing', 'Networking', 'Endpoint Security', 'Software', 'Hardware', 'Ticketing Systems', 'Documentation'],
    },
  ];

  return (
    <section id="training" className="academic-grid-bg py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto space-y-6">
        <SectionHeader
          badge="Specialized Technical Upskilling"
          title="Training"
        />

        <div className="space-y-6">
          {trainingItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-900/60 p-5 sm:p-6 rounded-xl border border-slate-800/80 hover:border-blue-600/50 transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>{item.title}</span>
                </h3>
              </div>

              <p className="text-xs sm:text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{item.organization}</span>
              </p>

              {/* GitHub Pages Badge Container */}
              <div className="mb-4">
                <a
                  href={item.githubPagesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg bg-white/95 hover:bg-white border border-teal-500/50 hover:border-teal-500 shadow-md hover:shadow-teal-950/30 transition-all group hover:-translate-y-0.5"
                >
                  <Image
                    src="/badges/github-pages-logo.svg"
                    alt="Github Pages"
                    width={105}
                    height={26}
                    className="h-6 w-auto max-h-6 object-contain block"
                    referrerPolicy="no-referrer"
                    unoptimized
                  />
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 border-l border-slate-300 pl-2.5">
                    <span>Visit Site</span>
                    <ExternalLink className="w-3.5 h-3.5 text-teal-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </a>
              </div>

              {/* Badge Holders */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                {item.tags.map((tag, tagIdx) => (
                  <Badge key={tagIdx} variant="slate" className="text-[11px] hover:border-blue-500/50 hover:text-blue-200 transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
