import { useState, useMemo, useEffect } from 'react';
import { getMatchingRequests, acceptRequest } from '../services/technicianService';

export const useCustomerRequests = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch from backend ─────────────────────────────────────
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getMatchingRequests();
        setRequests(response.data.data || []);
      } catch (err) {
        setError('Failed to load requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // ── Filter + Sort ──────────────────────────────────────────
  const filteredRequests = useMemo(() => {
    let result = [...requests];

    if (activeFilter !== 'all') {
      result = result.filter((req) => req.urgency?.toLowerCase() === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (req) =>
          req.fullName?.toLowerCase().includes(q) ||
          req.description?.toLowerCase().includes(q) ||
          req.category?.toLowerCase().includes(q) ||
          req.location?.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [requests, activeFilter, searchQuery, sortBy]);

  // ── Stats ──────────────────────────────────────────────────
  const totalCount = requests.length;
  const emergencyCount = requests.filter((r) => r.urgency?.toLowerCase() === 'emergency').length;
  const standardCount = requests.filter((r) => r.urgency?.toLowerCase() === 'standard').length;

  // ── Accept ─────────────────────────────────────────────────
  const handleAccept = async (id) => {
  try {
    const response = await acceptRequest(id);
    if (response.data.success) {
      setRequests((prev) => prev.filter((req) => req.id !== id));
      setSelectedRequest(null);
    } else {
      alert(response.data.message);
    }
  } catch (err) {
    // TEMPORARY DEBUG - shows exact error
    console.log('Status:', err.response?.status);
    console.log('Response:', err.response?.data);
    console.log('Message:', err.message);
    const msg = err.response?.data?.message || 'Failed to accept request.';
    alert(msg);
  }
};

  // ── Decline ────────────────────────────────────────────────
  const handleDecline = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
    setSelectedRequest(null);
  };

  return {
    activeFilter,
    searchQuery,
    sortBy,
    selectedRequest,
    loading,
    error,
    filteredRequests,
    totalCount,
    emergencyCount,
    standardCount,
    setActiveFilter,
    setSearchQuery,
    setSortBy,
    setSelectedRequest,
    handleAccept,
    handleDecline,
  };
};