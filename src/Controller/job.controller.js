import { Job } from "../Model/job.models.js";
let jobs=Job.get();
export default class JobController{
    
    static getJobs(req,res,next){
        res.render('jobs',{jobs:jobs});
    }
    static getJobDetails(req,res,next){
        let id=req.params.id;
        let JobFound=Job.getID(parseInt(id));
        if(JobFound){
            res.render('jobDetails',{job:JobFound});
        }
        else{
            res.status(401).send("Job Not Found");
        }
    }
}