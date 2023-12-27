import express from "express";
import { config } from "dotenv";
import toysRoute from "./routes/toys.js";
import morgan from "morgan";
import mongoose from "mongoose";

config();
const app = express();
const mongoURI=process.env.DB_CONNECTION||"mongodb://localhost:27017/toys"
let port=process.env.PORT||4000;

mongoose.connect(mongoURI)
.then((suc) => {
    console.log("Mongo DB connected"),suc.connection.host})
.catch(err => {
    console.log("cannot connect db")
    process.exit(1);
})

app.use(morgan("common"))
app.use(express.json())
app.use("/toys", toysRoute)

app.listen(port, () => {
    console.log("server is litening on port 4500")
})
