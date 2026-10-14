
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],

    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      import: importPlugin,
    },

    rules: {
      // Check for missing or unresolved imports
      "import/no-unresolved": "error",

      // Check for duplicate imports
      "import/no-duplicates": "error",

      // Check for unused imports
      "no-unused-vars": "warn",
    },
  },

  pluginReact.configs.flat.recommended,
]);