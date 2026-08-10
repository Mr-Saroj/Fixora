import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { setUnreadCount } from '../../../redux/slices/notificationSlice';
import { getUnreadCount } from '../services/notificationService';
import { POLLING } from '../utils/layoutUtils';

/**
 * Safely extracts the count value from various API response shapes
 * @param {object} res - Axios response object
 * @returns {number} The unread count
 */
const extractCount = (res) => {
  if (res?.data?.data !== undefined) return res.data.data;
  if (res?.data !== undefined) return res.data;
  return 0;
};

/**
 * Custom hook to poll unread notification count at a fixed interval
 *
 * - Fetches immediately on mount
 * - Re-fetches every `NOTIFICATION_INTERVAL_MS` milliseconds
 * - Cleans up interval on unmount
 * - Silently catches errors (logs to console)
 *
 * @param {number} [intervalMs] - Override polling interval in ms
 * @returns {{ refetch: () => Promise<void> }}
 *
 * @example
 * const { refetch } = useNotificationPolling();
 * // later, force a refetch after marking one as read:
 * await refetch();
 */
const useNotificationPolling = (intervalMs = POLLING.NOTIFICATION_INTERVAL_MS) => {
  const dispatch = useAppDispatch();
  const intervalRef = useRef(null);

  const fetchCount = useCallback(async () => {
    try {
      const res = await getUnreadCount();
      const count = extractCount(res);
      dispatch(setUnreadCount(count));
    } catch (err) {
      console.error('Failed to fetch notification count', err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCount();

    intervalRef.current = setInterval(fetchCount, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [fetchCount, intervalMs]);

  return { refetch: fetchCount };
};

export default useNotificationPolling;