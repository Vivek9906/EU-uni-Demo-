'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 w-full px-3 py-2 rounded-md transition-colors"
    >
      <LogOut size={16} />
      Sign Out
    </button>
  );
}
