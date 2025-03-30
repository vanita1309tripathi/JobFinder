import { Job } from "../Model/job.models.js";
export default class JobController{

    static getJobs(req,res,next){
        let jobs=Job.get();
        res.render('jobs',{jobs:jobs});
    }
}