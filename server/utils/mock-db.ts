import { InventoryItem } from "~~/shared/types/inventory-item";

const itemsMock: InventoryItem[] = Array.from({ length: 12 }, (_, i) => {
  const quantity = Math.floor(Math.random() * 101);

  const minutesAgo = Math.floor(Math.random() * 91);
  const lastUpdated = new Date(
    Date.now() - minutesAgo * 60 * 1000
  ).toISOString();

  const color = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");

  return {
    id: `ID-${i + 1}`,
    name: `Mock item ${i + 1}`,
    image_url: `https://dummyimage.com/120x120/${color}/ffffff&text=Item+${
      i + 1
    }`,
    quantity,
    lastUpdated,
  };
});

export function getAll(): InventoryItem[] {
  return itemsMock;
}

export function getItemById(id: string): InventoryItem | undefined {
  return itemsMock.find((i) => i.id === id);
}

export function updateItem(
  id: string,
  newQuantity: number
): { item: InventoryItem } {
  const item = getItemById(id);
  if (!item) throw createError({ statusCode: 404, statusMessage: "Not Found" });

  item.quantity = Math.max(0, newQuantity);
  item.lastUpdated = new Date().toISOString();
  return { item };
}
