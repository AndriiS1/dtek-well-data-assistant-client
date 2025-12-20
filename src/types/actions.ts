export interface Action {
  items: ActionItem[];
  total: number;
  offset: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ActionItem {
  id: string;
  wellId: string;
  timestamp: string;
  title: string;
  details: string;
  source: string;
}
