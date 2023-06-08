import express from "express";
import { config } from "dotenv";
import fetchRouter from "./routers/fetchRouter";
config();
const app = express();
app.use("/", fetchRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
