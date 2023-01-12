import express from "express";

let router;

router = express.Router();

router.get("/pricing", (request, response) => {
    response.render("pricing", {
        title: "Pricing"
    });
})

export default router;