import React from 'react';

const Skeleton = ({ className = '', style }) => (
  <div
    style={style}
    className={`animate-pulse rounded-lg bg-slate-200/80 ${className}`}
  />
);

const CustomerRequestSkeleton = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ================= MOBILE HEADER ================= */}
      <section className="sm:hidden mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-3 w-40" />
          </div>

          <div className="flex gap-2 shrink-0">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-10 w-10 rounded-xl" />
          </div>
        </div>
      </section>

      {/* ================= DESKTOP HEADER ================= */}
      <section className="hidden sm:block mb-8">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-80" />
          </div>

          <Skeleton className="h-11 w-28 rounded-xl" />
        </div>
      </section>

      {/* ================= MOBILE STATS ================= */}
      <section className="sm:hidden flex gap-2 overflow-hidden pb-1 -mx-1.5 px-1.5 mb-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2.5 bg-white px-3 py-2.5 rounded-xl border border-slate-100 shadow-sm shrink-0"
          >
            <Skeleton className="w-9 h-9 rounded-lg shrink-0" />

            <div className="space-y-1.5">
              <Skeleton className="h-5 w-8" />
              <Skeleton className="h-3 w-14" />
            </div>
          </div>
        ))}
      </section>

      {/* ================= DESKTOP STATS ================= */}
      <section className="hidden sm:grid grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
          >
            <Skeleton className="w-12 h-12 rounded-xl shrink-0" />

            <div className="space-y-2">
              <Skeleton className="h-7 w-12" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        ))}
      </section>

      {/* ================= MOBILE SEARCH + FILTERS ================= */}
      <section className="sm:hidden bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mb-4">
        {/* Search / sort row */}
        <div className="flex items-center justify-between px-3 py-2.5">
          <Skeleton className="h-8 w-36 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>

        {/* Filter pills */}
        <div className="flex gap-1.5 px-3 pb-3 overflow-hidden">
          {[68, 94, 90].map((width, index) => (
            <Skeleton
              key={index}
              style={{ width }}
              className="h-8 shrink-0 rounded-lg"
            />
          ))}
        </div>
      </section>

      {/* ================= DESKTOP SEARCH + FILTERS ================= */}
      <section className="hidden sm:block bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search input */}
          <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 gap-3">
            <Skeleton className="h-5 w-5 rounded-md shrink-0" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>

          {/* Sort select */}
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {[90, 120, 115].map((width, index) => (
            <Skeleton
              key={index}
              style={{ width }}
              className="h-10 rounded-xl"
            />
          ))}
        </div>
      </section>

      {/* ================= REQUEST CARD SKELETONS ================= */}
      <section className="space-y-2.5 sm:space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <article
            key={item}
            className="relative bg-white rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden"
          >
            {/* Left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 animate-pulse" />

            <div className="p-3.5 sm:p-5 pl-4 sm:pl-6">
              {/* Category + urgency badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-20 rounded-md" />
                  <Skeleton className="h-5 w-20 sm:w-24 rounded-md" />
                </div>

                <Skeleton className="h-5 w-12 rounded-md shrink-0" />
              </div>

              {/* Request description */}
              <Skeleton className="h-4 sm:h-5 w-4/5 max-w-lg mb-3" />

              {/* Customer metadata */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded shrink-0" />
                  <Skeleton className="h-3 w-32 sm:w-44" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded shrink-0" />
                  <Skeleton className="h-3 w-40 sm:w-64 max-w-[75%]" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded shrink-0" />
                  <Skeleton className="h-3 w-28 sm:w-40" />
                </div>

                {/* Optional photo metadata */}
                {item % 2 === 0 && (
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded shrink-0" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                )}
              </div>

              {/* Mobile actions */}
              <div className="sm:hidden flex gap-2 mt-4">
                <Skeleton className="h-10 flex-1 rounded-lg" />
                <Skeleton className="h-10 w-16 rounded-lg" />
                <Skeleton className="h-10 flex-[1.5] rounded-lg" />
              </div>

              {/* Desktop actions */}
              <div className="hidden sm:flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                <Skeleton className="h-10 w-24 rounded-xl" />
                <Skeleton className="h-10 w-24 rounded-xl" />
                <Skeleton className="h-10 w-28 rounded-xl" />
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Bottom spacer */}
      <div className="h-4 sm:h-8" />
    </div>
  );
};

export default CustomerRequestSkeleton;
