export interface InventoryItemBase {
  id: string;
  name: string;
  image_url: string;
  quantity: number;
  lastUpdated: string;
}

export interface InventoryItem extends InventoryItemBase {
  status: ItemStatus;
  isLocked: boolean;
}

export type ItemStatus = "idle" | "saving" | "saved" | "conflicted" | "queued";

export interface ItemsGetApiResponse {
  items: InventoryItemBase[];
  serverTime: string;
}

export interface ItemsPatchApiResponse {
  item: InventoryItemBase;
}

export interface UpdateQuantityParams {
  itemId: string;
  itemIndex: number;
  newQuantity: number;
  lastUpdated: string;
}
