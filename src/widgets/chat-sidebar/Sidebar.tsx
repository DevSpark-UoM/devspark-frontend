import React from 'react';
import { Avatar } from '@/shared/ui/Avatar';
import type { User } from '@/entities/message/model/types';
import {
  Home,
  Users,
  TrendingUp,
  CreditCard,
  Bell,
  MessageSquare,
  User as UserIcon,
} from 'lucide-react';

const navItems = [
  { label: 'Home', icon: Home },
  { label: 'My Children', icon: Users },
  { label: 'Progress', icon: TrendingUp },
  { label: 'Payments', icon: CreditCard },
  { label: 'Notifications', icon: Bell },
  { label: 'Messages', icon: MessageSquare, badge: 3, active: true },
  { label: 'My Profile', icon: UserIcon },
];

interface SidebarProps {
  currentUser: User;
}

export function Sidebar({ currentUser }: SidebarProps) {
  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col bg-primary-700">
      <div className="flex items-center gap-2.5 px-5 pb-6 pt-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-base font-bold text-white">
          ✓
        </div>
        <span className="font-sans text-xl font-bold text-white">Sprouty</span>
      </div>

      <nav className="flex-1 px-2.5">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`relative mb-0.5 flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 font-sans text-sm transition-colors ${
              item.active
                ? 'bg-white/15 font-semibold text-white'
                : 'text-white/75 hover:bg-white/10'
            }`}
          >
            <item.icon size={18} className="w-5" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="rounded-full bg-cyan-400 px-[7px] py-[1px] text-[11px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-2.5 border-t border-white/10 px-[18px] py-4">
        <Avatar
          initials={currentUser.name[0]}
          size={38}
          bgColor="#e0f2fe"
          textColor="#0891b2"
        />
        <div>
          <div className="font-sans text-sm font-semibold text-white">
            {currentUser.name}
          </div>
          <div className="text-xs text-white/60">{currentUser.role}</div>
        </div>
      </div>
    </aside>
  );
}
