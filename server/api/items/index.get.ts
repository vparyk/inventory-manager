import { getAll } from "~~/server/utils/mock-db";
import { ItemsGetApiResponse } from "~~/shared/types/inventory-item";

export default defineEventHandler<ItemsGetApiResponse>((event) => {
  const items: InventoryItem[] = getAll();
  const response: ItemsGetApiResponse = {
    items,
    serverTime: new Date().toISOString(),
  };
  return response;
});
