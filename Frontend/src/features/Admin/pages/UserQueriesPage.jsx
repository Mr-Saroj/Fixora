// src/features/Admin/pages/UserQueriesPage.jsx

import React, { useState, useMemo, useRef, useEffect } from 'react';

/* ─── Mock data — replace with real API ──────────────────────────── */
const MOCK_QUERIES = [
  {
    id: 'q1',
    user: { name: 'Arjun Sharma', role: 'customer', avatar: 'A' },
    subject: 'Payment not reflected after job completion',
    preview: 'Hi, I completed a job yesterday but the payment still shows as pending in my wallet...',
    createdAt: new Date(Date.now() - 1000 * 60 * 18),
    read: false,
    messages: [
      { from: 'user',  text: 'Hi, I completed a job yesterday but the payment still shows as pending in my wallet. Please help.', time: new Date(Date.now() - 1000 * 60 * 18) },
    ],
  },
  {
    id: 'q2',
    user: { name: 'Priya Nair', role: 'technician', avatar: 'P' },
    subject: 'My profile is not showing in search results',
    preview: 'I updated my profile two days ago but customers still cannot find me when searching for electricians...',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    messages: [
      { from: 'user',  text: 'I updated my profile two days ago but customers still cannot find me when searching for electricians in my area.', time: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { from: 'admin', text: 'Hi Priya, we are looking into the search indexing issue. Your profile should appear within 24 hours.', time: new Date(Date.now() - 1000 * 60 * 55) },
      { from: 'user',  text: 'It has been more than 24 hours now. Still not visible.', time: new Date(Date.now() - 1000 * 60 * 30) },
    ],
  },
  {
    id: 'q3',
    user: { name: 'Rahul Gupta', role: 'customer', avatar: 'R' },
    subject: 'Technician did not show up for scheduled job',
    preview: 'I had a confirmed booking for 10 AM today but the technician never arrived and is not responding...',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
    messages: [
      { from: 'user',  text: 'I had a confirmed booking for 10 AM today but the technician never arrived and is not responding to calls.', time: new Date(Date.now() - 1000 * 60 * 60 * 5) },
      { from: 'admin', text: 'We are sorry for the inconvenience, Rahul. We will escalate this to the technician and arrange a replacement if needed.', time: new Date(Date.now() - 1000 * 60 * 60 * 4) },
    ],
  },
  {
    id: 'q4',
    user: { name: 'Meera Patel', role: 'technician', avatar: 'M' },
    subject: 'Unable to upload verification documents',
    preview: 'I am trying to upload my Aadhar and certificate but the upload keeps failing with an error...',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    messages: [
      { from: 'user',  text: 'I am trying to upload my Aadhar and certificate but the upload keeps failing with a 500 error. I have tried on both mobile and desktop.', time: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    ],
  },
  {
    id: 'q5',
    user: { name: 'Deepak Rao', role: 'customer', avatar: 'D' },
    subject: 'Request to delete my account',
    preview: 'I would like to permanently delete my Fixora account and all associated data...',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    read: true,
    messages: [
      { from: 'user',  text: 'I would like to permanently delete my Fixora account and all associated data as per GDPR guidelines.', time: new Date(Date.now() - 1000 * 60 * 60 * 48) },
      { from: 'admin', text: 'Hi Deepak, we have received your request. Your account will be scheduled for deletion within 7 business days.', time: new Date(Date.now() - 1000 * 60 * 60 * 36) },
      { from: 'user',  text: 'Thank you. Please confirm once it is done.', time: new Date(Date.now() - 1000 * 60 * 60 * 30) },
    ],
  },
];

/* ─── helpers ─────────────────────────────────────────────────────── */
const formatRelative = (date) => {
  const diff = Math.floor((Date.now() - date) / 60_000);
  if (diff < 1)    return 'just now';
  if (diff < 60)   return `${diff}m ago`;
  const h = Math.floor(diff / 60);
  if (h < 24)      return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const roleColor = (role) =>
  role === 'technician'
    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
    : 'bg-blue-50 text-[#004ac6] border-blue-100';

const avatarGradient = (role) =>
  role === 'technician'
    ? 'from-emerald-400 to-emerald-600'
    : 'from-[#004ac6] to-[#57dffe]';

/* ─── Toast ───────────────────────────────────────────────────────── */
const Toast = ({ toasts }) => (
  <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
    {toasts.map((t) => (
      <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white ${t.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
        <span className="material-symbols-outlined text-[18px]">{t.type === 'success' ? 'check_circle' : 'error'}</span>
        {t.message}
      </div>
    ))}
  </div>
);

/* ─── Query List Item ─────────────────────────────────────────────── */
const QueryItem = ({ query, isSelected, onClick }) => {
  const unread = !query.read;
  const lastMsg = query.messages[query.messages.length - 1];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-4 flex items-start gap-3 transition-all duration-150 border-b border-slate-50 last:border-0
        ${isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50/80'}
        ${unread ? 'bg-white' : 'bg-white/60'}
      `}
    >
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 bg-gradient-to-br ${avatarGradient(query.user.role)}`}>
        {query.user.avatar}
      </div>

      <div className="flex-1 min-w-0">
        {/* Name + time */}
        <div className="flex items-center justify-between gap-2">
          <span className={`text-sm truncate ${unread ? 'font-bold text-slate-800' : 'font-semibold text-slate-600'}`}>
            {query.user.name}
          </span>
          <span className="text-[10px] text-slate-400 shrink-0">{formatRelative(query.createdAt)}</span>
        </div>

        {/* Role badge + subject */}
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border capitalize ${roleColor(query.user.role)}`}>
            {query.user.role}
          </span>
          <span className={`text-xs truncate ${unread ? 'font-semibold text-slate-700' : 'text-slate-500'}`}>
            {query.subject}
          </span>
        </div>

        {/* Preview */}
        <p className="text-[11px] text-slate-400 truncate mt-0.5 leading-relaxed">
          {lastMsg.from === 'admin' ? '↩ You: ' : ''}{query.preview}
        </p>
      </div>

      {/* Unread dot */}
      {unread && (
        <span className="w-2 h-2 rounded-full bg-[#004ac6] mt-2 shrink-0" />
      )}
    </button>
  );
};

/* ─── Message Bubble ──────────────────────────────────────────────── */
const Bubble = ({ msg, user }) => {
  const isAdmin = msg.from === 'admin';
  return (
    <div className={`flex items-end gap-2.5 ${isAdmin ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mb-1
        ${isAdmin ? 'bg-gradient-to-br from-slate-600 to-slate-800' : `bg-gradient-to-br ${avatarGradient(user.role)}`}`}>
        {isAdmin ? 'A' : user.avatar}
      </div>

      <div className={`max-w-[75%] ${isAdmin ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed
          ${isAdmin
            ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white rounded-br-sm'
            : 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-bl-sm'
          }`}>
          {msg.text}
        </div>
        <span className="text-[10px] text-slate-400 px-1">{formatTime(msg.time)}</span>
      </div>
    </div>
  );
};

/* ─── Thread Panel ────────────────────────────────────────────────── */
const ThreadPanel = ({ query, onSend, onClose }) => {
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [query?.messages?.length]);

  const handleSend = async () => {
    if (!reply.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 800)); // TODO: real API
    setSending(false);
    onSend(query.id, reply.trim());
    setReply('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSend();
  };

  if (!query) {
    return (
      <div className="hidden lg:flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-slate-300 text-[32px]">forum</span>
        </div>
        <p className="text-slate-500 font-semibold">Select a query to view the conversation</p>
        <p className="text-xs text-slate-400 mt-1">Click any message from the list on the left.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">

      {/* Thread header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3 bg-white shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>

        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0 bg-gradient-to-br ${avatarGradient(query.user.role)}`}>
          {query.user.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-slate-800 text-sm truncate">{query.user.name}</h3>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border capitalize ${roleColor(query.user.role)}`}>
              {query.user.role}
            </span>
          </div>
          <p className="text-xs text-slate-400 truncate mt-0.5">{query.subject}</p>
        </div>

        <span className="text-[10px] text-slate-400 shrink-0">{query.messages.length} message{query.messages.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-5 space-y-4 bg-slate-50/40">
        {query.messages.map((msg, i) => (
          <Bubble key={i} msg={msg} user={query.user} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Reply box */}
      <div className="px-4 sm:px-5 py-4 border-t border-slate-100 bg-white shrink-0">
        <div className="flex flex-col gap-2">
          <div className="relative">
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Write a reply… (Ctrl+Enter to send)"
              rows={3}
              maxLength={1000}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all resize-none pr-16"
            />
            <span className="absolute bottom-3 right-3 text-[10px] text-slate-400">{reply.length}/1000</span>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSend}
              disabled={!reply.trim() || sending}
              className="flex items-center gap-2 bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-[0_8px_20px_-5px_rgba(0,74,198,0.3)] hover:shadow-[0_12px_25px_-5px_rgba(0,74,198,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {sending
                ? <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                : <span className="material-symbols-outlined text-[18px]">send</span>
              }
              {sending ? 'Sending…' : 'Send Reply'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Page ───────────────────────────────────────────────────── */
const UserQueriesPage = () => {
  const [queries, setQueries]       = useState(MOCK_QUERIES);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch]         = useState('');
  const [toasts, setToasts]         = useState([]);
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'thread'

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  };

  const filtered = useMemo(() =>
    queries.filter((q) =>
      q.user.name.toLowerCase().includes(search.toLowerCase()) ||
      q.subject.toLowerCase().includes(search.toLowerCase()) ||
      q.user.role.toLowerCase().includes(search.toLowerCase())
    ), [queries, search]);

  const selected = queries.find((q) => q.id === selectedId) ?? null;

  const handleSelect = (id) => {
    setSelectedId(id);
    setMobileView('thread');
    // Mark as read
    setQueries((prev) => prev.map((q) => q.id === id ? { ...q, read: true } : q));
  };

  const handleSend = (queryId, text) => {
    setQueries((prev) =>
      prev.map((q) =>
        q.id === queryId
          ? { ...q, messages: [...q.messages, { from: 'admin', text, time: new Date() }] }
          : q
      )
    );
    showToast('Reply sent successfully!');
  };

  const unreadCount = queries.filter((q) => !q.read).length;

  return (
    <>
      <Toast toasts={toasts} />

      <div className="flex flex-col h-[calc(100vh-120px)] min-h-[500px]">

        {/* Page header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
              User Queries
              {unreadCount > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#004ac6] text-white">
                  {unreadCount} new
                </span>
              )}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              View and reply to messages from customers and technicians.
            </p>
          </div>
        </div>

        {/* Main split panel */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex min-h-0">

          {/* ── LEFT: Query list ─────────────────────────────── */}
          <div className={`flex flex-col border-r border-slate-100 w-full lg:w-80 xl:w-96 shrink-0
            ${mobileView === 'thread' ? 'hidden lg:flex' : 'flex'}`}>

            {/* Search */}
            <div className="p-3 border-b border-slate-50 shrink-0">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[17px]">
                  search
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search queries…"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
                  <span className="material-symbols-outlined text-slate-300 text-[36px]">search_off</span>
                  <p className="text-xs text-slate-400 mt-2">No queries match your search.</p>
                </div>
              ) : (
                filtered.map((q) => (
                  <QueryItem
                    key={q.id}
                    query={q}
                    isSelected={q.id === selectedId}
                    onClick={() => handleSelect(q.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* ── RIGHT: Thread panel ──────────────────────────── */}
          <div className={`flex-1 min-w-0 flex flex-col
            ${mobileView === 'list' ? 'hidden lg:flex' : 'flex'}`}>
            <ThreadPanel
              query={selected}
              onSend={handleSend}
              onClose={() => setMobileView('list')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserQueriesPage;