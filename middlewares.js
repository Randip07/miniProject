module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.flash("error", "Please login to order")
        return res.redirect("/login");
    }
    next();
};