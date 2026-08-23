import { useState, useEffect, useCallback } from 'react';
import {
  broadcastAnnouncement,
  sendAnnouncementToUser,
  getAllUsers,
} from '../services/adminService';

const useAnnouncements = () => {
  /* ── Toast ── */
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  /* ── Broadcast to ALL ── */
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastLoading, setBroadcastLoading] = useState(false);

  const handleBroadcast = useCallback(async () => {
    if (!broadcastTitle.trim() || !broadcastMsg.trim()) {
      return showToast('Please add a title and message.', 'error');
    }
    setBroadcastLoading(true);
    try {
      await broadcastAnnouncement(broadcastTitle.trim(), broadcastMsg.trim(), 'ALL');
      showToast('Announcement sent to all users!');
      setBroadcastTitle('');
      setBroadcastMsg('');
    } catch (err) {
      console.error('Broadcast error:', err);
      showToast(err.response?.data?.message || 'Failed to send announcement.', 'error');
    } finally {
      setBroadcastLoading(false);
    }
  }, [broadcastTitle, broadcastMsg, showToast]);

  /* ── Role-based ── */
  const [roleTitle, setRoleTitle] = useState('');
  const [roleMsg, setRoleMsg] = useState('');
  const [selectedRole, setSelectedRole] = useState('customer');
  const [roleLoading, setRoleLoading] = useState(false);

  const handleRoleSend = useCallback(async () => {
    if (!roleTitle.trim() || !roleMsg.trim()) {
      return showToast('Please add a title and message.', 'error');
    }
    setRoleLoading(true);
    try {
      await broadcastAnnouncement(roleTitle.trim(), roleMsg.trim(), selectedRole.toUpperCase());
      const label = selectedRole === 'customer' ? 'all customers' : 'all technicians';
      showToast(`Message sent to ${label}!`);
      setRoleTitle('');
      setRoleMsg('');
    } catch (err) {
      console.error('Role broadcast error:', err);
      showToast(err.response?.data?.message || 'Failed to send message.', 'error');
    } finally {
      setRoleLoading(false);
    }
  }, [roleTitle, roleMsg, selectedRole, showToast]);

  /* ── Specific user ── */
  const [allUsers, setAllUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRole, setSearchRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [specificTitle, setSpecificTitle] = useState('');
  const [specificMsg, setSpecificMsg] = useState('');
  const [specificLoading, setSpecificLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setUsersLoading(true);
      try {
        const res = await getAllUsers();
        if (res.data.success) {
          setAllUsers(
            res.data.data.map((u) => ({
              id: u.id,
              name: u.name,
              email: u.email,
              role: u.role.toLowerCase(),
              avatar: u.name.charAt(0).toUpperCase(),
            }))
          );
        }
      } catch (err) {
        console.error('Failed to load users:', err);
        showToast('Could not load user list.', 'error');
      } finally {
        setUsersLoading(false);
      }
    };
    fetchUsers();
  }, [showToast]);

  const filteredUsers = allUsers.filter((u) => {
    const matchRole = searchRole === 'all' || u.role === searchRole;
    const matchName = u.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRole && matchName && searchQuery.trim().length > 0;
  });

  const handleSpecificSend = useCallback(async () => {
    if (!selectedUser) return showToast('Please select a user.', 'error');
    if (!specificTitle.trim()) return showToast('Please add a title.', 'error');
    if (!specificMsg.trim()) return showToast('Please write a message first.', 'error');

    setSpecificLoading(true);
    try {
      await sendAnnouncementToUser(selectedUser.id, specificTitle.trim(), specificMsg.trim());
      showToast(`Message sent to ${selectedUser.name}!`);
      setSpecificTitle('');
      setSpecificMsg('');
      setSelectedUser(null);
      setSearchQuery('');
    } catch (err) {
      console.error('Specific send error:', err);
      showToast(err.response?.data?.message || 'Failed to send message.', 'error');
    } finally {
      setSpecificLoading(false);
    }
  }, [selectedUser, specificTitle, specificMsg, showToast]);

  return {
    toasts,
    showToast,
    broadcastTitle, setBroadcastTitle, broadcastMsg, setBroadcastMsg, broadcastLoading, handleBroadcast,
    roleTitle, setRoleTitle, roleMsg, setRoleMsg, selectedRole, setSelectedRole, roleLoading, handleRoleSend,
    allUsers, usersLoading, searchQuery, setSearchQuery, searchRole, setSearchRole,
    selectedUser, setSelectedUser, specificTitle, setSpecificTitle, specificMsg, setSpecificMsg,
    specificLoading, handleSpecificSend, filteredUsers,
  };
};

export default useAnnouncements;