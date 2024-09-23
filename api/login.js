import mongoose from "mongoose";
import User from "../models/userModel.js";
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        const findUser = await User.findOne({ username });
        if(findUser && findUser.password === password)
        {
            res.status(200).send(findUser);
        }
        else
        {
            res.status(404).send({ message: "credentials not found" });
        }
    } catch (error) {
        res.status(404).send({ message: "Error while doing so" });
    }
});

export default router;