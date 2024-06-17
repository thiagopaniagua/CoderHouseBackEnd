import * as service from '../services/message.services.js';

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        res.json(response);
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newMessage = await service.create(req.body);
        res.json(newMessage);
    } catch (error) {
        next(error);
    }
};
