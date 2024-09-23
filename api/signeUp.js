import mongoose from "mongoose";
import User from "../models/userModel.js";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
       res.send("Server is running");
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({
            username,
            email,
            password,
        });
        const createdUser = await user.save();
        res.send(createdUser);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});

export default router;
