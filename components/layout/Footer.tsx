import Link from 'next/link';
import {
  GraduationCap,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const footerLinks = {
  Academics: [
    { label: "Bachelor's MBA", href: '/academics/bachelors' },
    { label: "Master's MBA", href: '/academics/masters' },
    { label: 'Honorary Doctorate', href: '/academics/phd' },
    { label: 'Professorship', href: '/academics/phd' },
    { label: 'All Programs', href: '/academics' },
  ],
  Admissions: [
    { label: 'How to Apply', href: '/admissions' },
    { label: 'Requirements', href: '/admissions/requirements' },
    { label: 'Scholarships', href: '/admissions/scholarships' },
    { label: 'Financial Aid', href: '/admissions/financial-aid' },
    { label: 'Apply Now', href: '/admissions/apply' },
  ],
  University: [
    { label: 'About AMU', href: '/about' },
    { label: 'Faculty', href: '/faculty' },
    { label: 'Research', href: '/research' },
    { label: 'Campus Life', href: '/campus-life' },
    { label: 'Accreditation', href: '/accreditation' },
    { label: 'Alumni', href: '/alumni' },
  ],
  Support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Verify Certificate', href: '/verify-certificate' },
    { label: 'News', href: '/news' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/amuuniversity', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/amuuniversity', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/school/amuuniversity', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/amuuniversity', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/amuuniversity', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white" role="contentinfo">
      {/* Main footer */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4" aria-label="American Management University Home">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-heading text-sm font-bold leading-tight">
                  American Management
                </div>
                <div className="font-heading text-xs text-white/70 leading-tight">
                  University
                </div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              A legacy of academic excellence, innovation, and global impact. Shaping leaders who transform the world since 1924.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@amu.edu.eu"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Mail size={14} />
                info@amu.edu.eu
              </a>
              <a
                href="tel:+33189370004"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Phone size={14} />
                +33 1 89 37 00 04
              </a>
              <div className="flex items-start gap-2 text-white/60">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>11 rue Magdebourg, Paris, France 75016</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-accent text-xs font-semibold tracking-wider uppercase text-white/40 mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
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
            © {new Date().getFullYear()} American Management University. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Terms of Use
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
