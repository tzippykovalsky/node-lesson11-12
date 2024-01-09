import  express  from "express";
import * as toyControler from "../controlers/toys.js"
 import { auth } from "../middlewares/auth.js";


const router = express.Router();

//בדף זה השתמשנו האימות הטוקן לפני כל פעולה שזקוקה לאימות כלשהו 
//הפעלנו את המידלוור שקשור לטוקן ובמידה והיה אפשרי הוא המשיך לבצע את הפעולה
router.get("/",toyControler.getAllToys);
router.get("/:id",toyControler.getToyId);
router.delete("/:id",auth,toyControler.deleteToy);
router.post("/",auth,toyControler.addToy);


export default router;