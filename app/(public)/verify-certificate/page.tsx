'use client';

import { useState } from 'react';
import { Search, Shield, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function VerifyCertificatePage() {
  const [certificateId, setCertificateId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ found: boolean; data?: { holderName: string; programName: string; issuedDate: string; isValid: boolean; certificateId: string } } | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateId.trim()) return;
    setIsLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/certificates/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ certificateId: certificateId.trim() }) });
      const data = await res.json();
      setResult(data);
    } catch { setResult({ found: false }); }
    finally { setIsLoading(false); }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main text-center"><Shield className="w-12 h-12 text-primary mx-auto mb-4" /><h1 className="text-4xl font-heading font-bold mb-4">Certificate Verification</h1><p className="text-lg text-foreground-secondary max-w-xl mx-auto">Verify the authenticity of any certificate issued by American Management University.</p></div>
      </section>
      <section className="section-padding">
        <div className="container-main max-w-xl">
          <form onSubmit={handleVerify} className="space-y-4 mb-8">
            <div><label htmlFor="cert-id" className="block text-sm font-medium mb-1.5">Certificate ID / Reference Number</label>
              <div className="relative"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted" /><input id="cert-id" value={certificateId} onChange={(e) => setCertificateId(e.target.value)} className="input-field pl-11" placeholder="e.g. AMU-CERT-2025-XXXXX" required /></div>
            </div>
            <button type="submit" disabled={isLoading} className="btn-primary w-full gap-2 disabled:opacity-60">
              {isLoading ? <><Loader2 size={16} className="animate-spin" /> Verifying...</> : <><Shield size={16} /> Verify Certificate</>}
            </button>
          </form>
          {result && (
            <div className={`card p-6 ${result.found ? 'border-success/30' : 'border-error/30'}`}>
              {result.found && result.data ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">{result.data.isValid ? <CheckCircle className="w-6 h-6 text-success" /> : <XCircle className="w-6 h-6 text-error" />}<h3 className="font-heading text-lg font-bold">{result.data.isValid ? 'Certificate Verified' : 'Certificate Revoked'}</h3></div>
                  <div className="space-y-3 text-sm"><div><span className="text-foreground-muted">Certificate ID:</span><span className="ml-2 font-medium">{result.data.certificateId}</span></div><div><span className="text-foreground-muted">Holder Name:</span><span className="ml-2 font-medium">{result.data.holderName}</span></div><div><span className="text-foreground-muted">Program:</span><span className="ml-2 font-medium">{result.data.programName}</span></div><div><span className="text-foreground-muted">Issued Date:</span><span className="ml-2 font-medium">{result.data.issuedDate}</span></div><div><span className="text-foreground-muted">Status:</span><span className={`ml-2 font-medium ${result.data.isValid ? 'text-success' : 'text-error'}`}>{result.data.isValid ? 'Valid' : 'Invalid'}</span></div></div>
                </div>
              ) : (
                <div className="flex items-center gap-2"><XCircle className="w-6 h-6 text-error" /><div><h3 className="font-heading text-base font-bold">Certificate Not Found</h3><p className="text-sm text-foreground-secondary">No certificate found with this ID. Please check and try again.</p></div></div>
              )}
            </div>
          )}
          <p className="text-xs text-foreground-muted text-center mt-6">Rate limit: 10 verifications per hour. For bulk verification, contact records@euamericanuniversity.us.</p>
        </div>
      </section>
    </>
  );
}
