import express from "express";
import {
    login
} from "../controllers/index.js";

let router;

router = express.Router();

router.post("/authentication/user/login", login);

export default router;