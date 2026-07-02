import { defineConfig } from "orval"

export default defineConfig({
  apiHooks: {
    output: {
      mode: "tags-split",
      target: "./src/endpoints",
      schemas: "./src/models",
      client: "react-query",
      httpClient: "axios",
      override: {
        mutator: {
          path: "./src/mutators/custom-instance.ts",
          name: "customInstance"
        }
      }
    },
    input: {
      target: "../../apps/api/openapi.json"
    }
  },

  apiFetch: {
    output: {
      mode: "tags-split",
      target: "./src/endpoints",
      client: "fetch",
      fileExtension: ".fetch.ts",
      override: {
        mutator: {
          path: "./src/mutators/custom-fetch.ts",
          name: "customFetch"
        }
      }
    },
    input: {
      target: "../../apps/api/openapi.json"
    }
  },
  apiZod: {
    output: {
      mode: "tags-split",
      target: "./src/endpoints",
      client: "zod",
      fileExtension: ".zod.ts"
    },
    input: {
      target: "../../apps/api/openapi.json"
    }
  }
})
