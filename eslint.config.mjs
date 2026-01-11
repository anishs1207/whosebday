import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "src/generated/",
      "node_modules/",
      "dist/",
      "build/"
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Add an object for custom rules
  {
    rules: {
      // Option A: Change to a warning
      "@typescript-eslint/no-explicit-any": "warn",
      // Option B: Completely disable the rule
      // "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;