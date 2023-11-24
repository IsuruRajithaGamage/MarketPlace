import expres from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = expres();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});