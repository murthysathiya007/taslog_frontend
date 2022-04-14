import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLogin: boolean = false
  errorMessage: any
  constructor(
    private _api: ApiService, 
    private _auth: AuthService, 
    private _router:Router
  ) {
    this.loginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required]),
      'password': new FormControl(null,[Validators.required, this.checkPassword])
    })
   }
  ngOnInit() {

  }

  onSubmit( formData: FormGroup, loginDirective: FormGroupDirective){
    console.log('Your form data : ', formData.value);
    const email = formData.value.email;
    const password = formData.value.password;
    // this._auth.signinUser(email, password);

     this._api.postTypeRequest('user/login', formData.value).subscribe((res: any) => {
     
      console.log(res,"res")
      if (res.status == 2) { 
        this._auth.setDataInLocalStorage('userData', res);  
        // this._auth.setDataInLocalStorage('token', res.token);  
        this._router.navigate(['/']);
      } else if (res.status == 1)
      {
        alert('Invalid Crendentials')
      } else if (res.status == 0)
      {

      }
    })
  }
  
  checkPassword(control:any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  getErrorPassword() {
    return this.loginForm.get('password')!.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
      this.loginForm.get('password')!.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }
  checkValidation(input: string){
    const validation = this.loginForm.get(input)!.invalid && (this.loginForm.get(input)!.dirty || this.loginForm.get(input)!.touched)
    return validation;
  }
}