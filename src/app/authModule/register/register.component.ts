import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formUser: FormGroup;
  errregister: Array<string>;
  constructor(private fb: FormBuilder,private authService: AuthService, private appService: AppService) { 
    this.formUser = fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    })
  }

  ngOnInit() {
    
  }

  singup() {
    console.log(this.formUser.value);
    this.authService.postUser(this.formUser.value).subscribe((data) => {
      this.authService.loginSuccess(data);
      console.log(data);
     }, err =>{
      this.errregister =  this.appService.getError(err);
     })
  }

}
