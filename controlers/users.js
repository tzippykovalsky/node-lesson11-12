//בדף זה כאשר משתמש נרשם לאתר או שמתחבר עם שם משתמש שלו הוא יקבל טוקן

import { generateToken } from "../config/jwt.js";
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
        if (!loggedinUser)
            return res.status(404).send("לא נמצא משתמש בשם כזה");
        if (!await bcrypt.compare(password, loggedinUser.password))
            return res.status(404).send("לא נמצא משתמש עם סיסמה כזו");
        let { userName: u, _id, email,role } = loggedinUser;
        let token=generateToken(loggedinUser);//שימוש בפונקציה שיוצרת טוקן
        res.json({ userName: u, _id, email ,role,token})

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

        let {_id,userName:name,role,email:e}=newUser;//שליפת ערכים ספציפים
        let token=generateToken(newUser);//שימוש בפונקציה שיוצרת טוקן
        return res.status(201).json({_id,role,userName:name,token,email:e})
    }
    catch (err) {
        res.status(500).send("התרחשה שגיאה בהוספת המשתמש החדש")
    }
}
