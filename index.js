import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import { UserController } from "./src/Controller/user.controller.js";
import JobController, { upload } from "./src/Controller/job.controller.js";
import session from "express-session";
import { auth } from "./src/Middleware/auth.middleware.js";

const server = express();
server.use(express.json());  // Parse JSON body
server.use(express.urlencoded({ extended: true })); // Parse form data

// Middleware to serve static files from "public"
server.use(express.static(path.join(path.resolve(), "public")));


server.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false},
}))

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
server.get('/jobs',auth,JobController.getJobs);
server.get('/jobs/:id',JobController.getJobDetails);
server.post('/apply',upload.single('resume'),JobController.apply); 
 //'resume' is the name attribute in the input for type 'file'
 //upload is the variable I have defined as Multer instance 

 server.get('/addJobView',JobController.addJobView)
 server.post('/addJob',JobController.addJob);
// Start server
server.listen(3100, () => {
    console.log("Server is listening on port 3100");
});
