import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import parserTs from "@typescript-eslint/parser";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
const { configs: tsConfigs } = tseslintPlugin;

const cleanGlobals = Object.fromEntries(
  Object.entries(globals.browser).map(([key, value]) => [key.trim(), value])
);

export default [
  {
    ignores: [
      "dist",
      "**/dist",
      "node_modules",
      "**/node_modules",
      "coverage",
      ".nx/cache",
      ".nx/workspace-data"
    ]
  },
  prettierConfig,
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: parserTs,
      ecmaVersion: 2023,
      globals: cleanGlobals,
      sourceType: "module"
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslintPlugin,
      "prettier": prettier
    },
    rules: {
      ...tsConfigs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": "off",
      "react-refresh/only-export-components": "off",
      "prettier/prettier": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow"
        },
        {
          selector: "variable",
          modifiers: ["const", "global"],
          format: ["UPPER_CASE"],
          filter: {
            regex: "^[a-z][a-zA-Z0-9]*$|^[A-Z][a-zA-Z0-9]*$",
            match: false
          }
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"]
        },
        {
          selector: "parameter",
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow"
        },
        {
          selector: ["typeLike", "enumMember"],
          format: ["PascalCase"]
        },
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: {
            regex: "^I[A-Z]",
            match: false,
          }
        },
        {
          selector: ["function", "class"],
          format: ["PascalCase"],
          filter: {
            regex: "JSXElement|JSXFragment",
            match: true
          }
        }
      ]
    }
  }
];
