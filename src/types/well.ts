export interface Well {
  id: string;
  name: string;
  externalId: string;
  assetId: string;
  assetName: string;
  parameters: Parameter[];
}

export interface Parameter {
  id: string;
  name: string;
  dataType: string;
}
