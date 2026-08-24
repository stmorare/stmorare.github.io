import React from 'react';
import { Badge } from './Badge';

interface SectionHeaderProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  id?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  id,
}) => {
  return (
    <div id={id} className="mb-8 text-left border-b border-slate-800/80 pb-3">
      {badge && (
        <div className="mb-3">
          <Badge variant="blue">{badge}</Badge>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-2 flex-wrap">
        {typeof title === 'string' ? (
          <>
            <span className="inline-block w-2 h-6 bg-blue-600 rounded-xs mr-1"></span>
            {title}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
