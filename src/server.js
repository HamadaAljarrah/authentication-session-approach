import express, { urlencoded } from "express"
import passport from "passport"
import session from "express-session"
import flash from "express-flash"


import { router } from "./routes/authRoutes.js"
import { initPassport } from "./config/passport-config.js"
import { USERS } from "./controllers/authControllers.js"

const app = express()

initPassport(
    passport,
    email => USERS.find(user=> user.email === email),
    id => USERS.find(user=> user.id === id)
)

app.set("view-engine", "ejs");
app.use(flash())
app.use(urlencoded({extended: false}))
app.use(session({
    secret: "Hamada",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);

app.listen(3000, ()=> console.log("listning on port 3000"))