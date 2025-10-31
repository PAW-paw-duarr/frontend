import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
// @ts-expect-error - JSX a11y plugin doesn't export types properly, see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/1010
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import pluginQuery from '@tanstack/eslint-plugin-query'

const ignoredFiles = ["**/node_modules/**", "**/dist/**", "**/api-schema.d.ts"];

// @see https://typescript-eslint.io/rules/no-unused-vars/#what-benefits-does-this-rule-have-over-typescript
const unusedVarsExceptUnderscored = {
  args: "all",
  argsIgnorePattern: "^_",
  caughtErrors: "all",
  caughtErrorsIgnorePattern: "^_",
  destructuredArrayIgnorePattern: "^_",
  varsIgnorePattern: "^_",
  ignoreRestSiblings: true,
};

export default defineConfig(
  globalIgnores(ignoredFiles),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  // @ts-expect-error - React plugin flat configs have type issues, see https://github.com/jsx-eslint/eslint-plugin-react/issues/3956
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  reactHooksPlugin.configs.flat.recommended,
  jsxA11yPlugin.flatConfigs.recommended,
  eslintConfigPrettier,
  {
    settings: { react: { version: "detect" } },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        unusedVarsExceptUnderscored,
      ],
    },
  },
  ...pluginQuery.configs['flat/recommended'],
);