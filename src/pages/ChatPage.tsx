import React from 'react';
import { Sidebar } from '@/widgets/chat-sidebar/Sidebar';
import { ChatWindow } from '@/widgets/chat-window/ChatWindow';
import { currentUser } from '@/entities/message/model/mockData';

export function ChatPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans">
      <Sidebar currentUser={currentUser} />
      <ChatWindow />
    </div>
  );
}
