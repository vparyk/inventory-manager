import { ref, watch } from "vue";
import { useOnlineStatus } from "./useOnlineStatus";

interface QueuedTask<TPayload> {
  payload: TPayload;
  callback: (payload: TPayload) => Promise<void> | void;
}

export function useSaveQueue<TPayload>() {
  const { isOnline } = useOnlineStatus();
  const queue: Ref<QueuedTask<TPayload>[]> = ref([]);

  async function processQueue() {
    if (!isOnline.value || queue.value.length === 0) return;

    const pendingTasks = [...queue.value];
    queue.value = [];

    for (const task of pendingTasks) {
      try {
        await task.callback(task.payload);
      } catch (err) {
        queue.value.push(task);
      }
    }
  }

  function addToQueue(
    payload: TPayload,
    callback: (payload: TPayload) => Promise<void>
  ) {
    queue.value.push({ payload, callback });
  }

  watch(isOnline, (online) => {
    if (online) processQueue();
  });

  return { queue, isOnline, addToQueue };
}
