export class User{
    constructor(_id,_name,_email,_password,_userType){
        this.id=_id;
        this.name=_name;
        this.email=_email;
        this.password=_password;
        this.userType=_userType;
    }
    static get(){
        return users;
    }
    static add(userObj){
       
        const newUser = new User (users.length + 1,userObj.name, userObj.email, userObj.password, userObj.userType );
        console.log("New User:",newUser);
        users.push(newUser);
    }
    static logged(email, password) {
        if (users.find(user => user.email === email && user.password === password)) {
           
            return true;
        }
        console.log("Invalid credentials",email,password);
        return false;
    }
    static getUserType(email){
        let user=users.find(u=>u.email==email);
        return user.userType;
    }
}
const users = [
  new User(1,"JobSeeker1","testjob1@gmail.com","12345","seeker"),
  new User(1,"Recruiter1","testrecruiter1@gmail.com","12345","recruiter"),
  ];