// 1. Import dependencies
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { config } from 'dotenv';
import cors from 'cors';
const MONGO_URI = "mongodb+srv://trondio466:e8MKzhYXu19KjXZJ@test.fkyx9.mongodb.net/myDataBase";
import User from './models/userModel.js';
import connectionDB from './models/connectionModel.js';

const app = express();
app.use(cors());
app.use(express.json());
connectionDB();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.post("/api/signeup",async (req, res) => {
    try
    {
        const { username, email, password } = req.body;
    const user = new User({
        username,
        email,
        password,
    });
    const createdUser = await user.save();
    res.send(createdUser);
    }
    catch (error)
    {
        res.status(404).send({ message: error.message });
    }
});

app.listen(5000, () => {
    console.log('Server at http://localhost:5000');
});