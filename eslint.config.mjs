import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    ignores: ["node_modules/", "package.json", "package-lock.json"]
  },
  {
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended,
];
