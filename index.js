import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import { UserController } from "./src/Controller/user.controller.js";
import { register } from "module";


const server = express();
server.use(express.json());  // Parse JSON body
server.use(express.urlencoded({ extended: true })); // Parse form data

// Middleware to serve static files from "public"
server.use(express.static(path.join(path.resolve(), "public")));

// Set up EJS and views directory
server.use(expressEjsLayouts);
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "View"));

// Routes
server.get("/", (req, res) => {
    res.render("index");  
});
server.post('/login',UserController.login);
server.post('/register',UserController.register)

// Start server
server.listen(3100, () => {
    console.log("Server is listening on port 3100");
});
