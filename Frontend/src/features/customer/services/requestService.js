import API from "../../../services/api";

export const createRequest = (requestData) => {
  return API.post("/requests", requestData);
};
export const getMyRequests = () => {
  return API.get("/requests/my-requests");
};
export const submitRating = (requestId, { rating, review }) =>
  API.patch(`/requests/${requestId}/rate`, { rating, review });