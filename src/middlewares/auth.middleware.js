import jwt from "jsonwebtoken";

export const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token topilmadi. Iltimos, tizimga kiring." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Noto'g'ri token formati." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res
      .status(401)
      .json({ message: "Noto'g'ri yoki muddati o'tgan token." });
  }
};
