import type { User } from "./user"

export interface Comment {
  id?: string
  comment?: string
  created_at?: string
  status?: string
  user?: User
  craeted_at?: string
}
