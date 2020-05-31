import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./auth.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  saved = false;
  private isAuthenticated = false;
  private token: string;
  private userId: Number;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  saveUser(name: string, email: string, password: string, userType: string) {
    const user: User = {
      name: name,
      email: email,
      password: password,
      user: userType,
    };
    this.http
      .post<{ message: string; user; User }>(
        "http://localhost:3000/user/signin",
        user
      )
      .subscribe((responseData) => {
        this.saved = true;
      });
  }

  login(email: string, password: string) {
    console.log(email, password);
    const authData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: number; user: string }>(
        "http://localhost:3000/user/login",
        { email: email, password: password }
      )
      .subscribe(
        (response) => {
          this.token = response.token;
          console.log("loged in");
          if (this.token) {
            const expioresInDuration = response.expiresIn;
            this.getAuthTimer(expioresInDuration);
            this.authStatusListener.next(true);
            this.isAuthenticated = true;
            this.userId = response.userId;
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expioresInDuration * 1000
            );
            const id = "" + this.userId;
            this.saveAuthData(this.token, expirationDate, id);
            console.log("Servicessssss ", response.user);
            if (response.user === "normal") {
              this.router.navigate(["/login/normal"]);
            } else {
              this.router.navigate(["/login/contibutor"]);
            }
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.getAuthTimer(expiresIn / 1000);
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.authStatusListener.next(true);
    }
  }

  getAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.cleatAuthData();
    this.userId = null;
    this.router.navigate(["/"]);
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private cleatAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = +localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      // tslint:disable-next-line: object-literal-shorthand
      token: token,
      expirationDate: new Date(expirationDate),
      // tslint:disable-next-line: object-literal-shorthand
      userId: userId,
    };
  }
}
