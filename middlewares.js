module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.flash("error", "Please login First")
        return res.redirect("/login");
    }
    next();
};

module.exports.isAdminLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.flash("error", "Please login First")
        return res.redirect("/admin/login");
    }
    next();
};