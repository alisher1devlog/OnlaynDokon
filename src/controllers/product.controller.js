import ProductService from "../services/product.service.js";

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (e) {
      console.error("Mahsulotlarni olish xatosi:", e);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Mahsulot topilmadi." });
      }

      res.status(200).json(product);
    } catch (e) {
      console.error("Mahsulotni olish xatosi:", e);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },

  createProduct: async (req, res) => {
    try {
      const productData = req.body;
      const newProduct = await ProductService.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (e) {
      console.error("Mahsulot yaratish xatosi:", e);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const updateData = req.body;
      const updatedProduct = await ProductService.updateProduct(id, updateData);
      if (!updatedProduct) {
        return res.status(404).json({ message: "Mahsulot topilmadi." });
      }

      res.status(200).json(updatedProduct);
    } catch (e) {
      console.error("Mahsulotni yangilash xatosi:", e);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      await ProductService.deleteProduct(id);
      res.status(200).send(`Product o'chirildi`);
    } catch (e) {
      console.error("Mahsulotni o'chirish xatosi:", e);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },
};
export default ProductController;
