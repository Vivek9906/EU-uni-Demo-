'use client';

import { useState, useEffect } from 'react';
import { Search, Award, Loader2, Plus } from 'lucide-react';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await fetch('/api/certificates');
      const data = await res.json();
      setCertificates(data.certificates || []);
    } catch (error) {
      console.error('Failed to fetch certificates', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = certificates.filter(c => 
    c.holderName.toLowerCase().includes(search.toLowerCase()) || 
    c.certificateId.toLowerCase().includes(search.toLowerCase()) ||
    c.programName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
          <Award className="text-accent" /> Certificates Registry
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
            <input
              type="text"
              placeholder="Search ID, Name, Program..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 py-2 text-sm w-64"
            />
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-subtle text-foreground-muted font-medium uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Certificate ID</th>
                <th className="px-6 py-3">Holder Name</th>
                <th className="px-6 py-3">Program</th>
                <th className="px-6 py-3">Issued Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-foreground-muted"><Loader2 size={24} className="animate-spin mx-auto" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-foreground-muted">No certificates found.</td></tr>
              ) : (
                filtered.map((cert) => (
                  <tr key={cert.id} className="hover:bg-background-subtle/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-primary">{cert.certificateId}</td>
                    <td className="px-6 py-4 font-medium">{cert.holderName}</td>
                    <td className="px-6 py-4 text-foreground-secondary">{cert.programName}</td>
                    <td className="px-6 py-4 text-foreground-secondary">{new Date(cert.issuedDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {cert.isValid ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">Valid</span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error/10 text-error">Revoked</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
