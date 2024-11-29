import mongoose from 'mongoose';

let isConnected=false;
export const connecttoDB=async ()=>{
    // strictquery is used to avoid warning of DB in console
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log("MONGO DB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:`${process.env.DB_NAME}`,
        });
        console.log("MONGODB Database:: CONNECTED");
    } catch (error) {
        console.log("MONGODB CONNECTION :: ERROR",error)
    }

}