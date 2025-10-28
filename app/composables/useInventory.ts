export function useInventory() {
  //TODO replace mock with props:
  const item: Ref<InventoryItem> = ref({
    id: "ID-1",
    name: "Mock item",
    image_url: "https://dummyimage.com/120x120/1a3138/fff",
    quantity: 10,
    lastUpdated: "2025-10-28T12:30:47+01:00",
  });

  function updateQuantity(newQuantity: number) {
    item.value.quantity = newQuantity;
  }

  return {
    item,
    updateQuantity,
  };
}
