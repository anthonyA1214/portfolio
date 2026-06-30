import { authRelations } from "./auth.relations"
import { projectRelations } from "./project.relations"

export const relations = {
  ...authRelations,
  ...projectRelations
}
