import bcryptjs from "bcryptjs";
import UserService from "../services/user.service.js";
import OtpService from "../services/otp.service.js";
import { generateOtp } from "../utils/generators.js";
import EmailService from "../services/email.service.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const AuthController = {
  signup: async (req, res) => {
    try {
      const { username, email, password, role } = req.body;

      const existingUser = await UserService.getUserByEmail(email);

      if (existingUser) {
        return res.status(409).json({ message: "Bu email allaqachon mavjud." });
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const newUser = await UserService.createUser({
        email,
        username,
        password: hashedPassword,
        role: role || "customer",
      });

      const otpCode = generateOtp();
      const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

      await OtpService.createOtp({
        user_id: newUser.id,
        otp_code: otpCode,
        expires_at: otpExpiresAt,
      });

      console.log(`Emailga code yuborilishni boshladi!`);

      const emailSent = await EmailService.sendOtpEmail(email, otpCode);

      console.log("Email xizmati javobi:", emailSent);

      if (!emailSent) {
        return res
          .status(500)
          .json({ message: "OTP kodini yuborishda xatolik yuz berdi." });
      }
      console.log("Muvaffaqiyatli javob qaytarilmoqda...");

      res.status(201).json({
        message:
          "Foydalanuvchi muvaffaqiyatli yaratildi. Iltimos, OTP orqali tasdiqlang.",
        user_id: newUser.id,
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const { email, otp_code } = req.body;

      const user = await UserService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Foydalanuvchi topilmadi." });
      }

      if (user.status === "active") {
        return res
          .status(400)
          .json({ message: "Foydalanuvchi allaqachon faollashtirilgan." });
      }

      const otpRecord = await OtpService.findOtpByUserId(user.id);

      if (!otpRecord || otpRecord.otp_code !== otp_code) {
        return res.status(400).json({ message: "Noto'g'ri OTP kodi." });
      }
      const now = new Date();
      if (now > otpRecord.expires_at) {
        await OtpService.deleteOtpByUserId(user.id);
        return res.status(400).json({ message: "OTP kodi muddati o'tgan." });
      }
      await UserService.updateUser(user.id, { status: "active" });

      await OtpService.deleteOtpById(otpRecord.id);

      res
        .status(200)
        .json({ message: "Foydalanuvchi muvaffaqiyatli faollashtirildi." });
    } catch (e) {
      console.error("OTP tasdiqlash xatosi:", e);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },
  signin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await UserService.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({
          message: "Foydalanuvchi topilmadi. Siz signup qilishingiz mumkin.",
        });
      }
      if (user.status !== "active") {
        return res.status(403).json({
          message:
            "Hisobingiz faollashtirilmagan. Iltimos, avval OTP orqali tasdiqlang.",
        });
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Email yoki parol noto'g'ri." });
      }
      const payload = {
        id: user.id,
        role: user.role,
      };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Tizimga muvaffaqiyatli kirdingiz.",
        accessToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (e) {
      console.error("Signin error:", e);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },
  getProfiles: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await UserService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "Foydalanuvchi topilmadi." });
      }
      res.status(200).json({ user });
    } catch (e) {
      console.error("Foydalanuvchi profilini olishda xatolik yuz berdi:", e);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },
  logOut: async (req, res) => {
    try {
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Tizimdan muvaffaqiyatli chiqdingiz." });
    } catch (e) {
      console.error("Chiqishda xatolik yuz berdi:", e);
      res.status(500).json({ message: "Serverda kutilmagan xatolik." });
    }
  },
};

export default AuthController;
