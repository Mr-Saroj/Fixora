import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { getMatchingRequests, acceptRequest } from '../services/technicianService';

export const useCustomerRequests = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  // ref attached to a sentinel div at bottom of list
  const sentinelRef = useRef(null);

  // ── Initial fetch ──────────────────────────────────────────
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getMatchingRequests(null, 10);
        const { requests: data, nextCursor, hasMore } = response.data.data;
        setRequests(data || []);
        setCursor(nextCursor);
        setHasMore(hasMore);
      } catch (err) {
        setError('Failed to load requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // ── Load more ──────────────────────────────────────────────
  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore) return;
    try {
      setLoadingMore(true);
      const response = await getMatchingRequests(cursor, 10);
      const { requests: data, nextCursor, hasMore: more } = response.data.data;
      setRequests((prev) => [...prev, ...(data || [])]);
      setCursor(nextCursor);
      setHasMore(more);
    } catch (err) {
      setError('Failed to load more requests.');
    } finally {
      setLoadingMore(false);
    }
  }, [cursor, hasMore, loadingMore]);

  // ── IntersectionObserver — fires when sentinel scrolls into view ──
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }   // trigger when 10% of sentinel is visible
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);   // re-attach whenever loadMore reference changes (cursor updated)

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
  const totalCount     = requests.length;
  const emergencyCount = requests.filter((r) => r.urgency?.toLowerCase() === 'emergency').length;
  const standardCount  = requests.filter((r) => r.urgency?.toLowerCase() === 'standard').length;

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
    activeFilter, searchQuery, sortBy, selectedRequest,
    loading, loadingMore, error,
    filteredRequests, totalCount, emergencyCount, standardCount,
    hasMore, sentinelRef,
    setActiveFilter, setSearchQuery, setSortBy, setSelectedRequest,
    handleAccept, handleDecline,
  };
};