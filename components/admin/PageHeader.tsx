import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: { label: string; href?: string; onClick?: () => void };
  breadcrumb?: string[];
}

export function PageHeader({ title, description, action, breadcrumb }: PageHeaderProps) {
  return (
    <div style={{
      padding: '24px 32px',
      background: '#FFF',
      borderBottom: '1px solid #E5E7EB',
      marginBottom: 24,
    }}>
      {breadcrumb && (
        <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>
          {breadcrumb.map((b, i) => (
            <span key={i}>{i > 0 && ' › '}{b}</span>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111827', margin: 0 }}>{title}</h1>
          {description && <p style={{ color: '#6B7280', margin: '4px 0 0', fontSize: 13.5 }}>{description}</p>}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            style={{
              padding: '9px 18px',
              background: '#1B3A6B',
              color: '#FFF',
              border: 'none',
              borderRadius: 7,
              fontWeight: 700,
              fontSize: 13.5,
              cursor: 'pointer',
            }}
          >
            + {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
