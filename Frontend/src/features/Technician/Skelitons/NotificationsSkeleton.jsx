import React from 'react';

const Skeleton = ({ className = '' }) => (
  <div
    className={`animate-pulse rounded-md bg-slate-200/80 ${className}`}
  />
);

const NotificationCardSkeleton = () => (
  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 bg-white">
    {/* Notification icon */}
    <Skeleton className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl shrink-0" />

    {/* Notification content */}
    <div className="flex-1 min-w-0 space-y-2 pt-0.5">
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="h-4 w-2/3 max-w-48" />
        <Skeleton className="h-3 w-12 shrink-0" />
      </div>

      <div className="space-y-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>

      <Skeleton className="h-5 w-20 rounded-md mt-1" />
    </div>

    {/* Mobile chevron */}
    <Skeleton className="sm:hidden w-4 h-4 rounded-full shrink-0 mt-1" />
  </div>
);

const DetailPanelSkeleton = () => (
  <div className="bg-white lg:bg-slate-50/50 rounded-t-2xl lg:rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    {/* Mobile drag handle */}
    <div className="lg:hidden flex justify-center pt-3 pb-1">
      <Skeleton className="w-10 h-1 rounded-full" />
    </div>

    {/* Panel header */}
    <div className="flex items-start gap-3 p-4 sm:p-5 border-b border-slate-100">
      <Skeleton className="w-11 h-11 rounded-xl shrink-0" />

      <div className="flex-1 min-w-0 space-y-2 pt-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-20" />
      </div>

      <Skeleton className="w-6 h-6 rounded-lg shrink-0" />
    </div>

    {/* Panel body */}
    <div className="p-4 sm:p-5 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>

      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Skeleton className="h-9 w-28 rounded-lg" />
        <Skeleton className="h-9 w-20 rounded-lg ml-auto" />
      </div>
    </div>
  </div>
);

const NotificationsSkeleton = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-6 sm:h-7 w-36 sm:w-44" />
          <Skeleton className="h-3 sm:h-4 w-48 sm:w-60" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28 sm:w-36 rounded-lg" />
          <Skeleton className="h-9 w-20 sm:w-24 rounded-lg" />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1.5 bg-white rounded-xl p-1.5 border border-slate-100 shadow-sm w-fit">
        <Skeleton className="h-8 w-20 sm:w-24 rounded-lg" />
        <Skeleton className="h-8 w-20 sm:w-24 rounded-lg" />
        <Skeleton className="h-8 w-16 sm:w-20 rounded-lg" />
      </div>

      {/* Notification list + desktop detail panel */}
      <div className="flex gap-4 sm:gap-6">
        <div className="flex-1 min-w-0 space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <NotificationCardSkeleton key={index} />
          ))}
        </div>

        {/* Desktop detail panel */}
        <div className="hidden lg:block w-80 xl:w-96 shrink-0">
          <DetailPanelSkeleton />
        </div>
      </div>

      <div className="h-4 sm:h-8" />
    </div>
  );
};

export default NotificationsSkeleton;