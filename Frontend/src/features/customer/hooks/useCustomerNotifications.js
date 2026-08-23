import { useState, useMemo, useEffect } from 'react';
import * as announcementService from '../services/announcementService';

const useCustomerNotifications = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const annRes = await announcementService.getAnnouncements();
      setAnnouncements(annRes.data?.data || []);
    } catch (err) {
      setError('Failed to load notifications');
      console.error('Fetch announcements error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const notifications = useMemo(
    () => announcements
      .map((a) => ({ ...a, read: true, type: 'ANNOUNCEMENT' }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [announcements]
  );

  // always 0 for now — announcements have no per-user read state on the backend
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'unread') return notifications.filter((n) => !n.read);
    if (activeFilter === 'read') return notifications.filter((n) => n.read);
    return notifications;
  }, [notifications, activeFilter]);

  // No-ops for now — announcements can't be individually marked/deleted
  // per-user without a backend read-tracking table
  const markAsRead = () => {};
  const markAsUnread = () => {};
  const markAllAsRead = () => {};
  const deleteNotification = () => {};
  const clearAll = () => {};

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
    markAllAsRead,
    deleteNotification,
    clearAll,
  };
};

export default useCustomerNotifications;