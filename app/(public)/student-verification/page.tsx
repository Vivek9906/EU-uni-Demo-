'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudentVerificationSearchPage() {
  const router = useRouter();
  const [enrollmentId, setEnrollmentId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollmentId.trim()) {
      setError('Please enter a valid Enrollment ID.');
      return;
    }
    
    setError(null);
    setIsSearching(true);
    
    // Simple redirect to the dynamic route
    // The dynamic route will handle the actual fetching and display
    router.push(`/student-verification/${encodeURIComponent(enrollmentId.trim())}`);
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-background-subtle section-padding">
      <div className="container-main max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-border rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-primary p-6 md:p-8 text-center text-white">
            <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2" style={{ color: '#FFFFFF' }}>Student Verification Portal</h1>
            <p className="text-white/80 text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Verify the enrollment status and academic details of EU American University students.
            </p>
          </div>
          
          <div className="p-6 md:p-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label htmlFor="enrollmentId" className="block text-sm font-medium text-foreground mb-2">
                  Enrollment ID
                </label>
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted" />
                  <input
                    type="text"
                    id="enrollmentId"
                    value={enrollmentId}
                    onChange={(e) => setEnrollmentId(e.target.value)}
                    placeholder="e.g. EUAU-2024-00001"
                    className="w-full pl-12 pr-4 py-4 border border-border rounded-lg bg-background-subtle text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <p className="text-xs text-foreground-muted mt-2">
                  Enter the exact Enrollment ID as provided by the student or on their official documents.
                </p>
              </div>

              {error && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-md flex items-start gap-3 text-error text-sm">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSearching}
                className="btn-primary w-full py-4 text-base"
              >
                {isSearching ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Searching Records...
                  </>
                ) : (
                  'Verify Student Record'
                )}
              </button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-sm font-bold text-foreground mb-2">Important Notice</h3>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                This portal provides official verification of enrollment for EU American University students. 
                Data is provided in real-time from our student records system. For privacy and security, 
                only students who have consented to public verification will appear in this search. 
                Use of this system is subject to our Privacy Policy and Terms of Use.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
