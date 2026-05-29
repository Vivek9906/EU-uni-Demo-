'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, padding: 24 }}>
      <h1 style={{ color: '#1B3A6B', fontSize: 24, fontWeight: 800 }}>Something went wrong</h1>
      <p style={{ color: '#6B7280' }}>We&apos;re working on it. Please try again.</p>
      <button
        onClick={reset}
        style={{ padding: '10px 24px', background: '#1B3A6B', color: '#fff', border: 'none', borderRadius: 7, cursor: 'pointer', fontWeight: 700 }}
      >
        Try Again
      </button>
    </div>
  );
}
