import { UserModel } from "../models/user.model.js";

export default class UserDao {
    async register(user) {
        try {
            const { email } = user;
            const existUser = await UserModel.findOne({ email });
            if (existUser) return null;
            return await UserModel.create(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    async login(email, password) {
        try {
            return await UserModel.findOne({ email, password });
        } catch (error) {
            throw new Error(error);
        }
    }
}
