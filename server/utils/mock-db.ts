import { InventoryItem } from "~~/shared/types/inventory-item";
import {
  generateMockItem,
  mockServerChange,
} from "~~/server/utils/mock-helper";

const itemsMock: InventoryItem[] = Array.from({ length: 12 }, (_, index) => {
  return generateMockItem(index);
});

mockServerChange(itemsMock.length, (index, newItem) => {
  itemsMock[index] = newItem;
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
