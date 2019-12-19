import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/authModule/auth.service';
import { User } from '../../shared/user.interface';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent implements OnInit {
  urlImage;
  dataUser: User;
  urlNull: string = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  formSetting: FormGroup;
  dataSetting;
  errSetting: Array<string> = [];
  constructor(private userService: UserService, private router: Router, private appService: AppService, private fb: FormBuilder, private authService: AuthService) {
    this.formSetting = this.fb.group({
      username: '',
      email: '',
      password: '',
      bio: ''
    })
  }

  ngOnInit() {
    this.userService.user$.subscribe(data => {
      this.dataUser = data['user'];
      this.urlNull = this.dataUser.image ? this.dataUser.image : '';
      this.formSetting = this.fb.group({
        username: this.dataUser.username,
        email: this.dataUser.email,
        password: '',
        bio: this.dataUser.bio
      })
    })
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.urlImage = event.target['result'];
      }
    }
  }
  updateSetting() {
    this.dataSetting = this.formSetting.value;
    if (!this.formSetting.controls.password.value) {
      delete this.dataSetting.password
    }
    if (this.urlImage) {
      this.dataSetting['image'] = this.urlImage;
    }
    this.userService.updateSetting(this.dataSetting).subscribe(data => {
      this.authService.subject.next({ isLogin: true, username: data['user'].username, urlImage: data['user'].image });
      localStorage.setItem('image', data['user'].image);
      localStorage.setItem('name', data['user'].username);
      this.router.navigate(['/profile/', data['user'].username]);
    }, err => {
      this.errSetting = this.appService.getError(err);
    })
  }
}
