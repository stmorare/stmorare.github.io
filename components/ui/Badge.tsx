import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'emerald' | 'slate' | 'outline';
  className?: string;
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  className = '',
  id,
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium tracking-wide transition-colors';
  
  const variants = {
    blue: 'bg-blue-950/80 text-blue-300 border border-blue-800/60 shadow-xs',
    emerald: 'bg-blue-950/80 text-blue-300 border border-blue-800/60 shadow-xs',
    slate: 'bg-slate-800/80 text-slate-300 border border-slate-700/60',
    outline: 'bg-transparent text-blue-400 border border-blue-700/50',
  };

  return (
    <span id={id} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
