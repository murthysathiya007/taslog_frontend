import { User } from '../auth/auth/user.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  
  isLoggedIn = false;
  userSub = new BehaviorSubject<User>(null!);
  clearTimeout: any;


  // private handleUser(response: AuthResponseData) {
  //   const expireDate = new Date(
  //     new Date().getTime() + +response.expiresIn * 1000
  //   );
  //   const user = new User(
  //     response.email,
  //     response.localId,
  //     response.idToken,
  //     expireDate
  //   );
  //   this.userSub.next(user);
  //   localStorage.setItem('userData', JSON.stringify(user));
  //   this.autoLogout(+response.expiresIn * 1000);
  // }

  // getErrorHandler(errorRes: HttpErrorResponse) {
  //   let errorMessage = 'An Error Occurred';
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }
  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'Email Already Exists';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'Email Not Found';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'Invalid Password';
  //       break;
  //   }
  //   return throwError(errorMessage);
  // }

  // autoLogin() {
  //   let userData: {
  //     email: string;
  //     _token: string;
  //     expirationDate: string;
  //     localId: string;
  //   } = JSON.parse(localStorage.getItem('userData')!);
  //   if (!userData) {
  //     return;
  //   }

  //   let user = new User(
  //     userData.email,
  //     userData.localId,
  //     userData._token,
  //     new Date(userData.expirationDate)
  //   );

  //   if (user.token) {
  //     this.userSub.next(user);
  //   }

  //   let date = new Date().getTime();
  //   let expirationDate = new Date(userData.expirationDate).getTime();

  //   this.autoLogout(expirationDate - date);
  // }

  // autoLogout(expirationDate: number) {
  
  //   this.clearTimeout = setTimeout(() => {
  //     console.log(expirationDate);
  //     this.logout();
  //   }, expirationDate);
  // }

  // logout() {
  //   this.userSub.next(null!);
  //   this.router.navigate(['']);
  //   localStorage.removeItem('userData');
  //   if (this.clearTimeout) {
  //     clearTimeout(this.clearTimeout);
  //   }
  // }

  // isAuthenticated() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(this.isLoggedIn);
  //     }, 1000);
  //   });
  // }

  

   getUserDetails() {
    if(localStorage.getItem('userData')){
      return localStorage.getItem('userData')

    }else{
      return null
    }
    
  }

  setDataInLocalStorage(variableName:any, data:any) {
      // localStorage.setItem(variableName, data);
      const expireDate = new Date(new Date().getTime() + +600 * 1000 );

      console.log(data,'test');
      const user = new User(
        data.email,
        data.token,
        data.refreshToken,
        expireDate
      );
      this.userSub.next(user);
      localStorage.setItem(variableName, JSON.stringify(user));
      localStorage.setItem('token', data.token);
      // this.autoLogout(+600 * 1000);
  }

  getToken() {
      return localStorage.getItem('token');
  }

  clearStorage() {
      localStorage.clear();
  }

}