import * as service from "../services/user.services.js";

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Chequeo si el usuario es admin
        const isAdmin = email === "adminCoder@coder.com" && password === "Cod3r123";
        const userData = isAdmin ? { ...req.body, role: "admin" } : req.body;


        const user = await service.register(userData);

     
        if (!user) {
            req.session.error = "User registration failed or user already exists";
            return res.redirect("/register");
        }

        // Redireccionar a login cuando es exitoso
        res.redirect("/login");
    } catch (error) {
        next(error.message);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;


         // Verificación para el administrador
         if (email === "adminCoder@coder.com" && password === "Cod3r123") {
            req.session.info = {
                loggedIn: true,
                first_name: "Admin",
                last_name: "Coder",
                email: email,
                role: "admin"
            };
            return res.redirect("/products");
        }


        const user = await service.login(email, password);

        if (!user) {
            req.session.error = "Invalid email or password";
            return res.redirect("/login");
        }

        req.session.info = {
            loggedIn: true,
            username: user.first_name,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        };

        res.redirect("/products");
    } catch (error) {
        next(error.message);
    }
};

export const infoSession = (req, res, next) => {
    res.json({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies
    });
};

export const logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout exitoso' });
    });
};