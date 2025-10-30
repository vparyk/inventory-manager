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
      return data.items.map((item) => parseInventoryItem(item));
    },
    deep: true,
    lazy: true,
  });

  const { handleConflict } = useConflict();

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
      const { item: newItem }: { item: InventoryItemBase } = await $fetch(
        `/api/items/${itemId}`,
        {
          method: "PATCH",
          body: {
            quantity: newQuantity,
            lastUpdated: lastUpdated,
          },
        }
      );
      items.value[itemIndex] = parseInventoryItem(newItem, "saved");
    } catch (errorResponse: any) {
      if (errorResponse?.statusCode === 409) {
        const serverItem: InventoryItemBase =
          errorResponse.data?.data?.serverItem;
        items.value[itemIndex] = parseInventoryItem(
          serverItem,
          "conflicted",
          true
        );
        handleConflict(serverItem.name, (isLocked) => {
          if (!items.value || !items.value[itemIndex]) {
            return;
          }
          items.value[itemIndex].isLocked = isLocked;
        });
      } else {
        error.value = errorResponse;
      }
    }
  }

  function validateInventoryItem(item: InventoryItemBase) {
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

  function parseInventoryItem(
    item: InventoryItemBase,
    status = "idle" as ItemStatus,
    isLocked = false
  ): InventoryItem {
    validateInventoryItem(item);
    return { ...item, status, isLocked: isLocked };
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
    updateQuantity,
    keepSynced,
  };
}
