import { useState, useMemo, useEffect } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import useWebSocket from './useWebSocket';
import useNotificationPolling from './useNotificationPolling';
import * as notificationService from '../services/notificationService';
import * as announcementService from '../services/announcementService'; // ✅ NEW

const useNotifications = () => {
  const user = useAppSelector((state) => state.auth.user);

  // Single source of truth for the global Redux unread count.
  // refetch() re-syncs Redux from the server after any mutation below.
  const { refetch: refetchUnreadCount } = useNotificationPolling();

  const [notifications, setNotifications] = useState([]);
  const [announcements, setAnnouncements] = useState([]); // ✅ NEW
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);

  // ── WebSocket handler ─────────────────────────────────────────────
  const handleNewNotification = (newNotification) => {
    setNotifications((prev) => {
      const exists = prev.find((n) => n.id === newNotification.id);
      if (exists) return prev;
      return [newNotification, ...prev];
    });

    // A new notification arrived over the socket -> resync the global count too
    refetchUnreadCount();

    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      window.Notification.permission === 'granted'
    ) {
      new window.Notification(newNotification.title, {
        body: newNotification.message,
      });
    }
  };

  useWebSocket(user?.id, handleNewNotification);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      window.Notification.permission === 'default'
    ) {
      window.Notification.requestPermission();
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✅ NEW — fetch both in parallel
      const [notifRes, annRes] = await Promise.all([
        notificationService.getNotifications(),
        announcementService.getAnnouncements(),
      ]);

      setNotifications(notifRes.data?.data || []);
      setAnnouncements(annRes.data?.data || []); // ✅ NEW
    } catch (err) {
      setError('Failed to load notifications');
      console.error('Fetch notifications error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ✅ NEW — merge personal notifications + admin announcements into one list
  const combined = useMemo(() => {
    const tagged = notifications.map((n) => ({ ...n, type: 'PERSONAL' }));
    const taggedAnn = announcements.map((a) => ({ ...a, read: true, type: 'ANNOUNCEMENT' }));
    return [...tagged, ...taggedAnn].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [notifications, announcements]);

  // ── Local counts (for this page's UI only — NOT dispatched to Redux) ──
  const unreadCount = useMemo(
    () => combined.filter((n) => !n.read).length, // ✅ CHANGED: notifications -> combined
    [combined]
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'unread') return combined.filter((n) => !n.read); // ✅ CHANGED
    if (activeFilter === 'read') return combined.filter((n) => n.read);     // ✅ CHANGED
    return combined; // ✅ CHANGED
  }, [combined, activeFilter]);

  const markAsRead = async (id) => {
    const target = combined.find((n) => n.id === id); // ✅ NEW guard
    if (target?.type === 'ANNOUNCEMENT') return;        // ✅ NEW guard

    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setSelectedNotification((prev) =>
        prev?.id === id ? { ...prev, read: true } : prev
      );
      refetchUnreadCount();
    } catch (err) {
      console.error('Mark as read error:', err);
    }
  };

  const markAsUnread = async (id) => {
    const target = combined.find((n) => n.id === id); // ✅ NEW guard
    if (target?.type === 'ANNOUNCEMENT') return;        // ✅ NEW guard

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n))
    );
    setSelectedNotification((prev) =>
      prev?.id === id ? { ...prev, read: false } : prev
    );
    refetchUnreadCount();
  };

  const markAllAsReadHandler = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      refetchUnreadCount();
    } catch (err) {
      console.error('Mark all as read error:', err);
    }
  };

  const deleteNotificationHandler = async (id) => {
    const target = combined.find((n) => n.id === id); // ✅ NEW guard
    if (target?.type === 'ANNOUNCEMENT') return;        // ✅ NEW guard

    try {
      await notificationService.deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      if (selectedNotification?.id === id) setSelectedNotification(null);
      refetchUnreadCount();
    } catch (err) {
      console.error('Delete notification error:', err);
    }
  };

  const clearAll = async () => {
    try {
      await notificationService.clearAllNotifications();
      setNotifications([]); // announcements stay — clearAll only clears personal
      setSelectedNotification(null);
      refetchUnreadCount();
    } catch (err) {
      console.error('Clear all error:', err);
    }
  };

  return {
    notifications: combined, // ✅ CHANGED: was `notifications`
    loading,
    error,
    activeFilter,
    setActiveFilter,
    selectedNotification,
    setSelectedNotification,
    unreadCount,
    filteredNotifications,
    fetchNotifications,
    markAsRead,
    markAsUnread,
    markAllAsRead: markAllAsReadHandler,
    deleteNotification: deleteNotificationHandler,
    clearAll,
  };
};

export default useNotifications;