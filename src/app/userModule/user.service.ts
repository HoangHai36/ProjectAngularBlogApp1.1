import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { User } from '../shared/user.interface';
import { shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  headersUser: HttpHeaders;
  urlUser = 'https://conduit.productionready.io/api/user';
  urlProfiles = 'https://conduit.productionready.io/api/profiles/';
  user$ = this.http.get(this.urlUser, {
    headers: new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem("token")}`
    })
  }).pipe(shareReplay());

  constructor(private http: HttpClient) { }

  setTokenUser() {
    this.headersUser = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem("token")}`
    });
  }

  getUser(): Observable<any> {
    this.setTokenUser();
    return this.http.get(this.urlUser, {
      headers: this.headersUser
    }).pipe(shareReplay())
  }

  updateSetting(user: User): Observable<any> {
    this.setTokenUser();
    return this.http.put(this.urlUser, {
      user: user,
    }, {
      headers: this.headersUser
    })
  }

  getProfile(name): Observable<any> {
    if (localStorage.getItem('name')) {
      this.setTokenUser();
      return this.http.get(this.urlProfiles + `${name}`, {
        headers: this.headersUser
      });
    }
    return this.http.get(this.urlProfiles + `${name}`);
  }
}
