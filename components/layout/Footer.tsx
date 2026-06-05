'use client';

import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { useState } from 'react';
import { UniversityLogo } from '@/components/ui/UniversityLogo';

function EUAULogoSmall({ className }: { className?: string }) {
  return (
    <img src="/logo-white.png" alt="EU American University Logo" className={className} />
  );
}

const footerLinks = {
  Academics: [
    { label: 'PhD Programs', href: '/academics/phd' },
    { label: 'Honorary Programs', href: '/academics/honorary' },
    { label: "Master's Programs", href: '/academics/masters' },
    { label: "Bachelor's Programs", href: '/academics/bachelors' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'All Programs', href: '/academics' },
  ],
  Admissions: [
    { label: 'How to Apply', href: '/admissions' },
    { label: 'Requirements', href: '/admissions/requirements' },
    { label: 'Apply Now', href: '/admissions/apply' },
  ],
  University: [
    { label: 'About Us', href: '/about' },
    { label: 'Research', href: '/research' },
    { label: 'Campus Life', href: '/campus-life' },
    { label: 'Alumni', href: '/alumni' },
  ],
  Support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Student Verification', href: '/student-verification' },
    { label: 'News', href: '/news' },
    { label: 'Events', href: '/events' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/euamericanuniversity', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/euamericanuniv', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/school/euamericanuniversity', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/euamericanuniversity', label: 'Instagram' },
];

function SocialIcon({ social }: { social: typeof socialLinks[number] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      key={social.label}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
      style={{
        border: '1.5px solid ' + (hovered ? '#E09900' : 'rgba(255,255,255,0.35)'),
        background: hovered ? '#E09900' : 'rgba(255,255,255,0.08)',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.85)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={social.label}
    >
      <social.icon size={15} />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0F1C35] text-white" role="contentinfo">
      {/* Main footer */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <UniversityLogo variant="light" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Delivering accessible, high-quality education that equips individuals with the knowledge and global perspective needed to lead with purpose.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@euamericanuniversity.us"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Mail size={14} />
                info@euamericanuniversity.us
              </a>
              <a
                href="tel:+33189370004"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Phone size={14} />
                +33 1 89 37 00 04
              </a>
              <div className="flex flex-col gap-1.5 text-white/60 text-[12.5px]">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span>🇩🇰 Rued Langgaards Vej 7, 4300 Copenhagen S, Denmark</span>
                    <span>🇺🇸 Suite 2.408, 1616 Guadalupe Street, Austin, TX 78701</span>
                    <span>🇲🇾 Blok C, Kompleks Kelana Centre Point, Petaling Jaya, Malaysia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="footer-heading">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-[#E09900] hover:pl-1 transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} EU American University. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Terms of Use
            </Link>
            <Link href="/refund-policy" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Refund Policy
            </Link>
            <Link href="/cookie-policy" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Cookie Policy
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <SocialIcon key={social.label} social={social} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
