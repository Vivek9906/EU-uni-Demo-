'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Search } from 'lucide-react';
import Image from 'next/image';

interface StudentData {
  enrollmentId: string;
  fullName: string;
  programName: string;
  programLevel: string;
  enrollmentYear: number;
  intendedStartDate: string | null;
  expectedCompletion: string | null;
  status: string;
  photo: string | null;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

function formatLevel(level: string) {
  const levels: Record<string, string> = {
    bachelors: "Bachelor's Degree",
    masters: "Master's Degree",
    honorary: "Honorary Doctorate",
    certification: "Professional Certification",
  };
  return levels[level] || level;
}

export default function StudentVerificationResultPage({ params }: { params: { enrollmentId: string } }) {
  const [data, setData] = useState<StudentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [found, setFound] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/students/verify/${encodeURIComponent(params.enrollmentId)}`);
        if (!response.ok) {
          if (response.status === 429) {
             throw new Error('Rate limit exceeded. Please try again later.');
          }
          throw new Error('Failed to verify student record.');
        }
        const result = await response.json();
        
        if (result.found) {
          setData(result.student);
          setFound(true);
        } else {
          setFound(false);
        }
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
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-foreground-secondary font-medium">Verifying record securely...</p>
      </section>
    );
  }

  if (error || found === false) {
    return (
      <section className="min-h-[70vh] flex flex-col items-center justify-center bg-background-subtle px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold font-heading text-foreground mb-4">No Record Found</h1>
          <p className="text-foreground-secondary mb-8">
            {error || `We could not find an official, publicly visible record matching the ID "${params.enrollmentId}".`}
          </p>
          <Link href="/student-verification" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            Try Another ID
          </Link>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="min-h-screen bg-[#F3F4F6] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/student-verification" className="text-primary hover:underline inline-flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Search
          </Link>
        </div>

        <div className="verification-result shadow-xl rounded-2xl overflow-hidden bg-white border border-border">
          {/* Top: Green verified badge */}
          <div className="verified-banner bg-success text-white py-3 px-6 text-center font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2">
            <span className="text-xl">✅</span> Verified Enrollment Record — EU American University
          </div>

          {/* Student card */}
          <div className="student-card p-6 md:p-10 flex flex-col md:flex-row gap-8">
            
            {/* Left: Photo + initials fallback */}
            <div className="student-photo flex-shrink-0 flex justify-center md:justify-start">
              {data.photo ? (
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-4 border-background shadow-md">
                  <Image src={data.photo} alt={data.fullName} fill className="object-cover" />
                </div>
              ) : (
                <div className="initials-avatar w-32 h-32 md:w-40 md:h-40 rounded-xl bg-primary text-white flex items-center justify-center text-5xl font-bold border-4 border-background shadow-md">
                  {getInitials(data.fullName)}
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div className="student-details flex-1">
              <div className="mb-6 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-extrabold text-foreground font-heading mb-3">{data.fullName}</h1>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  data.status === 'enrolled' ? 'bg-info/10 text-info' : 
                  data.status === 'active' ? 'bg-success/10 text-success' : 
                  data.status === 'graduated' ? 'bg-accent/10 text-accent-dark' : 
                  'bg-foreground-secondary/10 text-foreground-secondary'
                }`}>
                  {data.status}
                </span>
              </div>
              
              <div className="details-grid grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-8 text-sm">
                <div>
                  <label className="block text-foreground-secondary text-xs font-bold uppercase tracking-wider mb-1">Program</label>
                  <span className="font-semibold text-foreground">{data.programName}</span>
                </div>
                <div>
                  <label className="block text-foreground-secondary text-xs font-bold uppercase tracking-wider mb-1">Enrollment ID</label>
                  <span className="font-semibold text-foreground font-mono">{data.enrollmentId}</span>
                </div>
                <div>
                  <label className="block text-foreground-secondary text-xs font-bold uppercase tracking-wider mb-1">Program Level</label>
                  <span className="font-semibold text-foreground">{formatLevel(data.programLevel)}</span>
                </div>
                <div>
                  <label className="block text-foreground-secondary text-xs font-bold uppercase tracking-wider mb-1">Mode of Study</label>
                  <span className="font-semibold text-foreground">Online</span>
                </div>
                <div>
                  <label className="block text-foreground-secondary text-xs font-bold uppercase tracking-wider mb-1">Enrollment Year</label>
                  <span className="font-semibold text-foreground">{data.enrollmentYear}</span>
                </div>
                {data.intendedStartDate && (
                  <div>
                    <label className="block text-foreground-secondary text-xs font-bold uppercase tracking-wider mb-1">Start Date</label>
                    <span className="font-semibold text-foreground">{data.intendedStartDate}</span>
                  </div>
                )}
                {data.expectedCompletion && (
                  <div>
                    <label className="block text-foreground-secondary text-xs font-bold uppercase tracking-wider mb-1">Expected Completion</label>
                    <span className="font-semibold text-foreground">{data.expectedCompletion}</span>
                  </div>
                )}
              </div>

              <div className="institution-info flex items-center gap-4 p-4 bg-background-subtle rounded-lg border border-border/50">
                <div className="eu-logo w-12 h-12 bg-primary rounded flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                  EU
                </div>
                <div>
                  <strong className="block text-foreground font-bold">EU American University</strong>
                  <p className="text-xs text-foreground-secondary mt-0.5">Globally Accredited Institution | est. 1924</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust footer */}
        <p className="verify-note mt-6 text-center text-sm text-foreground-secondary/80 max-w-2xl mx-auto">
          This record has been verified against the EU American University official student registry.
          For further verification or inquiries, contact <a href="mailto:registrar@euamericanuniversity.us" className="text-primary hover:underline">registrar@euamericanuniversity.us</a>
        </p>
      </div>
    </section>
  );
}
