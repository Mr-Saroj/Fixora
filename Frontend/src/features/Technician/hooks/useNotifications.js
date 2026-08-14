import { useState, useMemo, useEffect } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import useWebSocket from './useWebSocket';
import useNotificationPolling from './useNotificationPolling';
import * as notificationService from '../services/notificationService';

const useNotifications = () => {
  const user = useAppSelector((state) => state.auth.user);

  // Single source of truth for the global Redux unread count.
  // refetch() re-syncs Redux from the server after any mutation below.
  const { refetch: refetchUnreadCount } = useNotificationPolling();

  const [notifications, setNotifications] = useState([]);
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
      const res = await notificationService.getNotifications();
      const data = res.data?.data || [];
      setNotifications(data);
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

  // ── Local counts (for this page's UI only — NOT dispatched to Redux) ──
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'unread') return notifications.filter((n) => !n.read);
    if (activeFilter === 'read') return notifications.filter((n) => n.read);
    return notifications;
  }, [notifications, activeFilter]);

  const markAsRead = async (id) => {
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
      setNotifications([]);
      setSelectedNotification(null);
      refetchUnreadCount();
    } catch (err) {
      console.error('Clear all error:', err);
    }
  };

  return {
    notifications,
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