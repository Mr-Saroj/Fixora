import API from '../../../services/api';

export const getMyTechnicianProfile = () =>
  API.get('/technician/profile/me');

export const completeTechnicianProfile = (profileData) =>
  API.put('/technician/profile/complete', profileData);