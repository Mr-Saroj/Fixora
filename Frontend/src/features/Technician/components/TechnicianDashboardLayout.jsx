import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import MiddleContent from './MiddleContent';
import CustomerRequest from '../pages/CustomerRequest';   // ← updated path
import AcceptedRequest from '../pages/AcceptedRequest';   // ← updated path

// Placeholder Component for future pages
const PlaceholderPage = ({ title, icon, description }) => (
  <main className="flex-1 p-8 flex flex-col items-center justify-center bg-[#f8fafc] min-h-[80vh]">
    <div className="bg-white p-12 rounded-2xl border border-slate-100 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.04)] text-center max-w-md w-full">
      <div className="w-20 h-20 mx-auto mb-6 bg-slate-50 rounded-2xl flex items-center justify-center text-[#004ac6] border border-slate-100">
        <span className="material-symbols-outlined text-[40px]">{icon}</span>
      </div>
      <h1 className="font-bold text-2xl text-slate-800">{title}</h1>
      <p className="text-sm text-slate-400 mt-2 leading-relaxed">{description || 'This module is currently under development. Check back soon for updates.'}</p>
      <div className="mt-6 h-1.5 w-24 mx-auto bg-gradient-to-r from-[#004ac6] to-[#57dffe] rounded-full opacity-50"></div>
    </div>
  </main>
);

const TechnicianDashboardLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activePage) {
      case 'customer-requests':
        return <CustomerRequest />;
      case 'accepted-requests':
        return <AcceptedRequest />;
      case 'messages':
        return <PlaceholderPage title="Messages & Chat" icon="chat_bubble" description="Direct messaging with active clients and Fixora support." />;
      case 'settings':
        return <PlaceholderPage title="Technician Settings" icon="settings" description="Manage your service area, notification preferences, and payout methods." />;
      default:
        return <MiddleContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-800 overflow-hidden font-sans">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div
        className={`flex-1 flex flex-col relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          sidebarOpen ? 'lg:ml-72' : 'lg:ml-0'
        }`}
      >
        <TopNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex-1 flex flex-col">
          {renderContent()}
        </div>
      </div>
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e0e3e5; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default TechnicianDashboardLayout;