import express from "express";

let router;

router = express.Router();

router.get("/game-room", (request, response) => {
    response.render("gameRoom", {
        title: "Game Room",
        layout: "gameRoom"
    })
})

router.get("/game-room/*", (request, response) => {
    response.render("gameRoom", {
        title: "Game Room",
        layout: "gameRoom"
    })
})

export default router;