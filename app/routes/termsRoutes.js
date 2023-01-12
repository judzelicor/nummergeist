import express from "express";

let router;

router = express.Router();

router.get("/terms", (request, response) => {
    response.render("terms", {
        title: "Terms"
    })
})

export default router;