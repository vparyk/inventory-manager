import { getAll } from "~~/server/utils/mock-db";
import {
  InventoryItemBase,
  ItemsGetApiResponse,
} from "~~/shared/types/inventory-item";

export default defineEventHandler<ItemsGetApiResponse>((event) => {
  const items: InventoryItemBase[] = getAll();
  const response: ItemsGetApiResponse = {
    items,
    serverTime: new Date().toISOString(),
  };
  return response;
});
