import mongoose from "mongoose"


const MONGO_URL = "mongodb+srv://admin:<password>>@thiago.kpyxkoc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=thiago";

export const initMongoDB = async () =>{
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(MONGO_URL);
        console.log('Conectado a la base');
        }catch (error){
            console.log(error);
        };
};
