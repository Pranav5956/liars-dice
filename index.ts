import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

const port = process.env.PORT || 5000;
const app = express();

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.listen(port, () => console.log(`Server listening at port ${port}...`));

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING!)
  .then(() => console.log("Connected to MongoDB Atlas..."))
  .catch(console.error);
