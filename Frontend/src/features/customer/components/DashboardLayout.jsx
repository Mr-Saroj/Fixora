import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import MiddleContent from './MiddleContent';
import Request from '../pages/Request';   // ← updated path

// --- Placeholder Components for future pages ---
const PlaceholderPage = ({ title, icon }) => (
  <main className="flex-1 p-gutter flex flex-col items-center justify-center bg-background min-h-[80vh]">
    <div className="bg-surface-container-lowest p-12 rounded-xl border border-border-subtle shadow-soft text-center max-w-md w-full">
      <div className="w-20 h-20 mx-auto mb-6 bg-surface-container-low rounded-xl flex items-center justify-center text-text-muted border border-border-subtle">
        <span className="material-symbols-outlined text-[40px]">{icon}</span>
      </div>
      <h1 className="font-headline-md text-headline-md text-text-main">{title}</h1>
      <p className="font-body-md text-body-md text-text-muted mt-2 leading-relaxed">This module is currently under development. You can add your components here later.</p>
      <div className="mt-6 h-1.5 w-24 mx-auto bg-gradient-to-r from-primary to-secondary-container rounded-full opacity-50"></div>
    </div>
  </main>
);

const DashboardLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activePage) {
      case 'requests':
        return <Request />;
      case 'earnings':
        return <PlaceholderPage title="Earnings" icon="payments" />;
      case 'messages':
        return <PlaceholderPage title="Messages" icon="chat_bubble" />;
      case 'settings':
        return <PlaceholderPage title="Settings" icon="settings" />;
      default:
        return <MiddleContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-on-surface overflow-hidden">
      {/* Sidebar with toggle props */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Area — margin shifts with sidebar */}
      <div
        className={`flex-1 flex flex-col relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          sidebarOpen ? 'lg:ml-72' : 'lg:ml-0'
        }`}
      >
        {/* TopNavbar with toggle button */}
        <TopNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content */}
        <div className="pl-4">
          {renderContent()}
        </div>
      </div>

      {/* Global Styles */}
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .spring {
          transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .shadow-soft {
          box-shadow: 0px 4px 20px rgba(0,0,0,0.03);
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e0e3e5; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default DashboardLayout;