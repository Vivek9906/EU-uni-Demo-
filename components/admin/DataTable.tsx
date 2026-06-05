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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {searchable && (
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full max-w-[300px] px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm"
          />
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              {columns.map((col, i) => (
                <th key={String(col.key) + i} style={{ width: col.width }} className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-slate-500 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={row.id || rowIndex} className="hover:bg-slate-50/80 transition-colors duration-150 group">
                  {columns.map((col, colIndex) => (
                    <td key={String(col.key) + colIndex} className="px-5 py-4 text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
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
