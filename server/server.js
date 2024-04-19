import mongoose from "mongoose";
import dotenv  from "dotenv";

import {app} from "./app.js"

dotenv.config({ path: "../config.env" });

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception ...");
  console.log(err.name, err.message);
  process.exit(1);
});
// const URI= process.env.MONGODB_URL;
mongoose.connect("mongodb://127.0.0.1/HackUp", { useNewUrlParser: true })
  .then(() => console.log("DB connected Successfull...."));

const port = process.env.PORT;

const server = app.listen(port, () => {
  const date = new Date(); // Get the current date and time
  const jsonString = JSON.stringify(date);
  console.log(jsonString);

  console.log(`App running at port: ${port}....`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection...");
  console.log(err.name, err.message);
  //close the server
  server.close(() => {
    process.exit(1);
  });
});
