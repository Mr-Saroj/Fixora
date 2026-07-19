import API from "../../../services/api";

export const createRequest = (requestData) => {
  return API.post("/requests", requestData);
};