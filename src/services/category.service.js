import db from "../config/db.js";

const CategoryService = {
  async getAllCategories() {
    return db("categories").select("*");
  },

  async getCategoryById(id) {
    return db("categories").where({ id }).first();
  },
  async getCategoryByName(name) {
    return db("categories").where({ name }).first();
  },
  async createCategory(categoryData) {
    const [newCategory] = await db("categories")
      .insert(categoryData)
      .returning("*");
    return newCategory;
  },

  async updateCategory(id, updateData) {
    const [updatedCategory] = await db("categories")
      .where({ id })
      .update(updateData)
      .returning("*");
    return updatedCategory;
  },

  async deleteCategory(id) {
    await db("categories").where({ id }).del();
  },
};
export default CategoryService;
