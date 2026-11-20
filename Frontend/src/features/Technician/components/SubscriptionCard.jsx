// src/features/technician/components/SubscriptionCard.jsx
import React from 'react';
import { usePayment } from '../hooks/usePayment';

const PLAN_DAYS = 30; // used only for the progress bar

/* ---------- Tone styles (active = brand blue, warning = amber) ---------- */
const TONES = {
  active: {
    chip: 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] shadow-[0_8px_20px_-6px_rgba(0,74,198,0.45)]',
    pill: 'bg-emerald-50 text-emerald-600',
    dot: 'bg-emerald-500',
    bar: 'from-[#004ac6] to-[#57dffe]',
    number: 'text-[#004ac6]',
    blob: 'from-[#57dffe]/25 to-[#004ac6]/10',
    icon: 'verified',
    pillText: 'Active'
  },
  warning: {
    chip: 'bg-gradient-to-br from-amber-500 to-amber-300 shadow-[0_8px_20px_-6px_rgba(245,158,11,0.5)]',
    pill: 'bg-amber-50 text-amber-600',
    dot: 'bg-amber-500',
    bar: 'from-amber-500 to-amber-300',
    number: 'text-amber-600',
    blob: 'from-amber-200/40 to-amber-400/10',
    icon: 'schedule',
    pillText: 'Expiring'
  }
};

/* ---------- White status card (active / expiring) ---------- */
const StatusCard = ({ tone, title, subscription, action }) => {
  const t = TONES[tone];
  const days = Math.max(subscription.daysRemaining ?? 0, 0);
  const pct = Math.min((days / PLAN_DAYS) * 100, 100);

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-100/80 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5">
      {/* decorative glow */}
      <div
        className={`pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-gradient-to-br blur-xl ${t.blob}`}
      />

      <div className="relative flex items-center gap-3 sm:gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white sm:h-12 sm:w-12 ${t.chip}`}
        >
          <span className="material-symbols-outlined text-[22px] sm:text-[24px]">
            {t.icon}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="truncate text-sm font-bold text-slate-800 sm:text-base">
              {title}
            </p>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${t.pill}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
              {t.pillText}
            </span>
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400 sm:text-xs">
            <span className="material-symbols-outlined text-[14px]">
              event
            </span>
            Expires {subscription.subscriptionEndDate}
          </p>
        </div>

        {/* Days left */}
        <div className="shrink-0 text-right">
          <p
            className={`text-2xl font-extrabold leading-none tracking-tight sm:text-3xl ${t.number}`}
          >
            {days}
          </p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Day{days !== 1 ? 's' : ''} left
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out ${t.bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {action}
    </div>
  );
};

/* ---------- Main ---------- */
const SubscriptionCard = ({ subscription, subLoading, onPaymentSuccess }) => {
  const { paying, handlePayment } = usePayment(onPaymentSuccess);

  // Loading skeleton
  if (subLoading) {
    return (
      <div
        className="h-[104px] animate-pulse rounded-xl border border-slate-100/80 bg-white p-4 sm:rounded-2xl sm:p-5"
        role="status"
        aria-busy="true"
        aria-label="Loading subscription"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-11 w-11 rounded-xl bg-slate-200/80 sm:h-12 sm:w-12" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-40 rounded-lg bg-slate-200/80" />
            <div className="h-3 w-52 max-w-full rounded-lg bg-slate-200/80" />
          </div>
          <div className="h-8 w-10 rounded-lg bg-slate-200/80" />
        </div>
        <div className="mt-4 h-1.5 rounded-full bg-slate-200/80" />
      </div>
    );
  }

  // ── ACTIVE > 5 days ──
  if (subscription?.status === 'ACTIVE' && subscription.daysRemaining > 5) {
    return (
      <StatusCard
        tone="active"
        title="Subscription Active"
        subscription={subscription}
      />
    );
  }

  // ── ACTIVE ≤ 5 days — Renew ──
  if (subscription?.status === 'ACTIVE' && subscription.daysRemaining <= 5) {
    return (
      <StatusCard
        tone="warning"
        title="Expiring Soon"
        subscription={subscription}
        action={
          <div className="relative mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Renew now so you don&apos;t miss any new job requests.
            </p>
            <button
              onClick={handlePayment}
              disabled={paying}
              className="w-full shrink-0 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2 text-xs font-bold text-white shadow-md shadow-amber-500/25 transition hover:from-amber-600 hover:to-amber-500 disabled:opacity-60 sm:w-auto"
            >
              {paying ? 'Opening…' : 'Renew Now'}
            </button>
          </div>
        }
      />
    );
  }

  // ── NOT SUBSCRIBED or EXPIRED ──
  const expired = subscription?.status === 'EXPIRED';

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#004ac6] to-[#57dffe] p-4 shadow-[0_8px_20px_-4px_rgba(0,74,198,0.3)] sm:rounded-2xl sm:p-5">
      {/* decorative circles */}
      <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-14 right-24 h-28 w-28 rounded-full bg-white/10" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white sm:h-12 sm:w-12">
            <span className="material-symbols-outlined text-[22px] sm:text-[24px]">
              workspace_premium
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white sm:text-base">
              {expired ? 'Your Subscription Has Expired' : 'No Active Subscription'}
            </p>
            <p className="mt-0.5 text-xs text-white/80">
              {expired
                ? `Expired on ${subscription.subscriptionEndDate}. Renew to receive jobs.`
                : 'Pay ₹499/month to start receiving job requests.'}
            </p>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={paying}
          className="w-full shrink-0 whitespace-nowrap rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#004ac6] shadow-sm transition hover:bg-slate-50 disabled:opacity-60 sm:w-auto"
        >
          {paying ? 'Opening…' : expired ? 'Renew Subscription' : 'Get Subscription'}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;