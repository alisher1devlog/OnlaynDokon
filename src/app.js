import express from "express";
import AuthRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import CategoryRouter from "./routes/category.routes.js";
import ProductRouter from "./routes/product.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/categories", CategoryRouter);
app.use("/api/v1/products", ProductRouter);

app.get("/", (req, res) => {
  res.send("Welcome to OnlaynDokon API");
});

export default app;
