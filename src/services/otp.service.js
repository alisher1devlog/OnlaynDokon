import db from "../config/db.js";

const OtpService = {
  async createOtp(otpData) {
    try {
      const [newOtp] = await db("otps").insert(otpData).returning("*");
      return newOtp;
    } catch (e) {
      console.error("OTP yaratishda xatolik yuz berdi:", e);
      throw new Error("OTP yaratishda xatolik yuz berdi");
    }
  },
  async findOtpByUserId(userId) {
    try {
      const otpRecord = await db("otps").where({ user_id: userId }).first();
      return otpRecord;
    } catch (e) {
      console.error("OTP olishda xatolik yuz berdi:", e);
      throw new Error("OTP olishda xatolik yuz berdi");
    }
  },
  async deleteOtpById(otpId) {
    try {
      await db("otps").where({ id: otpId }).del();
    } catch (e) {
      console.error("OTP o'chirishda xatolik yuz berdi:", e);
      throw new Error("OTP o'chirishda xatolik yuz berdi");
    }
  },
};

export default OtpService;
