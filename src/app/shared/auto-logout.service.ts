import { Injectable } from "@angular/core";
import { Router } from '@angular/router'
import { AuthService } from '../authModule/auth.service';
const MINUTES_UNITL_AUTO_LOGOUT = 2 // in mins
const CHECK_INTERVAL = 1000// in ms
const STORE_KEY = 'lastAction';
@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {
  i = 0;
  constructor(private router: Router, private authService: AuthService) {
    this.check();
    this.initListener();
    this.initInterval();
    localStorage.setItem(STORE_KEY, Date.now().toString());
  }

  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
    this.i = 0;
  }

  initInterval() {
    let interval_logout = setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    if (localStorage.getItem('token')) {
      const now = Date.now();
      const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
      const diff = timeleft - now;
      const isTimeout = diff < 0;
      console.log(this.i++);
      if (isTimeout) {
        this.authService.logOut();
      }
    }
  }
}
