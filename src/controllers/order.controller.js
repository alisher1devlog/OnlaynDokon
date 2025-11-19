import OrderService from "../services/order.service.js";
import UserService from "../services/user.service.js";

const OrderController = {
  async createOrder(req, res) {
    try {
      const userId = req.user.id;
      const { items, shippingAddress } = req.body;

      const user = await UserService.getUserById(userId);

      const finalShippingAddress = shippingAddress || user.address;
      console.log(finalShippingAddress);

      if (!finalShippingAddress) {
        return res.status(400).json({
          message:
            "Yetkaziberish manzili ko'rsatilmagan va profilingizda asosiy manzil mavjud emas.",
        });
      }

      const orderCreationData = {
        items: items,
        shippingAddress: finalShippingAddress,
      };

      const newOrder = await OrderService.createOrder(
        userId,
        orderCreationData,
      );

      res.status(201).json({
        message: "Buyurtma muvaffaqiyatli yaratildi",
        order: newOrder,
      });
    } catch (error) {
      console.error("Order create error:", error);
      console.log("xatolik shu yerdami");

      res.status(400).json({ message: error.message });
    }
  },

  async getMyOrders(req, res) {
    try {
      const userId = req.user.id;
      const orders = await OrderService.getAllByUserId(userId);
      res.status(200).json(orders);
    } catch (e) {
      res.status(400).json({ e: e.message });
    }
  },

  async getById(req, res) {
    try {
      const orderId = req.params.id;
      const order = await OrderService.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Buyurtma topilmadi" });
      }

      if (order.user_id !== req.user.id || req.user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Sizda bu buyurtmani ko'rish uchun ruxsat yo'q" });
      }

      res.status(200).json(order);
    } catch (e) {
      res.status(400).json({ e: e.message });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedOrder = await OrderService.updateStatus(id, status);

      if (!updatedOrder) {
        return res.status(404).json({ message: "Buyurtma topilmadi." });
      }

      res.status(200).json({
        message: "Buyurtma holati muvaffaqiyatli yangilandi.",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Update Status error:", error);
      res.status(400).json({ message: "Noto'g'ri status qiymati yuborildi." });
    }
  },
};

export default OrderController;
