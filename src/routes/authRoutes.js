import express from "express"
import * as authControllers from "../controllers/authControllers.js"
import { allowIfLoggedin, allowIfNotLoggedin } from "../helpers/passport-middlewares.js";
const router = express.Router();

router.get("/", authControllers.renderHomeOPage)
router.get("/profile", allowIfLoggedin, authControllers.renderProfile)
router.get("/login", allowIfNotLoggedin, authControllers.renderLogin)
router.get("/register", allowIfNotLoggedin, authControllers.renderRegister)
router.post("/register", allowIfNotLoggedin, authControllers.registerUser)
router.post("/login", allowIfNotLoggedin, authControllers.loginUser)
router.post("/logout", allowIfLoggedin, authControllers.logout)





export {router};