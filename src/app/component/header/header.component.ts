import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authModule/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin;
  userName: string = '';
  urlImage: string = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.subject.subscribe(data => {
      this.isLogin = data['isLogin'];
      this.userName = data['username'];
      this.urlImage =  data['urlImage'];
    })
    if(localStorage.getItem('token')) {
      this.isLogin = true;
      this.userName = localStorage.getItem('name');
      this.urlImage = localStorage.getItem('image');
    }
  }

  logOut() {
    this.authService.logOut();
  }
}
