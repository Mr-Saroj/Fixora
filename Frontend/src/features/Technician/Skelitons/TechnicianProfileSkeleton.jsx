// src/components/skeletons/TechnicianProfileSkeleton.jsx
import React from 'react';

/* ---------- Primitives ---------- */
const Bone = ({ className = '' }) => (
  <div className={`rounded-lg bg-slate-200/80 ${className}`} />
);

const cardClass =
  'rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_14px_rgba(15,23,42,0.06)] md:p-7';

const SectionHeaderSkeleton = () => (
  <div className="mb-6 flex items-center gap-4">
    <Bone className="h-12 w-12 rounded-xl" />
    <div className="space-y-2">
      <Bone className="h-4 w-44" />
      <Bone className="h-3 w-56" />
    </div>
  </div>
);

const FieldSkeleton = () => (
  <div>
    <Bone className="mb-2 h-4 w-24" />
    <Bone className="h-11 w-full rounded-xl" />
  </div>
);

const ImageFieldSkeleton = () => (
  <div className="space-y-3">
    <Bone className="h-4 w-36" />
    <Bone className="h-11 w-full rounded-xl" />
    <Bone className="h-48 w-full rounded-xl" />
  </div>
);

/* ---------- Skeleton page ---------- */
const TechnicianProfileSkeleton = () => (
  <div
    className="mx-auto max-w-6xl animate-pulse space-y-7 p-4 md:p-8"
    role="status"
    aria-busy="true"
    aria-label="Loading your profile"
  >
    {/* Header */}
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="space-y-3">
        <Bone className="h-8 w-48" />
        <Bone className="h-4 w-80 max-w-full" />
      </div>
      <Bone className="h-11 w-36 rounded-xl" />
    </div>

    {/* Profile overview */}
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_14px_rgba(15,23,42,0.06)]">
      <div className="h-28 bg-gradient-to-r from-blue-100 via-blue-50 to-sky-100" />

      <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end">
        <div className="-mt-12 h-24 w-24 shrink-0 rounded-2xl border-4 border-white bg-slate-200 shadow-md" />

        <div className="flex-1 space-y-3">
          <Bone className="h-6 w-44" />
          <Bone className="h-4 w-64 max-w-full" />
        </div>

        <Bone className="h-7 w-36 rounded-full" />
      </div>
    </div>

    {/* Professional information */}
    <section className={cardClass}>
      <SectionHeaderSkeleton />
      <div className="max-w-xl">
        <FieldSkeleton />
      </div>
    </section>

    {/* Location information */}
    <section className={cardClass}>
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <FieldSkeleton key={i} />
        ))}
      </div>
    </section>

    {/* Identity documents */}
    <section className={cardClass}>
      <div className="mb-6 flex items-start justify-between gap-3">
        <SectionHeaderSkeleton />
        <Bone className="h-6 w-24 rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ImageFieldSkeleton />
        <ImageFieldSkeleton />
      </div>
    </section>

    <span className="sr-only">Loading…</span>
  </div>
);

export default TechnicianProfileSkeleton;