import PaymentService from "../services/payment.service.js";

const PaymentController = {
  processPayment: async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(`${userId} user Id`);

      const newPayment = await PaymentService.processPayment(userId, req.body);

      res.status(201).json({
        message: "To'lov muvaffaqiyatli qabul qilindi. Buyurtma tasdiqlandi.",
        payment: newPayment,
      });
    } catch (error) {
      console.error("Payment processing error:", error);
      res.status(400).json({ message: error.message });
    }
  },
  getAllPayments: async (req, res) => {
    try {
      const payments = await PaymentService.getAll();
      res.json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server xatoligi." });
    }
  },
};

export default PaymentController;
