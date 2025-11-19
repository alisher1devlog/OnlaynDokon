import db from "../config/db.js";

const PaymentService = {
  async processPayment(userId, paymentDetails) {
    try {
      return await db.transaction(async (trx) => {
        const { order_id, amount, method, transaction_id } = paymentDetails;

        const order = await trx("orders").where({ id: order_id }).first();

        if (!order) {
          throw new Error(`Bunday ID (${order_id}) bo'lgan buyurtma topilmadi`);
        }

        if (order.user_id !== userId) {
          throw new Error(
            "Siz faqat o'zingizning buyurtmalaringiz uchun to'lovni amalga oshirishingiz mumkin",
          );
        }

        if (
          Number(order.total_amount).toFixed(2) !== Number(amount).toFixed(2)
        ) {
          throw new Error(
            `To'lov summasi (${amount.toFixed(2)}) buyurtma summasiga (${order.total_amount.toFixed(2)}) teng emas`,
          );
        }

        const existingPayment = await trx("payments")
          .where({ order_id })
          .first();
        if (existingPayment) {
          throw new Error(
            "Ushbu buyurtma uchun to'lov allaqachon amalga oshirilgan",
          );
        }

        const [newPayment] = await trx("payments")
          .insert({
            order_id,
            amount,
            method,
            transaction_id,
            status: "completed",
          })
          .returning("*");

        await trx("orders")
          .where({ id: order_id })
          .update({ status: "processing" });

        return newPayment;
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getAll() {
    return await db("payments").select("*");
  },
};

export default PaymentService;
