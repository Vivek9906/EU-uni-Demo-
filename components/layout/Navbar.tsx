'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Phone,
  Mail,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About AMU', href: '/about', description: 'Our history and mission' },
      { label: 'Accreditation', href: '/accreditation', description: 'Accrediting bodies & recognition' },
      { label: 'Faculty', href: '/faculty', description: 'Meet our distinguished faculty' },
      { label: 'Campus Life', href: '/campus-life', description: 'Student life at AMU' },
      { label: 'Alumni', href: '/alumni', description: 'Our global alumni network' },
    ],
  },
  {
    label: 'Programs',
    href: '/academics',
    children: [
      { label: "Bachelor's — MBA", href: '/academics/bachelors', description: 'Bachelor of Business Administration' },
      { label: "Master's — MBA", href: '/academics/masters', description: 'Master of Business Administration' },
      { label: 'Honorary Doctorate', href: '/academics/phd', description: 'Honorary Doctorate (Honoris Causa)' },
      { label: 'Professorship', href: '/academics/phd', description: 'Honorary Professorship' },
      { label: 'All Programs', href: '/academics', description: 'View all academic programs' },
    ],
  },
  {
    label: 'Admissions',
    href: '/admissions',
    children: [
      { label: 'How to Apply', href: '/admissions', description: 'Application process & timeline' },
      { label: 'Requirements', href: '/admissions/requirements', description: 'Entry requirements' },
      { label: 'Apply Now', href: '/admissions/apply', description: 'Start your application' },
      { label: 'Scholarships', href: '/admissions/scholarships', description: 'Financial aid options' },
    ],
  },
  { label: 'Research', href: '/research' },
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'News', href: '/news', description: 'Latest news from AMU' },
      { label: 'Events', href: '/events', description: 'Upcoming events' },
      { label: 'Notices', href: '/notices', description: 'Official announcements' },
      { label: 'Gallery', href: '/gallery', description: 'Photo gallery' },
      { label: 'Placements', href: '/placements', description: 'Career placements' },
      { label: 'Testimonials', href: '/testimonials', description: 'Student voices' },
      { label: 'FAQ', href: '/faq', description: 'Frequently asked questions' },
      { label: 'Contact', href: '/contact', description: 'Get in touch' },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-primary text-white">
        <div className="container-main flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@amu.edu.eu"
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
              aria-label="Email AMU"
            >
              <Mail size={13} />
              info@amu.edu.eu
            </a>
            <a
              href="tel:+33189370004"
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
              aria-label="Call AMU"
            >
              <Phone size={13} />
              +33 1 89 37 00 04
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/verify-certificate"
              className="text-white/80 hover:text-white transition-colors"
            >
              Verify Certificate
            </Link>
            <Link
              href="/admissions/apply"
              className="bg-accent hover:bg-accent-dark text-white px-4 py-1 rounded text-xs font-semibold transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white shadow-sm'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="American Management University Home">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-heading text-sm font-bold text-primary leading-tight">
                  American Management
                </div>
                <div className="font-heading text-xs text-primary/70 leading-tight">
                  University
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md
                      ${
                        pathname === item.href
                          ? 'text-primary bg-primary/5'
                          : 'text-foreground-secondary hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />}
                  </Link>

                  {/* Dropdown */}
                  {item.children && (
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-72 bg-white rounded-card shadow-lg border border-border overflow-hidden"
                        >
                          <div className="py-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.href + child.label}
                                href={child.href}
                                className="flex flex-col px-4 py-3 hover:bg-background-subtle transition-colors"
                              >
                                <span className="text-sm font-medium text-foreground">
                                  {child.label}
                                </span>
                                {child.description && (
                                  <span className="text-xs text-foreground-muted mt-0.5">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/contact" className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/admissions/apply" className="btn-primary btn-sm">
                Apply Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-background-subtle transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-border bg-white"
            >
              <div className="container-main py-4 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === item.label ? null : item.label
                            )
                          }
                          className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-foreground-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                          aria-expanded={openDropdown === item.label}
                        >
                          {item.label}
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              openDropdown === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.label && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 space-y-1 pb-2">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href + child.label}
                                    href={child.href}
                                    className="block px-3 py-2 text-sm text-foreground-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                          pathname === item.href
                            ? 'text-primary bg-primary/5'
                            : 'text-foreground-secondary hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-border space-y-2">
                  <Link href="/verify-certificate" className="block px-3 py-2 text-sm text-foreground-secondary hover:text-primary">
                    Verify Certificate
                  </Link>
                  <Link href="/admissions/apply" className="btn-primary w-full text-center">
                    Apply Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
