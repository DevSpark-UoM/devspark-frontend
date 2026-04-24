import React from 'react';
import { cn } from '@/shared/lib/cn';

interface AvatarProps {
  initials: string;
  size?: number;
  bgColor?: string;
  textColor?: string;
  src?: string | null;
  className?: string;
}

export function Avatar({
  initials,
  size = 36,
  bgColor = '#1D9E75', // primary-500
  textColor = '#fff',
  src,
  className,
}: AvatarProps) {
  const style = {
    width: size,
    height: size,
    backgroundColor: bgColor,
    color: textColor,
    fontSize: size * 0.35,
  };

  if (src) {
    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold',
          className
        )}
        style={style}
      >
        <img
          src={src}
          alt={initials}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold',
        className
      )}
      style={style}
    >
      {initials}
    </div>
  );
}
