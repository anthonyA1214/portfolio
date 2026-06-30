import { defineRelationsPart } from "drizzle-orm";
import * as schema from "../schemas";

export const projectRelations = defineRelationsPart(schema, (r) => ({
  project: {
    projectTag: r.many.projectTag(),
    projectImages: r.many.projectImage()
  },
  tag: {
    projectTags: r.many.projectTag()
  },
  projectTag: {
    project: r.one.project({
      from: r.projectTag.projectId,
      to: r.project.id
    }),
    tag: r.one.tag({
      from: r.projectTag.tagId,
      to: r.tag.id
    })
  },
  projectImage: {
    project: r.one.project({
      from: r.projectImage.projectId,
      to: r.project.id
    })
  }
}))
