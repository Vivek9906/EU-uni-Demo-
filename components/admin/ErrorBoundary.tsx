'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ color: '#111827', marginBottom: 8, fontSize: 20, fontWeight: 700 }}>
            Something went wrong
          </h2>
          <p style={{ color: '#6B7280', marginBottom: 24, fontSize: 14 }}>
            {this.state.error?.message ?? 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              padding: '10px 20px',
              background: '#1B3A6B',
              color: '#FFF',
              border: 'none',
              borderRadius: 7,
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Reload Page
          </button>
          <details
            style={{
              marginTop: 24,
              textAlign: 'left',
              maxWidth: 600,
              margin: '24px auto 0',
            }}
          >
            <summary style={{ cursor: 'pointer', color: '#9CA3AF', fontSize: 12 }}>
              Error details
            </summary>
            <pre
              style={{
                fontSize: 11,
                color: '#6B7280',
                overflow: 'auto',
                padding: 12,
                background: '#F3F4F6',
                borderRadius: 6,
                marginTop: 8,
              }}
            >
              {this.state.error?.stack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
