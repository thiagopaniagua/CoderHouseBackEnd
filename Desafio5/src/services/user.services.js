import UserDao from "../dao/mongodb/user.dao.js";

const userDao = new UserDao();

export const register = async (user) => {
    try {
        return await userDao.register(user);
    } catch (error) {
        throw new Error(error);
    }
};

export const login = async (email, password) => {
    try {
        const user = await userDao.login(email, password);
        if (!user) return null;
        return user;
    } catch (error) {
        throw new Error(error);
    }
};
