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
          DEFAULT: '#1A3C6E',
          light: '#2C5282',
          dark: '#142E54',
        },
        accent: {
          DEFAULT: '#B8860B',
          light: '#D4A017',
          dark: '#8B6508',
        },
        background: {
          DEFAULT: '#FFFFFF',
          subtle: '#F7F8FA',
          card: '#FFFFFF',
        },
        foreground: {
          DEFAULT: '#1A1A2E',
          secondary: '#4A5568',
          muted: '#718096',
        },
        border: '#E2E8F0',
        success: '#276749',
        error: '#C53030',
      },
      fontFamily: {
        heading: ['Merriweather', 'Georgia', 'serif'],
        body: ['Source Sans 3', 'system-ui', 'sans-serif'],
        accent: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.08)',
        md: '0 4px 16px rgba(0,0,0,0.10)',
        lg: '0 8px 32px rgba(0,0,0,0.12)',
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
