import React from 'react';
import { Terminal, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0F17] border-t border-slate-800/80 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1: Brand */}
        <div className="md:col-span-2 space-y-3">
          <a
           href="#"
           className="flex items-center gap-2.5 text-slate-100 hover:text-blue-400 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-950 border border-blue-800/80 flex items-center justify-center text-blue-400 group-hover:border-blue-500 animate-pulse transition-colors">
             <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-base sm:text-lg block text-slate-100 leading-none">
                Simphiwe Tebogo Morare
              </span>
              <span className="text-[11px] font-medium text-blue-400 tracking-wider uppercase block mt-0.5">
                Information Technology
              </span>
            </div>
          </a>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Navigation
          </h3>
          <ul className="space-y-1.5 text-xs">
            <li><a href="#about" className="hover:text-blue-400 transition-colors">About Me</a></li>
            <li><a href="#skills" className="hover:text-blue-400 transition-colors">Technical Skills</a></li>
            <li><a href="#experience" className="hover:text-blue-400 transition-colors">Work Experience</a></li>
            <li><a href="#tickets" className="hover:text-blue-400 transition-colors">Tickets & Evidence</a></li>
            <li><a href="#education" className="hover:text-blue-400 transition-colors">Education</a></li>
            <li><a href="#certifications" className="hover:text-blue-400 transition-colors">Certifications</a></li>
            <li><a href="#training" className="hover:text-blue-400 transition-colors">Training</a></li>
            <li><a href="#projects" className="hover:text-blue-400 transition-colors">Enterprise Projects</a></li>
          </ul>
        </div>

        {/* Col 3: Contact & Repos */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Connect
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="https://github.com/stmorare"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>github.com/stmorare</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:morarest@outlook.com"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>morarest@outlook.com</span>
              </a>
            </li>
            <li className="text-slate-400 pt-1">
              📍 Springs, Gauteng, 1575
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {currentYear} Simphiwe Tebogo Morare. All rights reserved.</p>
        <p className="text-[11px] font-mono text-blue-400/80">
          stmorare.github.io
        </p>
      </div>
    </footer>
  );
};
