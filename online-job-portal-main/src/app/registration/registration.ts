import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UserModel } from '../userModel';
import { RegisterationService } from '../registration/registration.service';
import { CONTROLLER_NAME } from '../tokens';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { EncryptionService } from '../en-de-crypt.service';

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
  user: UserModel = {
    id: 0,
    fullName: '',
    email: '',
    password: '',
    phone: '',
    isEmployee: false
  };
  userRole = "employee"
  submitEnable = false;
  constructor(private router: Router,private encryptionService: EncryptionService) { }
  openFormForEmployee() {
    this.userRole = "employee"
    console.log("employee roll has been selected")
  }

  openFormForEmployer() {
    this.userRole = "employer"
    console.log("employer roll has been selected")
  }

  submitForm(form: any) {
    if (form.valid) {
      const clonedValue = JSON.parse(JSON.stringify(form.value));
      if (this.userRole == "employee") {
        clonedValue.isEmployee = true;
      }
      else {
        clonedValue.isEmployee = false;
      }
      this.registrationService.register(clonedValue).subscribe({
        next: (response) => {
          const originalToken = response.token;
          debugger;
          // 1. Encrypt token
          const encryptedToken = this.encryptionService.encrypt(originalToken);
          //localStorage.setItem('user_token', encryptedToken);
          response.token=encryptedToken;
          this.localStorageService.setItem('user', response);
          //this.localStorageService.setItem('appToken',response['token']);
          console.log('Successfully Registered!', response['token']);
          this.router.navigate(['/article']);
        },
        error: (err) => {
          console.error('An error occurred:', err);
        }
      });
      console.log('form submited successfully')
      alert('Registration Successful');

    } else {
      alert('Form is invalid')
    }
    console.log("Here the employee name", this.user);
  }

}
