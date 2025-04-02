import { User } from "../Model/user.model.js";
export class UserController{

    // This will be handled in script.js
   static login(req,res,next){
        if(User.logged(req.body.email,req.body.password)){
            console.log("User found:",req.body.email); 
            let uType=User.getUserType(req.body.email);
            req.session.userType=uType;
        
         
            res.json({success:true});
       }
       else{
           res.json({success:false})
       }
    }
    //Frontend (JavaScript - fetch("/register"))	 Sends the request (email, password, etc.) to the backend when the user submits the form.
// Backend (Controller - register method)	Receives the request, processes the data (e.g., adds user to DB or memory), and sends back a response.
    static register(req,res,next){
        console.log("Received Data from register form:", req.body); 
        User.add(req.body);
        console.log("New User added");
        res.json({success:true});
    }

}