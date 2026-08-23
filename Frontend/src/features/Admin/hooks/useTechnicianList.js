import { useState, useEffect, useCallback } from 'react';
import { getAllTechnicians, updateTechnicianAccess } from '../services/adminService';

const useTechnicianList = () => {
  const [query,        setQuery]        = useState('');
  const [technicians,  setTechnicians]  = useState([]);
  const [selected,     setSelected]     = useState(null);
  const [isLoading,    setIsLoading]    = useState(false);
  const [error,        setError]        = useState(null);
  const [toasts,       setToasts]       = useState([]);

  /* ── Toast helper ── */
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  }, []);

  /* ── Fetch all technicians ── */
  const fetchTechnicians = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllTechnicians();
      const data = response.data;
      if (data.success) {
        setTechnicians(data.data);
      } else {
        setError(data.message || 'Failed to fetch technicians.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTechnicians();
  }, [fetchTechnicians]);

  /* ── Update loginAccess ── */
  const handleUpdateAccess = useCallback(async (technicianId, newAccess) => {
    try {
      const response = await updateTechnicianAccess(technicianId, newAccess);
      const data = response.data;

      if (data.success) {
        setTechnicians((prev) =>
          prev.map((t) => (t.id === technicianId ? { ...t, loginAccess: newAccess } : t))
        );
        setSelected((prev) =>
          prev ? { ...prev, loginAccess: newAccess } : null
        );
        const label =
          newAccess === 'ALLOW'
            ? 'approved'
            : newAccess === 'BLOCK'
              ? 'blocked'
              : 'updated';
        showToast(
          `Technician ${label} successfully.`,
          newAccess === 'BLOCK' ? 'error' : 'success'
        );
      } else {
        showToast(data.message || 'Update failed.', 'error');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Network error.', 'error');
    }
  }, [showToast]);

  /* ── Derived counts ── */
  const pendingCount = technicians.filter((t) => t.loginAccess === 'PENDING').length;
  const allowCount   = technicians.filter((t) => t.loginAccess === 'ALLOW').length;
  const blockCount   = technicians.filter((t) => t.loginAccess === 'BLOCK').length;

  /* ── Filter ── */
  const filtered = technicians.filter((t) =>
    t.name?.toLowerCase().includes(query.toLowerCase()) ||
    t.city?.toLowerCase().includes(query.toLowerCase()) ||
    t.technicianType?.toLowerCase().includes(query.toLowerCase())
  );

  return {
    query,
    setQuery,
    technicians,
    filtered,
    selected,
    setSelected,
    isLoading,
    error,
    toasts,
    pendingCount,
    allowCount,
    blockCount,
    fetchTechnicians,
    handleUpdateAccess,
  };
};

export default useTechnicianList;