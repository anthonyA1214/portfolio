import { authRelations } from "./auth.relations"
import { projectRelations } from "./projects.relations"

export const relations = {
  ...authRelations,
  ...projectRelations,
}
