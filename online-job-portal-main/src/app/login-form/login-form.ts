import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ViewJobs } from '../view-jobs/view-jobs';
import { Router } from '@angular/router';
import { Jobdata } from '../job-data-service';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, ReactiveFormsModule, NgIf, ViewJobs],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {

  name="";
  email="";
  phoneNo ="";
  userRole = "student";

  isLoginSucess = false;

  loginForm! : FormGroup;

  constructor(private fb : FormBuilder,private router : Router, public jobDataService: Jobdata){
    this.loginForm = this.fb.group({

      email:[
        '', [Validators.required, Validators.email],
        
      ],
       
      password:[ '',
        [Validators.required,
        Validators.minLength(6)]
      ]

    })

  }

  openFormForStudent(){
    this.userRole = "student"
  }

  openFormForEmployer(){
    this.userRole = "employer"
  }

  submitData(){
    console.log("inside submit", this.loginForm)
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.isLoginSucess = true;
      alert('Login Successful');
      this.jobDataService.isLogin = false;
      this.router.navigate(['/view-jobs']);
    }else{
      alert('Form invalid');
    }
  }

}
