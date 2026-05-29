import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-registration',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class RegistrationForm {

  student = {
    name : '',
    email : '',
    phoneNo  : '',
  }

  userRole = "student"
  submitEnable = false;

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
      console.log('form submited successfully')
      alert('Rgistration Successful');

    }else{
      alert('Form is invalid')
    }
    console.log("Here the student name", this.student);
  }

}
