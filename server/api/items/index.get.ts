import { getAll } from "~~/server/utils/mock-db";

export default defineEventHandler((event) => {
  const response: InventoryItem[] = getAll();
  return response;
});
