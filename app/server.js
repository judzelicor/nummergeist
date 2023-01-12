import express from "express";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import {
    homepageRoutes,
    aboutRoutes,
    leaderboardRoutes,
    pricingRoutes,
    privacyPolicyRoutes,
    lobbyRoutes,
    loginRoutes,
    signupRoutes,
    termsRoutes,
    gameRoomRoutes,
    authenticationRoutes
} from "./routes/index.js";

import {
    supabaseDatabaseClient
} from "./database/database.js";

import compression from "compression";
import { cookieParser } from "./middlewares/index.js";

dotenv.config({ path: ".env.local" });

let __filename;
let __dirname;

const server = express();
const PORT = process.env.PORT;

__filename = fileURLToPath(import.meta.url);
__dirname = path.dirname(__filename);

supabaseDatabaseClient.connect();

server.use(express.json());
server.use(cookieParser());

server.engine("handlebars", engine({
    extname: "handlebars",
    layoutsDir: __dirname+ "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
    helpers: {
        section: function (name, options) {
            if (!this._sections) {
                this._sections = {};
            }
            this._sections[name] = options.fn(this);
            return null;
        }
    },
}));

// Allow GZIP compression for resources to minimize file size
server.use(compression());

server.use(express.static(__dirname + "/public"));

server.set("view engine", "handlebars");

// Setup routes
server.use(homepageRoutes);
server.use(aboutRoutes);
server.use(leaderboardRoutes);
server.use(pricingRoutes);
server.use(privacyPolicyRoutes);
server.use(gameRoomRoutes)
server.use(lobbyRoutes);
server.use(loginRoutes);
server.use(signupRoutes)
server.use(termsRoutes);
server.use(authenticationRoutes)

// Handle unmatched routes
server.use("*", (request, response) => {
    response.render("404NotFound")
})

server.listen(PORT, () => {
    console.log(`Nummergeist server is listening on port ${ PORT }`)
})
