import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ');
}

// We use a simple cn utility instead of tailwind-merge to keep dependencies minimal
function clsx2(...inputs: ClassValue[]): string {
  return inputs
    .flat()
    .filter((x) => typeof x === 'string' && x.length > 0)
    .join(' ');
}

export { clsx2 as clsx };

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateReferenceNumber(prefix: string = 'AMU'): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${year}-${random}`;
}

export function generateCertificateId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `AMU-CERT-${year}-${random}`;
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[<>"'&]/g, (char) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;',
      };
      return entities[char] || char;
    })
    .trim();
}

export function sanitizeHtml(input: string): string {
  // For rich text content, only strip script tags and event handlers
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .trim();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export const PROGRAM_LEVELS = [
  { value: 'bachelors', label: "Bachelor's" },
  { value: 'masters', label: "Master's" },
  { value: 'phd-honorary', label: 'PhD - Honorary Doctorate' },
  { value: 'phd-professorship', label: 'PhD - Professorship' },
] as const;

export const PROGRAM_NAMES: Record<string, string> = {
  bachelors: 'Bachelor of Business Administration (BBA)',
  masters: 'Master of Business Administration (MBA)',
  'phd-honorary': 'Honorary Doctorate (Honoris Causa)',
  'phd-professorship': 'Honorary Professorship',
};

export const APPLICATION_STATUSES = [
  'pending',
  'reviewing',
  'accepted',
  'rejected',
] as const;

export const NOTICE_CATEGORIES = [
  'academic',
  'admin',
  'exam',
  'general',
] as const;

export const FAQ_CATEGORIES = [
  'Admissions',
  'Programs',
  'Fees',
  'Campus Life',
  'Certificates',
] as const;
