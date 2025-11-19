import db from "../config/db.js";

const OrderService = {
  async createOrder(userId, orderData) {
    return await db.transaction(async (trx) => {
      let totalAmount = 0;

      const { items, shippingAddress } = orderData;

      for (const item of items) {
        const product = await trx("products")
          .where({ id: item.product_id })
          .forUpdate()
          .first();
        if (!product) {
          throw new Error(
            `Bunday ID ${item.product_id} bo'lgan mahsulot topilmadi`,
          );
        }
        if (product.stock_quantity < item.quantity) {
          throw new Error(
            `Mahsulot ID ${item.product_id} uchun yetarli zaxira yo'q`,
          );
        }

        totalAmount += product.price * item.quantity;
      }

      const [newOrder] = await trx("orders")
        .insert({
          user_id: userId,
          total_amount: totalAmount,
          shipping_address: JSON.stringify(shippingAddress),
          status: "pending",
        })
        .returning("*");
      for (const item of items) {
        const product = await trx("products")
          .where({ id: item.product_id })
          .first();

        await trx("order_details").insert({
          order_id: newOrder.id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: product.price,
          total_price: product.price * item.quantity,
        });

        await trx("products")
          .where({ id: item.product_id })
          .update({
            stock_quantity: product.stock_quantity - item.quantity,
          });
      }
      return newOrder;
    });
  },
  getAllByUserId(userId) {
    return db("orders")
      .where({ user_id: userId })
      .orderBy("order_date", "desc");
  },

  async getOrderById(orderId) {
    const order = await db("orders").where({ id: orderId }).first();
    if (!order) {
      throw new Error(`Bunday ID ${orderId} bo'lgan buyurtma topilmadi`);
    }

    const orderItems = await db("order_items")
      .join("products", "order_items.product_id", "products.id")
      .where("order_items.order_id", orderId)
      .select("order_details.*", "products.name as product_name");

    return { ...order, items: orderItems };
  },
  async updateStatus(orderId, newStatus) {
    const [updatedOrder] = await db("orders")
      .where({ id: orderId })
      .update({ status: newStatus })
      .returning("*");

    return updatedOrder;
  },
};
export default OrderService;
