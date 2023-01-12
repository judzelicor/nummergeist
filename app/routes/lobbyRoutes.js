import express from "express";

let router;

router = express.Router();

router.get("/lobby", (request, response) => {
    response.render("lobby", {
        title: "Lobby"
    });
})

router.get("/lobby/*", (request, response) => {
    response.render("lobby", {
        title: "Lobby"
    })
})

export default router;