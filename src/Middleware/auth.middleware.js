export const auth=(req,res,next)=>{
   
    if(req.session.userType === 'seeker' || req.session.userType === 'recruiter'){
        next();
    }
    else{
        res.status(401).send("Please login first")
    }
    
    
}