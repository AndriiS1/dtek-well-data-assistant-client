export interface WellResponse {
  id: string;
  name: string;
  externalId: string;
  assetId: string;
  assetName: string;
  parameters: ParameterResponse[];
}

export interface ParameterResponse {
  id: string;
  name: string;
  dataType: string;
}
