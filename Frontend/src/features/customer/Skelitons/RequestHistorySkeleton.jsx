import React from 'react';

const Skeleton = ({ className = '' }) => (
  <div
    className={`animate-pulse rounded-md bg-slate-200/80 ${className}`}
  />
);

const RequestCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
    {/* Left: Request information */}
    <div className="flex items-start gap-4 flex-1 min-w-0">
      {/* Category icon */}
      <Skeleton className="w-12 h-12 rounded-xl shrink-0" />

      <div className="flex-1 min-w-0 space-y-3">
        {/* Request ID, category and emergency badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full max-w-sm" />
          <Skeleton className="h-4 w-3/4 max-w-xs" />
        </div>

        {/* Date */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded-sm" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>

    {/* Right: Status and action */}
    <div className="flex items-center justify-between md:flex-col md:items-end gap-3 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 shrink-0">
      <Skeleton className="h-7 w-28 rounded-full" />
      <Skeleton className="h-4 w-32" />
    </div>
  </div>
);

const RequestHistorySkeleton = () => {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#f8fafc] min-h-[80vh]">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="w-12 h-12 rounded-xl shrink-0" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-7 w-44 sm:w-56" />
              <Skeleton className="h-4 w-64 max-w-full" />
            </div>
          </div>
        </div>

        {/* Request cards */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <RequestCardSkeleton key={index} />
          ))}
        </div>

        {/* Infinite-scroll loading placeholder */}
        <div className="flex items-center justify-center gap-2 py-6">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
    </main>
  );
};

export default RequestHistorySkeleton;