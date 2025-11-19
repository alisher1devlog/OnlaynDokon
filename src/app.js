import express from "express";
import cookieParser from "cookie-parser";
import expressWinston from "express-winston";
import logger from "./config/logger.js";

import AuthRouter from "./routes/auth.routes.js";
import CategoryRouter from "./routes/category.routes.js";
import ProductRouter from "./routes/product.routes.js";
import OrderRouter from "./routes/order.routes.js";
import PaymentRouter from "./routes/payment.routes.js";

const app = express();
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: true,
    requestWhitelist: ["url", "method", "httpVersion", "originalUrl", "query"],
    responseWhitelist: ["statusCode"],
    ignoreRoute: () => {
      return false;
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/categories", CategoryRouter);
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/orders", OrderRouter);
app.use("/api/v1/payments", PaymentRouter);

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  }),
);

app.use((err, req, res) => {
  logger.error(err.message, { stack: err.stack, path: req.originalUrl });
  res.status(err.status || 500).json({
    message: err.message || "Kutilmagan server xatoligi.",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to OnlaynDokon API");
});

export default app;
