import { defineConfig } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin'
import globals from "globals";
import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';


export default defineConfig([
  // JavaScript files
  { 
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { 
      globals: {...globals.browser, ...globals.node, ...jest.environments.globals.globals} 
    },
    plugins: { 
      js, 
      '@stylistic': stylistic, 
      "jest": jest 
    }, 
    extends: ["js/recommended"], 
    rules: { 
      "@stylistic/semi": "error" 
    }
  },
  // TypeScript files
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
      },
      globals: {...globals.browser, ...globals.node, ...jest.environments.globals.globals}
    },
    plugins: {
      '@typescript-eslint': tseslint,
      '@stylistic': stylistic,
      "jest": jest
    },
    rules: {
      "@stylistic/semi": "error",
      "@typescript-eslint/no-unused-vars": "error"
    }
  }
]);