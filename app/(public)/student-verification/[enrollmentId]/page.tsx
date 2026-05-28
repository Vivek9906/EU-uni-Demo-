'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, Loader2, Download, Shield, MapPin, Calendar, BookOpen, User } from 'lucide-react';

interface StudentData {
  enrollmentId: string;
  fullName: string;
  programName: string;
  programLevel: string;
  enrollmentYear: number;
  expectedCompletion: string | null;
  status: string;
  photo: string | null;
}

export default function StudentVerificationResultPage({ params }: { params: { enrollmentId: string } }) {
  const [data, setData] = useState<StudentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/students/verify/${encodeURIComponent(params.enrollmentId)}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No record found for this Enrollment ID.');
          }
          if (response.status === 429) {
             throw new Error('Rate limit exceeded. Please try again later.');
          }
          throw new Error('Failed to verify student record.');
        }
        const result = await response.json();
        setData(result.student);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [params.enrollmentId]);

  if (isLoading) {
    return (
      <section className="min-h-[70vh] flex flex-col items-center justify-center bg-background-subtle">
        <Loader2 size={48} className="animate-spin text-primary mb-4" />
        <p className="text-foreground-secondary animate-pulse">Accessing secure records database...</p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="min-h-[70vh] flex flex-col items-center justify-center bg-background-subtle section-padding text-center">
        <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mb-6 mx-auto">
          <XCircle className="w-10 h-10 text-error" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Verification Failed</h1>
        <p className="text-foreground-secondary max-w-md mx-auto mb-8">
          {error || 'No matching record was found in our public registry.'}
        </p>
        <div className="flex gap-4">
          <Link href="/student-verification" className="btn-primary">
            Try Another ID
          </Link>
          <Link href="/contact" className="btn-ghost">
            Contact Support
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background-subtle py-12">
      <div className="container-main max-w-4xl">
        <Link href="/student-verification" className="text-sm text-primary hover:text-primary-light inline-flex items-center gap-1 mb-8">
          <ArrowLeft size={14} /> Back to Search
        </Link>
        
        {/* Verification Banner */}
        <div className="bg-success/10 border border-success/20 rounded-xl p-6 mb-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-success-dark m-0">Official Record Verified</h2>
              <p className="text-sm text-success">This is an authentic student record from EU American University.</p>
            </div>
          </div>
          <div className="text-sm font-medium text-foreground-muted bg-white/50 px-4 py-2 rounded-lg">
            Generated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white border border-border rounded-xl shadow-sm p-6 text-center">
              <div className="w-32 h-32 mx-auto bg-background-subtle border border-border rounded-full flex items-center justify-center overflow-hidden mb-4 relative">
                {data.photo ? (
                  <img src={data.photo} alt={data.fullName} className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-foreground-muted" />
                )}
                {/* Status Badge Over Profile Pic */}
                <div className={`absolute bottom-0 inset-x-0 py-1 text-[10px] font-bold uppercase tracking-wide text-white
                  ${data.status === 'enrolled' ? 'bg-primary' : data.status === 'graduated' ? 'bg-success' : 'bg-foreground-muted'}`}
                >
                  {data.status}
                </div>
              </div>
              <h1 className="font-heading text-xl font-bold text-foreground mb-1">{data.fullName}</h1>
              <p className="text-xs text-foreground-muted uppercase tracking-wider mb-4">ID: {data.enrollmentId}</p>
              
              <button className="btn-ghost w-full gap-2 text-xs py-2" onClick={() => window.print()}>
                <Download size={14} /> Download PDF
              </button>
            </div>
          </div>

          {/* Academic Details Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="bg-primary p-4 flex items-center gap-2">
                <BookOpen size={18} className="text-accent" />
                <h3 className="font-heading font-bold text-white text-lg m-0">Academic Profile</h3>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <span className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Program of Study</span>
                    <strong className="text-foreground">{data.programName}</strong>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Academic Level</span>
                    <strong className="text-foreground capitalize">{data.programLevel}</strong>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Enrollment Year</span>
                    <strong className="text-foreground">{data.enrollmentYear}</strong>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Expected Completion</span>
                    <strong className="text-foreground">{data.expectedCompletion || 'N/A'}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="block text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-1">Current Status</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                      ${data.status === 'enrolled' ? 'bg-primary/10 text-primary' : data.status === 'graduated' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {data.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="bg-background-subtle p-4 border-b border-border flex items-center gap-2">
                <Shield size={18} className="text-foreground-secondary" />
                <h3 className="font-heading font-bold text-foreground text-lg m-0">Institution Details</h3>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-xs">EUAU</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">EU American University</h4>
                    <div className="flex flex-col gap-1 text-sm text-foreground-secondary">
                      <span className="flex items-center gap-2"><MapPin size={14} /> 11 rue Magdebourg, Paris, France 75016</span>
                      <span className="flex items-center gap-2"><Globe size={14} /> euamericanuniversity.edu</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
