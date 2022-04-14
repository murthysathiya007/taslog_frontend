import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLogin: boolean = false
  errorMessage: any

  registerForm: FormGroup;
  fieldRequired: string = "This field is required"

  constructor(
    private _api: ApiService, 
    private _auth: AuthService, 
    private _router:Router
  ) { 

    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.registerForm = new FormGroup(
      {'username': new FormControl(null,[Validators.required]),
      'email': new FormControl(null,[Validators.required, Validators.pattern(emailregex)]),
      'password': new FormControl(null, [Validators.required, this.checkPassword]),
     }
    )

  }

  ngOnInit() {
    // this.isUserLogin(); 
  }

  emaiErrors() {
    return this.registerForm.get('email')!.hasError('required') ? 'This field is required' :
      this.registerForm.get('email')!.hasError('pattern') ? 'Not a valid emailaddress' :''
  }

checkPassword(control:any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  getErrorPassword() {
    return this.registerForm.get('password')!.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
      this.registerForm.get('password')!.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }
  checkValidation(input: string){
    const validation = this.registerForm.get(input)!.invalid && (this.registerForm.get(input)!.dirty || this.registerForm.get(input)!.touched)
    return validation;
  }
  
  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    console.log(formData.value,"register")
    const email = formData.value.email;
    const password = formData.value.password;
    const username = formData.value.username;

      this._api.postTypeRequest('user/register', formData.value).subscribe((res: any) => {
      if (res.status) { 
        console.log(res)
        // this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        // this._auth.setDataInLocalStorage('token', res.token);  
        this._router.navigate(['login']);
      } else { 
        console.log(res)
        alert(res.msg)
      }
    });

    // this._auth.registerUSer(email, password, username);
    formDirective.resetForm();
    this.registerForm.reset();
}

  isUserLogin(){    
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    }
  }

}