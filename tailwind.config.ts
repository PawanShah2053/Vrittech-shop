import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './stores/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)'
      },
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9edff',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af'
        }
      }
    }
  },
  plugins: []
};

export default config;
