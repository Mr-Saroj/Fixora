import React from 'react';
import useAnnouncements from '../hooks/useAnnouncements';
import { Toast } from '../components/SharedUI';
import BroadcastForm from '../components/BroadcastForm';
import RoleBasedForm from '../components/RoleBasedForm';
import SpecificUserForm from '../components/SpecificUserForm';


const AnnouncementsPage = () => {
  const {
    toasts,
    broadcastTitle, setBroadcastTitle, broadcastMsg, setBroadcastMsg,
    broadcastLoading, handleBroadcast,
    roleTitle, setRoleTitle, roleMsg, setRoleMsg,
    selectedRole, setSelectedRole, roleLoading, handleRoleSend,
    usersLoading, searchQuery, setSearchQuery, searchRole, setSearchRole,
    filteredUsers, selectedUser, setSelectedUser,
    specificTitle, setSpecificTitle, specificMsg, setSpecificMsg,
    specificLoading, handleSpecificSend,
  } = useAnnouncements();

  return (
    <>
      <Toast toasts={toasts} />

      <div className="space-y-5 sm:space-y-6 max-w-3xl">
        {/* Page header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
            Announcements
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Send messages to all users, a specific role, or an individual.
          </p>
        </div>

        {/* Form 1: Broadcast */}
        <BroadcastForm
          title={broadcastTitle}
          setTitle={setBroadcastTitle}
          message={broadcastMsg}
          setMessage={setBroadcastMsg}
          loading={broadcastLoading}
          onSubmit={handleBroadcast}
        />

        {/* Form 2: Role-based */}
        <RoleBasedForm
          title={roleTitle}
          setTitle={setRoleTitle}
          message={roleMsg}
          setMessage={setRoleMsg}
          role={selectedRole}
          setRole={setSelectedRole}
          loading={roleLoading}
          onSubmit={handleRoleSend}
        />

        {/* Form 3: Specific user */}
        <SpecificUserForm
          usersLoading={usersLoading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchRole={searchRole}
          setSearchRole={setSearchRole}
          filteredUsers={filteredUsers}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          title={specificTitle}
          setTitle={setSpecificTitle}
          message={specificMsg}
          setMessage={setSpecificMsg}
          loading={specificLoading}
          onSubmit={handleSpecificSend}
        />

        <div className="h-4 sm:h-8" />
      </div>
    </>
  );
};

export default AnnouncementsPage;