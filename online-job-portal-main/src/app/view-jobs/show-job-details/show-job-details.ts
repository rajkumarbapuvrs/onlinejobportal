import { ChangeDetectorRef, Component, Input, input, OnInit } from '@angular/core';
import { Jobdata } from '../../job-data-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-job-details',
  imports: [FormsModule],
  templateUrl: './show-job-details.html',
  styleUrl: './show-job-details.css',
})
export class ShowJobDetails implements OnInit {

  @Input() jobDescription: any;
  selectedDataByStudent:any;
  exprience:any;
  salary:any;
  location:any;
  skills: any;
  constructor(private cdr : ChangeDetectorRef, public jobData : Jobdata, public router: Router){
  }

  ngOnInit(){

    if(this.jobData.seletedJobData === null || this.jobData.seletedJobData == undefined || this.jobData.seletedJobData.length === 0){
      this.router.navigate(['/view-jobs']);
    }

    console.log("Here the showjobDat", this.jobData.seletedJobData);
    this.selectedDataByStudent = this.jobData.seletedJobData
    this.cdr.detectChanges();

  }

  getJobData(){
    console.log("Here the showjobData", this.jobData.seletedJobData);
    this.cdr.detectChanges();
  }


  sbmitData(){

  }

}
