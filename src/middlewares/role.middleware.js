export const roleGuard = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Sizda bu amalni bajarish uchun ruxsat yo'q." });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Sizda bu amalni bajarish uchun ruxsat yo'q." });
    }
    next();
  };
};
