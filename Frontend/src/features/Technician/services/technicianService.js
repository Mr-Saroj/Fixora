// technicianService.js
import API from '../../../services/api';

export const getMatchingRequests = (cursor = null, size = 10) => {
    const params = { size };
    if (cursor) params.cursor = cursor;
    return API.get('/requests/technician', { params });  // ← was axiosInstance, now API
};
export const acceptRequest = (id) => API.patch(`/requests/${id}/accept`);
export const declineRequest = (id) => API.patch(`/requests/${id}/decline`);

// cursor pagination added
export const getMyJobs = (cursor = null, size = 10) => {
    const params = { size };
    if (cursor) params.cursor = cursor;
    return API.get('/requests/my-jobs', { params });
};

// NEW — advance job status. status must be "IN_PROGRESS" or "COMPLETED"
export const updateJobStatus = (id, status) =>
  API.patch(`/requests/${id}/status`, { status });

export const getSubscriptionStatus = () => API.get('/payment/subscription-status');