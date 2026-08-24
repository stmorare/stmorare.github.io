'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { GraduationCap, Building2 } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const educationItems = [
    {
      title: 'National Certificate: IT (System Support, NQF 5)',
      institution: 'CTU Training Solutions',
      period: '2018',
      modules: [
        { name: 'Business Communication', codes: [] },
        { name: 'Computer Architecture', codes: ['220-901', '220-902'] },
        { name: 'Network Architecture', codes: ['N10-006'] },
        { name: 'Windows 10', codes: ['70-697', '70-698'] },
        { name: 'Introduction To Server Network Operating System', codes: ['70-410'] },
        { name: 'Server Network Operating Server (SNOS)', codes: ['70-411', '70-412'] },
      ],
      tags: ['NQF Level 5', 'System Support', 'CompTIA A+', 'CompTIA N+', 'Microsoft Windows', 'Microsoft Windows Server', 'Communication', 'MCSA'],
    },
  ];

  return (
    <section id="education" className="academic-grid-bg py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto space-y-6">
        <SectionHeader
          badge="Formal Education"
          title="Education"
        />

        <div className="space-y-6">
          {educationItems.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4 }}
              className="bg-slate-900/60 p-5 sm:p-6 rounded-xl border border-slate-800/80 hover:border-blue-600/50 transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>{edu.title}</span>
                </h3>
                <span className="text-xs font-semibold text-blue-300 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-800/60 self-start sm:self-auto">
                  {edu.period}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{edu.institution}</span>
              </p>

              <div className="mb-4 space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-slate-200">Modules:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                  {edu.modules.map((mod, mIdx) => (
                    <div
                      key={mIdx}
                      className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        <span>{mod.name}</span>
                      </div>
                      {mod.codes.length > 0 && (
                        <div className="flex items-center gap-1 shrink-0">
                          {mod.codes.map((code, cIdx) => (
                            <Badge key={cIdx} variant="blue" className="text-[11px] px-2 py-0.5">
                              {code}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Badge Holders */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                {edu.tags.map((tag, tagIdx) => (
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
