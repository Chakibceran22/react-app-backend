// 1. Import dependencies
import express from 'express';
import cors from 'cors';
import User from './models/userModel.js';
import connectionDB from './models/connectionModel.js';
const PORT = process.env.PORT || 5000;
import signeup from "./api/signeUp.js";
import login from "./api/login.js";

const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());


connectionDB();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/api/signeup', signeup);
app.use('/api/login', login);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});