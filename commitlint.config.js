export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Yangi funksiya
        "fix", // Xatolikni tuzatish
        "docs", // Faqat dokumentatsiyaga o'zgartirish
        "style", // Kod ma'nosini o'zgartirmaydigan o'zgarishlar (formatlash)
        "refactor", // Funksional bo'lmagan o'zgarishlar
        "perf", // Ishlash samaradorligini oshirish
        "test", // Testlar qo'shish yoki tuzatish
        "build", // Tizim qurish yoki tashqi bog'liqliklar
        "ci", // CI/CD sozlamalari
        "chore", // Boshqa kichik o'zgarishlar
        "revert", // O'zgarishlarni bekor qilish
      ],
    ],
  },
};
