import { updateItem } from "~~/server/utils/mock-db";

export default defineEventHandler(async (event) => {
  //TODO handle validation, errors and conflict
  const id = getRouterParam(event, "id")!;
  const body = await readBody<{ quantity: number }>(event);
  const result = updateItem(id, body.quantity);

  return { item: result.item };
});
