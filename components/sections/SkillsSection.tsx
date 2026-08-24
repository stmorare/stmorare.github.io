'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Server, Shield, Monitor, Network, Database, Smartphone } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      category: 'Infrastructure & Cloud',
      icon: <Server className="w-5 h-5 text-blue-400" />,
      skills: ['Active Directory', 'Azure AD / Microsoft Entra ID', 'Microsoft 365 Administration', 'Cloud Computing'],
    },
    {
      category: 'System Management',
      icon: <Database className="w-5 h-5 text-blue-400" />,
      skills: ['Kaseya BMS', 'Cherwell Service Management', 'CA Service Desk', 'ITIL Service Desk Operations', 'Knowledge Base Authoring'],
    },
    {
      category: 'Security & Backup',
      icon: <Shield className="w-5 h-5 text-blue-400" />,
      skills: ['Mimecast Phishing Protection', 'Webroot Endpoint Security', 'Disaster Recovery', 'Backup Management'],
    },
    {
      category: 'Technical Support & OS',
      icon: <Monitor className="w-5 h-5 text-blue-400" />,
      skills: ['Windows 10/11 Support', 'Hardware/Software Troubleshooting', 'OS Imaging & Deployment', 'Thin Clients', 'Virtual Machines (VMs)'],
    },
    {
      category: 'Network & Connectivity',
      icon: <Network className="w-5 h-5 text-blue-400" />,
      skills: ['LAN/WAN/Wi-Fi', 'TCP/IP', 'DNS/DHCP', 'PRTG Network Monitoring', 'PuTTY', 'Cisco Nodes', 'VPN Configuration'],
    },
    {
      category: 'Asset & Specialized Support',
      icon: <Smartphone className="w-5 h-5 text-blue-400" />,
      skills: ['Mobile Device Management (MDM)', 'APN Configuration', 'Hardware Procurement & Quotes', 'Inventory Tracking', 'Multimedia & Video Conferencing', 'License Management'],
    },
  ];

  return (
    <section id="skills" className="academic-grid-bg py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 pb-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Core Competencies"
          title="Skills"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
            >
              <Card className="flex flex-col justify-between h-full hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-2.5 mb-4 border-b border-slate-800/80 pb-3">
                    <div className="p-2 rounded-lg bg-blue-950 border border-blue-800/80 shrink-0">
                      {cat.icon}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100">{cat.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <Badge key={skill} variant="slate" className="text-xs py-1 hover:border-blue-500/60 hover:text-blue-200 transition-colors">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
