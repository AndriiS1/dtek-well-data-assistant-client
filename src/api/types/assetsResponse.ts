export interface AssetsResponse {
  assets: AssetResponse[];
}

export interface AssetResponse {
  id: string;
  name: string;
  parentId: string | null;
  wells: WellResponse[];
}

export interface WellResponse {
  id: string;
  name: string;
  externalId: string;
}
