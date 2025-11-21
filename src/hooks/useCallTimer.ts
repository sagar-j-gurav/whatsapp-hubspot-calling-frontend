/**
 * Call Timer Hook
 */

import { useState, useEffect, useCallback } from 'react';
import { formatDuration } from '../utils/formatters';

export const useCallTimer = (isActive: boolean = false) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [formattedDuration, setFormattedDuration] = useState<string>('00:00');

  /**
   * Start the timer
   */
  const start = useCallback(() => {
    setStartTime(Date.now());
    setDuration(0);
  }, []);

  /**
   * Stop the timer
   */
  const stop = useCallback(() => {
    setStartTime(null);
  }, []);

  /**
   * Reset the timer
   */
  const reset = useCallback(() => {
    setStartTime(null);
    setDuration(0);
    setFormattedDuration('00:00');
  }, []);

  /**
   * Update duration every second
   */
  useEffect(() => {
    if (!isActive || !startTime) {
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setDuration(elapsed);
      setFormattedDuration(formatDuration(elapsed));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, startTime]);

  return {
    duration,
    formattedDuration,
    start,
    stop,
    reset,
  };
};
