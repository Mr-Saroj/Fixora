import { useState, useMemo, useEffect } from 'react';
import { getMatchingRequests } from '../services/technicianService';

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

  // ── Accept / Decline (local remove for now — wired to API later) ──
  const handleAccept = (id) => {
    // TODO: call PATCH /api/technician/requests/:id/accept
    setRequests((prev) => prev.filter((req) => req.id !== id));
    setSelectedRequest(null);
  };

  const handleDecline = (id) => {
    // TODO: call PATCH /api/technician/requests/:id/decline
    setRequests((prev) => prev.filter((req) => req.id !== id));
    setSelectedRequest(null);
  };

  return {
    // state
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
    // setters
    setActiveFilter,
    setSearchQuery,
    setSortBy,
    setSelectedRequest,
    // actions
    handleAccept,
    handleDecline,
  };
};