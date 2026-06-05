import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: { label: string; href?: string; onClick?: () => void };
  breadcrumb?: string[];
}

export function PageHeader({ title, description, action, breadcrumb }: PageHeaderProps) {
  return (
    <div className="bg-white px-8 py-6 border-b border-slate-200 mb-6 shadow-sm">
      {breadcrumb && (
        <div className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-2">
          {breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-slate-300">/</span>}
              <span className={i === breadcrumb.length - 1 ? 'text-slate-900 font-semibold' : ''}>{b}</span>
            </React.Fragment>
          ))}
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">{title}</h1>
          {description && <p className="text-[13.5px] text-slate-500 mt-1.5 leading-relaxed max-w-2xl">{description}</p>}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-semibold text-[13.5px] transition-all duration-200 shadow-sm hover:shadow active:scale-95 whitespace-nowrap shrink-0"
          >
            <span className="text-lg leading-none mb-0.5">+</span> {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
