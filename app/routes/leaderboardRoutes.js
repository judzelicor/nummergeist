import express from "express";

let router;

router = express.Router();

router.get("/leaderboard", (request, response) => {
    response.render("leaderboard", {
        title: "Leaderboard"
    });
})

export default router;