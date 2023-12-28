import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";


export const getAllUsers = async (req, res) => {
    try {
        let allUsuers = await User.find({}, "-password")
        res.status(200).json(allUsuers)
    }
    catch {
        res.status(500).send("התרחשה שגיאה בהבאת כל המשתמשים ")
    }
}

export const loginUser = async (req, res) => {
    try {
        let { userName, password } = req.body;
        if (!userName || !password)
            return res.status(404).send("חסרים פרמטרים שהם חובה");
        if (!/[0-9]{3}[A-Za-z]{3}/.test(password))
            return res.status(400).send("סיסמה אינה תקינה")

        let loggedinUser = await User.findOne({ userName });
        if (!loginUser)
            return res.status(404).send("לא נמצא משתמש בשם כזה");
        if (!await bcrypt.compare(password, loggedinUser.password))
            return res.status(404).send("לא נמצא משתמש עם סיסמה כזו");
        let { userName: u, _id, email } = loggedinUser;
        res.json({ userName: u, _id, email })

    }
    catch (err) {
        res.status(500).send("התרחשה שגיאה במציאת המשתמש ")
    }
}



export const addUser = async (req, res) => {
    try {
        let { userName, email, password } = req.body;
        if (!userName || !email || !password)
            return res.status(404).send("חסרים פרמטרים שהם חובה");
        if (!/[0-9]{3}[A-Za-z]{3}/.test(password))
            return res.status(400).send("סיסמה אינה תקינה")

        let hashedPassword = await bcrypt.hash(password, 10);
        let newUser = await User.create({ userName, email, password: hashedPassword })
        return res.status(201).json(newUser)
    }
    catch (err) {
        res.status(500).send("התרחשה שגיאה בהוספת המשתמש החדש")
    }
}

