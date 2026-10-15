import React from 'react';

const Skeleton = ({ className = '' }) => (
  <div
    className={`animate-pulse rounded-md bg-slate-200/80 ${className}`}
  />
);

const StatCardSkeleton = () => (
  <div className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm">
    <div className="flex justify-between items-start mb-3 sm:mb-4">
      <Skeleton className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl" />
      <Skeleton className="hidden sm:block h-5 w-16 rounded-full" />
    </div>
    <Skeleton className="h-3 w-20 sm:w-24 mb-2" />
    <Skeleton className="h-6 sm:h-7 w-14 sm:w-20" />
  </div>
);

const CurrentJobSkeleton = () => (
  <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
    {/* Header */}
    <div className="px-4 py-3 sm:p-4 border-b border-slate-100 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 h-5 rounded" />
        <Skeleton className="h-4 w-28" />
      </div>
      <Skeleton className="h-6 w-12 rounded-full" />
    </div>

    {/* Technician details */}
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <Skeleton className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl shrink-0" />

        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-4 w-36 max-w-full" />
          <Skeleton className="h-3 w-44 max-w-full" />
        </div>

        <Skeleton className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl shrink-0" />
      </div>

      <div className="pt-4 border-t border-slate-100">
        <Skeleton className="h-10 w-full rounded-lg sm:rounded-xl" />
      </div>
    </div>
  </div>
);

const StatusTimelineSkeleton = () => (
  <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm">
    <div className="flex justify-between items-center mb-6 gap-2">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-7 w-20 rounded-lg" />
    </div>

    {/* Mobile timeline */}
    <div className="sm:hidden">
      <div className="relative flex items-start justify-between px-1">
        <Skeleton className="absolute top-[10px] left-5 right-5 h-1 rounded-full" />

        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center gap-2 w-[60px]">
            <Skeleton className="w-[22px] h-[22px] rounded-full" />
            <Skeleton className="h-2.5 w-12 max-w-full" />
          </div>
        ))}
      </div>
    </div>

    {/* Desktop timeline */}
    <div className="hidden sm:block">
      <div className="relative flex justify-between items-start pt-2">
        <Skeleton className="absolute top-[19px] left-0 right-0 h-1 rounded-full" />

        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center gap-2 w-20">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RequestFormSkeleton = () => (
  <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm lg:sticky lg:top-24">
    <div className="mb-4 sm:mb-6 space-y-2">
      <Skeleton className="h-5 sm:h-6 w-36" />
      <Skeleton className="h-3 w-full max-w-56" />
    </div>

    <div className="space-y-3 sm:space-y-4">
      {/* Category */}
      <div>
        <Skeleton className="h-3 w-16 mb-2" />
        <Skeleton className="h-10 w-full rounded-lg sm:rounded-xl" />
      </div>

      {/* Description */}
      <div>
        <Skeleton className="h-3 w-28 mb-2" />
        <Skeleton className="h-16 sm:h-20 w-full rounded-lg sm:rounded-xl" />
      </div>

      {/* Address */}
      <div>
        <Skeleton className="h-3 w-16 mb-2" />
        <Skeleton className="h-10 w-full rounded-lg sm:rounded-xl" />
      </div>

      {/* Urgency */}
      <div>
        <Skeleton className="h-3 w-16 mb-2" />
        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1 rounded-lg" />
          <Skeleton className="h-9 flex-1 rounded-lg" />
        </div>
      </div>

      <Skeleton className="h-11 w-full rounded-xl" />
    </div>
  </div>
);

const RecentActivitySkeleton = () => (
  <div className="bg-white px-4 py-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm">
    <div className="flex items-center gap-3 sm:gap-4">
      <Skeleton className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl shrink-0" />

      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-3.5 w-full max-w-64" />
        <Skeleton className="h-3 w-32 sm:w-44 max-w-full" />
      </div>

      <Skeleton className="h-6 w-20 sm:w-24 rounded-lg shrink-0" />
    </div>
  </div>
);

const DashboardSkeleton = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats grid */}
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </section>

      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Current job and timeline */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6 order-2 lg:order-1">
          <CurrentJobSkeleton />
          <StatusTimelineSkeleton />
        </div>

        {/* Request form: first on mobile, right on desktop */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <RequestFormSkeleton />
        </div>
      </div>

      {/* Recent activities */}
      <section>
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <Skeleton className="h-5 sm:h-6 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="space-y-2 sm:space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <RecentActivitySkeleton key={index} />
          ))}
        </div>
      </section>

      <div className="h-4 sm:h-8" />
    </div>
  );
};

export default DashboardSkeleton;