import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <h1 style={{ color: '#1B3A6B', fontSize: 48, fontWeight: 800 }}>404</h1>
      <p style={{ color: '#6B7280', fontSize: 18 }}>Page not found</p>
      <Link href="/" style={{ color: '#E09900', fontWeight: 700, textDecoration: 'none' }}>
        ← Back to Home
      </Link>
    </div>
  );
}
