import express from "express";
import { config } from "dotenv";
import toysRoute from "./routes/toys.js";
import usersRoute from "./routes/users.js";
import morgan from "morgan";
import { connectToDB } from "./config.js";

config();
connectToDB();
const app = express();

app.use(morgan("common"))
app.use(express.json())
app.use("/toys", toysRoute)
app.use("/users",usersRoute);
app.use((err,req,res,next)=>{
    res.status(500);
    res.send(err.message ||" התרחשה תקלה")
})

let port=process.env.PORT||5000;
app.listen(port, () => {
    console.log("server is litening on port 5000")
})