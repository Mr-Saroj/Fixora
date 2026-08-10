import API from '../../../services/api';

export const getNotifications = () => API.get('/notifications');
export const getUnreadCount = () => API.get('/notifications/unread-count');
export const markAsRead = (id) => API.patch(`/notifications/${id}/read`);
export const markAllAsRead = () => API.patch('/notifications/read-all');
export const deleteNotification = (id) => API.delete(`/notifications/${id}`);
export const clearAllNotifications = () => API.delete('/notifications/clear-all');