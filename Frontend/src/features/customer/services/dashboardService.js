import API from "../../../services/api";

export const getDashboardRequests = async () => {
  const res = await API.get('/requests/my-requests');
  return res.data; // Returns the ApiResponse<> body { success, message, data }
};