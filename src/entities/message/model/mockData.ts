import type { Message, User } from './types';

export const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'staff',
    senderName: 'Sprouty Staff',
    senderInitials: 'ST',
    text: 'Hello Sarah! Hope Leo and Mia are doing well.',
    timestamp: '9:30 AM',
    type: 'received',
  },
  {
    id: 2,
    sender: 'parent',
    senderName: 'Sarah',
    text: 'Hi! How was Leo during lunch time?',
    timestamp: '9:35 AM',
    type: 'sent',
    status: 'read',
  },
  {
    id: 3,
    sender: 'staff',
    senderName: 'Sprouty Staff',
    senderInitials: 'ST',
    text: 'Leo ate very well today! He finished his whole lunch and even asked for more fruits. 🍎',
    timestamp: '9:40 AM',
    type: 'received',
  },
  {
    id: 4,
    sender: 'parent',
    senderName: 'Sarah',
    text: "That's wonderful to hear! He's been a bit picky at home lately.",
    timestamp: '9:42 AM',
    type: 'sent',
    status: 'read',
  },
  {
    id: 5,
    sender: 'staff',
    senderName: 'Sprouty Staff',
    senderInitials: 'ST',
    text: "We've been encouraging him with group activities during meal times. It seems to be working! Also,",
    timestamp: '9:45 AM',
    type: 'received',
  },
];

export const currentUser: User = {
  name: 'Sarah',
  role: 'Parent',
  avatar: null,
};

export const staffUser: User = {
  name: 'Sprouty Staff',
  initials: 'ST',
  isOnline: true,
  role: 'Staff',
  avatar: null,
};
