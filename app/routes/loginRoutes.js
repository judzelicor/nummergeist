import express from "express";

let router;

router = express.Router();

router.get("/login", (request , response) => {
    response.render("login", {
        title: "Log in"
    })
})

export default router;