import { Component, OnInit } from '@angular/core';
//import { Registration } from '../registration/registration';
//import { LoginForm } from '../login-form/login-form';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { JobDetails } from '../job-details/job-details';
import { Jobdata } from '../job-data-service';

@Component({
  selector: 'app-home',
  imports: [NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  showForm = "registrationForm";

  constructor(private router : Router, public jobDataService : Jobdata){}

  ngOnInit(): void {
    let allData = this.jobDataService.getJobDetails();
    console.log("Inside Home component-----", allData)
  }


  openRegistrationForm(){
    this.showForm = "registrationForm";
    this.router.navigate(['/registration']);
    console.log("Resistration button was clicked");
  }

  openLoginForm(){
    this.showForm = "loginForm";
    this.router.navigate(['/login']);
    console.log("Login button was clicked")
  }

}
