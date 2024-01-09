import  express  from "express";
import * as userControler from "../controlers/users.js"
import { authAdmin } from "../middlewares/auth.js";

const router = express.Router();


router.get("/",authAdmin,userControler.getAllUsers);
router.post("/login",userControler.loginUser);
router.post("/",userControler.addUser);

export default router;