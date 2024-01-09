import { Toy } from "../models/toysSchema.js";
import mongoose from "mongoose";


export const getAllToys = async (req, res) => {
    try {

        let allToys = await Toy.find({})
        res.json(allToys);
    }
    catch (err) {
        res.status(400).send("problem in getting all toys")
    }
}

export const getToyId = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).send("invalid paramter id");

    try {
        let toyId = await Toy.findOne({ _id: req.params.id });
        if (!toyId)
            return res.status(404).send("no toy with such id");

        res.json(toyId);
    }
    catch (err) {
        res.status(400).send("problem im getting toy id " + req.params.id)
    }
}

export const deleteToy = async (req, res) => {
    //בדיקת תקינות על id
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("not valid id")

//השוואה בין מי שרוצה למחוק לבין מי שהוסיף את הספר
    let toyToDelete = await Toy.findById(id);
    if (toyToDelete.userAdded != req.myuser._id &&req.myuser.role!="ADMIN")//לא מובן לי myuser לברר
        return res.status(403).send("גילינו שניסת למחוק משחק שלא שלך לך ללמוד הלכות גזל")
//מחיקת ספר במקרה שאופשר
    let deletedToy = await Toy.findByIdAndDelete(id)
    if (!deletedToy)
        return res.status(404).send("לא נמצא")
    return res.json(deletedToy);

}
export const addToy = async (req, res) => {
    let {
        name
        , price
        , inSale
    } = req.body;
    if (!req.body.name || !req.body.price) {
        res.status(404).send("חסרים פרמרים להוספת משחק");

    }

    try {
        //כאשר משתמש מוסיף משחק אוטומטית נשלוף את הid 
       // שלו כדי שנוכל לראות מי כביכול הבעלים שלו

        let newToy = await Toy.create({userAdded:req.myuser._id, name, price, inSale })
        res.status(201).json(newToy);
    } catch (err) {
        res.status(400).send("cannot create this toy")
        console.log(err);
    }


}

