import CategoryService from "../services/category.service.js";
import { NotFoundError } from "../utils/CustomErrors.js";

const CategoryController = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (e) {
      console.error("Get all categories error:", e);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },
  getCategoryById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id);
      if (!category) {
        throw new NotFoundError("Bunday ID li kategoriya mavjud emas.");
      }
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  },
  createCategory: async (req, res) => {
    try {
      const categoryData = req.body;
      const category = await CategoryService.getCategoryByName(
        categoryData.name,
      );

      if (category) {
        return res
          .status(409)
          .json({ message: "Kategoriya nomi allaqachon mavjud." });
      }
      const newCategory = await CategoryService.createCategory(categoryData);

      res.status(201).json(newCategory);
    } catch (e) {
      console.error("Kategoriya yaratishda xatolik yuz berdi:", e);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedCategory = await CategoryService.updateCategory(
        id,
        updateData,
      );
      if (!updatedCategory) {
        return res.status(404).json({ message: "Kategoriya topilmadi." });
      }
      res.status(200).json(updatedCategory);
    } catch (e) {
      console.error("Kategoriya yangilashda xatolik yuz berdi:", e);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const categoryDeleted = await CategoryService.deleteCategory(id);
      if (categoryDeleted) {
        return res.status(404).json({ message: "Kategoriya topilmadi" });
      }

      res.status(200).json(`Category mufaqiyatli o'chirildi.`);
    } catch (e) {
      console.error("Kategoriya o'chirishda xatolik yuz berdi:", e);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },
};

export default CategoryController;
