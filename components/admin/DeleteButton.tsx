'use client';

import { Trash2 } from 'lucide-react';

export function DeleteButton({
  confirmMessage = 'Are you sure you want to delete this item?',
  onDelete,
  className = '',
}: {
  confirmMessage?: string;
  onDelete?: () => void;
  className?: string;
}) {
  return (
    <button
      type={onDelete ? "button" : "submit"}
      className={`p-1.5 text-error hover:bg-error/10 rounded ${className}`}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        } else if (onDelete) {
          onDelete();
        }
      }}
    >
      <Trash2 size={16} />
    </button>
  );
}
