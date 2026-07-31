// technicianService.js
import API from '../../../services/api';

export const getMatchingRequests = () => API.get('/requests/technician');
export const acceptRequest = (id) => API.patch(`/requests/${id}/accept`);
export const declineRequest = (id) => API.patch(`/requests/${id}/decline`);

// NEW — technician's own accepted / in-progress / completed jobs
export const getMyJobs = () => API.get('/requests/my-jobs');

// NEW — advance job status. status must be "IN_PROGRESS" or "COMPLETED"
export const updateJobStatus = (id, status) =>
  API.patch(`/requests/${id}/status`, { status });

export const getSubscriptionStatus = () => API.get('/payment/subscription-status');