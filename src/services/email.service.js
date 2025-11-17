import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const EmailService = {
  sendOtpEmail: async (to, otpCode) => {
    try {
      const mailOptions = {
        from: `"OnlaynDokon" <${process.env.SMTP_USER}>`,
        to,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otpCode}. It will expire in 5 minutes.`,
      };
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: %s", info.messageId);
      return true;
    } catch (e) {
      console.error("Email yuborishda xatolik:", e);
      return false;
    }
  },
};

export default EmailService;
