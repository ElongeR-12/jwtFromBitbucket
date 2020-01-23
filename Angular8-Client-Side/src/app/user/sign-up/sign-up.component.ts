import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);// in order to hide div message after 4000s, if true
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {// error.status in server, in user.controler.js and app.js for all validation errors
          this.serverErrorMessages = err.error.join('<br/>');//store all the validation error messages inside this string server error messages/ join all error validation in client side with br
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';// then can be error in server side rather than this validation
      }
    );
  }
  //reset the form control to initial state when register successful
  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();//reset the form
    this.serverErrorMessages = '';// reset the error messages with empty string
  }
}
