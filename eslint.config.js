import { defineConfig } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin'
import globals from "globals";
import js from "@eslint/js";
import jest from "eslint-plugin-jest";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: {...globals.browser, ...globals.node, ...jest.environments.globals.globals} } },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js, '@stylistic': stylistic, "jest": jest }, extends: ["js/recommended"] },
  { rules: { "@stylistic/semi": "error" } },
]);