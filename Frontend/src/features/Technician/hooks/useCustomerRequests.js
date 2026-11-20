
import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef
} from 'react';

import {
  getMatchingRequests,
  acceptRequest
} from '../services/technicianService';

import {
  getMyTechnicianProfile
} from '../services/technicianProfileService';

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
  const [acceptingId, setAcceptingId] = useState(null);

  const [profileIncomplete, setProfileIncomplete] = useState(false);

  const sentinelRef = useRef(null);

  // INITIAL FETCH: CHECK PROFILE FIRST
  useEffect(() => {
    let isMounted = true;

    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        setProfileIncomplete(false);

        // Step 1: Check technician profile
        try {
          const profileResponse = await getMyTechnicianProfile();

          // Profile API succeeded, but profile data is missing
          if (!profileResponse.data?.data) {
            if (isMounted) {
              setProfileIncomplete(true);
              setRequests([]);
            }
            return;
          }

        } catch (profileError) {
          // Only profile API 404 means incomplete profile
          if (profileError.response?.status === 404) {
            if (isMounted) {
              setProfileIncomplete(true);
              setRequests([]);
            }
            return;
          }

          throw profileError;
        }

        // Step 2: Profile exists, fetch matching requests
        const response = await getMatchingRequests(null, 10);

        const {
          requests: data,
          nextCursor,
          hasMore
        } = response.data.data;

        if (isMounted) {
          setRequests(data || []);
          setCursor(nextCursor);
          setHasMore(hasMore);
        }

      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
            'Failed to load requests. Please try again.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  // LOAD MORE
  const loadMore = useCallback(async () => {
    if (
      !hasMore ||
      loadingMore ||
      profileIncomplete ||
      !cursor
    ) {
      return;
    }

    try {
      setLoadingMore(true);

      const response = await getMatchingRequests(cursor, 10);

      const {
        requests: data,
        nextCursor,
        hasMore: more
      } = response.data.data;

      setRequests((prev) => [...prev, ...(data || [])]);
      setCursor(nextCursor);
      setHasMore(more);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to load more requests.'
      );
    } finally {
      setLoadingMore(false);
    }
  }, [cursor, hasMore, loadingMore, profileIncomplete]);

  // INTERSECTION OBSERVER
  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || profileIncomplete || loading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loadMore, profileIncomplete, loading]);

  // FILTER + SORT
  const filteredRequests = useMemo(() => {
    let result = [...requests];

    if (activeFilter !== 'all') {
      result = result.filter(
        (req) => req.urgency?.toLowerCase() === activeFilter
      );
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
      result.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else {
      result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return result;
  }, [requests, activeFilter, searchQuery, sortBy]);

  // STATS
  const totalCount = requests.length;

  const emergencyCount = requests.filter(
    (r) => r.urgency?.toLowerCase() === 'emergency'
  ).length;

  const standardCount = requests.filter(
    (r) => r.urgency?.toLowerCase() === 'standard'
  ).length;

  // ACCEPT
  const handleAccept = async (id) => {
    if (acceptingId) return;

    setAcceptingId(id);

    try {
      const response = await acceptRequest(id);

      if (response.data.success) {
        setRequests((prev) =>
          prev.filter((req) => req.id !== id)
        );
        setSelectedRequest(null);
      } else {
        alert(response.data.message);
      }

    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Failed to accept request.'
      );
    } finally {
      setAcceptingId(null);
    }
  };

  // DECLINE
  const handleDecline = (id) => {
    if (acceptingId) return;

    setRequests((prev) =>
      prev.filter((req) => req.id !== id)
    );

    setSelectedRequest(null);
  };

  return {
    activeFilter,
    searchQuery,
    sortBy,
    selectedRequest,

    loading,
    loadingMore,
    error,
    profileIncomplete,

    filteredRequests,
    totalCount,
    emergencyCount,
    standardCount,

    hasMore,
    sentinelRef,
    acceptingId,

    setActiveFilter,
    setSearchQuery,
    setSortBy,
    setSelectedRequest,

    handleAccept,
    handleDecline
  };
};
