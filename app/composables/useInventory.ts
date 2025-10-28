export function useInventory() {
  const {
    data: items,
    pending: loading,
    error,
    refresh,
  } = useFetch<InventoryItem[]>("/api/items", {
    lazy: false,
  });

  function updateQuantity(newQuantity: number, itemIndex: number) {
    if (!items.value || !items.value[itemIndex]) {
      return;
    }

    items.value[itemIndex].quantity = newQuantity;
  }

  return {
    items,
    loading,
    error,
    updateQuantity,
  };
}
