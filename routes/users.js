import  express  from "express";
import * as userControler from "../controlers/users.js"

const router = express.Router();


router.get("/",userControler.getAllUsers);
router.post("/login",userControler.loginUser);
router.post("/",userControler.addUser);

export default router;