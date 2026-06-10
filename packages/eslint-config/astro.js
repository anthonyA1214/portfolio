import { config as baseConfig } from "@workspace/eslint-config/base"
import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { globalIgnores } from "eslint/config"

/**
 * A custom ESLint configuration for libraries that use Astro.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const astroConfig = [
  globalIgnores(["dist", ".astro"]),
  ...baseConfig,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
]
