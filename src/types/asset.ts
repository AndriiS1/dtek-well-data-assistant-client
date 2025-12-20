import type { Well } from "./well";

export interface Asset {
  id: string;
  name: string;
  parentId: string | null;
  wells: Well[];
}
