import { InventoryItemBase } from "~~/shared/types/inventory-item";
import { randomInt } from "~~/shared/utils/randomize";

const MAX_QUANTITY = 100;
const MAX_MINUTES_AGO = 90;

export function generateMockItem(index: number): InventoryItemBase {
  const quantity = randomInt(MAX_QUANTITY);

  const minutesAgo = randomInt(MAX_MINUTES_AGO);
  const lastUpdated = new Date(
    Date.now() - minutesAgo * 60 * 1000
  ).toISOString();

  const color = randomInt(0xffffff).toString(16).padStart(6, "0");

  return {
    id: `ID-${index + 1}`,
    name: `Mock item ${index + 1}`,
    image_url: `https://dummyimage.com/120x120/${color}/ffffff&text=Item+${
      index + 1
    }`,
    quantity,
    lastUpdated,
  };
}

export function mockServerChange(
  itemsLength: number,
  updateItem: (index: number, newItem: InventoryItemBase) => void
) {
  setInterval(() => {
    const randomIndex = randomInt(itemsLength + 1);
    const now = new Date().toISOString();
    const newItem: InventoryItemBase = generateMockItem(randomIndex);

    updateItem(randomIndex, { ...newItem, lastUpdated: now });
  }, 5000);
}
