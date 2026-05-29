'use client';

import React, { useState } from 'react';
import { DataTable, Column } from '@/components/admin/DataTable';

interface Student {
  id: string;
  enrollmentId: string;
  fullName: string;
  email: string;
  programName: string;
  programLevel: string;
  enrollmentYear: number;
  intendedStartDate: string | null;
  status: string;
}

export function StudentsClientPage({ students, total, page, limit }: { students: Student[], total: number, page: number, limit: number }) {
  
  const LevelBadge = ({ level }: { level: string }) => {
    return (
      <span style={{ padding: '2px 8px', background: '#F3F4F6', color: '#4B5563', borderRadius: 12, fontSize: 11, fontWeight: 600, textTransform: 'uppercase' }}>
        {level}
      </span>
    );
  };

  const StatusBadge = ({ status }: { status: string }) => {
    let bg = '#F3F4F6';
    let color = '#4B5563';
    
    if (status === 'enrolled') { bg = '#EFF6FF'; color = '#1D4ED8'; }
    if (status === 'active') { bg = '#ECFDF5'; color = '#059669'; }
    if (status === 'graduated') { bg = '#FFFBEB'; color = '#D97706'; }
    if (status === 'suspended') { bg = '#FEF2F2'; color = '#DC2626'; }

    return (
      <span style={{ padding: '2px 8px', background: bg, color: color, borderRadius: 12, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
        {status}
      </span>
    );
  };

  const StudentActions = ({ student }: { student: Student }) => {
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{ color: 'var(--admin-info)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Edit</button>
        <button style={{ color: 'var(--admin-danger)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Delete</button>
      </div>
    );
  };

  const columns: Column<Student>[] = [
    { key: 'enrollmentId', label: 'Enrollment ID', width: 160 },
    { key: 'fullName', label: 'Student Name', width: 200 },
    { key: 'email', label: 'Email', width: 220 },
    { key: 'programName', label: 'Program', width: 260 },
    { key: 'programLevel', label: 'Level', width: 110, render: (r) => <LevelBadge level={r.programLevel} /> },
    { key: 'enrollmentYear', label: 'Year', width: 80 },
    { key: 'intendedStartDate', label: 'Start', width: 110, render: (r) => r.intendedStartDate || '-' },
    { key: 'status', label: 'Status', width: 120, render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: 'Actions', width: 120, render: (r) => <StudentActions student={r} /> },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={students}
        searchable={true}
        searchPlaceholder="Search students..."
      />
    </div>
  );
}
