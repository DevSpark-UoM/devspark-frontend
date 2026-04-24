import React from 'react';
import { Avatar } from '@/shared/ui/Avatar';
import { MoreHorizontal } from 'lucide-react';
import type { User } from '@/entities/message/model/types';

interface ChatHeaderProps {
  staffUser: User;
}

export function ChatHeader({ staffUser }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3.5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar initials={staffUser.initials || ''} size={42} />
          {staffUser.isOnline && (
            <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
          )}
        </div>
        <div>
          <div className="font-sans text-base font-semibold text-gray-800">
            {staffUser.name}
          </div>
          <div className="mt-0.5">
            <span className="text-xs font-medium text-green-500">● Online</span>
          </div>
        </div>
      </div>
      <button className="cursor-pointer rounded p-1 hover:bg-gray-100 text-gray-600">
        <MoreHorizontal size={20} />
      </button>
    </div>
  );
}
