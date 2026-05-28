import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B3A6B',
          light: '#14305A',
          dark: '#0F1C35',
        },
        accent: {
          DEFAULT: '#C8A951',
          light: '#D4BC6E',
          dark: '#A88B3A',
        },
        background: {
          DEFAULT: '#FFFFFF',
          subtle: '#F5F6F8',
          card: '#FFFFFF',
        },
        foreground: {
          DEFAULT: '#0F1C35',
          secondary: '#3D4A5C',
          muted: '#6B7685',
        },
        border: '#DDE3EC',
        success: '#276749',
        error: '#C53030',
      },
      fontFamily: {
        heading: ['EB Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 3px rgba(27,58,107,0.06)',
        md: '0 4px 16px rgba(27,58,107,0.08)',
        lg: '0 8px 32px rgba(27,58,107,0.10)',
        card: '0 2px 12px rgba(27,58,107,0.08)',
      },
      maxWidth: {
        content: '1200px',
      },
      spacing: {
        section: '80px',
        'section-mobile': '48px',
      },
      borderRadius: {
        card: '8px',
      },
      lineHeight: {
        relaxed: '1.7',
      },
    },
  },
  plugins: [],
};

export default config;
