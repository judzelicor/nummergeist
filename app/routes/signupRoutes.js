import express from "express";

let router;

router = express.Router();

router.get("/signup", (request, response) => {
    response.render("signup", {
        title: "Sign up"
    })
})

export default router;