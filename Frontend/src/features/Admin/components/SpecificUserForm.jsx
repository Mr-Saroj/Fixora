import React from 'react';
import { SectionCard, TitleInput, MessageTextarea, SendButton } from './SharedUI';
import { roleColors } from '../utils/announcementsUtils';

const SpecificUserForm = ({
  usersLoading, searchQuery, setSearchQuery, searchRole, setSearchRole,
  filteredUsers, selectedUser, setSelectedUser,
  title, setTitle, message, setMessage,
  loading, onSubmit,
}) => (
  <SectionCard icon="person_search" title="Message a Specific User" badge="TARGETED">
    <div className="space-y-4">
      <p className="text-xs text-slate-400 leading-relaxed">
        Search by name and role to find a user, then send them a direct message.
      </p>

      {/* Search controls */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="sm:w-40 shrink-0">
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Filter by Role</label>
          <select
            value={searchRole}
            onChange={(e) => { setSearchRole(e.target.value); setSelectedUser(null); }}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-700 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customer</option>
            <option value="technician">Technician</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Search by Name</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              {usersLoading ? 'progress_activity' : 'search'}
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setSelectedUser(null); }}
              placeholder={usersLoading ? 'Loading users…' : 'Type a name…'}
              disabled={usersLoading}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Search results */}
      {searchQuery.trim().length > 0 && (
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="px-4 py-6 text-center">
              <span className="material-symbols-outlined text-slate-300 text-[32px]">search_off</span>
              <p className="text-xs text-slate-400 mt-1.5">No users found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50 max-h-52 overflow-y-auto">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => { setSelectedUser(user); setSearchQuery(user.name); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                    selectedUser?.id === user.id ? 'bg-blue-50/60' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                      user.role === 'technician'
                        ? 'bg-gradient-to-br from-emerald-400 to-emerald-600'
                        : 'bg-gradient-to-br from-[#004ac6] to-[#57dffe]'
                    }`}
                  >
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize shrink-0 ${roleColors[user.role]}`}>
                    {user.role}
                  </span>
                  {selectedUser?.id === user.id && (
                    <span className="material-symbols-outlined text-[#004ac6] text-[18px] shrink-0">
                      check_circle
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selected user pill */}
      {selectedUser && (
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
              selectedUser.role === 'technician'
                ? 'bg-gradient-to-br from-emerald-400 to-emerald-600'
                : 'bg-gradient-to-br from-[#004ac6] to-[#57dffe]'
            }`}
          >
            {selectedUser.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">{selectedUser.name}</p>
            <p className="text-[10px] text-slate-400 capitalize">{selectedUser.role}</p>
          </div>
          <button
            type="button"
            onClick={() => { setSelectedUser(null); setSearchQuery(''); }}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Message area */}
      <div className={`space-y-3 transition-all duration-300 ${selectedUser ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        <TitleInput
          value={title}
          onChange={setTitle}
          placeholder={selectedUser ? `Title for ${selectedUser.name}…` : 'Select a user above first…'}
        />
        <MessageTextarea
          value={message}
          onChange={setMessage}
          placeholder={selectedUser ? `Write a message to ${selectedUser.name}…` : 'Select a user above first…'}
        />
        <div className="flex justify-end">
          <SendButton
            onClick={onSubmit}
            loading={loading}
            disabled={!selectedUser || !title.trim() || !message.trim()}
            label={selectedUser ? `Send to ${selectedUser.name}` : 'Send Message'}
            icon="send"
          />
        </div>
      </div>
    </div>
  </SectionCard>
);

export default SpecificUserForm;