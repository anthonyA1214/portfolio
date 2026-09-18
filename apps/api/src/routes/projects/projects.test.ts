import { env } from "cloudflare:workers"
import { testClient } from "hono/testing"
import { describe, it, expect } from "vitest"
import { createTestApp } from "../../lib/create-app"
import router from "./project.index"

const client = testClient(createTestApp(router), env)

describe("projects routes", () => {
  it("GET /api/v1/projects should return an array", async () => {
    const res = await client.api.v1.projects.$get()
    expect(res.status).toBe(200)
    expect(Array.isArray(await res.json())).toBe(true)
  })

  it("POST /api/v1/projects should create a new project a slugified title", async () => {
    const res = await client.api.v1.projects.$post({
      json: {
        title: "My First Project",
        content: "Some content about the project",
      },
    })

    expect(res.status).toBe(201)

    if (res.status === 201) {
      const project = await res.json()
      expect(project.title).toBe("My First Project")
      expect(project.slug).toBe("my-first-project")
      expect(project.content).toBe("Some content about the project")
      expect(project.status).toBe("draft")
    }
  })

  it("POST /api/v1/projects should accept all optional fields", async () => {
    const res = await client.api.v1.projects.$post({
      json: {
        title: "Full Project",
        content: "Full content",
        description: "A description of the project",
        coverImage: "https://example.com/cover.jpg",
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/example/repo",
      },
    })

    expect(res.status).toBe(201)

    if (res.status === 201) {
      const project = await res.json()
      expect(project.slug).toBe("full-project")
      expect(project.title).toBe("Full Project")
      expect(project.content).toBe("Full content")
      expect(project.description).toBe("A description of the project")
      expect(project.coverImage).toBe("https://example.com/cover.jpg")
      expect(project.liveUrl).toBe("https://example.com")
      expect(project.repoUrl).toBe("https://github.com/example/repo")
    }
  })

  it("POST /api/v1/projects should appear afterwards in the GET /api/v1/projects list", async () => {
    const res = await client.api.v1.projects.$post({
      json: {
        title: "List Test Project",
        content: "Content for list test",
      },
    })

    expect(res.status).toBe(201)

    const listRes = await client.api.v1.projects.$get()
    expect(listRes.status).toBe(200)
    const projects = await listRes.json()
    expect(projects.some((p) => p.slug === "list-test-project")).toBe(true)
  })

  it("POST /api/v1/projects should reject a missing title", async () => {
    const res = await client.api.v1.projects.$post({
      // @ts-expect-error testing missing required field
      json: {
        content: "Content without a title",
      },
    })

    expect(res.status).toBe(422)

    if (res.status === 422) {
      const body = await res.json()
      expect(body.success).toBe(false)
      const issues = body.error.issues
      expect(issues.some((issue) => issue.path[0] === "title")).toBe(true)
    }
  })

  it("POST /api/v1/projects should reject a missing content", async () => {
    const res = await client.api.v1.projects.$post({
      // @ts-expect-error testing missing required field
      json: {
        title: "Title without content",
      },
    })

    expect(res.status).toBe(422)

    if (res.status === 422) {
      const body = await res.json()
      expect(body.success).toBe(false)
      const issues = body.error.issues
      expect(issues.some((issue) => issue.path[0] === "content")).toBe(true)
    }
  })

  it("POST /api/v1/projects should reject a title over 200 characters", async () => {
    const res = await client.api.v1.projects.$post({
      json: {
        title: "a".repeat(201),
        content: "Content with a long title",
      },
    })

    expect(res.status).toBe(422)

    if (res.status === 422) {
      const body = await res.json()
      expect(body.success).toBe(false)
      const issues = body.error.issues
      expect(issues.some((issue) => issue.path[0] === "title")).toBe(true)
    }
  })

  it("POST /api/v1/projects should reject an invalid coverImage URL", async () => {
    const res = await client.api.v1.projects.$post({
      json: {
        title: "Project with invalid coverImage",
        content: "Content with invalid coverImage",
        coverImage: "not-a-valid-url",
      },
    })

    expect(res.status).toBe(422)

    if (res.status === 422) {
      const body = await res.json()
      expect(body.success).toBe(false)
      const issues = body.error.issues
      expect(issues.some((issue) => issue.path[0] === "coverImage")).toBe(true)
    }
  })

  it("POST /api/v1/projects should reject an invalid status enum value", async () => {
    const res = await client.api.v1.projects.$post({
      json: {
        title: "Project with invalid status",
        content: "Content with invalid status",
        // @ts-expect-error testing invalid enum value
        status: "invalid-status", // Invalid status
      },
    })

    expect(res.status).toBe(422)

    if (res.status === 422) {
      const body = await res.json()
      expect(body.success).toBe(false)
      const issues = body.error.issues
      expect(issues.some((issue) => issue.path[0] === "status")).toBe(true)
    }
  })
})
