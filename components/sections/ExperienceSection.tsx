'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      role: 'Service Desk Engineer (MSP)',
      company: 'Italik',
      location: 'Remote (UK)',
      period: 'March 2023 – February 2024',
      type: 'Managed Service Provider (MSP)',
      story: [
        (
          <span key="1">
            In this role, I was the first point of contact for technical support, helping users with both <span className="text-blue-400 font-semibold">1st and 2nd line remote support</span>. I managed support tickets using <span className="text-blue-400 font-semibold">Kaseya BMS</span> and consistently kept over <span className="text-blue-400 font-semibold">90% SLA compliance</span> by resolving issues on time while handling a busy workload.
          </span>
        ),
        (
          <span key="2">
            I also looked after <span className="text-blue-400 font-semibold">Microsoft 365 administration</span>, including setting up new user accounts, removing accounts for departing employees, configuring shared mailboxes, and liaising with accounts managers on matters regarding licenses. To improve email security, I configured <span className="text-blue-400 font-semibold">Mimecast policies</span> to block phishing emails, spam, and other email threats, making it safer for clients to communicate.
          </span>
        ),
        (
          <span key="3">
            By monitoring client systems with <span className="text-blue-400 font-semibold">PRTG</span>, I was able to spot potential issues early and alert customers in advance, to avoid downtime. I used <span className="text-blue-400 font-semibold">Webroot</span> to run remote malware scans, investigate threats, and remove them quickly to keep endpoint systems running smoothly.
          </span>
        ),
        (
          <span key="4">
            In a <span className="text-blue-400 font-semibold">team effort</span> initiative, we made sure that common problems and their solutions were documented in the <span className="text-blue-400 font-semibold">knowledge base</span>. This gave both my teammates and I, a place to find answers, reduced repeat support requests, and helped the service desk solve similar issues faster in the future.
          </span>
        ),
      ],
      tags: ['Kaseya (BMS, VSA, IT Glue)', 'Microsoft 365', 'Mimecast', 'PRTG Monitoring', 'Webroot', 'Devolutions (Remote Desktop Manager)'],
    },
    {
      role: 'Desktop Support Technician',
      company: 'DSV Healthcare',
      location: 'Johannesburg, South Africa',
      period: 'January 2018 – April 2020',
      type: 'Enterprise IT & Migration',
      story: [
        (
          <span key="1">
            During my tenure at DSV Healthcare, I provided hands-on technical support for over <span className="text-blue-400 font-semibold">250 end-users</span> in a high-volume enterprise environment. I managed the installation, diagnosis, and repair of <span className="text-blue-400 font-semibold">workstations, printers, system and application software</span>, ensuring high device reliability and less workflow disruptions.
          </span>
        ),
        (
          <span key="2">
            Oversaw user account management and access controls through <span className="text-blue-400 font-semibold">Active Directory and Group Policy</span>, strengthening strict access to company resources.
          </span>
        ),
        (
          <span key="3">
            The global <span className="text-blue-400 font-semibold">Network Operations Center (NOC) team</span>, assisted with high priority network incidents and infrastructure upgrade projects, using <span className="text-blue-400 font-semibold">console configuration via PuTTY</span> to ensure network connectivity uptime. Additionally, partnering with the <span className="text-blue-400 font-semibold">applications team</span> on incidents and requests regarding <span className="text-blue-400 font-semibold">warehouse management and contact center systems</span>, to avoid communication and business operation glitches that may arise.
          </span>
        ),
      ],
      tags: ['Application Software', 'System Software', 'Laptops', 'Desktops', 'Printers', 'Access Points', 'VOIP'],
    },
    {
      role: 'Desktop Support Technician',
      company: 'DSV Air & Sea',
      location: 'Johannesburg, South Africa',
      period: 'April 2016 – December 2017',
      type: 'Enterprise IT & Migration',
      story: [
        (
          <span key="1">
            In this position, I supported over <span className="text-blue-400 font-semibold">300+ end-users</span> across multiple distributed warehouses and corporate offices during a large-scale enterprise IT migration. Utilizing <span className="text-blue-400 font-semibold">Cherwell Service Management</span>, I resolved 50+ monthly incidents and requests while maintaining the service desk&apos;s <span className="text-blue-400 font-semibold">95% SLA compliance rate</span>.
          </span>
        ),
        (
          <span key="2">
            Branches across boarders i.e. <span className="text-blue-400 font-semibold">Botswana, Malawi, Zimbabwe</span> were provided with remote support using <span className="text-blue-400 font-semibold">TeamViewer</span>, instant messaging applications like <span className="text-blue-400 font-semibold">Skype for Business</span> and <span className="text-blue-400 font-semibold">email</span>.
          </span>
        ),
        (
          <span key="3">
            Also, I managed end-to-end <span className="text-blue-400 font-semibold">IT hardware procurement</span>—coordinating vendor quotes, purchase orders, invoices and asset tracking.
          </span>
        ),
      ],
      tags: ['Cherwell Service Management', 'CA Service Desk', 'Active Directory', 'Laptops', 'Desktops', 'Thin Clients', 'Printers', 'Enterprise Migration', 'Procurement', 'Hardware Inventory', 'SLA'],
    },
  ];

  return (
    <section id="experience" className="academic-grid-bg py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Professional Track Record"
          title="Experience"
        />

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="relative overflow-hidden hover:border-blue-500/60 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-slate-100">{exp.role}</h3>
                      <Badge variant="blue">{exp.type}</Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-blue-300 font-semibold mt-1">
                      {exp.company} • <span className="text-slate-400 font-normal">{exp.location}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-blue-300 bg-blue-950/80 px-3 py-1.5 rounded-lg border border-blue-900/80 self-start sm:self-auto shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-blue-300 font-medium tracking-wide">{exp.period}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {exp.story.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                  {exp.tags.map((tag) => (
                    <Badge key={tag} variant="slate" className="text-[11px] hover:border-blue-500/50 hover:text-blue-200 transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
