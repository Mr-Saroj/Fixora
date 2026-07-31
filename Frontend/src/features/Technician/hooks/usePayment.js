import { useState } from 'react';
import { createOrder, verifyPayment } from '../services/PaymentService';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = import.meta.env.VITE_RAZORPAY_CHECKOUT_URL;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const usePayment = (onPaymentSuccess) => {
  const [paying, setPaying] = useState(false);

  const handlePayment = async () => {
    setPaying(true);
    try {
      // 1. Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert('Failed to load Razorpay. Check your internet connection.');
        setPaying(false);
        return;
      }

      // 2. Create order from backend
      const orderData = await createOrder(499);

      // 3. Configure Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Fixora',
        description: 'Monthly Technician Subscription - ₹499',
        order_id: orderData.orderId,

        // 4. On success — verify with backend
        handler: async (response) => {
          try {
            const result = await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert(`✅ Payment successful! Subscription active until ${result.subscriptionEndDate}`);
            onPaymentSuccess?.(); // refresh subscription status in parent
          } catch (err) {
            alert('❌ Payment verification failed: ' + err.message);
          } finally {
            setPaying(false);
          }
        },

        modal: {
          ondismiss: () => {
            setPaying(false);
          },
        },

        prefill: {
          name: '',
          email: '',
          contact: '',
        },

        theme: {
          color: '#004ac6',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (response) => {
        alert('❌ Payment failed: ' + response.error.description);
        setPaying(false);
      });
      razorpay.open();

    } catch (err) {
      alert('❌ Error: ' + err.message);
      setPaying(false);
    }
  };

  return { paying, handlePayment };
};