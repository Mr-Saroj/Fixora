import React from 'react';

const Skeleton = ({ className = '' }) => (
  <div
    className={`animate-pulse rounded-lg bg-slate-200/80 ${className}`}
  />
);

const MiddleContentSkeleton = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Subscription Card Skeleton */}
      <section className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-36 sm:w-48" />
            <Skeleton className="h-3 w-48 sm:w-64" />
            <Skeleton className="h-7 w-28 sm:w-36" />
          </div>

          <Skeleton className="h-10 w-24 sm:w-32 rounded-xl" />
        </div>

        <div className="mt-4">
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </section>

      {/* Stats Grid Skeleton */}
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <Skeleton className="h-9 w-9 sm:h-12 sm:w-12 rounded-xl" />
              <Skeleton className="hidden sm:block h-5 w-16 rounded-full" />
            </div>

            <Skeleton className="h-3 w-24 sm:w-32" />
            <Skeleton className="h-6 sm:h-8 w-14 sm:w-20 mt-2" />
          </div>
        ))}
      </section>

      {/* Active Job Skeleton */}
      <section className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 sm:p-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-4 w-24 sm:w-32" />
          </div>

          <Skeleton className="h-6 w-20 sm:w-24 rounded-full" />
        </div>

        {/* Customer Details */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl shrink-0" />

            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-4 w-36 sm:w-48 max-w-full" />
              <Skeleton className="h-3 w-28 sm:w-40 max-w-full" />
            </div>

            <Skeleton className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl shrink-0" />
          </div>
        </div>
      </section>

      {/* Job Status Stepper Skeleton */}
      <section className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center gap-3 mb-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 sm:w-40" />
            <Skeleton className="h-3 w-40 sm:w-56" />
          </div>

          <Skeleton className="h-8 w-24 sm:w-32 rounded-lg" />
        </div>

        {/* Mobile Stepper */}
        <div className="sm:hidden">
          <div className="relative flex justify-between px-2">
            <div className="absolute top-[11px] left-5 right-5 h-1 bg-slate-100 rounded-full" />

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="relative z-10 flex flex-col items-center gap-2 w-16"
              >
                <Skeleton className="h-[22px] w-[22px] rounded-full" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Stepper */}
        <div className="hidden sm:block">
          <div className="flex justify-between items-start pt-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex flex-col items-center gap-3 w-24"
              >
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Completed Skeleton */}
      <section>
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <Skeleton className="h-5 w-36 sm:w-44" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="space-y-2 sm:space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white px-4 py-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <Skeleton className="h-9 w-9 sm:h-12 sm:w-12 rounded-xl shrink-0" />

                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-4 w-40 sm:w-56 max-w-full" />
                  <Skeleton className="h-3 w-32 sm:w-48 max-w-full" />
                </div>

                <Skeleton className="h-6 w-16 sm:w-20 rounded-lg shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Spacer */}
      <div className="h-4 sm:h-8" />
    </div>
  );
};

export default MiddleContentSkeleton;
