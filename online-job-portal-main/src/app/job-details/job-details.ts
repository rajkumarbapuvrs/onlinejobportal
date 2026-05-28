import { ChangeDetectorRef, Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-details',
  imports: [],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css',
})
export class JobDetails implements OnInit {

  @Input()  jobDescription : any;
  constructor(private cdr : ChangeDetectorRef){}
  
  ngOnInit(){
    console.log("Here is the job data--------------", this.jobDescription);
    this.cdr.detectChanges();
  }
}
