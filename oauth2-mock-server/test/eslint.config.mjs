import { defineConfig } from "@eslint/config-helpers";

export default defineConfig([
  {
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-var-requires": "off",
      "jsdoc/require-jsdoc": "off"
    },
  }
]);
