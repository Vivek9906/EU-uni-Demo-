'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Notice {
  id: string;
  title: string;
  category: string;
}

const SESSION_CACHE_KEY = 'euau_notices_cache';
const READ_STORAGE_KEY = 'euau_read_notices';

export function NavbarNotificationBell() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // On mount, check sessionStorage for cached notices (no network request)
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem(SESSION_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as Notice[];
        if (parsed.length > 0) {
          setNotices(parsed);
          setHasFetched(true);

          const readNoticesStr = localStorage.getItem(READ_STORAGE_KEY);
          let readNotices: string[] = [];
          try { readNotices = readNoticesStr ? JSON.parse(readNoticesStr) : []; } catch {}
          const unread = parsed.some((n: Notice) => !readNotices.includes(n.id));
          setHasUnread(unread);
        }
      }
    } catch {}
  }, []);

  const fetchNotices = useCallback(async () => {
    if (hasFetched) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/notices');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      if (data.notices && data.notices.length > 0) {
        setNotices(data.notices);
        setHasFetched(true);

        // Cache in sessionStorage
        try { sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(data.notices)); } catch {}

        const readNoticesStr = localStorage.getItem(READ_STORAGE_KEY);
        let readNotices: string[] = [];
        try { readNotices = readNoticesStr ? JSON.parse(readNoticesStr) : []; } catch {}
        const unread = data.notices.some((n: Notice) => !readNotices.includes(n.id));
        setHasUnread(unread);
      } else {
        setHasFetched(true);
      }
    } catch {
      // Graceful fallback — bell simply shows no notices
      setHasFetched(true);
    } finally {
      setIsLoading(false);
    }
  }, [hasFetched]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = async () => {
    if (!hasFetched) {
      await fetchNotices();
    }
    setIsOpen(prev => !prev);
    if (!isOpen && notices.length > 0) {
      setHasUnread(false);
      const noticeIds = notices.map(n => n.id);
      localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(noticeIds));
    }
  };

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
            {notices.length > 0 && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                {notices.length} New
              </span>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="p-6 text-center text-sm text-foreground-muted">Loading notices…</div>
            ) : notices.length === 0 ? (
              <div className="p-6 text-center text-sm text-foreground-muted">No notices at this time.</div>
            ) : (
              notices.map((notice) => (
                <div 
                  key={notice.id} 
                  onClick={() => { setIsOpen(false); router.push('/notices'); }}
                  className="p-4 border-b border-border/50 hover:bg-background-subtle/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                      notice.category === 'exam' ? 'bg-error' :
                      notice.category === 'academic' ? 'bg-info' : 'bg-primary'
                    }`} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {notice.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <Link href="/notices" className="block p-3 text-center text-xs font-bold text-primary hover:bg-primary/5 transition-colors">
            View All Announcements
          </Link>
        </div>
      )}
    </div>
  );
}
