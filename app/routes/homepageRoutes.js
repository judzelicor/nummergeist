import express from "express";

let router;

router = express.Router();

router.get("/", (request, response) => {
    response.render("home", {
        title: "Welcome"
    });
})

export default router;