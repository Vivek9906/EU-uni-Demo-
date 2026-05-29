'use client';

import { Trash2 } from 'lucide-react';

export function DeleteButton({
  confirmMessage = 'Are you sure you want to delete this item?',
}: {
  confirmMessage?: string;
}) {
  return (
    <button
      type="submit"
      className="p-1.5 text-error hover:bg-error/10 rounded"
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 size={16} />
    </button>
  );
}
