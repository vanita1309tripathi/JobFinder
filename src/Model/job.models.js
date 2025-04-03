
class Job {
    constructor(id, title, company, skills=[], location, salary) {
      this.id = id;
      this.title = title;
      this.company = company;
      this.skills=skills;
      this.location = location;
      this.salary = salary;
      this.applications=[];
    }
  
    // Method to add an application to this job
    addApplication(name,email,resume) {
      
      this.applications.push({name,email,resume});
    }
    static get(){
        return jobs;
    }
    static getID(Id){
      return jobs.find((j)=>j.id==Number(Id));
  }
   static add(job){
    let newJob = new Job(  
      jobs.length + 1   // Correct the length syntax
  );
    Object.assign(newJob,job);
    console.log("Newjob:",newJob);
    
    jobs.push(newJob);
    console.log("New Job Added");
   }
  }
  
  // Array to store job instances
  const jobs = [
    new Job(
      1,
      "Frontend Developer",
      "Accenture",
      ["React","JavaScript","HTML","CSS","Git","Express","REST APIs"],
      "Gurugram",
      "8-10 lpa"
    ),
    new Job(
      2,
      "Backend Developer",
      "Google",
      ["Node.js","MongoDB","JavaScript","Rest APIS","MERN Stack"],
      "Hyedarabad",
      "10-12 lpa"
    ),
    new Job(
        3,
        "Software Engineer",
        "Flipkart",
        ["Data Structure and Algorithm","Java","Database","HTML/CSS","Communication"],
        "Hyedarabad",
        "20 lpa"
      )
      
  ];
  
  export default jobs;
  export { Job };