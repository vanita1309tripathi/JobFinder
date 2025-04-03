import { Job } from "../Model/job.models.js";
import multer from "multer";


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/ResumeUploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });
export {upload};

let jobs=Job.get();
export default class JobController{
    
    static getJobs(req,res,next){
        res.render('jobs',{jobs:jobs,userType: req.session.userType});
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
    static apply(req,res,next){
        const { jobId, name, email } = req.body;
        if (!jobId || !name || !email||!req.file) {
            return res.status(400).json({ message: "All fields are required!" });
        }
    
        let job=Job.getID(jobId);
        
        // for file uploads, HTML forms use a special <input type="file"> element. This element is not just sending a string (like other form fields), but the file's binary data. Multer
        //  is specifically designed to handle this type of data, and that’s why the file is stored in req.file and not in req.body
        job.addApplication(name,email,req.file.filename);
        
    
       console.log(`New application: ${name} applied for Job ID ${jobId}`);
       res.json({ message: "Application submitted successfully!" });

       
    }
    static addJob(req,res,next){
        let { title, company, skills, location, salary } = req.body;
        
    // Convert skills from a comma-separated string to an array
    skills = skills.split(",").map(skill => skill.trim());

    const newJob = { title, company, skills, location, salary };
    console.log("New Job:", newJob);
        Job.add(newJob);
        res.render('jobs',{jobs:jobs,userType: req.session.userType});
    }
    static addJobView(req,res,next){
      
        res.render('newJob');
    }
    static deleteJob(req,res,next){
        let id=req.param.id;
        Job.delete(id);
        res.render('jobs',{jobs:jobs,userType: req.session.userType});
    }
}