import express from "express";

let router;

router = express.Router();

router.get("/privacy-policy", (request, response) => {
    response.render("privacyPolicy", {
        title: "Privacy Policy"
    });
})

export default router;