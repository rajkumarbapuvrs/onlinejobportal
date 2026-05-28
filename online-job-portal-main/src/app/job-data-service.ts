import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Jobdata {

  seletedJobData:any;
  isLogin = false;
  jobDetails:any;


    getJobDetails(){
    return this.jobDetails = [

      {
        jobTitle: "Angular Developer",
        companyName: "Lenovo",
        location: "Pune",
        salary: 80000,
        jobSescription: "We are looking for an Angular Developer with strong frontend development skills to build scalable applications."
      },

      {
        jobTitle: "Java Developer",
        companyName: "HP",
        location: "Pune",
        salary: 90000,
        jobSescription: "Looking for Java developers with experience in Spring Boot and backend development."
      },

      {
        jobTitle: "Node.js Developer",
        companyName: "Infosys",
        location: "Mumbai",
        salary: 120000,
        jobSescription: "Need Node.js developers to create scalable APIs and backend services."
      },

      {
        jobTitle: "React Developer",
        companyName: "TCS",
        location: "Bangalore",
        salary: 85000,
        jobSescription: "Hiring React developers for modern web application development."
      },

      {
        jobTitle: "Python Developer",
        companyName: "Wipro",
        location: "Hyderabad",
        salary: 95000,
        jobSescription: "Looking for Python developers with Django and Flask experience."
      },

      {
        jobTitle: "Full Stack Developer",
        companyName: "Accenture",
        location: "Chennai",
        salary: 140000,
        jobSescription: "Need full stack developers with Angular and Node.js experience."
      },

      {
        jobTitle: "UI/UX Designer",
        companyName: "Cognizant",
        location: "Pune",
        salary: 70000,
        jobSescription: "Creative UI/UX designers required for web and mobile applications."
      },

      {
        jobTitle: "Frontend Developer",
        companyName: "Capgemini",
        location: "Noida",
        salary: 88000,
        jobSescription: "Frontend developers required with HTML, CSS, JavaScript, and Angular knowledge."
      },

      {
        jobTitle: "Backend Developer",
        companyName: "Tech Mahindra",
        location: "Nagpur",
        salary: 110000,
        jobSescription: "Looking for backend developers with Java and database experience."
      },

      {
        jobTitle: "Software Engineer",
        companyName: "IBM",
        location: "Pune",
        salary: 130000,
        jobSescription: "Software engineers required for enterprise application development."
      },

      {
        jobTitle: "DevOps Engineer",
        companyName: "Oracle",
        location: "Bangalore",
        salary: 150000,
        jobSescription: "Hiring DevOps engineers with CI/CD and cloud deployment knowledge."
      },

      {
        jobTitle: "Data Analyst",
        companyName: "Deloitte",
        location: "Mumbai",
        salary: 95000,
        jobSescription: "Need data analysts with SQL, Power BI, and Excel skills."
      },

      {
        jobTitle: "Cloud Engineer",
        companyName: "Amazon",
        location: "Hyderabad",
        salary: 160000,
        jobSescription: "Cloud engineers required with AWS and cloud infrastructure experience."
      },

      {
        jobTitle: "QA Tester",
        companyName: "HCL",
        location: "Pune",
        salary: 75000,
        jobSescription: "Looking for QA testers with automation and manual testing knowledge."
      },

      {
        jobTitle: "Mobile App Developer",
        companyName: "Google",
        location: "Bangalore",
        salary: 170000,
        jobSescription: "Hiring Android and Flutter developers for mobile application projects."
      }

    ];

  }
  
}
