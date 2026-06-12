'use client';

import React, { useState } from 'react';
import { Search, Plus, Loader2, Upload, UserPlus, X, Download, ImageUp } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/navigation';
import { PROGRAMS } from '@/lib/programs';

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
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'manual' | 'bulk'>('manual');
  const [isSaving, setIsSaving] = useState(false);
  const [photoMode, setPhotoMode] = useState<'upload' | 'url'>('upload');
  const [isUploading, setIsUploading] = useState(false);

  // Manual Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    enrollmentId: '',
    programName: '',
    programLevel: 'Bachelors',
    enrollmentYear: new Date().getFullYear(),
    status: 'enrolled',
    photo: '',
  });

  // Bulk Upload State
  const [file, setFile] = useState<File | null>(null);

  const filtered = students.filter(s => 
    s.fullName.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.enrollmentId.toLowerCase().includes(search.toLowerCase())
  );

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          fullName: '',
          email: '',
          enrollmentId: '',
          programName: '',
          programLevel: 'Bachelors',
          enrollmentYear: new Date().getFullYear(),
          status: 'enrolled',
          photo: '',
        });
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to add student');
      }
    } catch (error) {
      console.error(error);
      alert('Error adding student');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please select a file first.');

    setIsSaving(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/students/bulk', {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        const result = await res.json();
        alert(`Successfully imported ${result.count} students!`);
        setIsModalOpen(false);
        setFile(null);
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to import students');
      }
    } catch (error) {
      console.error(error);
      alert('Error during bulk upload');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete student "${name}"? This action cannot be undone.`)) {
      return;
    }
    
    try {
      const res = await fetch(`/api/admin/students/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete student');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting student');
    }
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([
      {
        fullName: 'John Doe',
        email: 'john@example.com',
        programName: 'Computer Science',
        programLevel: 'Bachelors',
        enrollmentYear: 2024,
        status: 'active'
      }
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "EUAU_Students_Template.xlsx");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-sm transition-all"
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-semibold text-[13.5px] transition-all duration-200 shadow-sm whitespace-nowrap"
        >
          <Plus size={16} /> Add Student
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Student</th>
                <th className="px-6 py-3.5">ID / Program</th>
                <th className="px-6 py-3.5">Level</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">No students found.</td></tr>
              ) : (
                filtered.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{student.fullName}</div>
                      <div className="text-xs text-slate-500">{student.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs font-bold text-slate-600">{student.enrollmentId}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px]">{student.programName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {student.programLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                        ${student.status === 'enrolled' ? 'bg-blue-100 text-blue-800' : 
                          student.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 
                          student.status === 'graduated' ? 'bg-amber-100 text-amber-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => router.push(`/dashboard/students/${student.id}/edit`)}
                        className="text-xs font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id, student.fullName)}
                        className="text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Add New Student(s)</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            
            <div className="px-6 pt-4">
              <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('manual')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === 'manual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <UserPlus size={16} /> Manual Entry
                </button>
                <button
                  onClick={() => setActiveTab('bulk')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === 'bulk' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Upload size={16} /> Bulk Upload (Excel)
                </button>
              </div>
            </div>

            {activeTab === 'manual' ? (
              <form onSubmit={handleManualSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Enrollment Type</label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="enrollmentType" checked={formData.programLevel !== 'Certification'} onChange={() => setFormData({...formData, programLevel: 'Bachelors', programName: ''})} className="w-4 h-4 text-amber-600 focus:ring-amber-500" />
                        <span className="text-sm font-semibold text-slate-700">Degree Program</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="enrollmentType" checked={formData.programLevel === 'Certification'} onChange={() => setFormData({...formData, programLevel: 'Certification', programName: ''})} className="w-4 h-4 text-amber-600 focus:ring-amber-500" />
                        <span className="text-sm font-semibold text-slate-700">Certification</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Enrollment ID *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. EUAU-2024-00001"
                      value={formData.enrollmentId}
                      onChange={e => setFormData({ ...formData, enrollmentId: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                  {formData.programLevel !== 'Certification' && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Program Level</label>
                    <select
                      value={formData.programLevel}
                      onChange={e => setFormData({ ...formData, programLevel: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 appearance-none"
                    >
                      <option value="Bachelors">Bachelor&apos;s</option>
                      <option value="Masters">Master&apos;s</option>
                      <option value="PhD">PhD</option>
                      <option value="Honorary">Honorary</option>
                    </select>
                  </div>
                  )}
                  <div className={formData.programLevel === 'Certification' ? 'col-span-2' : ''}>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      {formData.programLevel === 'Certification' ? 'Certification Name *' : 'Program Name *'}
                    </label>
                    {formData.programLevel === 'Certification' ? (
                      <input
                        type="text"
                        required
                        value={formData.programName}
                        onChange={e => setFormData({ ...formData, programName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    ) : (
                      <select
                        required
                        value={formData.programName}
                        onChange={e => setFormData({ ...formData, programName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 appearance-none"
                      >
                        <option value="" disabled>Select a program...</option>
                        {formData.programLevel === 'Bachelors' && PROGRAMS.bachelors.map(p => <option key={p.title} value={p.title}>{p.title}</option>)}
                        {formData.programLevel === 'Masters' && PROGRAMS.masters.map(p => <option key={p.title} value={p.title}>{p.title}</option>)}
                        {formData.programLevel === 'PhD' && PROGRAMS.phd.map(p => <option key={p.title} value={p.title}>{p.title}</option>)}
                        {formData.programLevel === 'Honorary' && PROGRAMS.honorary.map(p => <option key={p.title} value={p.title}>{p.title}</option>)}
                      </select>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Enrollment Year</label>
                    <input
                      type="number"
                      required
                      value={formData.enrollmentYear}
                      onChange={e => setFormData({ ...formData, enrollmentYear: parseInt(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Status</label>
                    <select
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 appearance-none"
                    >
                      <option value="enrolled">Enrolled</option>
                      <option value="active">Active</option>
                      <option value="graduated">Graduated</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Student Photo</label>
                    <div className="flex space-x-1 bg-slate-100 p-0.5 rounded-lg mb-3">
                      <button
                        type="button"
                        onClick={() => setPhotoMode('upload')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all ${photoMode === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        <ImageUp size={13} /> Upload Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhotoMode('url')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all ${photoMode === 'url' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        🔗 Image URL
                      </button>
                    </div>
                    {photoMode === 'upload' ? (
                      <div>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setIsUploading(true);
                            try {
                              const fd = new FormData();
                              fd.append('file', file);
                              const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
                              if (res.ok) {
                                const data = await res.json();
                                setFormData(prev => ({ ...prev, photo: data.url }));
                              } else {
                                const err = await res.json();
                                alert(err.error || 'Upload failed');
                              }
                            } catch { alert('Upload failed'); }
                            finally { setIsUploading(false); }
                          }}
                          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                        />
                        {isUploading && <p className="text-xs text-amber-600 mt-1 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Uploading...</p>}
                        {formData.photo && !isUploading && <p className="text-xs text-emerald-600 mt-1">✓ Photo uploaded</p>}
                      </div>
                    ) : (
                      <div>
                        <input
                          type="url"
                          placeholder="https://example.com/photo.jpg"
                          value={formData.photo}
                          onChange={e => setFormData({ ...formData, photo: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                        />
                      </div>
                    )}
                    {formData.photo && (
                      <div className="mt-2 flex items-center gap-3">
                        <img src={formData.photo} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-slate-200" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                        <button type="button" onClick={() => setFormData({ ...formData, photo: '' })} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSaving} className="px-5 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50">
                    {isSaving ? 'Saving...' : 'Add Student'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleBulkSubmit} className="p-6 space-y-5">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50">
                  <Upload className="mx-auto text-slate-400 mb-3" size={32} />
                  <div className="font-bold text-slate-700 mb-1">Upload Excel File</div>
                  <p className="text-sm text-slate-500 mb-4">.xlsx or .xls files only</p>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 mx-auto max-w-xs"
                  />
                </div>
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-600">Need the correct format?</div>
                  <button type="button" onClick={downloadTemplate} className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700">
                    <Download size={14} /> Download Template
                  </button>
                </div>
                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSaving || !file} className="px-5 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50">
                    {isSaving ? 'Importing...' : 'Import Students'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
