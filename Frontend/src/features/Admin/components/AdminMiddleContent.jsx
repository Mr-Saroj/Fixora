import React from 'react';
import useMiddleContent from '../hooks/useMiddleContent';
import { StatCard, Skeleton } from '../utils/middlecontentUtils';

const AdminMiddleContent = () => {
  const {
    loading,
    error,
    totalCustomers,
    totalTechnicians,
    pendingTechnicians,
  } = useMiddleContent();

  return (
    <div className="space-y-4 sm:space-y-6">

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {error}
        </div>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
        <StatCard
          label="Total Customers"
          value={totalCustomers.toLocaleString()}
          icon="group"
          colorClass="bg-blue-50 text-blue-600"
          sub="USERS"
          loading={loading}
        />
        <StatCard
          label="Total Technicians"
          value={totalTechnicians.toLocaleString()}
          icon="engineering"
          colorClass="bg-emerald-50 text-emerald-600"
          sub="PROS"
          loading={loading}
        />
        <StatCard
          label="Pending Approvals"
          value={pendingTechnicians.length.toLocaleString()}
          icon="pending_actions"
          colorClass="bg-red-50 text-red-500"
          sub="ACTION"
          loading={loading}
        />
      </section>

      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">

        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#004ac6] to-[#57dffe] flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-[16px]">pending_actions</span>
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                Pending Technician Approvals
              </h2>
              <p className="text-[10px] text-slate-400">
                Technicians waiting for login access
              </p>
            </div>
          </div>
          {!loading && pendingTechnicians.length > 0 && (
            <span className="text-[10px] font-bold tracking-widest text-red-500 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
              {pendingTechnicians.length} PENDING
            </span>
          )}
        </div>

        {loading ? (
          <div className="divide-y divide-slate-50">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-2.5 w-1/2" />
                </div>
                <Skeleton className="h-6 w-20 rounded-lg" />
              </div>
            ))}
          </div>
        ) : pendingTechnicians.length === 0 ? (
          <div className="px-4 py-12 flex flex-col items-center gap-2 text-center">
            <span className="material-symbols-outlined text-slate-200 text-[48px]">
              check_circle
            </span>
            <p className="text-sm font-semibold text-slate-400">All caught up!</p>
            <p className="text-xs text-slate-300">No technicians are pending approval.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {pendingTechnicians.map((tech) => (
              <div
                key={tech.id}
                className="px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-3 hover:bg-slate-50/70 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {tech.name?.charAt(0).toUpperCase() ?? '?'}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {tech.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {tech.email}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    {tech.technicianType && (
                      <span className="text-[10px] font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full capitalize">
                        {tech.technicianType.toLowerCase().replace('_', ' ')}
                      </span>
                    )}
                    {tech.city && (
                      <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[11px]">
                          location_on
                        </span>
                        {tech.city}
                        {tech.district ? `, ${tech.district}` : ''}
                      </span>
                    )}
                  </div>
                </div>

                <span className="shrink-0 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
                  PENDING
                </span>
              </div>
            ))}
          </div>
        )}

        {!loading && pendingTechnicians.length > 0 && (
          <div className="px-4 py-3 sm:px-6 border-t border-slate-50 bg-slate-50/50">
            <p className="text-[11px] text-slate-400">
              Go to{' '}
              <a
                href="/admin-dashboard/technicians"
                className="text-[#004ac6] font-semibold hover:underline"
              >
                Technician Management
              </a>{' '}
              to approve or reject access.
            </p>
          </div>
        )}
      </div>

      <div className="h-4 sm:h-8" />
    </div>
  );
};

export default AdminMiddleContent;