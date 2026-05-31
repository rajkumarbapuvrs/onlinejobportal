import { NgIf } from '@angular/common';
import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ViewJobs } from '../view-jobs/view-jobs';
import { Router } from '@angular/router';
import { Jobdata } from '../job-data-service';
import { LoginService } from '../login-form/login.service';
import { CONTROLLER_NAME } from '../tokens';
import { UserModel } from '../userModel';
import { RegisterationService } from '../registration/registration.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, ReactiveFormsModule, NgIf, ViewJobs],
   providers: [LoginService,
      { provide: CONTROLLER_NAME, useValue: 'login' }
    ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
    private loginService = inject(LoginService);
private localStorageService = inject(LocalStorageService)
  name="";
  email="";
  phoneNo ="";
  userRole = "employee";

  isLoginSucess = false;

  loginForm! : FormGroup;

  constructor(private fb : FormBuilder,private router : Router, public jobDataService: Jobdata){
    this.loginForm = this.fb.group({

      email:[
        '', [Validators.required, Validators.email],
        
      ],
       
      password:[ '',
        [Validators.required,
        Validators.minLength(3)]
      ]

    })

  }

  openFormForEmployee(){
    this.userRole = "employee"
  }

  openFormForEmployer(){
    this.userRole = "employer"
  }

  submitData(){
    if(this.loginForm.valid)
    {
      this.loginService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.localStorageService.setItem('user',response);
        if(this.userRole == "employee")
        {
          this.router.navigate(['/joblist']);
        }
        else
        {
          this.router.navigate(['/joblist']);
        }
      },
      error: (err) => {
        console.error('An error occurred:', err);
      }
      });
    }
    else
    {
      alert('Form is invalid')
    }
    console.log("Here the employee name", this.loginForm.value);
    }
}
