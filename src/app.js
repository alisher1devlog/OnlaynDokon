import express from "express";
import AuthRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", AuthRouter);

app.get("/", (req, res) => {
  res.send("Welcome to OnlaynDokon API");
});

export default app;
