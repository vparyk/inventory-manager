import { InventoryItem } from "~~/shared/types/inventory-item";

const itemMock: InventoryItem = {
  id: "ID-1",
  name: "Mock item",
  image_url: "https://dummyimage.com/120x120/1a3138/fff",
  quantity: 10,
  lastUpdated: "2025-10-28T12:30:47+01:00",
};

const items: InventoryItem[] = [
  itemMock,
  itemMock,
  itemMock,
  itemMock,
  itemMock,
  itemMock,
  itemMock,
  itemMock,
];

export function getAll(): InventoryItem[] {
  return items;
}

export function getItemById(id: string): InventoryItem | undefined {
  return items.find((i) => i.id === id);
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
