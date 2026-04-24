import React, { useState, useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from '@/shared/ui/ChatInput';
import { initialMessages, staffUser } from '@/entities/message/model/mockData';
import type { Message } from '@/entities/message/model/types';

const DateDivider = ({ label }: { label: string }) => (
  <div className="mb-4 flex justify-center">
    <span className="rounded-full bg-white/70 px-3.5 py-1 text-xs text-gray-500 backdrop-blur-sm">
      {label}
    </span>
  </div>
);

const TypingIndicator = () => (
  <div className="mb-1 flex items-end gap-2">
    <div className="w-9 shrink-0" />
    <div className="flex items-center gap-1.5 rounded-t-[18px] rounded-bl-[4px] rounded-br-[18px] bg-white px-4 py-3 shadow-sm">
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
        style={{ animationDelay: '0.2s' }}
      />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
        style={{ animationDelay: '0.4s' }}
      />
    </div>
  </div>
);

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleSend = (text: string) => {
    const newMsg: Message = {
      id: Date.now(),
      sender: 'parent',
      senderName: 'Sarah',
      text,
      timestamp: formatTime(),
      type: 'sent',
      status: 'delivered',
    };

    setMessages((prev) => [...prev, newMsg]);

    // Simulate staff typing & auto-reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: Date.now() + 1,
        sender: 'staff',
        senderName: 'Sprouty Staff',
        senderInitials: 'ST',
        text: getAutoReply(text),
        timestamp: formatTime(),
        type: 'received',
      };
      setMessages((prev) => [...prev, reply]);
    }, 1800);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-surface-secondary">
      <ChatHeader staffUser={staffUser} />

      <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto bg-gradient-to-br from-[#e8f4f8] via-[#dde8f0] to-[#e0eef4] px-7 py-5">
        <DateDivider label="Today, 9:30 AM" />

        {messages.map((msg, index) => {
          const prevMsg = messages[index - 1];
          const showAvatar =
            msg.type === 'received' &&
            (!prevMsg || prevMsg.type !== 'received');
          return (
            <MessageBubble
              key={msg.id}
              message={msg}
              showAvatar={showAvatar}
            />
          );
        })}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}

const AUTO_REPLIES = [
  "Thank you for your message! We'll make sure to keep you updated on Leo's progress.",
  "That's great to know! We'll take that into consideration.",
  "Of course! Is there anything specific you'd like us to focus on today?",
  "We appreciate your involvement — it makes such a big difference for the children!",
  "Noted! We'll keep an eye on that and let you know how things go.",
];

const getAutoReply = (text: string) => {
  if (text.toLowerCase().includes('lunch') || text.toLowerCase().includes('food')) {
    return "We'll keep encouraging healthy eating habits during meal times!";
  }
  if (text.toLowerCase().includes('thank')) {
    return "You're welcome! We're always happy to help. 😊";
  }
  return AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
};
