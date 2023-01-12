import express from "express";

let router;

router = express.Router();

router.get("/about", (request, response) => {
    response.render("about", {
        title: "About"
    });
})

export default router;