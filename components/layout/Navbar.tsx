'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { NavbarNotificationBell } from '../navigation/NavbarNotificationBell';

/* ─── Types ─── */
interface NavChild {
  label: string;
  href: string;
  description?: string;
}

interface ProgramChild {
  label: string;
  href: string;
}

interface ProgramItem {
  label: string;
  href: string;
  children: ProgramChild[] | null;
  highlight?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  programs?: true; // flag for the Programs dropdown
}

/* ─── Programs dropdown data ─── */
const programsMenu: ProgramItem[] = [
  {
    label: 'PhD Programs',
    href: '/academics/phd',
    children: [
      { label: 'Doctor of Philosophy (PhD)', href: '/academics/phd/doctor-of-philosophy' },
    ],
  },
  {
    label: 'Honorary Programs',
    href: '/academics/honorary',
    children: [
      { label: 'Honorary Doctorate (Honoris Causa)', href: '/academics/honorary/honorary-doctorate' },
      { label: 'Honorary Professorship', href: '/academics/honorary/honorary-professorship' },
    ],
  },
  {
    label: "Master's Programs",
    href: '/academics/masters',
    children: [
      { label: 'MBA — Business Administration', href: '/academics/masters/mba' },
      { label: 'MPA — Public Administration', href: '/academics/masters/mpa' },
      { label: 'MSW — Social Work', href: '/academics/masters/msw' },
    ],
  },
  {
    label: "Bachelor's Programs",
    href: '/academics/bachelors',
    children: [
      { label: 'BBA — Business Administration', href: '/academics/bachelors/bba' },
      { label: 'BPA — Public Administration', href: '/academics/bachelors/bpa' },
      { label: 'BSW — Social Work', href: '/academics/bachelors/bsw' },
    ],
  },
  {
    label: 'Certifications',
    href: '/certifications',
    children: null,
  },
  {
    label: 'Student Records & Verification',
    href: '/student-verification',
    children: null,
  },
  {
    label: 'View All Programs →',
    href: '/academics',
    children: null,
    highlight: true,
  },
];

/* ─── Main nav items ─── */
const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about', description: 'Our history and mission' },
      { label: 'Campus Life', href: '/campus-life', description: 'Student life at EU American University' },
      { label: 'Alumni', href: '/alumni', description: 'Our global alumni network' },
      { label: 'Our Partners', href: '/partners', description: 'Our global partner network' },
      { label: 'Partner With Us', href: '/partner-with-us', description: 'Join our network' },
    ],
  },
  {
    label: 'Programs',
    href: '/academics',
    programs: true,
  },
  {
    label: 'Admissions',
    href: '/admissions',
    children: [
      { label: 'How to Apply', href: '/admissions', description: 'Application process & timeline' },
      { label: 'Requirements', href: '/admissions/requirements', description: 'Entry requirements' },
      { label: 'Apply Now', href: '/admissions/apply', description: 'Start your application' },
    ],
  },
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'News', href: '/news', description: 'Latest news' },
      { label: 'Events', href: '/events', description: 'Upcoming events' },
      { label: 'Research', href: '/research', description: 'Research initiatives' },
      { label: 'Testimonials', href: '/testimonials', description: 'Student voices' },
      { label: 'FAQ', href: '/faq', description: 'Frequently asked questions' },
      { label: 'Contact', href: '/contact', description: 'Get in touch' },
    ],
  },
];

