import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin: boolean = false;
  subject = new Subject();
  name: string = '';
  urlImage: string = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  url: string = 'https://conduit.productionready.io/api/users';
  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
    }
  }

  login(user: User): Observable<any> {
    return this.http.post(this.url + '/login', { user: user });
  }

  loginSuccess(userData): any {
    this.isLogin = true;
    this.name = userData['user'].username;
    this.urlImage = userData['user'].image;
    localStorage.setItem('token', userData['user'].token);
    localStorage.setItem('name', userData['user'].username);
    localStorage.setItem('image', userData['user'].image);
    this.subject.next({ isLogin: this.isLogin, username: this.name, urlImage: this.urlImage });  
    this.router.navigate(['']);
  }

  logOut() {
    this.isLogin = false;
    this.name = '';
    this.urlImage = 'https://static.productionready.io/images/smiley-cyrus.jpg';
    this.subject.next({ isLogin: this.isLogin, username: this.name, urlImage: this.urlImage });
    localStorage.clear();
    this.router.navigate(['login']);
  }

  checkLoginNavigate() {
    if (!this.isLogin) {
      this.router.navigateByUrl("");
    }
    return this.isLogin;
  }

  postUser(user) {
    return this.http.post(this.url, { user: user });
  }
}
