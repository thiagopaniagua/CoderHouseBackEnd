import MessageDaoMongoDB from '../dao/mongodb/message.dao.js';
const messageDao = new MessageDaoMongoDB();

export const getAll = async () => {
    return await messageDao.getAll();
};

export const create = async (obj) => {
    return await messageDao.create(obj);
};