/* ─── Programs Dropdown (Desktop) ─── */
function ProgramsDropdown({
  open,
  onMouseEnter,
  onMouseLeave,
}: {
  open: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [activeChild, setActiveChild] = useState<string | null>(null);

  // Reset active child when dropdown closes
  useEffect(() => {
    if (!open) setActiveChild(null);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-0 pt-1"
          style={{ width: 290 }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            className="bg-white rounded-b-xl shadow-lg border border-border overflow-visible"
            style={{ borderTop: '3px solid #E09900' }}
          >
            <div className="py-1.5">
              {programsMenu.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveChild(item.label)}
                  onMouseLeave={() => item.children && setActiveChild(null)}
                >
                  <Link
                    href={item.href}
                    prefetch={item.href === '/academics' || item.href === '/certifications'}
                    className="flex items-center justify-between px-4 py-2.5 text-sm transition-colors"
                    style={{
                      color: item.highlight ? '#E09900' : '#1B3A6B',
                      fontWeight: item.highlight ? 700 : 500,
                      background: activeChild === item.label ? '#F5F7FA' : 'transparent',
                      borderTop: item.highlight ? '1px solid #F3F4F6' : 'none',
                      marginTop: item.highlight ? 4 : 0,
                    }}
                    onMouseEnter={(e) => {
                      if (!item.children) {
                        (e.currentTarget as HTMLElement).style.background = '#F5F7FA';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!item.children) {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }
                    }}
                  >
                    <span>{item.label}</span>
                    {item.children && (
                      <ChevronRight size={14} className="text-gray-400 shrink-0" />
                    )}
                  </Link>

                  {/* Sub-menu flyout */}
                  <AnimatePresence>
                    {item.children && activeChild === item.label && (
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.12 }}
                        className="absolute top-0 left-full"
                        style={{ marginLeft: 2, width: 280 }}
                      >
                        <div
                          className="bg-white rounded-r-xl rounded-bl-xl shadow-lg border border-border overflow-hidden"
                          style={{ borderTop: '3px solid #1B3A6B' }}
                        >
                          <div className="py-1.5">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-4 py-2.5 text-[13.5px] font-medium text-gray-600 hover:text-[#1B3A6B] hover:bg-[#F5F7FA] hover:pl-5 transition-all duration-150"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Mobile Programs Accordion ─── */
function MobileProgramsAccordion({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const [openChild, setOpenChild] = useState<string | null>(null);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-foreground-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
        aria-expanded={open}
      >
        Programs
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-4 space-y-0.5 pb-2">
              {programsMenu.map((item) => (
                <div key={item.href}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenChild(openChild === item.label ? null : item.label)
                        }
                        className="flex items-center justify-between w-full px-3 py-2 text-sm text-foreground-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                        aria-expanded={openChild === item.label}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            openChild === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openChild === item.label && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 space-y-0.5 pb-1">
                              {item.children.map((c) => (
                                <Link
                                  key={c.href}
                                  href={c.href}
                                  onClick={onNavigate}
                                  className="block px-3 py-2 text-sm text-foreground-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                                >
                                  {c.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                        item.highlight
                          ? 'text-[#E09900] font-semibold hover:bg-[#E09900]/5'
                          : 'text-foreground-secondary hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { UniversityLogo } from '@/components/ui/UniversityLogo';

/* ─── Main Navbar ─── */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const handleDropdownEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <UniversityLogo />

          {/* ─── Desktop Nav ─── */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() =>
                  (item.children || item.programs) && handleDropdownEnter(item.label)
                }
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={item.href}
                  prefetch={
                    item.href === '/academics' ||
                    item.href === '/admissions'
                  }
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    pathname === item.href
                      ? 'text-primary bg-primary/5'
                      : 'text-foreground-secondary hover:text-primary hover:bg-primary/5'
                  }`}
                  style={{
                    color: openDropdown === item.label ? '#E09900' : undefined,
                  }}
                >
                  {item.label}
                  {(item.children || item.programs) && (
                    <ChevronDown
                      size={14}
                      className="transition-transform"
                      style={{
                        transform: openDropdown === item.label ? 'rotate(180deg)' : 'none',
                      }}
                    />
                  )}
                </Link>

                {/* Programs dropdown — special component with flyouts */}
                {item.programs && (
                  <ProgramsDropdown
                    open={openDropdown === item.label}
                    onMouseEnter={() => handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  />
                )}

                {/* Standard dropdown for About, Admissions, More */}
                {item.children && (
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 pt-1"
                        style={{ width: 290 }}
                      >
                        <div
                          className="bg-white rounded-b-xl shadow-lg border border-border overflow-hidden"
                          style={{ borderTop: '3px solid #E09900' }}
                        >
                          <div className="py-1.5">
                            {item.children.map((child) => (
                              <Link
                                key={child.href + child.label}
                                href={child.href}
                                prefetch={child.href === '/admissions/apply'}
                                className="flex flex-col px-4 py-2.5 text-sm transition-colors hover:bg-[#F5F7FA]"
                                style={{ color: '#1B3A6B', fontWeight: 500 }}
                              >
                                <span>{child.label}</span>
                                {child.description && (
                                  <span className="text-xs text-gray-500 mt-0.5 font-normal">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* ─── Desktop Right Actions ─── */}
          <div className="hidden lg:flex items-center gap-3">
            <NavbarNotificationBell />
            <Link href="/contact" className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/admissions/apply" prefetch={true} className="btn-primary btn-sm">
              Apply Now
            </Link>
          </div>

          {/* ─── Mobile Hamburger ─── */}
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

      {/* ─── Mobile Menu ─── */}
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
                  {/* Programs — special accordion component */}
                  {item.programs ? (
                    <MobileProgramsAccordion onNavigate={() => setIsOpen(false)} />
                  ) : item.children ? (
                    /* Standard accordion for About, Admissions, More */
                    <div>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === item.label ? null : item.label)
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
                    /* Direct link items (Home) */
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
