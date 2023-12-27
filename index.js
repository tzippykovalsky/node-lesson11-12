import express from "express";
import { config } from "dotenv";
import toysRoute from "./routes/toys.js";
import morgan from "morgan";
import mongoose from "mongoose";
config();

const app = express();
const mongoURI=process.env.DB_CONNECTION||
"mongodb://localhost:27017/toys"
mongoose.connect(mongoURI).then((suc) => {
    console.log("Mongo DB connected"),suc.connection.host})
.catch(err => {
    console.log("cannot connect db")
    process.exit(1);
})
//פעולות שיקרו לפני שיגש לשרת
app.use(morgan("common"))
app.use(express.json())

app.use("/toys", toysRoute)


// app.use((err, req, res, next) => {
//     let statusCode = res.statusCode || 500;
//     let message = err.message || "מצטערים התרחשה שגיאה"
//     res.status(statusCode).send(message)
// })

let port=process.env.PORT||4000;

app.listen(port, () => {
    console.log("server is litening on port 4500")
})