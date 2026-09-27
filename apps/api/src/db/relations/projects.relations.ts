import { defineRelationsPart } from "drizzle-orm"
import * as schema from "../schemas"

export const projectRelations = defineRelationsPart(schema, (r) => ({
  project: {
    tags: r.many.tag({
      from: r.project.id.through(r.projectTag.projectId),
      to: r.tag.id.through(r.projectTag.tagId),
    }),
    projectImages: r.many.projectImage(),
  },
  tag: {
    projects: r.many.project({
      from: r.tag.id.through(r.projectTag.tagId),
      to: r.project.id.through(r.projectTag.projectId),
    }),
  },
  projectImage: {
    project: r.one.project({
      from: r.projectImage.projectId,
      to: r.project.id,
    }),
  },
}))
