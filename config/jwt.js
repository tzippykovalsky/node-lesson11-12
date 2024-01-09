import jwt from "jsonwebtoken";
export const generateToken=(user)=>{
    let token=jwt.sign(
        {_id:user._id,userName:user.userName},process.env.JWT_SECRET,{expiresIn:"10m"}
    )
    return token;
}
// בדף זה יצרתי פונקציה שמקבלת משתמש ומחזירה לו טוקן שזה כמו סיסמה זמנית 
//שאיתה הוא יכול לגשת ולבצע פעולות שונות 
// הטוקן לקח מהמשתמש פרטים : שם ומספר מזהה והם מהווים חלק מהטוקן
//הטוקן הוגבל ל10 דקות
//בכל מקום שנרצה לקבל טוקן למשתמש נקרא לפונקציה זו