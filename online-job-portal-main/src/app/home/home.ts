import { Component, OnInit, ViewChild } from '@angular/core';
//import { Registration } from '../registration/registration';
//import { LoginForm } from '../login-form/login-form';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { JobDetails } from '../job-details/job-details';
import { Jobdata } from '../job-data-service';
import { CONTROLLER_NAME } from '../tokens';

@Component({
  selector: 'app-home',
  imports: [NgIf],
  providers: [
    { provide: CONTROLLER_NAME, useValue: '' }
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  name = 'Angular';
  showForm = "registrationForm";

  constructor(private router: Router, public jobDataService: Jobdata) { }

  ngOnInit(): void {
    let allData = this.jobDataService.getJobDetails();
    console.log("Inside Home component-----", allData);
  }

  openRegistrationForm() {
    this.showForm = "registrationForm";
    this.router.navigate(['/registration']);
    console.log("Resistration button was clicked");
  }
  openJobEdit() {
    this.showForm = "jobedit";
    this.router.navigate(['/jobedit']);
    console.log("jobedit button was clicked");
  }
  openJobList() {
    this.showForm = "joblist";
    this.router.navigate(['/joblist']);
    console.log("jobedit button was clicked");
  }
  openLoginForm() {
    this.showForm = "loginForm";
    this.router.navigate(['/login']);
    console.log("Login button was clicked")
  }
  openArticle() {
    this.showForm = "articleComponent";
    this.router.navigate(['/article']);
    console.log("Article button was clicked")
  }

}
