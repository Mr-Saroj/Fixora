// src/services/PaymentService.js
import API from '../../../services/api';

export const createOrder = async (amount) => {
  const response = await API.post('/payment/create-order', { amount });
  if (!response.data.success) throw new Error(response.data.message);
  return response.data.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await API.post('/payment/verify', paymentData);
  if (!response.data.success) throw new Error(response.data.message);
  return response.data.data;
};