import db from "../config/db.js";

const ProductService = {
  async getAllProducts() {
    return await db("products")
      .join("categories", "products.category_id", "categories.id")
      .select("categories.name as category_name", "products.*");
  },

  async getProductById(id) {
    return await db("products").where({ id }).first();
  },

  async createProduct(productData) {
    const [newProduct] = await db("products")
      .insert(productData)
      .returning("*");
    return newProduct;
  },

  async updateProduct(id, updateData) {
    const [updatedProduct] = await db("products")
      .where({ id })
      .update(updateData)
      .returning("*");
    return updatedProduct;
  },

  async deleteProduct(id) {
    await db("products").where({ id }).del();
  },
};

export default ProductService;
