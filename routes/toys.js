import  express  from "express";
import * as toyControler from "../controlers/toys.js"

const router = express.Router();


router.get("/",toyControler.getAllToys);
router.get("/:id",toyControler.getToyId);
router.get("/:id",toyControler.deleteToy);
router.post("/",toyControler.addToy);

export default router;