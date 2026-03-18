import React, { useState, useRef, useEffect } from 'react';
import './ParentHelpChatbot.css';

import { FAQ_DATA, INITIAL_MESSAGE } from '../../mockData/progress';

const ParentHelpChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = (text) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        // Simulate bot typing/matching
        setTimeout(() => {
            const query = text.toLowerCase();
            const matchedFaq = FAQ_DATA.find(faq => faq.question.toLowerCase() === query || faq.question.toLowerCase().includes(query)); // Exact or partial match

            let botText = "I'm still learning! Would you like me to connect you with a support agent?";

            // Keyword matching if direct question match fails
            if (!matchedFaq) {
                if (query.includes('hour') || query.includes('time')) botText = FAQ_DATA[0].answer;
                else if (query.includes('contact') || query.includes('teacher') || query.includes('message')) botText = FAQ_DATA[1].answer;
                else if (query.includes('discount') || query.includes('sibling')) botText = FAQ_DATA[2].answer;
                else if (query.includes('pay') || query.includes('tuition')) botText = FAQ_DATA[3].answer;
                else if (query.includes('absent') || query.includes('sick')) botText = FAQ_DATA[4].answer;
            } else {
                botText = matchedFaq.answer;
            }

            const botMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: botText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
        }, 500); // Small delay for realism
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage(inputValue);
        }
    };

    const handleFaqClick = (question) => {
        handleSendMessage(question);
    };

    return (
        <div className="parent-chatbot-container">
            {/* FAB */}
            <button className="chatbot-fab" onClick={toggleChat} aria-label="Open support chat">
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </button>

            {/* Chat Window Overlay */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-header-title">
                            <span className="chatbot-icon"></span>
                            Sprouty Support
                        </div>
                        <button className="chatbot-close-btn" onClick={toggleChat}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="chatbot-body">
                        <div className="chatbot-messages-scroll" style={{ maxHeight: '300px', overflowY: 'auto', padding: '16px' }}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`chat-message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}>
                                    <div className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                                        <p className="chat-text" style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                                        <div className="message-time">{msg.time}</div>

                                        {msg.isInitial && (
                                            <div className="chatbot-faq-section">
                                                <p className="faq-title">TRY THESE QUESTIONS</p>
                                                <div className="chatbot-quick-actions">
                                                    <button className="quick-action-btn" onClick={() => handleFaqClick("How to pay?")}>How to pay?</button>
                                                    <button className="quick-action-btn" onClick={() => handleFaqClick("Report absence")}>Report absence</button>
                                                    <button className="quick-action-btn" onClick={() => handleFaqClick("Update profile")}>Update profile</button>
                                                    <button className="quick-action-btn" onClick={() => handleFaqClick("What are the school hours?")}>What are the school hours?</button>
                                                    <button className="quick-action-btn" onClick={() => handleFaqClick("How do I contact the teacher?")}>How do I contact the teacher?</button>
                                                    <button className="quick-action-btn" onClick={() => handleFaqClick("Is there a sibling discount?")}>Is there a sibling discount?</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="chatbot-input-area">
                            <input
                                type="text"
                                className="chatbot-input"
                                placeholder="Type a message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button className="chatbot-send-btn" onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim()}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParentHelpChatbot;
