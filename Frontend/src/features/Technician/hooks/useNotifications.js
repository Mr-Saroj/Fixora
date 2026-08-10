import { useState, useMemo, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setUnreadCount } from '../../../redux/slices/notificationSlice'; // adjust path
import useWebSocket from './useWebSocket';
import * as notificationService from '../services/notificationService';

const useNotifications = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

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

  // ── Counts ────────────────────────────────────────────────────────
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  // 🔑 Whenever local unreadCount changes, sync it to Redux
  useEffect(() => {
    dispatch(setUnreadCount(unreadCount));
  }, [unreadCount, dispatch]);

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
    } catch (err) {
      console.error('Mark as read error:', err);
    }
  };

  const markAsUnread = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n))
    );
    setSelectedNotification((prev) =>
      prev?.id === id ? { ...prev, read: false } : prev
    );
  };

  const markAllAsReadHandler = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error('Mark all as read error:', err);
    }
  };

  const deleteNotificationHandler = async (id) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      if (selectedNotification?.id === id) setSelectedNotification(null);
    } catch (err) {
      console.error('Delete notification error:', err);
    }
  };

  const clearAll = async () => {
    try {
      await notificationService.clearAllNotifications();
      setNotifications([]);
      setSelectedNotification(null);
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