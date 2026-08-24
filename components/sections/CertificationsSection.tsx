'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { Award, ShieldCheck, ExternalLink, Clock } from 'lucide-react';
import credlyLogoImg from '../../src/assets/images/credly_logo_1785757693693.jpg';

export const CertificationsSection: React.FC = () => {
  const certificationItems = [
    {
      title: 'Microsoft Azure Data Fundamentals (DP-900)',
      issuer: 'Microsoft',
      issueDate: 'Pending',
      credlyUrl: null,
      tags: ['DP-900', 'Azure Data', 'Core Data Concepts', 'Relational Data', 'Non-Relational Data', 'Data Analytics'],
    },
    {
      title: 'Microsoft Azure Fundamentals (AZ-900)',
      issuer: 'Microsoft',
      issueDate: '2021',
      credlyUrl: 'https://www.credly.com/badges/59a71c79-36cd-4edf-9fb6-e7f5ad4d98cd/public_url',
      tags: ['AZ-900', 'Azure Cloud', 'Cloud Concepts', 'Azure Architecture & Services', 'Azure Management & Governance', 'Microsoft Certified'],
    },
  ];

  return (
    <section id="certifications" className="academic-grid-bg py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto space-y-6">
        <SectionHeader
          badge="Verified Credentials"
          title="Certifications"
        />

        <div className="space-y-6">
          {certificationItems.map((cert, idx) => (
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
                  <Award className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>{cert.title}</span>
                </h3>
                <span className="text-xs font-semibold text-blue-300 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-800/60 self-start sm:self-auto">
                  {cert.issueDate}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>{cert.issuer}</span>
              </p>

              {/* Credly Badge Image Container */}
              <div className="mb-4">
                {cert.credlyUrl ? (
                  <a
                    href={cert.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg bg-white/95 hover:bg-white border border-orange-500/50 shadow-md hover:shadow-orange-950/30 transition-all group hover:-translate-y-0.5"
                  >
                    <Image
                      src={credlyLogoImg}
                      alt="Credly by Pearson"
                      width={90}
                      height={24}
                      className="h-6 w-auto max-h-6 object-contain block"
                      referrerPolicy="no-referrer"
                      unoptimized
                    />
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 border-l border-slate-300 pl-2.5">
                      <span>Verified Badge</span>
                      <ExternalLink className="w-3.5 h-3.5 text-orange-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg bg-white/95 border border-slate-300 shadow-sm">
                    <Image
                      src={credlyLogoImg}
                      alt="Credly by Pearson"
                      width={90}
                      height={24}
                      className="h-6 w-auto max-h-6 object-contain block"
                      referrerPolicy="no-referrer"
                      unoptimized
                    />
                    <div className="flex items-center gap-1.5 border-l border-slate-300 pl-2.5">
                      <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-600" /> Pending Verification
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                {cert.tags.map((tag, tagIdx) => (
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
