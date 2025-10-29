export interface InventoryItem {
  id: string;
  name: string;
  image_url: string;
  quantity: number;
  lastUpdated: string;
}

export interface ItemsGetApiResponse {
  items: InventoryItem[];
  serverTime: string;
}
