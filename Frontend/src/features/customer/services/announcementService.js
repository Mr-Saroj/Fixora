import API from '../../../services/api';

export const getAnnouncements = () => API.get('/announcements');