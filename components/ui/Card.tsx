import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  id,
  hoverEffect = true,
}) => {
  return (
    <div
      id={id}
      className={`bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 shadow-xl transition-all duration-200 ${
        hoverEffect ? 'hover:border-blue-500/50 hover:bg-slate-900/80 hover:shadow-blue-950/20' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
