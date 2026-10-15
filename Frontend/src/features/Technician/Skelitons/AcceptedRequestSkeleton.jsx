import React from 'react';

const Skeleton = ({ className = '' }) => (
  <div
    className={`animate-pulse rounded-lg bg-slate-200/80 ${className}`}
  />
);

const AcceptedRequestSkeleton = () => {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-6 sm:h-8 w-44 sm:w-60" />
          <Skeleton className="h-3 sm:h-4 w-52 sm:w-72 max-w-full" />
        </div>

        <Skeleton className="h-9 sm:h-11 w-10 sm:w-28 rounded-xl shrink-0" />
      </div>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm"
          >
            <Skeleton className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl mb-2 sm:mb-3" />
            <Skeleton className="h-6 sm:h-8 w-12 sm:w-16 mb-2" />
            <Skeleton className="h-3 w-24 sm:w-32 max-w-full" />
          </div>
        ))}
      </section>

      {/* Search + Filters */}
      <section className="bg-white rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm p-3 sm:p-4">
        <div className="flex items-center gap-3 bg-slate-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-100">
          <Skeleton className="w-5 h-5 rounded-md shrink-0" />
          <Skeleton className="h-4 w-48 sm:w-72 max-w-full" />
        </div>

        <div className="flex gap-1.5 sm:gap-2 mt-3 overflow-hidden">
          {[72, 88, 82, 94, 78].map((width, index) => (
            <Skeleton
              key={index}
              className="h-8 sm:h-10 shrink-0 rounded-lg sm:rounded-xl"
              style={undefined}
            />
          ))}
        </div>
      </section>

      {/* Request Cards */}
      <section className="space-y-2.5 sm:space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="relative bg-white rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden"
          >
            {/* Left accent */}
            <Skeleton className="absolute left-0 top-0 bottom-0 w-1 rounded-none" />

            <div className="p-3.5 sm:p-5 pl-4 sm:pl-6">
              {/* Category and status badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-md" />
                  <Skeleton className="h-6 w-24 rounded-md" />
                </div>
                <Skeleton className="h-5 w-12 rounded-md shrink-0" />
              </div>

              {/* Job title */}
              <Skeleton className="h-4 sm:h-5 w-3/4 max-w-md mb-3" />

              {/* Customer and address metadata */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded shrink-0" />
                  <Skeleton className="h-3 w-32 sm:w-44" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded shrink-0" />
                  <Skeleton className="h-3 w-40 sm:w-64 max-w-[75%]" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded shrink-0" />
                  <Skeleton className="h-3 w-36 sm:w-48" />
                </div>
              </div>

              {/* Mini Stepper */}
              <div className="mt-4 max-w-xs">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0" />
                  <Skeleton className="h-0.5 flex-1 rounded-full" />
                  <Skeleton className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0" />
                  <Skeleton className="h-0.5 flex-1 rounded-full" />
                  <Skeleton className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0" />
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="flex sm:hidden gap-2 mt-4">
                <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                <Skeleton className="h-10 flex-1 rounded-lg" />
              </div>

              {/* Desktop Actions */}
              <div className="hidden sm:flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                <Skeleton className="h-10 w-24 rounded-xl" />
                <Skeleton className="h-10 w-24 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Bottom Spacer */}
      <div className="h-4 sm:h-8" />
    </div>
  );
};

export default AcceptedRequestSkeleton;
