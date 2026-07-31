import React from 'react';
import { usePayment } from '../hooks/usePayment';

const SubscriptionCard = ({ subscription, subLoading, onPaymentSuccess }) => {
  const { paying, handlePayment } = usePayment(onPaymentSuccess);

  // Loading skeleton
  if (subLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100/80 p-5 mb-6 animate-pulse h-[72px]" />
    );
  }

  // ── ACTIVE > 5 days — green card, no button needed ──────────────
  if (subscription?.status === 'ACTIVE' && subscription.daysRemaining > 5) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600">
          <span className="material-symbols-outlined text-[22px]">verified</span>
        </div>
        <div>
          <p className="text-sm font-bold text-emerald-800">Subscription Active</p>
          <p className="text-xs text-emerald-600 mt-0.5">
            {subscription.daysRemaining} days remaining • Expires {subscription.subscriptionEndDate}
          </p>
        </div>
      </div>
    );
  }

  // ── ACTIVE ≤ 5 days — amber warning with Renew button ───────────
  if (subscription?.status === 'ACTIVE' && subscription.daysRemaining <= 5) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600">
            <span className="material-symbols-outlined text-[22px]">warning</span>
          </div>
          <div>
            <p className="text-sm font-bold text-amber-800">Subscription Expiring Soon!</p>
            <p className="text-xs text-amber-600 mt-0.5">
              {subscription.daysRemaining} day{subscription.daysRemaining !== 1 ? 's' : ''} remaining • Expires {subscription.subscriptionEndDate}
            </p>
          </div>
        </div>
        <button
          onClick={handlePayment}
          disabled={paying}
          className="shrink-0 px-4 py-1.5 text-xs font-bold rounded-lg bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-60 transition-all shadow-sm"
        >
          {paying ? 'Opening…' : 'Renew Now'}
        </button>
      </div>
    );
  }

  // ── NOT SUBSCRIBED or EXPIRED — blue gradient with Get Subscription button ──
  return (
    <div className="bg-gradient-to-r from-[#004ac6] to-[#57dffe] rounded-2xl p-5 mb-6 flex items-center justify-between gap-4 shadow-[0_8px_20px_-4px_rgba(0,74,198,0.3)]">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-white/20 text-white">
          <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
        </div>
        <div>
          <p className="text-sm font-bold text-white">
            {subscription?.status === 'EXPIRED'
              ? 'Your Subscription Has Expired'
              : 'No Active Subscription'}
          </p>
          <p className="text-xs text-white/80 mt-0.5">
            {subscription?.status === 'EXPIRED'
              ? `Expired on ${subscription.subscriptionEndDate}. Renew to receive jobs.`
              : 'Pay ₹499/month to start receiving job requests.'}
          </p>
        </div>
      </div>
      <button
        onClick={handlePayment}
        disabled={paying}
        className="shrink-0 px-4 py-2 text-xs font-bold rounded-lg bg-white text-[#004ac6] hover:bg-slate-50 disabled:opacity-60 transition-all shadow-sm whitespace-nowrap"
      >
        {paying ? 'Opening…' : 'Get Subscription'}
      </button>
    </div>
  );
};

export default SubscriptionCard;