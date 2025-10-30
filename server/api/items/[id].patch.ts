import { updateItem } from "~~/server/utils/mock-db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing item ID in URL",
    });
  }

  const body = await readBody<{ quantity: number; lastUpdated: string }>(event);

  if (
    typeof body?.quantity !== "number" ||
    body?.quantity < 0 ||
    !body.lastUpdated
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing or invalid parameters",
    });
  }

  const serverItem = getItemById(id);
  if (!serverItem) {
    throw createError({ statusCode: 404, statusMessage: "Item not found" });
  }

  const clientTime = new Date(body.lastUpdated).getTime();
  const serverTime = new Date(serverItem.lastUpdated).getTime();

  if (isNaN(clientTime)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid timestamp format",
    });
  }

  if (serverTime > clientTime) {
    throw createError({
      statusCode: 409,
      statusMessage: "Conflict: item has been updated on the server",
      data: {
        serverItem,
      },
    });
  }

  const result = updateItem(id, body.quantity);

  return { item: result.item };
});
