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
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("not valid id")
    let deletedToy = await Toy.find(id)
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
        let newToy=await Toy.create({ name, price, inSale })
        res.status(201).json(newToy);
    } catch (err) {
        res.status(400).send("cannot create this toy")
        console.log(err);
    }


}

