import { InventoryItemBase } from "~~/shared/types/inventory-item";
import {
  generateMockItem,
  mockServerChange,
} from "~~/server/utils/mock-helper";

const itemsMock: InventoryItemBase[] = Array.from(
  { length: 12 },
  (_, index) => {
    return generateMockItem(index);
  }
);

mockServerChange(itemsMock.length, (index, newItem) => {
  itemsMock[index] = newItem;
});

export function getAll(): InventoryItemBase[] {
  return itemsMock;
}

export function getItemById(id: string): InventoryItemBase | undefined {
  return itemsMock.find((i) => i.id === id);
}

export function updateItem(id: string, newQuantity: number): InventoryItemBase {
  const item = getItemById(id);
  if (!item) {
    throw createError({ statusCode: 404, statusMessage: "Item not found" });
  }

  item.quantity = newQuantity;
  item.lastUpdated = new Date().toISOString();
  return item;
}
