export interface ActionsResponse {
  actions: ActionResponse;
}

export interface ActionResponse {
  items: ActionItemResponse[];
  total: number;
  offset: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ActionItemResponse {
  id: string;
  wellId: string;
  timestamp: string;
  title: string;
  details: string;
  source: string;
}
