export interface Message {
  id: number;
  sender: 'staff' | 'parent';
  senderName: string;
  senderInitials?: string;
  text: string;
  timestamp: string;
  type: 'sent' | 'received';
  status?: 'read' | 'delivered';
}

export interface User {
  name: string;
  role: string;
  avatar: string | null;
  initials?: string;
  isOnline?: boolean;
}
