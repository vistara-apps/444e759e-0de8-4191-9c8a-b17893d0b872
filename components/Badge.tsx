'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'new' | 'top' | 'default';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    new: 'bg-green-500 bg-opacity-20 text-green-400 border-green-400',
    top: 'bg-yellow-500 bg-opacity-20 text-yellow-400 border-yellow-400',
    default: 'bg-white bg-opacity-20 text-white border-white border-opacity-30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
