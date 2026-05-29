'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';

interface Notice {
  id: string;
  title: string;
  type: string;
  isActive: boolean;
}

export function NavbarNotificationBell() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/notices')
      .then(res => res.json())
      .then(data => {
        if (data.notices && data.notices.length > 0) {
          setNotices(data.notices);
          
          // Check local storage for read notices
          const readNoticesStr = localStorage.getItem('euau_read_notices');
          let readNotices: string[] = [];
          try {
            readNotices = readNoticesStr ? JSON.parse(readNoticesStr) : [];
          } catch (e) {}

          const unread = data.notices.some((n: Notice) => !readNotices.includes(n.id));
          setHasUnread(unread);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen && notices.length > 0) {
      setHasUnread(false);
      const noticeIds = notices.map(n => n.id);
      localStorage.setItem('euau_read_notices', JSON.stringify(noticeIds));
    }
  };

  if (notices.length === 0) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleOpen}
        className="relative p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground-secondary hover:text-primary"
      >
        <Bell size={20} />
        {hasUnread && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-white shadow-sm animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b border-border bg-background-subtle flex justify-between items-center">
            <h3 className="font-heading font-bold text-sm text-foreground">Recent Notices</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
              {notices.length} New
            </span>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notices.map((notice) => (
              <div key={notice.id} className="p-4 border-b border-border/50 hover:bg-background-subtle/50 transition-colors cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                    notice.type === 'alert' ? 'bg-error' :
                    notice.type === 'event' ? 'bg-info' : 'bg-primary'
                  }`} />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {notice.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/news" className="block p-3 text-center text-xs font-bold text-primary hover:bg-primary/5 transition-colors">
            View All Announcements
          </Link>
        </div>
      )}
    </div>
  );
}
