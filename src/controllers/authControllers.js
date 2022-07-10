import passport from "passport";
import bcrypt from "bcrypt"
import flash from "express-flash"

export const USERS = [];

export const renderHomeOPage = (req,res)=>{
    res.render("home.ejs")
}
export const renderProfile = (req,res)=>{
    res.render("profile.ejs", {name: req.user.name , email: req.user.email})
}
export const renderLogin = (req,res)=>{
    res.render("login.ejs")
}
export const renderRegister = (req,res)=>{
    res.render("register.ejs")
}


export const registerUser = async(req, res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        USERS.push({
            name: req.body.name,
            email: req.body.email,
            id: Date.now().toString(),
            password: hashedPassword
        })
        res.redirect("/login")
    } catch (error) {
        res.send(error.message);
        console.log(error.message);
    }
    console.log(USERS);
}



export const loginUser = passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    failureMessage: true
})

export const logout = (req, res)=>{
    req.logout((err)=>{if(err){return next(err)}});
    res.redirect("/login")
}