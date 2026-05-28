'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Shield,
} from 'lucide-react';

interface NavChild {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  megaMenu?: { title: string; items: NavChild[] }[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about', description: 'Our history and mission' },
      { label: 'Accreditation', href: '/accreditation', description: 'Accrediting bodies & recognition' },
      { label: 'Campus Life', href: '/campus-life', description: 'Student life at EU American University' },
      { label: 'Alumni', href: '/alumni', description: 'Our global alumni network' },
    ],
  },
  {
    label: 'Programs',
    href: '/academics',
    megaMenu: [
      {
        title: "Bachelor's",
        items: [
          { label: 'BBA', href: '/academics/bachelors/bba', description: 'Business Administration' },
          { label: 'BPA', href: '/academics/bachelors/bpa', description: 'Public Administration' },
          { label: 'BSW', href: '/academics/bachelors/bsw', description: 'Social Work' },
        ],
      },
      {
        title: "Master's",
        items: [
          { label: 'MBA', href: '/academics/masters/mba', description: 'Business Administration' },
          { label: 'MPA', href: '/academics/masters/mpa', description: 'Public Administration' },
          { label: 'MSW', href: '/academics/masters/msw', description: 'Social Work' },
        ],
      },
      {
        title: 'Honorary',
        items: [
          { label: 'Honorary Doctorate', href: '/academics/honorary', description: 'Honoris Causa' },
          { label: 'Doctor of Philosophy', href: '/academics/honorary', description: 'PhD Recognition' },
          { label: 'Professorship', href: '/academics/honorary', description: 'Honorary Professorship' },
        ],
      },
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
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'Certifications', href: '/certifications', description: 'Professional certification programs' },
      { label: 'Student Verification', href: '/student-verification', description: 'Verify enrollment status' },
      { label: 'News', href: '/news', description: 'Latest news' },
      { label: 'Events', href: '/events', description: 'Upcoming events' },
      { label: 'Research', href: '/research', description: 'Research initiatives' },
      { label: 'Testimonials', href: '/testimonials', description: 'Student voices' },
      { label: 'FAQ', href: '/faq', description: 'Frequently asked questions' },
      { label: 'Contact', href: '/contact', description: 'Get in touch' },
    ],
  },
];

function EUAULogo({ className }: { className?: string }) {
  return (
    <img src="/logo.png" alt="EU American University Logo" className={className} />
  );
}

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
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="EU American University Home">
            <EUAULogo className="w-10 h-10" />
            <div className="hidden sm:block">
              <div className="font-heading text-sm font-bold text-primary leading-tight tracking-wide uppercase">
                EU American
              </div>
              <div className="font-heading text-[10px] text-primary/70 leading-tight tracking-[0.2em] uppercase">
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
                onMouseEnter={() => (item.children || item.megaMenu) && setOpenDropdown(item.label)}
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
                  {(item.children || item.megaMenu) && <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />}
                </Link>

                {/* Standard Dropdown */}
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

                {/* Mega Menu for Programs */}
                {item.megaMenu && (
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-card shadow-lg border border-border overflow-hidden"
                        style={{ width: '640px' }}
                      >
                        <div className="grid grid-cols-3 gap-0 divide-x divide-border">
                          {item.megaMenu.map((group) => (
                            <div key={group.title} className="py-4 px-5">
                              <h4 className="text-xs font-semibold tracking-wider uppercase text-foreground-muted mb-3">
                                {group.title}
                              </h4>
                              <div className="space-y-1">
                                {group.items.map((sub) => (
                                  <Link
                                    key={sub.href + sub.label}
                                    href={sub.href}
                                    className="block px-2 py-2 rounded-md hover:bg-background-subtle transition-colors"
                                  >
                                    <span className="text-sm font-medium text-foreground">{sub.label}</span>
                                    {sub.description && (
                                      <span className="block text-xs text-foreground-muted">{sub.description}</span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-border px-5 py-3 bg-background-subtle">
                          <Link href="/academics" className="text-sm font-medium text-primary hover:text-primary-light transition-colors inline-flex items-center gap-1">
                            View All Programs →
                          </Link>
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
                  {(item.children || item.megaMenu) ? (
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
                              {item.children?.map((child) => (
                                <Link
                                  key={child.href + child.label}
                                  href={child.href}
                                  className="block px-3 py-2 text-sm text-foreground-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                              {item.megaMenu?.map((group) => (
                                <div key={group.title}>
                                  <span className="block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                                    {group.title}
                                  </span>
                                  {group.items.map((sub) => (
                                    <Link
                                      key={sub.href + sub.label}
                                      href={sub.href}
                                      className="block px-3 py-2 text-sm text-foreground-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
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
                <Link href="/student-verification" className="block px-3 py-2 text-sm text-foreground-secondary hover:text-primary">
                  Student Verification
                </Link>
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
  );
}
