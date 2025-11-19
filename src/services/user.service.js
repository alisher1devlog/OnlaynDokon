import db from "../config/db.js";

const UserService = {
  async getUserByEmail(email) {
    try {
      const user = await db("users").where({ email }).first();
      return user;
    } catch (e) {
      console.error("Email tomonidan xatolik yuz berdi:", e);
      throw new Error("Foydalanuvchini olishda xatolik yuz berdi");
    }
  },
  async createUser(userData) {
    try {
      const [newUser] = await db("users").insert(userData).returning("*");
      return newUser;
    } catch (e) {
      console.error("Foydalanuvchi yaratishda xatolik yuz berdi:", e);
      throw new Error("Foydalanuvchini yaratishda xatolik yuz berdi");
    }
  },
  async updateUser(id, updateData) {
    try {
      const [updatedUser] = await db("users")
        .where({ id })
        .update(updateData)
        .returning("*");
      return updatedUser;
    } catch (e) {
      console.error("Foydalanuvchini yangilashda xatolik yuz berdi:", e);
      throw new Error("Foydalanuvchini yangilashda xatolik yuz berdi");
    }
  },
  async getUserById(id) {
    try {
      const user = await db("users")
        .where({ id })
        .select(
          "id",
          "username",
          "email",
          "role",
          "status",
          "address",
          "phone_number",
          "created_at",
        )
        .first();

      return user;
    } catch (e) {
      console.error(
        "ID bo'yicha foydalanuvchini olishda xatolik yuz berdi:",
        e,
      );
      throw new Error("ID bo'yicha foydalanuvchini olishda xatolik yuz berdi");
    }
  },
};

export default UserService;
