export function AdminPageSkeleton() {
  return (
    <div style={{ padding: '24px 32px' }}>
      {/* Header skeleton */}
      <div
        style={{
          height: 28,
          width: 200,
          background: '#E5E7EB',
          borderRadius: 6,
          marginBottom: 8,
        }}
      />
      <div
        style={{
          height: 16,
          width: 320,
          background: '#F3F4F6',
          borderRadius: 4,
          marginBottom: 32,
        }}
      />

      {/* Stats row skeleton */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 32,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              height: 88,
              background: '#F9FAFB',
              borderRadius: 10,
              border: '1px solid #E5E7EB',
              animation: 'pulse 1.5s infinite',
            }}
          />
        ))}
      </div>

      {/* Table skeleton */}
      <div
        style={{
          background: '#FFF',
          borderRadius: 10,
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: 48,
            background: '#F9FAFB',
            borderBottom: '1px solid #E5E7EB',
          }}
        />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              height: 52,
              borderBottom: '1px solid #F3F4F6',
              padding: '0 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div style={{ height: 14, width: 120, background: '#F3F4F6', borderRadius: 4 }} />
            <div style={{ height: 14, width: 180, background: '#F3F4F6', borderRadius: 4 }} />
            <div style={{ height: 14, width: 80, background: '#F3F4F6', borderRadius: 4 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
