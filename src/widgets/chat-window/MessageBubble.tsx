import React from 'react';
import { Avatar } from '@/shared/ui/Avatar';
import type { Message } from '@/entities/message/model/types';
import { CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  showAvatar: boolean;
}

export function MessageBubble({ message, showAvatar }: MessageBubbleProps) {
  const isSent = message.type === 'sent';

  return (
    <div
      className={`mb-1 flex items-end gap-2 animate-in fade-in slide-in-from-bottom-2 ${
        isSent ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isSent && (
        <div className="w-9 shrink-0">
          {showAvatar && (
            <Avatar initials={message.senderInitials || ''} size={36} />
          )}
        </div>
      )}

      <div
        className={`flex max-w-[60%] flex-col ${
          isSent ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`break-words px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
            isSent
              ? 'rounded-t-[18px] rounded-bl-[18px] rounded-br-[4px] bg-primary-500 text-white'
              : 'rounded-t-[18px] rounded-bl-[4px] rounded-br-[18px] bg-white text-gray-800'
          }`}
        >
          {message.text}
        </div>

        <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-400">
          {message.timestamp}
          {isSent && <CheckCheck size={14} className="text-primary-500" />}
        </div>
      </div>
    </div>
  );
}
