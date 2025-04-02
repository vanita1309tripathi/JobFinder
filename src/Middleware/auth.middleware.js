export const auth=(req,res,next)=>{
   
    if(req.session.userType=='seeker'){
        next();
    }
    else{
        alert("")
        res.redirect('/');
    }
      
    
}