export interface Asset {
  id: string;
  name: string;
  parentId: string | null;
  wells: AssetWell[];
}

export interface AssetWell {
  id: string;
  name: string;
  externalId: string;
}
