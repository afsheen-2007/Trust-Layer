import React, { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative group flex items-center justify-center">
      {children}
      <div className="absolute top-full mt-2.5 px-3 py-1.5 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-700 dark:border-white transform translate-y-1 group-hover:translate-y-0">
        {content}
        {/* Arrow */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-800 dark:border-b-slate-100"></div>
      </div>
    </div>
  );
};

export default Tooltip;