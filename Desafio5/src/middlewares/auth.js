export const validateLogin = (req, res, next) => {
    if (req.session?.info?.loggedIn) {
        next();
    } else {
        res.redirect("/login");
    }
};

export const isLoggedIn = (req, res, next) => {
    if (!req.session?.info?.loggedIn) {
        next();
    } else {
        res.redirect("/profile");
    }
};
