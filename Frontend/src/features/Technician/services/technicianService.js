import API from '../../../services/api'; // your axios instance with JWT interceptor

// Fetch all PENDING requests matching technician's category
export const getMatchingRequests = () => {
  return API.get('/technician/requests');
};