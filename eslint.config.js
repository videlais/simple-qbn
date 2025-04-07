import { defineConfig } from "eslint/config";
import stylisticJs from '@stylistic/eslint-plugin-js'
import globals from "globals";
import js from "@eslint/js";
import jest from "eslint-plugin-jest";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: {...globals.browser, ...globals.node, ...jest.environments.globals.globals} } },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js, '@stylistic/js': stylisticJs, "jest": jest }, extends: ["js/recommended"] },
  { rules: { "@stylistic/js/semi": "error" } },
]);