const POLL_INTERVAL_MS = 3000;

export function usePolling() {
  let intervalId: number | null = null;

  function startPolling(callback: () => void, intervalMs = POLL_INTERVAL_MS) {
    intervalId = setInterval(callback, intervalMs);
  }

  function stopPolling() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  onUnmounted(stopPolling);

  return {
    startPolling,
    stopPolling,
  };
}
