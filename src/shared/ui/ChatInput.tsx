import React, { useState, useRef } from 'react';
import { Paperclip, Smile, Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white px-5 pb-2 pt-3">
      <div className="flex items-end gap-2 rounded-3xl bg-gray-100 px-3.5 py-1.5">
        <button
          className="flex shrink-0 cursor-pointer items-center rounded p-1 text-gray-500 hover:text-gray-700"
          title="Attach file"
        >
          <Paperclip size={20} />
        </button>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="max-h-[120px] flex-1 resize-none overflow-y-auto bg-transparent py-1 text-sm text-gray-700 outline-none"
        />

        <button
          className="flex shrink-0 cursor-pointer items-center rounded p-1 text-gray-500 hover:text-gray-700"
          title="Emoji"
        >
          <Smile size={20} />
        </button>

        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-700 ${
            !text.trim() || disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'
          }`}
          title="Send"
        >
          <Send size={18} />
        </button>
      </div>
      <p className="mt-1.5 text-center text-[11px] text-gray-400">
        Messages are monitored for safety. Press Enter to send.
      </p>
    </div>
  );
}
