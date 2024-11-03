import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import dbConnect from "../db/dbConnect.js";
import { router } from "./routes/routes.js";
import errorHandler from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

dbConnect();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
