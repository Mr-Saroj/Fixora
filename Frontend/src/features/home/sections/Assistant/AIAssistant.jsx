import React, { useState, useEffect, useRef } from 'react';
import './AIAssistant.css'; // Make sure to save the CSS in this file

const botReplies = [
  "Got it! Let me look into that for you.",
  "Great question — our team will get back to you shortly.",
  "Happy to help! Here's what I can tell you…",
  "Thanks for reaching out. Let me find that information.",
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showQR, setShowQR] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi there! 👋 I'm Fixora AI. How can I help you today?", isUser: false }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Hide tooltip automatically after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const togglePanel = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  const handleSend = () => {
    const val = inputValue.trim();
    if (!val) return;

    // Add user message
    setMessages((prev) => [...prev, { text: val, isUser: true }]);
    setInputValue("");
    setShowQR(false);

    // Simulate bot reply
    setTimeout(() => {
      const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];
      setMessages((prev) => [...prev, { text: randomReply, isUser: false }]);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleQuickReply = (text) => {
    setMessages((prev) => [...prev, { text, isUser: true }]);
    setShowQR(false);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Sure! Let me pull that up for you right now.", isUser: false }
      ]);
    }, 700);
  };

  return (
    <>
      {/* Tooltip */}
      {showTooltip && <div className="fixora-tooltip">👋 Need help?</div>}

      {/* Chat panel */}
      <div className={`fixora-panel ${isOpen ? 'open' : ''}`}>
        <div className="fixora-header">
          <div className="fixora-header-avatar">
            {/* 3D Realistic Header Logo */}
            <svg width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="shadow-header" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.4"/>
                </filter>
                <linearGradient id="metal-header" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff"/>
                  <stop offset="50%" stopColor="#cbd5e1"/>
                  <stop offset="100%" stopColor="#94a3b8"/>
                </linearGradient>
                <linearGradient id="inner-header" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc"/>
                  <stop offset="100%" stopColor="#e2e8f0"/>
                </linearGradient>
                <radialGradient id="gem-header" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#a7f3d0"/>
                  <stop offset="30%" stopColor="#10b981"/>
                  <stop offset="80%" stopColor="#047857"/>
                  <stop offset="100%" stopColor="#022c22"/>
                </radialGradient>
              </defs>
              <g transform="skewX(-10) translate(8, 0)">
                <path d="M 20 15 L 65 15 L 65 32 L 40 32 L 40 48 L 55 48 L 55 65 L 40 65 L 40 85 L 20 85 Z" fill="url(#metal-header)" filter="url(#shadow-header)" stroke="#334155" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M 25 21 L 59 21 L 59 26 L 34 26 L 34 54 L 49 54 L 49 59 L 34 59 L 34 79 L 25 79 Z" fill="url(#inner-header)" />
              </g>
              <circle cx="78" cy="25" r="14" fill="#0f172a" filter="url(#shadow-header)"/>
              <circle cx="78" cy="25" r="11" fill="url(#gem-header)"/>
              <ellipse cx="74" cy="19" rx="3" ry="1.5" fill="#ffffff" opacity="0.9" transform="rotate(-30 74 19)"/>
            </svg>
          </div>
          <div>
            <div className="fixora-header-name">Fixora AI</div>
            <div className="fixora-header-status"><span className="fixora-dot"></span> Online · replies instantly</div>
          </div>
          <button className="fixora-close" aria-label="Close" onClick={togglePanel}>×</button>
        </div>

        <div className="fixora-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`fixora-msg ${msg.isUser ? 'user' : ''}`}>
              {!msg.isUser && <div className="fixora-msg-avatar">F</div>}
              <div className="fixora-bubble">{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showQR && (
          <div className="fixora-qr">
            <button className="fixora-qr-btn" onClick={() => handleQuickReply('Pricing plans')}>Pricing plans</button>
            <button className="fixora-qr-btn" onClick={() => handleQuickReply('How it works')}>How it works</button>
            <button className="fixora-qr-btn" onClick={() => handleQuickReply('Contact support')}>Contact support</button>
          </div>
        )}

        <div className="fixora-input-row">
          <input 
            className="fixora-input" 
            type="text" 
            placeholder="Type a message…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <button className="fixora-send" onClick={handleSend} aria-label="Send">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* FAB */}
      <button 
        className="fixora-fab" 
        aria-label="Open Fixora AI assistant" 
        onClick={togglePanel}
        style={{ background: isOpen ? 'linear-gradient(135deg,#1d4ed8,#0891b2)' : 'linear-gradient(135deg,#2563EB,#06B6D4)' }}
      >
        {/* 3D Realistic FAB Logo */}
        <svg width="34" height="34" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow-fab" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.4"/>
            </filter>
            <linearGradient id="metal-fab" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff"/>
              <stop offset="50%" stopColor="#cbd5e1"/>
              <stop offset="100%" stopColor="#94a3b8"/>
            </linearGradient>
            <linearGradient id="inner-fab" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc"/>
              <stop offset="100%" stopColor="#e2e8f0"/>
            </linearGradient>
            <radialGradient id="gem-fab" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#a7f3d0"/>
              <stop offset="30%" stopColor="#10b981"/>
              <stop offset="80%" stopColor="#047857"/>
              <stop offset="100%" stopColor="#022c22"/>
            </radialGradient>
            <filter id="glow-fab">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g transform="skewX(-10) translate(8, 0)">
            <path d="M 20 15 L 65 15 L 65 32 L 40 32 L 40 48 L 55 48 L 55 65 L 40 65 L 40 85 L 20 85 Z" fill="url(#metal-fab)" filter="url(#shadow-fab)" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M 25 21 L 59 21 L 59 26 L 34 26 L 34 54 L 49 54 L 49 59 L 34 59 L 34 79 L 25 79 Z" fill="url(#inner-fab)" />
          </g>
          <circle cx="78" cy="25" r="14" fill="#0f172a" filter="url(#shadow-fab)"/>
          <circle cx="78" cy="25" r="11" fill="url(#gem-fab)" filter="url(#glow-fab)"/>
          <ellipse cx="74" cy="19" rx="3.5" ry="1.5" fill="#ffffff" opacity="0.9" transform="rotate(-30 74 19)"/>
        </svg>
      </button>
    </>
  );
}