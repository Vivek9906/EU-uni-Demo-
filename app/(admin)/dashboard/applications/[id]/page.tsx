'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, FileText, CheckCircle, XCircle, Award, Clock, Loader2, Save } from 'lucide-react';

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const [app, setApp] = useState<any>(null);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isIssuingCert, setIsIssuingCert] = useState(false);
  const [certIssued, setCertIssued] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [params.id]);

  const fetchApplication = async () => {
    try {
      const res = await fetch(`/api/applications/${params.id}`);
      const data = await res.json();
      if (data.application) {
        setApp(data.application);
        setStatus(data.application.status);
        setNotes(data.application.notes || '');
      }
    } catch (error) {
      console.error('Failed to fetch', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/applications/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      if (res.ok) {
        alert('Application updated successfully');
        setApp({ ...app, status, notes });
      }
    } catch (error) {
      alert('Failed to update application');
    } finally {
      setIsSaving(false);
    }
  };

  const handleIssueCertificate = async () => {
    if (!confirm(`Are you sure you want to issue a certificate for ${app.fullName} (${app.programName})?`)) return;
    setIsIssuingCert(true);
    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          holderName: app.fullName,
          programName: app.programName,
          applicationId: app.id,
          email: app.email
        }),
      });
      
      if (res.ok) {
        setCertIssued(true);
        alert('Certificate issued successfully. The student has been notified via email.');
      } else {
        alert('Failed to issue certificate');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setIsIssuingCert(false);
    }
  };

  if (isLoading) return <div className="p-12 text-center text-foreground-muted">Loading application...</div>;
  if (!app) return <div className="p-12 text-center text-error">Application not found.</div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/applications" className="p-2 border border-border rounded-md hover:bg-background-subtle">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-3">
            Application <span className="text-primary text-base font-mono bg-primary/10 px-2 py-1 rounded">{app.referenceNumber}</span>
          </h1>
          <p className="text-sm text-foreground-secondary">Submitted on {new Date(app.submittedAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="font-heading text-lg font-bold flex items-center gap-2 mb-4 border-b border-border pb-3">
              <User size={18} className="text-primary" /> Personal Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><span className="text-foreground-muted block">Full Name</span><span className="font-medium">{app.fullName}</span></div>
              <div><span className="text-foreground-muted block">Email</span><a href={`mailto:${app.email}`} className="font-medium text-primary hover:underline">{app.email}</a></div>
              <div><span className="text-foreground-muted block">Phone</span><span className="font-medium">{app.phone}</span></div>
              <div><span className="text-foreground-muted block">Date of Birth</span><span className="font-medium">{new Date(app.dateOfBirth).toLocaleDateString()}</span></div>
              <div><span className="text-foreground-muted block">Gender</span><span className="font-medium">{app.gender}</span></div>
              <div><span className="text-foreground-muted block">Nationality</span><span className="font-medium">{app.nationality}</span></div>
              <div><span className="text-foreground-muted block">Passport / ID</span><span className="font-medium">{app.passportNumber}</span></div>
            </div>
            <div className="mt-4 text-sm">
              <span className="text-foreground-muted block">Current Address</span>
              <span className="font-medium">{app.currentAddress}</span>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-heading text-lg font-bold flex items-center gap-2 mb-4 border-b border-border pb-3">
              <Award size={18} className="text-primary" /> Program Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><span className="text-foreground-muted block">Program Level</span><span className="font-medium">{app.programLevel}</span></div>
              <div><span className="text-foreground-muted block">Program Name</span><span className="font-medium text-primary bg-primary/5 px-2 py-0.5 rounded">{app.programName}</span></div>
              <div><span className="text-foreground-muted block">Mode of Study</span><span className="font-medium">{app.modeOfStudy}</span></div>
              <div><span className="text-foreground-muted block">Intended Start</span><span className="font-medium">{app.intendedStart}</span></div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-heading text-lg font-bold flex items-center gap-2 mb-4 border-b border-border pb-3">
              <FileText size={18} className="text-primary" /> Academic & Professional
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
              <div><span className="text-foreground-muted block">Highest Qualification</span><span className="font-medium">{app.highestQualification}</span></div>
              <div><span className="text-foreground-muted block">Institution</span><span className="font-medium">{app.institutionName}</span></div>
              <div><span className="text-foreground-muted block">Graduation Year</span><span className="font-medium">{app.graduationYear}</span></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><span className="text-foreground-muted block">Current Job</span><span className="font-medium">{app.currentJobTitle || 'N/A'}</span></div>
              <div><span className="text-foreground-muted block">Employer</span><span className="font-medium">{app.employer || 'N/A'}</span></div>
              <div><span className="text-foreground-muted block">Experience</span><span className="font-medium">{app.yearsExperience || 'N/A'}</span></div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-heading text-lg font-bold mb-4 border-b border-border pb-3">Statement of Purpose</h2>
            <div className="text-sm text-foreground-secondary leading-relaxed whitespace-pre-wrap bg-background-subtle p-4 rounded-md border border-border">
              {app.statementOfPurpose}
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="card p-6 bg-white shadow-md border-primary/20">
            <h2 className="font-heading text-lg font-bold mb-4">Admin Actions</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Application Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className={`input-field font-medium ${
                    status === 'Approved' ? 'bg-success/10 text-success border-success/30' : 
                    status === 'Rejected' ? 'bg-error/10 text-error border-error/30' : ''
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <p className="text-xs text-foreground-muted mt-1">Changing status will automatically email the applicant.</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Internal Notes (Not visible to applicant)</label>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  className="input-field" 
                  rows={4}
                  placeholder="Add notes about this application..."
                />
              </div>

              <button 
                onClick={handleUpdate}
                disabled={isSaving}
                className="btn-primary w-full gap-2"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save Changes
              </button>
            </div>
          </div>

          {/* Issue Certificate Action */}
          {app.status === 'Approved' && (
            <div className="card p-6 border-accent/30 bg-accent/5">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-6 h-6 text-accent" />
                <h3 className="font-heading font-bold text-accent-dark">Issue Certificate</h3>
              </div>
              <p className="text-xs text-foreground-secondary mb-4">
                Application is approved. You can now issue the official certificate for <strong>{app.programName}</strong>.
              </p>
              
              {certIssued ? (
                <div className="bg-success/10 text-success text-sm p-3 rounded-md flex items-center gap-2 border border-success/20">
                  <CheckCircle size={16} /> Certificate Issued
                </div>
              ) : (
                <button 
                  onClick={handleIssueCertificate}
                  disabled={isIssuingCert}
                  className="btn-accent w-full gap-2"
                >
                  {isIssuingCert ? <Loader2 size={16} className="animate-spin" /> : <Award size={16} />}
                  Issue Official Certificate
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
