export interface AssetsResponse {
  assets: AssetResponse[];
}

export interface AssetResponse {
  id: string;
  name: string;
  parentId: string | null;
  wells: AssetWellResponse[];
}

export interface AssetWellResponse {
  id: string;
  name: string;
  externalId: string;
}
