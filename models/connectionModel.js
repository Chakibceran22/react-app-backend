import mongoose from "mongoose";
const MONGO_URL = "mongodb+srv://trondio466:e8MKzhYXu19KjXZJ@test.fkyx9.mongodb.net/myDataBase";
const connectionDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Error: ", error.message);
    }
}
export default connectionDB;
