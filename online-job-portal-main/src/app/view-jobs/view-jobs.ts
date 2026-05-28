import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { JobDetails } from '../job-details/job-details';
import { ShowJobDetails } from './show-job-details/show-job-details';
import { Jobdata } from '../job-data-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-jobs',
  imports: [NgFor, ShowJobDetails, NgIf, FormsModule],
  templateUrl: './view-jobs.html',
  styleUrl: './view-jobs.css',
})
export class ViewJobs implements OnInit {


  jobDetails:any;
  jobDescription:any;
  isClickedOnCard = false;
  searchText:any;
  filterJobsData : any;


  constructor(private router : Router, public jobData : Jobdata){}

  ngOnInit(){
   this.jobDetails = this.jobData.getJobDetails();
   console.log("Here is the job details" , this.jobDetails);
   this.filterJobsData = [...this.jobDetails];
  }

  applyForJob(jobDetails:any){
    this.isClickedOnCard = true;
    console.log("Here is the job description", jobDetails);
    this.jobDescription = jobDetails;
    this.jobData.seletedJobData = jobDetails;
    this.router.navigate(['/job-details']);
  }

  
  filterJobs() {
    if (!this.searchText) {
      this.filterJobsData = [...this.jobDetails];
      return;
    }
    this.filterJobsData = this.jobDetails.filter((job: any) =>
      job.jobTitle.toLowerCase().includes(this.searchText.toLowerCase()) ||
      job.companyName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      job.jobSescription.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
