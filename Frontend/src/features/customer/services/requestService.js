import API from "../../../services/api";

export const createRequest = (requestData) => {
    return API.post("/requests", requestData);
};

export const getMyRequests = (cursor = null, size = 10) => {
    const params = { size };
    if (cursor) params.cursor = cursor;
    return API.get("/requests/my-requests", { params });
};

export const submitRating = (requestId, { rating, review }) =>
    API.patch(`/requests/${requestId}/rate`, { rating, review });