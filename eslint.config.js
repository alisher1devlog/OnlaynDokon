// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";

export default [
  // ESLint'ning tavsiya etilgan qoidalari
  js.configs.recommended,

  // Prettier bilan ziddiyatli bo'lgan ESLint qoidalarini o'chiradi
  prettierConfig,

  // Loyihaning o'ziga xos sozlamalari
  {
    languageOptions: {
      ecmaVersion: "latest", // Zamonaviy JavaScript
      sourceType: "module", // ES Module (`import/export`)
      globals: {
        ...globals.node, // Node.js global o'zgaruvchilari (process, console)
      },
    },
    rules: {
      "no-unused-vars": "warn", // Ishlatilmagan o'zgaruvchilarni ogohlantirish
      "no-console": "off", // `console.log` ga ruxsat berish
    },
  },
];
