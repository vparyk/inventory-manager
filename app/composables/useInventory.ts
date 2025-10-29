export function useInventory() {
  const {
    data: items,
    pending: loading,
    error,
    refresh,
  } = useFetch<InventoryItem[]>("/api/items", {
    deep: true,
  });

  async function updateQuantity(
    newQuantity: number,
    itemIndex: number,
    itemId: string
  ) {
    if (!items.value || !items.value[itemIndex]) {
      return;
    }

    //TODO handle errors and conflicts
    await $fetch(`/api/items/${itemId}`, {
      method: "PATCH",
      body: { quantity: newQuantity },
    });

    items.value[itemIndex].quantity = newQuantity;
  }

  return {
    items,
    loading,
    error,
    updateQuantity,
  };
}
