import { Component,inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UserModel } from '../userModel';
import { RegisterationService } from '../registration/registration.service';
import { CONTROLLER_NAME } from '../tokens';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  providers: [RegisterationService,
        { provide: CONTROLLER_NAME, useValue: 'login/register' }
      ],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class RegistrationForm {
  private registrationService = inject(RegisterationService);
  private localStorageService = inject(LocalStorageService)
  user: UserModel={
    id:0,
    fullName:'',
    email: '',
    password: '', 
    phone: '',
    isStudent: false 
  };
  userRole = "student"
  submitEnable = false;
  constructor(private router : Router){}
  openFormForStudent(){
    this.userRole = "student"
    console.log("student roll has been selected")
  }

  openFormForEmployer(){
    this.userRole = "employer"
    console.log("employer roll has been selected")
  }

  submitForm(form:any){
    if(form.valid){
      this.registrationService.register(form.value).subscribe({
      next: (response) => {
        this.localStorageService.setItem('appToken',response['token']);
        console.log('Post created successfully!', response['token']);
        this.router.navigate(['/article']);
      },
      error: (err) => {
        console.error('An error occurred:', err);
      }
    });
      console.log('form submited successfully')
      alert('Rgistration Successful');

    }else{
      alert('Form is invalid')
    }
    console.log("Here the student name", this.user);
  }

}
