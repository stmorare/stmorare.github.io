'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ExternalLink, Wifi, HardDrive } from 'lucide-react';

interface ProjectItem {
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  link?: string;
  linkText?: string;
}

export const ProjectsSection: React.FC = () => {
  const projects: ProjectItem[] = [
    {
      title: 'Wireless Infrastructure Upgrade',
      category: 'DSV Healthcare - Enterprise Network',
      description: 'Replaced 90% of the legacy Cisco-AIR LAP access points with new AIR-CAP models to strengthen wireless signal coverage and network reliability across facilities.',
      icon: <Wifi className="w-5 h-5 text-blue-400" />,
      tags: ['Cisco AIR-CAP', 'Wireless APs', 'LAN/WLAN', 'Hardware Migration'],
    },
    {
      title: 'Dell Wyse Thin Clients',
      category: 'DSV Air & Sea Cost - Hardware Rollout',
      description: 'Installed and configured virtualization hardware and Wyse thin client endpoints for over 50% of staff, significantly reducing Microsoft Windows licensing costs.',
      icon: <HardDrive className="w-5 h-5 text-blue-400" />,
      tags: ['Dell Wyse', 'Thin Clients', 'Virtualization', 'Cost Optimization'],
    },
  ];

  return (
    <section id="projects" className="academic-grid-bg py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Enterprise Projects"
          title="Projects"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="flex flex-col justify-between h-full hover:-translate-y-1 hover:border-blue-500/60 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-blue-950 border border-blue-800/80">
                      {proj.icon}
                    </div>
                    <Badge variant="blue">{proj.category}</Badge>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-2">{proj.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-slate-800/80">
                    {proj.tags.map((tag) => (
                      <Badge key={tag} variant="slate" className="text-[11px] hover:border-blue-500/50 hover:text-blue-200 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>{proj.linkText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
