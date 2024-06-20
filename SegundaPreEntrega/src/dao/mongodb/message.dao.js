import MessageModel from '../models/message.model.js';

class MessageDaoMongoDB {
    async getAll() {
        return await MessageModel.find({});
    }

    async create(obj) {
        return await MessageModel.create(obj);
    }
}

export default MessageDaoMongoDB;
