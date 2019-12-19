import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  errorResponse: Array<string>;
  constructor(private authService: AuthService, private fb: FormBuilder, private appService: AppService) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    })
   }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.userForm.value).subscribe((data) => {
      this.authService.loginSuccess(data);
    }, err => {
      this.errorResponse = this.appService.getError(err);
    })
  }
}
