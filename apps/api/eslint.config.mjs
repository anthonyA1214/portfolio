import { honoConfig } from "@workspace/eslint-config/hono"

/** @type {import("eslint").Linter.Config} */
export default [
  ...honoConfig,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]
