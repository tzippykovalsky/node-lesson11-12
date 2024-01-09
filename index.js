import express from "express";
import { config } from "dotenv";
import toysRoute from "./routes/toys.js";
import usersRoute from "./routes/users.js";
import morgan from "morgan";
import { connectToDB } from "./config/DBconfig.js";                                            
import cors from "cors";
import { erroHandling } from "./middlewares/errorsHndling.js";

config();
connectToDB();
const app = express();

app.use(morgan("common"))
app.use(express.json())
app.use(cors());
app.use(express.static('images'))
app.use("/toys", toysRoute)
app.use("/users",usersRoute);
app.use(erroHandling)




let port=process.env.PORT||5000;
app.listen(port, () => {
    console.log(`server is litening on port ${port}`)
})