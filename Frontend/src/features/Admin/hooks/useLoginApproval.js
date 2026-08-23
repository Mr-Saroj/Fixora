import { useState, useEffect, useCallback } from 'react';
import { getAllTechnicians, updateTechnicianAccess } from '../services/adminService';

const useLoginApproval = () => {
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

  /* ── Fetch — filter to PENDING only ── */
  const fetchTechnicians = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllTechnicians();
      const data = response.data;
      if (data.success) {
        setTechnicians(data.data.filter((t) => t.loginAccess === 'PENDING'));
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

  /* ── Approve (PENDING → ALLOW) ── */
  const handleApprove = useCallback(async (technicianId) => {
    try {
      const response = await updateTechnicianAccess(technicianId, 'ALLOW');
      const data = response.data;

      if (data.success) {
        setTechnicians((prev) => prev.filter((t) => t.id !== technicianId));
        setSelected(null);
        showToast('Technician approved successfully.', 'success');
      } else {
        showToast(data.message || 'Update failed.', 'error');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Network error.', 'error');
    }
  }, [showToast]);

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
    fetchTechnicians,
    handleApprove,
  };
};

export default useLoginApproval;