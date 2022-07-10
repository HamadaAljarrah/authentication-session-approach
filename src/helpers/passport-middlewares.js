
export const allowIfLoggedin = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/login")
}

export const allowIfNotLoggedin = (req, res, next)=>{
    if(req.isAuthenticated()){
        return res.redirect("/profile")
    }
    return next()
}