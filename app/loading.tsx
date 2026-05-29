export default function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div className="loading-spinner" />
        <p
          style={{
            color: '#1B3A6B',
            fontWeight: 600,
            marginTop: 12,
            fontSize: 14,
          }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
