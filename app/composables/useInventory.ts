export function useInventory() {
  const lastTimeSynced = useState<string>(() => "");
  const {
    data: items,
    pending: loading,
    error,
    refresh,
  } = useFetch("/api/items", {
    transform: (data: ItemsGetApiResponse): InventoryItem[] => {
      lastTimeSynced.value = data.serverTime;
      return data.items;
    },
    deep: true,
    lazy: true,
  });

  const conflictId = ref<string>("");
  async function updateQuantity({
    newQuantity,
    itemIndex,
    itemId,
    lastUpdated,
  }: UpdateQuantityParams) {
    if (!items.value || !items.value[itemIndex]) {
      return;
    }
    try {
      const { item: newItem }: { item: InventoryItem } = await $fetch(
        `/api/items/${itemId}`,
        {
          method: "PATCH",
          body: {
            quantity: newQuantity,
            lastUpdated: lastUpdated,
          },
        }
      );
      validateInventoryItem(newItem);
      items.value[itemIndex] = newItem;
    } catch (errorResponse: any) {
      if (errorResponse?.statusCode === 409) {
        const serverItem: InventoryItem = errorResponse.data?.data?.serverItem;
        conflictId.value = serverItem.id;
        items.value[itemIndex] = serverItem;
      } else {
        error.value = errorResponse;
      }
    }
  }

  function validateInventoryItem(item: InventoryItem) {
    if (
      !item ||
      typeof item.id !== "string" ||
      typeof item.name !== "string" ||
      typeof item.image_url !== "string" ||
      typeof item.quantity !== "number" ||
      typeof item.lastUpdated !== "string"
    ) {
      throw new Error("Invalid item returned from server");
    }
  }

  // TODO: change polling to websocket
  const { startPolling } = usePolling();
  function keepSynced() {
    startPolling(() => refresh());
  }

  return {
    items,
    loading,
    error,
    lastTimeSynced,
    conflictId,
    updateQuantity,
    keepSynced,
  };
}
