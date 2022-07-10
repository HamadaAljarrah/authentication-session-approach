import bcrypt from "bcrypt"
import local from "passport-local"
const LocalStrategy = local.Strategy;

const initPassport = (passport, getUserByEmail, getUserById)=>{

    const authenticateUser = async(email, password, done) =>{
        const user = getUserByEmail(email);
        if(user == null) {
            return done(null, false, {message: "User was not found"})
        }
        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)

            } else {
                return done(null, false, {message: "Password was incorrect"})
            }
        } catch (error) {
            return done(error)
        }
    }
    
    passport.use(new LocalStrategy({usernameField: "email"}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

export {initPassport}