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
          light: '#2C5282',
          dark: '#0F2347',
        },
        accent: {
          DEFAULT: '#E09900',
          light: '#F5C842',
          dark: '#B87C00',
        },
        background: {
          DEFAULT: '#FFFFFF',
          subtle: '#F7F8FA',
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
        heading: ['var(--font-open-sans)', 'Open Sans', 'system-ui', 'sans-serif'],
        body: ['var(--font-open-sans)', 'Open Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 3px rgba(27,58,107,0.08)',
        md: '0 4px 16px rgba(27,58,107,0.12)',
        lg: '0 8px 32px rgba(27,58,107,0.16)',
        card: '0 2px 12px rgba(27,58,107,0.08)',
        gold: '0 4px 16px rgba(224, 153, 0, 0.25)',
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
