'use client';

import React from 'react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  width?: string | number;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchable,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No records found.',
}: DataTableProps<T>) {
  return (
    <div style={{
      background: 'var(--admin-card-bg)',
      borderRadius: 'var(--admin-radius)',
      border: '1px solid var(--admin-card-border)',
      boxShadow: 'var(--admin-card-shadow)',
      overflow: 'hidden',
    }}>
      {searchable && (
        <div style={{ padding: '16px', borderBottom: '1px solid var(--admin-card-border)' }}>
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="admin-input"
            style={{ maxWidth: 300 }}
          />
        </div>
      )}
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid var(--admin-card-border)' }}>
              {columns.map((col, i) => (
                <th key={String(col.key) + i} style={{
                  padding: '12px 16px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--admin-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  width: col.width,
                }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: 14 }}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={row.id || rowIndex} style={{
                  borderBottom: rowIndex === data.length - 1 ? 'none' : '1px solid var(--admin-card-border)',
                  transition: 'var(--admin-transition)',
                }} className="hover:bg-gray-50">
                  {columns.map((col, colIndex) => (
                    <td key={String(col.key) + colIndex} style={{ padding: '12px 16px', fontSize: 14, color: 'var(--admin-text-heading)' }}>
                      {col.render ? col.render(row) : row[col.key as keyof T]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
